
const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const NeonDescSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "NeonSignsCategory",
      required: true,
    },
    desc: {
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

module.exports = mongoose.model("NeonDesc", NeonDescSchema);
