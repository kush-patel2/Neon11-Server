const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ProdDetailsSchema = new mongoose.Schema(
  {
    category:{
        type: Schema.Types.ObjectId,
        ref: "ProductCategoryMaster",
        required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
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
    readytobuy:{
        type: Boolean,
        default: false,
    },
    height:{
        type: String,
    },
    width:{
        type: String,
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProdDetails", ProdDetailsSchema);
