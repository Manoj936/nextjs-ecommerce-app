import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
  }
  
  const ReviewSchema = new Schema<IReview>(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IReview>("Review", ReviewSchema);
  