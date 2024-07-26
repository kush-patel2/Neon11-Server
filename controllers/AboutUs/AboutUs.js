const fs = require("fs");
const AboutUs = require("../../models/AboutUs/AboutUs");

exports.listAboutUs = async (req, res) => {
  try {
    const list = await AboutUs.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createAboutUs = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/AboutUsImg`)) {
      fs.mkdirSync(`${__basedir}/uploads/AboutUsImg`);
    }

    let abtImage = req.file
      ? `uploads/AboutUsImg/${req.file.filename}`
      : null;

    let { Tagline, box1, box2, box3, box4, description, IsActive } = req.body;

    const add = await new AboutUs({
        Tagline,
        box1,
        box2,
        box3,
        box4,
        abtImage,
        description,
      IsActive,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ isOk: false, message: err });
  }
};

exports.listAboutUsByParams = async (req, res) => {
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

    const list = await AboutUs.aggregate(query);
    res.json(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeAboutUs  = async (req, res) => {
  try {
    const del = await AboutUs.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getAboutUs  = async (req, res) => {
  try {
    const state = await AboutUs.findOne({ _id: req.params._id }).exec();
    res.json(state);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    let abtImage = req.file
      ? `uploads/AboutUsImg/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (abtImage != null) {
      fieldvalues.abtImage = abtImage;
    }
    const update = await AboutUs.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,

      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(500).send(err);
  }
};
