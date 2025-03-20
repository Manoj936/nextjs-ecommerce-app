import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products: {
      product: mongoose.Types.ObjectId;
      quantity: number;
    }[];
    totalPrice: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
  }
  
  const OrderSchema = new Schema<IOrder>(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true },
        },
      ],
      totalPrice: { type: Number, required: true },
      status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IOrder>("Order", OrderSchema);
  