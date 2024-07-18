
const YTDesc = require("../../models/YTDesc/YTDesc");

exports.createYTDesc = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { Title, subTitle, Desc, ytLink, IsActive } = req.body;
    const addYTDesc = await new YTDesc({ Title, subTitle, Desc, ytLink, IsActive }).save();
    console.log("create YTDesc", addYTDesc);
    res.status(200).json({ isOk: true, data: addYTDesc, message: "" });
  } catch (err) {
    res.status(200).json({ isOk: false, message: "Error creating youtube description" });
  }
};

exports.getYTDesc = async (req, res) => {
  try {
    const find = await YTDesc.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.listYTDesc = async (req, res) => {
  try {
    const list = await YTDesc.find().sort({ createdAt: 1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listActiveYTDesc = async (req, res) => {
  try {
    const list = await YTDesc.find({ IsActive: true })
      .sort({ createdAt: 1 })
      .exec();
    console.log("list active ytdesc", list);
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listYTDescByParams = async (req, res) => {
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
                Title: { $regex: match, $options: "i" },
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

    const list = await YTDesc.aggregate(query);

    res.json(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateYTDescMaster = async (req, res) => {
  try {
    const update = await YTDesc.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeYTDescMaster = async (req, res) => {
  try {
    const delTL = await YTDesc.deleteOne({
      _id: req.params._id,
    });
    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};
