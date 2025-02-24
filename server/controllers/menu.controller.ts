import { Request, Response } from "express";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    //add menu to restaurant
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(
        menu._id as mongoose.Schema.Types.ObjectId
      );
      await restaurant.save();
    }

    return res.status(201).json({
      success: true,
      message: "Menu added successfully.",
      menu,
    });
  } catch (error) {
    console.log("Error adding menu=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const EditMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const { id } = req.params;
    const file = req.file;
    const menu = await Menu.findById({ id });
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "menu not found.",
      });
    }
    if (name) {
      menu.name = name;
    }
    if (description) {
      menu.description = description;
    }
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();
    return res.status(200).json({
      success: true,
      message: "Menu updated.",
      menu,
    });
  } catch (error) {
    console.log("Error edit menu=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

