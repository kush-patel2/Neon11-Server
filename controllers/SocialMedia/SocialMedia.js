const SocialMedia = require("../../models/SocialMedia/SocialMedia");

exports.createSocialMedia = async (req, res) => {
  try {
    const { facebook, instagram, whatsapp } = req.body;
    const addSocialMedia = await new SocialMedia(req.body).save();
    console.log("create social media", addSocialMedia);
    res.status(200).json({ isOk: true, data: addSocialMedia, message: "" });
  } catch (err) {
    res.status(200).json({ isOk: false, message: "Error creating social media" });
  }
};

exports.getSocialMedia = async (req, res) => {
  try {
    const find = await SocialMedia.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.listSocialMedia = async (req, res) => {
  try {
    const list = await SocialMedia.find().sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listActiveSocialMedia = async (req, res) => {
  try {
    const list = await SocialMedia.find({ IsActive: true })
      .sort({ createdAt: -1 })
      .exec();
    console.log("list active social", list);
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listSocialMediaByParams = async (req, res) => {
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
                Facebook: { $regex: match, $options: "i" },
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

    const list = await SocialMedia.aggregate(query);

    res.json(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSocialMedia = async (req, res) => {
  try {
    const update = await SocialMedia.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeSocialMedia = async (req, res) => {
  try {
    const delTL = await SocialMedia.deleteOne({
      _id: req.params._id,
    });
    res.json(delTL);
  } catch (err) {
    res.status(400).send(err);
  }
};
