const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const HomeAboutSchema = new mongoose.Schema(
  {
    Tagline: {
      type: String,
      required: true,
    },
    box1: {
      type: String,
      required: true,
    },
    box2: {
      type: String,

      required: true,
    },
    box3: {
      type: String,

      required: true,
    },
    box4: {
      type: String,

      required: true,
    },
    abtImage: {
      type: String,
    },
    IsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeAbout", HomeAboutSchema);
