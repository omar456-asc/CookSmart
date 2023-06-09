let usersmodel = require("../Models/usersModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();



const secret = process.env.SECRET_KEY;


//#region JWT
const maxDay = 3 * 24 * 60 * 60; // The days i logged in then expires
const createToken = (id, is_admin) => {
  return jwt.sign({ id, is_admin }, secret, {
    expiresIn: maxDay,
  }); //id, secret
};
//#endregion



//#region LogIn
var logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersmodel.login(email, password);
    console.log("role and id", user.id, user.is_admin);
    const token = createToken(user.id, user.is_admin);
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

  };
  