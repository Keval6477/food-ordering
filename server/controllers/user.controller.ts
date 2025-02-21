import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password, contact } = req.body;

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationCode();

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Generate authentication token and attach to response
    generateToken(res, user);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Fetch user without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    // Send response
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(error); // Let Express handle the error (Do NOT return another response here)
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect User email or password.",
      });
    }
    //is password match
    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect User email or password.",
      });
    }
    //generate token
    generateToken(res, user);

    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      message: `welcome back ${userWithoutPassword?.fullName}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log("Login user error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    //send welcome email
    await sendWelcomeEmail(user.email, user.fullName);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user,
    });
  } catch (error) {
    console.log("Verify email error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.log("logout error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    //send mail
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URI}/resetPassword/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.log("forgoetPassword error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    //update password
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    //send reset email
    await sendResetSuccessEmail(user.email);
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("reset password error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user authenticated",
      user,
    });
  } catch (error) {
    console.log("auth error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullName, email, address, city, country, profilePicture } =
      req.body;
    //upload image on cloudinary
    let cloudResponse: any;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullName,
      email,
      address,
      city,
      country,
      profilePicture,
    };
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.log("update profile error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};
