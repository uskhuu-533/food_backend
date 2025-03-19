// Required imports
import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import 'dotenv/config'

const OptRouter = express.Router();

// In-memory OTP store (in production, use a database)
const otpStore = {};

/**
 * Generates a random 6-digit OTP
 * @returns {string} The generated OTP
 */
function generateOTP() {
  // Generate a 6-digit OTP
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Sends an OTP to the specified email address
 * @param {string} email - The recipient's email address
 * @param {string} otp - The OTP to send
 * @returns {Promise} - A promise that resolves when email is sent
 */
async function sendOTPEmail(email, otp) {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'outlook', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  // Email options
  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Thank you for registering with our service. To complete your verification, please use the following code:</p>
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">This is an automated message, please do not reply.</p>
      </div>
    `
  };

  // Send the email
  return transporter.sendMail(mailOptions);
}

/**
 * Generate and send OTP endpoint
 */
OptRouter.post('/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration time (10 minutes)
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
      attempts: 0 // Track verification attempts
    };
    
    // Send OTP via email
    await sendOTPEmail(email, otp);
    
    res.status(200).json({ 
      success: true, 
      message: 'Verification code sent to your email address' 
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send verification code' 
    });
  }
});

/**
 * Verify OTP endpoint
 */
OptRouter.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and verification code are required' 
      });
    }
    
    const otpData = otpStore[email];
    
    // Check if OTP exists for this email
    if (!otpData) {
      return res.status(400).json({ 
        success: false, 
        message: 'No verification code found for this email' 
      });
    }
    
    // Track verification attempts
    otpData.attempts += 1;
    
    // Limit verification attempts to prevent brute force
    if (otpData.attempts > 5) {
      delete otpStore[email];
      return res.status(400).json({ 
        success: false, 
        message: 'Too many attempts. Please request a new verification code.' 
      });
    }
    
    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code has expired. Please request a new one.' 
      });
    }
    
    // Verify OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification code' 
      });
    }
    
    // OTP verified successfully
    // Remove the OTP from store after successful verification
    delete otpStore[email];
    
    // Here you would typically update the user's record to mark them as verified
    // e.g., await User.findOneAndUpdate({ email }, { isVerified: true });
    
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully' 
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify email' 
    });
  }
});

/**
 * Resend OTP endpoint
 */
OptRouter.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    
    // Store OTP with expiration time (10 minutes)
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0
    };
    
    // Send OTP via email
    await sendOTPEmail(email, otp);
    
    res.status(200).json({ 
      success: true, 
      message: 'New verification code sent to your email address' 
    });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send new verification code' 
    });
  }
});

export default OptRouter;