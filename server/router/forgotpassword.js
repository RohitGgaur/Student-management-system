const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Student = require('../UserSchema/studentdetail');
const Teacher = require('../UserSchema/teacherdetail');

router.post('/forgot-password', async (req, res) => {
  const { emailOrPhone, userType } = req.body;

  try {
    let user;

    if (userType === 'student') {
      // Check in the Student collection
      user = await Student.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    } else if (userType === 'teacher') {
      // Check in the Teacher collection
      user = await Teacher.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // Send the reset link via email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      to: user.email, // Ensure this sends to the correct email
      from: 'passwordreset@example.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent!' });

  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
