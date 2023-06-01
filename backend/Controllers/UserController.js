let usersmodel = require("../Models/usersModel");
const bcrybt = require("bcrypt");
// const multer = require("multer");
var path = require("path");
// const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const usersModel = require("../Models/usersModel");

dotenv.config();

var GetAllUsers = async (req, res) => {
  try {
    var AllUsers = await usersmodel.find();
    await res.json(AllUsers);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get all users");
  }
};

module.exports = {
  GetAllUsers,
};
