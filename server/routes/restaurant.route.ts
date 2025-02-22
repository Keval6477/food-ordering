import { isAuthenticated } from "./../middlewares/isAuthenticated";
import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import upload from "../utils/multer";

const router = express.Router();
router
  .route("/create-restaurant")
  .post(
    isAuthenticated as any,
    upload.single("imageFile"),
    createRestaurant as any
  );
router
  .route("/getRestaurant")
  .get(isAuthenticated as any, getRestaurant as any);
router
  .route("/")
  .put(
    isAuthenticated as any,
    upload.single("imageFile"),
    updateRestaurant as any
  );
router.route("/order").get(isAuthenticated as any, getRestaurantOrders as any);
router
  .route("/order/:orderId/status")
  .put(isAuthenticated as any, updateOrderStatus as any);
router
  .route("/search/:searchText")
  .get(isAuthenticated as any, searchRestaurant as any);
router
  .route("/:restaurantId")
  .get(isAuthenticated as any, getSingleRestaurant as any);

export default router;
