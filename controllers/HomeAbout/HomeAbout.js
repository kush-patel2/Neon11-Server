const fs = require("fs");
const HomeAbout = require("../../models/HomeAbout/HomeAbout");

exports.listHomeAbout = async (req, res) => {
  try {
    const list = await HomeAbout.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createHomeAbout = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/HomeAboutImg`)) {
      fs.mkdirSync(`${__basedir}/uploads/HomeAboutImg`);
    }

    let abtImage = req.file
      ? `uploads/HomeAboutImg/${req.file.filename}`
      : null;

    let { Tagline, box1, box2, box3, box4, IsActive } = req.body;

    const add = await new HomeAbout({
        Tagline,
        box1,
        box2,
        box3,
        box4,
        abtImage,
      IsActive,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ isOk: false, message: err });
  }
};

exports.listHomeAboutByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      {
        $match: { IsActive: IsActive },
      },

      {
        $match: {
          $or: [
            {
              Tagline: new RegExp(match, "i"),
            },
            {
              box1: new RegExp(match, "i"),
            },
          ],
        },
      },
      {
        $facet: {
          stage1: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
          stage2: [
            {
              $skip: skip,
            },
            {
              $limit: per_page,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$stage1",
        },
      },
      {
        $project: {
          count: "$stage1.count",
          data: "$stage2",
        },
      },
    ];
    if (sorton && sortdir) {
      let sort = {};
      sort[sorton] = sortdir == "desc" ? -1 : 1;
      query = [
        {
          $sort: sort,
        },
      ].concat(query);
    } else {
      let sort = {};
      sort["createdAt"] = -1;
      query = [
        {
          $sort: sort,
        },
      ].concat(query);
    }

    const list = await HomeAbout.aggregate(query);
    res.json(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeHomeAbout = async (req, res) => {
  try {
    const del = await HomeAbout.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getHomeAbout = async (req, res) => {
  try {
    const state = await HomeAbout.findOne({ _id: req.params._id }).exec();
    res.json(state);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateHomeAbout = async (req, res) => {
  try {
    let abtImage = req.file
      ? `uploads/HomeAboutImg/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (abtImage != null) {
      fieldvalues.abtImage = abtImage;
    }
    const update = await HomeAbout.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,

      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(500).send(err);
  }
};
