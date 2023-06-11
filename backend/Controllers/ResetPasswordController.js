
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a unique token
  const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24h' });

  // Send an email to the user with a link to the password reset page
  const resetUrl = `https://your-domain.com/reset-password/${token}`;
  const mailOptions = {
    from: 'Your Name <your-email-address@gmail.com>',
    to: email,
    subject: 'Password Reset Request',
    text: `Please click the following link to reset your password: ${resetUrl}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    console.log(`Email sent: ${info.response}`);
    return res.status(200).json({ message: 'Password reset email sent' });
  });
});

app.get('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;

  // Verify the token
  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    // Render the password reset page with the token and user ID in the URL
    res.render('reset-password', { token, userId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid token' });
  }
});

app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { userId, password } = req.body;

  // Verify the token
  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.userId !== userId) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Update the user's password
    const user = await User.findById(userId);

    // if (!user)(Note: This is the continuation of the Node.js code from the previous message due to character limit)

    // Update the user's password
    const User = await User.findById(userId);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});