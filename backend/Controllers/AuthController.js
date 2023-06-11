let usersmodel = require("../Models/usersModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY;
// usersmodel.collection.createIndex({ username: 1 }, { unique: true });

//#region Errors
const handleErrors = (e) => {

  console.log(e.message);
  var errors = { username: "", email: "", password: "" };
  //#region incorrect email
  if (e.message == "incorrect email please try again") {
    errors.email = "that email is not registered";
  }
  //#endregion
  //#region validation email
  if (e.message == "invalid email") {
    errors.email = "invalid email";
  }
  //#endregion
  //#region incorrect email
  if (e.message == "incorrect password, please try again") {
    errors.password = "that password is incorrect";
  }
  //#endregion
  //#region duplicateErrorCode
  if (e.code == 11000) {
    //Another error if email is already exists
    errors.email = "that email is already registered";
    return errors;
  }

  // if (e.code == 11000) {
  //   //Another error if email is already exists
  //   errors.username = "this username exists, please try another one";
  //   return errors;
  // }
  
  //#endregion

  //#region validationErrors
  if (e.message.includes("Users validation failed")) {
    // It Divide errors into sections and types for each one
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
  //#endregion
};
//#endregion

//#region SignUp
var AddNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const usersModelCreate = await usersmodel.create({
      username ,
      unique: true ,
      email,
      password,
    });
    const token = createToken(usersModelCreate);
    res.json({ status: "success" });
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json({ status: "failed", message: errors });
  }
};
//#endregion

//#region JWT
const maxDay = 3 * 24 * 60 * 60; // The days i logged in then expires
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxDay,
  }); //id, secret
};
//#endregion

//#region LogIn
var logIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await usersmodel.login(email, password);
    console.log("id", user.id);
    const token = createToken(user.id);
    res.cookie("token", token, { maxAge: maxDay * 1000 });

    res.status(200);
    res.json({ status: "success", token: token,id:user._id });
  } catch (e) {
    var errors = handleErrors(e);
    res.status(400);
    console.log(errors);
    res.json({ status: "failed", message: errors });
  }
};
//#endregion

module.exports = {

    logIn,
    AddNewUser
  };
  