import mongoose, { Schema, Document } from "mongoose";

interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);
