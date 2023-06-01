const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrybt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
let DB_URL = process.env.MONGO_URI;

if (mongoose.connect(DB_URL, { useNewUrlParser: true })) {
  console.log("Connected to database");
}

var userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    // validate:{
    //     validator:(val)=>{return valid.isEmail(val)},
    //     message:"{Email} Not Valid"
    // }
  },
  password: { type: String, minlength: 5, required: true },
});

module.exports = mongoose.model("Users", userSchema);
