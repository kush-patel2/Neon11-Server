const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true,
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
