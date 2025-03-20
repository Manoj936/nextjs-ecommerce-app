import { Request, Response } from "express";
import Cart from "../models/Cart";

// 📌 Add Item to Cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let cartItem :any = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }

    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// 📌 Get User Cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// 📌 Update Cart Item
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// 📌 Remove Item from Cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { cartItemId } = req.params;

    await Cart.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};
