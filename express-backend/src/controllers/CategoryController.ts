import { Request, Response } from "express";
import Category from "../models/Category";

// 📌 Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// 📌 Get All Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// 📌 Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name, slug } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// 📌 Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
