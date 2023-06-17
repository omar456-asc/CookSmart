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



var sendVerificationEmail= async(req, res) => {

    const { email } = req.body;

    // Check if the user exists in the database
    const user = await usersmodel.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetUrl = `http://localhost:4200/email-verify/${email}`;
    const mailOptions = {
        from: 'cooksmart@gmail.com',
        to: email,
        subject: 'Verify your email address',
        html: `
            <p>your verification code is: ${user.verificationCode}</p>
            <a href="${resetUrl}"><button>Verify Email</button></a>
        `
      };
    
      await transporter.sendMail(mailOptions);
}

module.exports={
    sendVerificationEmail,
    generateVerificationCode
}