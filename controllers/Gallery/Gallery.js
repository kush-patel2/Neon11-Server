const fs = require("fs");
const Gallery = require("../../models/Gallery/Gallery");
const { log } = require("console");

exports.listImgages = async (req, res) => {
  try {
    const list = await Gallery.find().sort({ serialNumber: 1 }).exec();
    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createImages = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/GalleryImg`)) {
      fs.mkdirSync(`${__basedir}/uploads/GalleryImg`);
    }

    let image = req.file
      ? `uploads/GalleryImg/${req.file.filename}`
      : null;

    let { serialNumber, IsActive } = req.body;

    const add = await new Gallery({
        serialNumber,
        image,
        IsActive,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ isOk: false, message: err });
  }
};

exports.listImagesByParams = async (req, res) => {
    
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
              serialNumber: new RegExp(match, "i"),
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

    const list = await Gallery.aggregate(query);
    
    res.json(list);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeImages  = async (req, res) => {
  try {
    const del = await Gallery.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getImages  = async (req, res) => {
  try {
    const state = await Gallery.findOne({ _id: req.params._id }).exec();
    res.json(state);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateImages = async (req, res) => {
  try {
    let image = req.file
      ? `uploads/GalleryImg/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (image != null) {
      fieldvalues.image = image;
    }
    const update = await Gallery.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,

      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(500).send(err);
  }
};
