const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const ProductCategoryMasterSchema = new mongoose.Schema(
  {
    categoryName: {
        type: String,
    },
    IsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategoryMaster", ProductCategoryMasterSchema);