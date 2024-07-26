const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const SocialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    IsActive: {
      type: Boolean,
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocialMediaSchema", SocialMediaSchema);
