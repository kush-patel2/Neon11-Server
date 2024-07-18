const fs = require("fs");
const Logo = require("../../models/Logo/Logo");

exports.listLogo = async (req, res) => {
  try {
    const list = await Logo.find().sort({ createdAt: 1 }).exec();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createLogo = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/Logo`)) {
      fs.mkdirSync(`${__basedir}/uploads/Logo`);
    }

    let logo = req.file
      ? `uploads/Logo/${req.file.filename}`
      : null;

    let {IsActive } = req.body;

    const add = await new Logo({
        
        logo,
        IsActive,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ isOk: false, message: err });
  }
};

exports.listLogoByParams = async (req, res) => {
    
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
                logo: new RegExp(match, "i"),
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

    const list = await Logo.aggregate(query);
    
    res.json(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeLogo  = async (req, res) => {
  try {
    const del = await Logo.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getLogo = async (req, res) => {
  try {
    const state = await Logo.findOne({ _id: req.params._id }).exec();
    res.json(state);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateLogo = async (req, res) => {
  try {
    let logo = req.file
      ? `uploads/Logo/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (logo != null) {
      fieldvalues.logo = logo;
    }
    const update = await Logo.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,

      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(500).send(err);
  }
};
