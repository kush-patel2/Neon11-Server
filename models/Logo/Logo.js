const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const LogoSchema = new mongoose.Schema(
  {
    logo: {
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

module.exports = mongoose.model("Logo", LogoSchema);
