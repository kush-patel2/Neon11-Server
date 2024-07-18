const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const VisionSchema = new mongoose.Schema(
  {
    vision: {
      type: String,
      require: true,
    },
    mission: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    IsActive: {
      type: Boolean,
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vision", VisionSchema);
