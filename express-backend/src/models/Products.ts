import mongoose, { Schema, Document } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  isFeatured?: boolean;
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  model: mongoose.Types.ObjectId;
  images: string[];
  stock: number;
  sizes?: string[];
  colors?: string[];
  deleteFlag?: boolean;
  ratings: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
  }[];
  totalRatings?: number;
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
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true, min: 0 },
    sizes: { type: [String] },
    colors: { type: [String] },
    isFeatured: { type: Boolean, default: false },
    deleteFlag: { type: Boolean, default: false },
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

export default mongoose.model<IProduct>("Product", ProductSchema);