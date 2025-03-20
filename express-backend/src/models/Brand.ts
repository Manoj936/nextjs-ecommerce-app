import mongoose, { Schema, Document } from "mongoose";
interface IBrand extends Document {
    name: string;
    logo?: string; // Optional logo URL
  }
  
  const BrandSchema = new Schema<IBrand>(
    {
      name: { type: String, required: true, unique: true, trim: true },
      logo: { type: String },
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IBrand>("Brand", BrandSchema);
  