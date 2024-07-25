const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    pincode:{
        type: Number,
    },
    orderNotes:{
        type: String,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;

module.exports = mongoose.model("user", userSchema);
