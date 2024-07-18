
const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const LEDBoardSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "LEDCategory",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
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

module.exports = mongoose.model("LEDBoard", LEDBoardSchema);
