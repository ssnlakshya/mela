import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const StallSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["food", "accessories", "games"],
      required: true,
    },
    description: { type: String, required: true },

    bannerImage: { type: String, required: true },
    images: [{ type: String }],

    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    instagram: { type: String },

    items: [ItemSchema],
    highlights: [{ type: String }],
    bestSellers: [{ type: String }],
    offers: [{ type: String }],
    availableAt: [{ type: String }],
    stallNumber: { type: String },
    paymentMethods: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Stall ||
  mongoose.model("Stall", StallSchema);
