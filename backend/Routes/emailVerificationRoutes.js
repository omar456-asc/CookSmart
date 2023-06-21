const verifyController = require("../Controllers/EmailVerificationController");
const express = require("express");
const router = new express.Router();


router.post('/reset/email-verify',verifyController.sendVerificationEmail);


module.exports = router;