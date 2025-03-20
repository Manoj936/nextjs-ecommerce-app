import { Request, Response } from "express";
import Wishlist from "../models/Wishlist";

// 📌 Add Item to Wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingItem = await Wishlist.findOne({ userId, productId });

    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist", wishlistItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// 📌 Get User Wishlist
export const getWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await Wishlist.find({ userId }).populate("productId");
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// 📌 Remove Item from Wishlist
export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { wishlistItemId } = req.params;

    await Wishlist.findByIdAndDelete(wishlistItemId);
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};
