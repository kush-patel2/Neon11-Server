const ProdCategory = require("../../models/Category/ProdCategory");
const ProdDetails = require("../../models/ProdDetails/ProdDetails");
const fs = require("fs");

exports.getProdDetails = async (req, res) => {
  try {
    const find = await ProdDetails.findOne({ _id: req.params._id }).exec();
    res.json(find);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.createProdDetails = async (req, res) => {
  try {
    if (!fs.existsSync(`${__basedir}/uploads/Products`)) {
      fs.mkdirSync(`${__basedir}/uploads/Products`);
    }

    let prodImage = req.file
      ? `uploads/Products/${req.file.filename}`
      : null;

    let {
      category,
      title,
      og_price,
      offer_price,
      readytobuy,
      height,
      width,
      IsActive,
    } = req.body;

    const add = await new ProdDetails({
      category,
      image: prodImage,
      title,
      og_price,
      offer_price,
      readytobuy,
      height,
      width,
      IsActive,
    }).save();
    res.status(200).json({ isOk: true, data: add, message: "" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.listProdDetails = async (req, res) => {
  try {
    const list = await ProdDetails.find().sort({ title: 1 }).exec();
    res.json(list);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listProdByCategory = async (req, res) => {
  try {
    const list = await ProdDetails.find({
      category: req.params.categoryId,
      IsActive: true,
    })
      .sort({ createdAt: -1 })
      .exec();
    if (list) {
      res.status(200).json({ isOk: true, data: list, message: "" });
    } else {
      res.status(200).json({ isOk: false, message: "No data Found" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.listProdDetailsByParams = async (req, res) => {
  try {
    let { skip, per_page, sorton, sortdir, match, IsActive } = req.body;

    let query = [
      {
        $match: { IsActive: IsActive },
      },
      {
        $lookup: {
          from: "productcategorymasters",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              title: { $regex: match, $options: "i" },
            },
            {
              "category.categoryName": { $regex: match, $options: "i" },
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

    const list = await ProdDetails.aggregate(query);

    res.json(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProdDetails = async (req, res) => {
  try {
    let prodImage = req.file
      ? `uploads/Products/${req.file.filename}`
      : null;
    let fieldvalues = { ...req.body };
    if (prodImage != null) {
      fieldvalues.image = prodImage;
    }

    const update = await ProdDetails.findOneAndUpdate(
      { _id: req.params._id },
      fieldvalues,
      { new: true }
    );
    res.json(update);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.removeProdDetails = async (req, res) => {
  try {
    const del = await ProdDetails.deleteOne({
      _id: req.params._id,
    });
    res.json(del);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.CategoryProdList = async (req, res) => {
  try {
    const { option, categoryid } = req.params;

    const list = await ProdDetails.find({
      category: categoryid,
      IsActive: true,
    })
      .sort({ createdAt: -1 })
      .exec();

    let sortedList;

    switch (option) {
      case "1": // Newest
        sortedList = list;
        break;
      case "2": // Price low to high
        sortedList = list.sort((a, b) => parseFloat(a.offer_price) - parseFloat(b.offer_price));
        break;
      case "3": // Price high to low
        sortedList = list.sort((a, b) => parseFloat(b.offer_price) - parseFloat(a.offer_price));
        break;
      case "4": // A to Z
        sortedList = list.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "5": // Z to A
        sortedList = list.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        // Default sorting, perhaps by createdAt descending
        sortedList = list;
    }

    if (sortedList) {
      res.status(200).json({ isOk: true, data: sortedList, message: "" });
    } else {
      res.status(200).json({ isOk: false, message: "No data Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};


exports.listProdByCategoryName = async (req, res) => {
    try {
      const { categoryName } = req.params;
  
      // Find the category ID based on category name
      const category = await ProdCategory.findOne({ categoryName, IsActive: true }).exec();
  
      if (!category) {
        return res.status(404).json({ isOk: false, message: "Category not found or inactive" });
      }
  
      // Find products by category ID
      const list = await ProdDetails.find({
        category: category._id,
        IsActive: true,
      })
        .sort({ createdAt: -1 })
        .exec();
  
      if (list.length > 0) {
        res.status(200).json({ isOk: true, data: list, message: "" });
      } else {
        res.status(200).json({ isOk: false, message: "No products found in this category" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  };