
const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const NeonSignsSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "NeonSignsCategory",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
    
    IsActive: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("NeonSigns", NeonSignsSchema);
