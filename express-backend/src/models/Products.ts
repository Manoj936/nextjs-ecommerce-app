import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discountPrice?: number; // Optional discount
  category: mongoose.Types.ObjectId; // Reference to category
  brand?: string;
  images: string[]; // Multiple image URLs
  deleteFlag?: boolean ;
  stock: number;
  sizes?: string[]; // Optional (e.g., "S", "M", "L")
  colors?: string[]; // Optional (e.g., "red", "blue")
  ratings: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
  }[];
  totalRatings?: number; // Aggregate rating
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: String },
    deleteFlag: { type: Boolean, default: false }, // Soft delete flag
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    sizes: { type: [String] },
    colors: { type: [String] },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
