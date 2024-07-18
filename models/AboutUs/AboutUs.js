const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const AboutUsSchema = new mongoose.Schema(
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
    description: {
        type: String,
    },
    IsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
