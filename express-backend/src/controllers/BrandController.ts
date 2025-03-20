import { Request, Response } from "express";
import Brand from "../models/Brand";

// 📌 Create Brand
export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name, logo } = req.body;

    if (!name || !logo) {
      return res.status(400).json({ message: "Name and logo are required" });
    }

    const brand = new Brand({ name, logo });
    await brand.save();

    res.status(201).json({ message: "Brand created successfully", Brand });
  } catch (error) {
    res.status(500).json({ message: "Error creating Brand", error });
  }
};

// 📌 Get All Brandes
export const getBrandes = async (req: Request, res: Response) => {
  try {
    const Brandes = await Brand.find();
    res.status(200).json(Brandes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Brandes", error });
  }
};

// 📌 Update Brand
export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { BrandId } = req.params;
    const { name, logo } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      BrandId,
      { name, logo },
      { new: true }
    );

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: "Error updating Brand", error });
  }
};

// 📌 Delete Brand
export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { BrandId } = req.params;
    await Brand.findByIdAndDelete(BrandId);

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Brand", error });
  }
};
