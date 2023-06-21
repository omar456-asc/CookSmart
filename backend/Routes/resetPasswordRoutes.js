const resetController = require("../Controllers/ResetPasswordController");
const express = require("express");
const router = new express.Router();


router.post('/reset/email-reset-password',resetController.resetpw);
router.post('/reset/reset-password/:email',resetController.getToken);

module.exports = router;