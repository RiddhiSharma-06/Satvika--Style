import { useState } from "react";
import { useNavigate } from "react-router-dom";
import paymentQR from "../assets/images/QR.png";
import API from "../api/axios";

function Checkout() {
  const navigate = useNavigate();

  const [showQR, setShowQR] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const deliveryAddress = JSON.parse(
    localStorage.getItem("deliveryAddress") || "{}"
  );

  const total = cart.reduce((sum, item) => {
    return sum + Number(String(item.price).replace("₹", ""));
  }, 0);

  const gst = Math.round(total * 0.18);
  const deliveryCharge = total > 499 ? 0 : 50;
  const grandTotal = total + gst + deliveryCharge;

  const placeOrder = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Validate address
      if (!deliveryAddress.name) {
        alert("Delivery address not found");
        return;
      }

      // Validate payment fields
      if (!upiTransactionId) {
        alert("Please enter UPI Transaction ID");
        return;
      }

      if (!paymentProof) {
        alert("Please upload payment screenshot");
        return;
      }

      // Get user
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.id && !user._id) {
        alert("User not found. Please login again.");
        return;
      }

      // Upload screenshot
      const imageData = new FormData();
      imageData.append("image", paymentProof);

      const uploadRes = await API.post("/upload", imageData);
      const screenshotUrl = uploadRes.data.imageUrl;

      // Create order
      const newOrder = {
        userId: user.id || user._id,

        orderId: "ORD" + Date.now(),

        upiTransactionId,

        items: cart,

        address: deliveryAddress,

        total: grandTotal,

        paymentScreenshot: screenshotUrl,

        status: "Payment Verification Pending",

        date: new Date().toLocaleDateString(),
      };

      console.log("NEW ORDER:", newOrder);

      await API.post("/orders", newOrder);

      localStorage.removeItem("cart");

      alert("Order Submitted Successfully");

      navigate("/orders");
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );
      alert("Failed To Place Order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-5xl font-bold mb-10">Checkout</h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl">

        {/* Order Summary */}
        <div className="bg-pink-100 p-5 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}

          {/* Address */}
          <h3 className="font-bold text-xl mt-6 mb-3">
            Delivery Address
          </h3>

          <p>{deliveryAddress?.name}</p>
          <p>{deliveryAddress?.phone}</p>
          <p>
            {deliveryAddress?.houseNo}, {deliveryAddress?.area}
          </p>
          <p>
            {deliveryAddress?.city}, {deliveryAddress?.state}
          </p>
          <p>{deliveryAddress?.pincode}</p>
        </div>

        {/* Bill */}
        <div className="border-t pt-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>GST (18%)</span>
            <span>₹{gst}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold mt-4">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* QR */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowQR(true)}
            className="bg-pink-500 text-white px-8 py-3 rounded-full"
          >
            Pay Using QR
          </button>

          {showQR && (
            <div className="mt-6">
              <img
                src={paymentQR}
                alt="QR"
                className="w-64 mx-auto rounded-2xl shadow-lg"
              />
              <p className="mt-4">Scan and pay ₹{grandTotal}</p>
            </div>
          )}
        </div>

        {/* UPI */}
        <div className="mt-8">
          <label className="block font-semibold mb-2">
            UPI Transaction ID
          </label>

          <input
            type="text"
            value={upiTransactionId}
            onChange={(e) => setUpiTransactionId(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* Screenshot */}
        <div className="mt-8">
          <label className="block font-semibold mb-2">
            Upload Payment Screenshot
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPaymentProof(e.target.files[0])}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* Button */}
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`mt-6 px-8 py-3 rounded-full text-white ${
            loading ? "bg-gray-400" : "bg-pink-500"
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;