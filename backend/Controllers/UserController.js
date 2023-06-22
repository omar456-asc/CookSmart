let usersmodel = require("../Models/usersModel");
const bcrybt = require("bcrypt");
// const multer = require("multer");
var path = require("path");
// const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

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

var GetUserByID = async (req, res) => {
  try {
    var ID = req.params.id;
    res.json(await usersmodel.findById(ID));
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to get user");
  }
};

var UpdateUserByID = async (req, res) => {
  try {
    var ID = req.params.id;
    var updatedUser = req.body;
    const salt = await bcrybt.genSalt();
    await usersmodel.updateOne(
      { _id: ID },
      {
        password: await bcrybt.hash(updatedUser.password, salt),
      }
    );
    await res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to update new user");
  }
};


var DeleteUserByID = async (req, res) => {
  try {
    var ID = req.params.id;
    await usersmodel.findByIdAndDelete(ID);
    res.send("Deleted Successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("failed to delete user");
  }
};
async function addMealToFavorites(req, res) {
  var userId = req.params.userId;
  const mealId = req.params.mealId;
  //console.log("mmmm");
  //console.log(userId);
  //console.log(mealId);
  try {
    const user = await usersmodel.findById(userId);
    const favorite = user.favorite;
    console.log(favorite);
    const CheckFavorite = favorite.findIndex((item) => item == mealId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the meal is already in the user's favorites
    if (CheckFavorite != -1) {
      favorite.splice(CheckFavorite, 1);
      await usersmodel.updateOne({ _id: userId }, { favorite: favorite });
      console.log(favorite);
      return res.status(400).json({ message: "Meal already in favorites" });
    }
    favorite.push(mealId);
    await usersmodel.updateOne({ _id: userId }, { favorite: favorite });
    //await user.save();

    return res.json({ message: "Meal added to favorites" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}



module.exports = {
  GetAllUsers,
  UpdateUserByID,
  GetUserByID,
  DeleteUserByID,
  addMealToFavorites
};
