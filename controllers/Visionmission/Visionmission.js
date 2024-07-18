
const Visionmission = require("../../models/Visionmission/Visionmission");

exports.createVisionmission = async (req, res) => {
  try {
    const { vision, mission, value } = req.body;
    const addVisionmission = await new Visionmission(req.body).save();
    console.log("create vision mission value", addVisionmission);
    res.status(200).json({ isOk: true, data: addVisionmission, message: "" });
  } catch (err) {
    res.status(200).json({ isOk: false, message: "Error creating vision mission" });
  }
};

exports.getVisionmission = async (req, res) => {
  try {
    const find = await Visionmission.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.listVisionmission = async (req, res) => {
  try {
    const list = await Visionmission.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listActiveVisionmission = async (req, res) => {
  try {
    const list = await Visionmission.find({ IsActive: true })
      .sort({ createdAt: -1 })
      .exec();
    console.log("list vision mission", list);
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listVisionmissionByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      {
        $match: { IsActive: IsActive },
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
    if (match) {
      query = [
        {
          $match: {
            $or: [
              {
                vision: { $regex: match, $options: "i" },
              },
            ],
          },
        },
      ].concat(query);
    }

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

    const list = await Visionmission.aggregate(query);

    res.json(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateVisionmission= async (req, res) => {
  try {
    const update = await Visionmission.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeVisionmission = async (req, res) => {
  try {
    const delTL = await Visionmission.deleteOne({
      _id: req.params._id,
    });
    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};
