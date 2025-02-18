import mongoose, { Document } from "mongoose";

export interface DeliveryDetails {
  email: string;
  name: string;
  address: string;
  city: string;
}

type CartItems = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};
export interface IOrder {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItems[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out for delivery"
    | "delivered";
}

export interface IOrderDocument extends IOrder, Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrderDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    cartItems: [
      {
        menuId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out for delivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
