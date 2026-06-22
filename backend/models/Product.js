import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Necklaces",
        "Earrings",
        "Rings",
        "Anklets",
        "Women Suits",
      ],
    },

    // NEW FIELD FOR SUITS
    size: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isOutOfStock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically update stock status
productSchema.pre("save", function () {
  this.isOutOfStock = this.stock <= 0;
});

export default mongoose.model("Product", productSchema);