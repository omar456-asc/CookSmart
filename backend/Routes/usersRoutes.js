//Registration
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");
const authuserMiddleware = require("../MiddleWares/authuserMiddleware");

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
//fav
router.post('/:userId/favorite/:mealId', UserController.addMealToFavorites);

router.post('/:userId/favorite/:mealId', UserController.addMealToFavorites);

//#region Authentication
router.post("/login", AuthController.logIn);
router.post("/signup", AuthController.AddNewUser);
//#endregion

//#region verification
router.get('/verify/:code', AuthController.getVerificationCode);
//#endregion
// upload profile pic
router.post(
  "/upload-profile-pic",
  UserController.upload.single("file"),
  UserController.UploadProfilePic
);

router.post("/update-data", authuserMiddleware, UserController.UpdateUserProfileData);

//#region User
// router.get("/latest8users", authuserMiddleware, UserController.getLatest8users);
router.get("/", authuserMiddleware, UserController.GetAllUsers);
router.get("/:id", authuserMiddleware, UserController.GetUserByID);
router.post("/:id", authuserMiddleware, UserController.UpdateUserByID);
router.delete("/:id", authuserMiddleware, UserController.DeleteUserByID);
//#endregion

module.exports = router;
