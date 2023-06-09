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
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: [true],
    lowercase: true,
    minlength: 4,
    maxlength: 16,
    match: [/^[a-zA-Z0-9]+$/, "please enter a valid username"],
  },
  cart: { type: Array },
  favorite: { type: Array, ref: "meals" },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "Minimum password length is 6 characters"],
    required: [true, "Please enter a password"],
  },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
  is_chef: { type: Boolean, default: false },
  avatar: {
    type: String,
  },
  mobile: { type: String },
  address: { type: String },
  gender: { type: String },
  age: { type: Number },
});

//#region FireAFunctionBeforeSaveToDataBaseToHash
userSchema.pre("save", async function (next) {
  const salt = await bcrybt.genSalt();
  this.password = await bcrybt.hash(this.password, salt);
  next();
});
//#endregion

//static method to login
userSchema.statics.login = async function (email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var validEmail = emailRegex.test(email);
  if (validEmail) {
    const loginUser = await this.findOne({ email });
    if (loginUser) {
      const checkPassword = await bcrybt.compare(password, loginUser.password);
      if (checkPassword) {
        return loginUser;
      }
      throw Error("incorrect password, please try again");
    }
    throw Error("incorrect email please try again");
  }
  throw Error("invalid email");
};
module.exports = mongoose.model("users", userSchema);
