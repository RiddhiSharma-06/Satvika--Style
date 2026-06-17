import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <h2 className="text-xl font-bold">
              Order ID: {order.orderId}
            </h2>

            <p className="mt-2">
              <strong>Total:</strong> ₹
              {order.total}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>UPI Transaction ID:</strong>{" "}
              {order.upiTransactionId}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {order.date}
            </p>

            {/* Customer Address */}

            <div className="mt-4">
              <h3 className="font-bold">
                Customer Address
              </h3>

              <p>
                {order.address?.name}
              </p>

              <p>
                {order.address?.phone}
              </p>

              <p>
                {order.address?.houseNo},{" "}
                {order.address?.area}
              </p>

              <p>
                {order.address?.city},{" "}
                {order.address?.state}
              </p>

              <p>
                {order.address?.pincode}
              </p>
            </div>

            {/* Products */}

            <div className="mt-4">
              <h3 className="font-bold mb-2">
                Products
              </h3>

              {order.items?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 mb-3 border-b pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p>
                        {item.price}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Payment Screenshot */}

            {order.paymentScreenshot && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">
                  Payment Screenshot
                </h3>

                <a
                  href={
                    order.paymentScreenshot
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Screenshot
                </a>
              </div>
            )}

            {/* Status Buttons */}

            <div className="flex gap-2 mt-6 flex-wrap">
              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Confirmed"
                  )
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ship
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                className="bg-black text-white px-4 py-2 rounded"
              >
                Deliver
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Cancelled"
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;