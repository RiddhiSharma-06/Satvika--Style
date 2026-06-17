import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    orderId: String,

    // NEW FIELD
    upiTransactionId: {
      type: String,
      required: true,
    },

    items: Array,

    address: Object,

    total: Number,

    paymentScreenshot: String,

    status: {
      type: String,
      enum: [
        "Payment Verification Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Payment Verification Pending",
    },

    date: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Order",
  orderSchema
);