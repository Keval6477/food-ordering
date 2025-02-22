import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import multer from "multer";
import { Order } from "../models/order.model";
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { restaurantName, city, country, cuisines, deliveryTime } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "restaurant already exists",
      });
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Restaurant.create({
      user: userId,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl: imageUrl,
    });
    return res.status(201).json({
      success: true,
      message: "restaurant created successfully",
    });
  } catch (error) {
    console.log("Error creating restaurant=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }
    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log("Error getting restaurant=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { restaurantName, city, country, cuisines, deliveryTime } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }
    restaurant.restaurantName = restaurantName;
    restaurant.deliveryTime = deliveryTime;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log("Error updating restaurant=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "restaurant already exists",
      });
    }
    const orders = Order.find({ restaurant: restaurant?._id })
      .populate("restaurant")
      .populate("user");

    return res.status(200).json({
      success: true,
      orders: orders || [],
    });
  } catch (error) {
    console.log("Error getting restaurant orders=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log("Error updating restaurant orders=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);
    const query: any = {};
    //basic search based on searchText
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }
    //filter on searchQuery
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }
    console.log(query);
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }
    const restaurants = await Restaurant.find(query);
    return res.status(200).json({
      success: true,
      restaurants: restaurants || [],
    });
  } catch (error) {
    console.log("Error searching restaurant=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "no restaurant found.",
        restaurant: {},
      });
    }

    return res.status(200).json({
      success: true,
      restaurant: restaurant || {},
    });
  } catch (error) {
    console.log("Error get single restaurant=>", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};
