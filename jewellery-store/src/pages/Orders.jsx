import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
   
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders"
        );

        const myOrders = res.data.filter(
  (order) =>
    String(order.userId) === String(user?.id)
);

        setOrders(myOrders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user?.id]);

  const isCompleted = (currentStatus, targetStatus) => {
    const steps = [
      "Payment Verification Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
    ];

    return (
      steps.indexOf(currentStatus) >=
      steps.indexOf(targetStatus)
    );
  };

  return (
    <div className="min-h-screen p-8 bg-pink-50">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <h2 className="text-xl font-bold">
              {order.orderId}
            </h2>

            <p className="mt-2">
              Total: ₹{order.total}
            </p>

            <p className="mb-4">
              Status: {order.status}
            </p>

            <div className="space-y-2">
              <p>
                {isCompleted(
                  order.status,
                  "Payment Verification Pending"
                )
                  ? "✅"
                  : "⭕"}{" "}
                Order Placed
              </p>

              <p>
                {isCompleted(order.status, "Confirmed")
                  ? "✅"
                  : "⭕"}{" "}
                Payment Verified
              </p>

              <p>
                {isCompleted(order.status, "Shipped")
                  ? "✅"
                  : "⭕"}{" "}
                Shipped
              </p>

              <p>
                {isCompleted(order.status, "Delivered")
                  ? "✅"
                  : "⭕"}{" "}
                Delivered
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Products
              </h3>

              {(order.items || []).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;