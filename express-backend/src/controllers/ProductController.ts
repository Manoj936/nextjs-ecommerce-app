import { Request, Response } from "express";
import Product from "../models/Products";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  };
  
  // Get All Products
  export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  };
  
  // Update Product
  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  };
  
  // Delete Product
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      await Product.findByIdAndUpdate(req.params.id , {deleteFlag :true} ,{ new: true });
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  };


  //Search Product

  export const searchProducts = async (req: Request, res: Response) => {
    try {
      const { query, category, minPrice, maxPrice, sortBy, page, limit } = req.query;
  
      const filter: any = { deleteFlag: false };
  
      // 🔍 Search by product name, description, or category
      if (query) {
        filter.$or = [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ];
      }
  
      // 🏷️ Filter by category
      if (category) {
        filter.category = category;
      }
  
      // 💰 Filter by price range
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
      }
  
      // 📄 Pagination setup
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = parseInt(limit as string) || 10;
      const skip = (pageNumber - 1) * pageSize;
  
      // 📌 Sorting options
      const sortOptions: any = {};
      if (sortBy) {
        if (sortBy === "price_asc") sortOptions.price = 1;
        else if (sortBy === "price_desc") sortOptions.price = -1;
        else if (sortBy === "newest") sortOptions.createdAt = -1;
      }
  
      // 🚀 MongoDB Aggregation Pipeline
      const products = await Product.aggregate([
        { $match: filter },
        { $sort: sortOptions },
        { $skip: skip },
        { $limit: pageSize },
      ]);
  
      // Get total count for pagination
      const totalProducts = await Product.countDocuments(filter);
  
      res.status(200).json({
        totalProducts,
        page: pageNumber,
        totalPages: Math.ceil(totalProducts / pageSize),
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  