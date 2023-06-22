let usersmodel = require("../Models/usersModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
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
  const { username, email, password ,is_chef} = req.body;
  const verificationCode = uuid.v4();

  try {
    const usersModelCreate = await usersmodel.create({
      username ,
      unique: true ,
      email,
      password,
      verificationCode,
      is_chef
    });
    // const token = createToken(usersModelCreate);
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
    });
    const resetUrl = process.env.FRONT_URL+`/verify/${verificationCode}`;
    const mailOptions = {
      from: 'cooksmart@gmail.com',
      to: email,
      subject: 'Verify your email address',
      html: `<p>Hello ${username},</p><p>Thank you for signing up! Please click the following link to verify your email address:</p><p><a href="${resetUrl}">Verify Email</a></p>`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send verification email.' });
      } else {
        console.log(`Verification email sent to ${email}: ${info.response}`);
        res.json({ message: 'Verification email sent.' });
      }})
  
    res.json({ status: "success" });
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json({ status: "failed", message: errors });
  }
};
//#endregion
//#region get verification code
var getVerificationCode= async (req, res) => {
  const { code } = req.params;
 
   // Check if the user exists in the database
   const user = await usersmodel.findOne({verificationCode:code});
   if (user) {

    await usersmodel.updateOne(
      { _id: user._id },
      {
        isVerified: true,
      }
    );
  

    res.send("done");
  } else {
     console.log('error')
    res.status(404).send("invalid");
  }

}
//#endregion

//#region JWT
const maxDay = 3 * 24 * 60 * 60; // The days i logged in then expires
const createToken = (id, is_chef) => {
  return jwt.sign({ id, is_chef }, secret, {
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
    console.log("role and id", user.id, user.is_chef);
    const token = createToken(user.id, user.is_chef);
    res.cookie("token", token, { maxAge: maxDay * 1000 });

    res.status(200);
    res.json({ status: "success", token: token,id:user._id ,isVerified:user.isVerified});
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
    AddNewUser,
    getVerificationCode
  };
  