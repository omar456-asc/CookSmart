let usersmodel = require("../Models/usersModel");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrybt = require("bcrypt");
const secret = process.env.SECRET_KEY;
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

var resetpw= async (req, res) => {
  const { email } = req.body;

  // Check if the user exists in the database
  const user = await usersmodel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a unique token
  const id= user._id

  // Send an email to the user with a link to the password reset page
  const resetUrl = `http://localhost:4200/reset-password/${email}`;
  const mailOptions = {
    from: 'cookSmart@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `
    <p>Please click the following button to reset your password:</p>
    <a href="${resetUrl}"><button>Reset Password</button></a>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    console.log(`Email sent: ${info.response}`);
    return res.status(200).json({ message: 'Password reset email sent' });
  });
}

 var getToken=async (req, res) => {
  const email  = req.params.email;
 
try{
    const user = await usersmodel.findOne({ email });
    console.log(user)
    console.log(user._id)
    var updatedUser = req.body;
    console.log(updatedUser)
    const salt = await bcrybt.genSalt();
    await usersmodel.updateOne(
      { _id: user._id },
      {
        password: await bcrybt.hash(updatedUser.password, salt),
      }
    );
    await res.send(updatedUser);
}catch (e) {
    console.log(e);
    res.status(400).send("failed to update new user");
  }

}



module.exports={
    resetpw,
    getToken
}