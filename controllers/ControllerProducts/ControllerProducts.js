const fs = require("fs");
const ControllerProducts = require("../../models/ControllerProducts/ControllerProducts");

exports.listControllerProds = async (req, res) => {
  try {
    const list = await ControllerProducts.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createControllerProds = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/ControllerProds`)) {
      fs.mkdirSync(`${__basedir}/uploads/ControllerProds`);
    }

    let image = req.file
      ? `uploads/ControllerProds/${req.file.filename}`
      : null;

    let { desc, og_price, offer_price, IsActive } = req.body;

    const add = await new ControllerProducts({
        image,
        desc, 
        og_price, 
        offer_price, 
        IsActive
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ isOk: false, message: err });
  }
};

exports.listControllerProdsByParams = async (req, res) => {
    
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
              desc: new RegExp(match, "i"),
            },
            {
                image: new RegExp(match, "i"),
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

    const list = await ControllerProducts.aggregate(query);
    
    res.json(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeControllerProds  = async (req, res) => {
  try {
    const del = await ControllerProducts.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getControllerProds  = async (req, res) => {
  try {
    const state = await ControllerProducts.findOne({ _id: req.params._id }).exec();
    res.json(state);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateControllerProds = async (req, res) => {
  try {
    let image = req.file
      ? `uploads/ControllerProds/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (image != null) {
      fieldvalues.image = image;
    }
    const update = await ControllerProducts.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,

      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(500).send(err);
  }
};
