import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }
    const decodeToken = (await jwt.verify(
      token,
      process.env.SECRET_KEY!
    )) as jwt.JwtPayload;

    //check is decoding is successful
    if (!decodeToken) {
      return res.status(200).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decodeToken.userId;
    next();
  } catch (error) {
    console.log("auth error=>", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred.",
    });
  }
};
