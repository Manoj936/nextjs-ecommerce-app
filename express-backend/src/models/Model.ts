import mongoose, { Schema, Document } from "mongoose";

interface IModel extends Document {
    name: string;
    brand: mongoose.Types.ObjectId;
  }
  
  const ModelSchema = new Schema<IModel>(
    {
      name: { type: String, required: true, trim: true },
      brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    },
    { timestamps: true }
  );
  
  export default mongoose.model<IModel>("Model", ModelSchema);
  