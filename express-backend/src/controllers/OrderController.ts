import { Request, Response } from "express";
import Order from "../models/Order";

// 📌 Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, totalAmount, status } = req.body;

    if (!userId || !items || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: status || "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// 📌 Get Orders by User
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// 📌 Update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// 📌 Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
