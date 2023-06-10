//Registration
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");

//#region Authentication
router.post("/signup", AuthController.AddNewUser);
//#endregion

//#region User
// router.get("/latest8users", authuserMiddleware, UserController.getLatest8users);
router.get("/",  UserController.GetAllUsers);
router.get("/:id",  UserController.GetUserByID);
router.post("/:id", UserController.UpdateUserByID);
router.delete("/:id",  UserController.DeleteUserByID);
//#endregion

module.exports = router;
