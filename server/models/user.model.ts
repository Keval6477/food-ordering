import mongoose, { Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  contact: Number;
  address: String;
  city: String;
  country: String;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  verificationTokenExpiresAt?: Date;
  verificationToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  resetPasswordToken?: string;
  isVerified?: boolean;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
    },
    verificationToken: {
      type: Date,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
