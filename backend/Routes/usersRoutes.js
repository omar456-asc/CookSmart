const UserController = require("../Controllers/UserController");

const userModel = require("../Models/usersModel");

const userValid = require("../Utils/AuthValidate");

const express = require("express");
const router = new express.Router();

router.get("/", UserController.GetAllUsers);

module.exports = router;
