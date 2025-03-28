// Required imports
import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import "dotenv/config";
import { User } from "../models/users.model.js";

const OptRouter = express.Router();
const otpStore = {};

/**
 * Generates a random 6-digit OTP
 * @returns {string} The generated OTP
 */
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Sends an OTP to the specified email address
 * @param {string} email - The recipient's email address
 * @param {string} otp - The OTP to send
 * @returns {Promise} - A promise that resolves when email is sent
 */
async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uskhuunymdavaa9@gmail.com",
      pass: "rnal apaa cdax boow",
    },
  });

  const mailOptions = {
    from: `"Food-Delivery" <uskhuunymdavaa9@gmail.com>`,
    to: email,
    subject: "Your Verification Code",
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
    `,
  };

  return transporter.sendMail(mailOptions);
}

OptRouter.post("/generate-otp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const otp = generateOTP();
    console.log(otp);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes in milliseconds
      attempts: 0, // Track verification attempts
    };

    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email address",
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send verification code",
    });
  }
});

OptRouter.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const otpData = otpStore[email];
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "No verification code found for this email",
      });
    }

    otpData.attempts += 1;

    if (otpData.attempts > 5) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "Too many attempts. Please request a new verification code.",
      });
    }

    if (Date.now() > otpData.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new one.",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
    delete otpStore[email];
    const verifiedTrue = await User.findOneAndUpdate(
      { email: email },
      { isVerrified: true }
    );
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify email",
    });
  }
});

OptRouter.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const otp = generateOTP();
    console.log(otp);
    
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    };
    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "New verification code sent to your email address",
    });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send new verification code",
    });
  }
});

export default OptRouter;

OptRouter.post('/change-pass', async (req, res)=>{
  try {
    const { email } = req.body
    const user = await User.findOne({email:email})
    if (!user) {
      res.status(400).json({
        success :false,
        message : "user not found"
      })
    }else{
    const otp = generateOTP()

    
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, 
      attempts: 0, 
    };
    await sendOTPEmail(email, otp)
    res.status(200).json({
      success : true,
      message : "Success sent otp"
    })}
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success : false,
      message:"Failed to send code"
    })
  }
})