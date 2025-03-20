import { Request, Response } from "express";
import ProductModel from "../models/Model";

// 📌 Create Model
export const createModel = async (req: Request, res: Response) => {
  try {
    const { name, brand } = req.body;

    if (!name || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const model = new ProductModel({ name, brand });
    await model.save();

    res.status(201).json({ message: "Model created successfully", model });
  } catch (error) {
    res.status(500).json({ message: "Error creating model", error });
  }
};

// 📌 Get All Models
export const getModels = async (req: Request, res: Response) => {
  try {
    const models = await ProductModel.find().populate("Brand");
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: "Error fetching models", error });
  }
};

// 📌 Update Model
export const updateModel = async (req: Request, res: Response) => {
  try {
    const { modelId } = req.params;
    const { name, brand } = req.body;

    const updatedModel = await ProductModel.findByIdAndUpdate(
      modelId,
      { name, brand },
      { new: true }
    );

    res.status(200).json(updatedModel);
  } catch (error) {
    res.status(500).json({ message: "Error updating model", error });
  }
};

// 📌 Delete Model
export const deleteModel = async (req: Request, res: Response) => {
  try {
    const { modelId } = req.params;
    await ProductModel.findByIdAndDelete(modelId);

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting model", error });
  }
};
