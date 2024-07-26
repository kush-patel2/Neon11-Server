const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ControllerProdsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    og_price:{
        type: String,
        required: true,
    },
    offer_price:{
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

module.exports = mongoose.model("ControllerProds", ControllerProdsSchema);
