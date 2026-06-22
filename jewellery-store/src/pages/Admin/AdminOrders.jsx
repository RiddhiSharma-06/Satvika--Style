import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      alert("Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-pink-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Manage Orders
        </h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              {/* Order Header */}
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">
                  Order ID : {order.orderId}
                </h2>

                <p className="mt-2">
                  <strong>Total :</strong> ₹{order.total}
                </p>

                <p>
                  <strong>Status :</strong>{" "}
                  <span className="text-blue-600 font-semibold">
                    {order.status}
                  </span>
                </p>

                <p>
                  <strong>Date :</strong> {order.date}
                </p>

                <p>
                  <strong>UPI Transaction ID :</strong>{" "}
                  {order.upiTransactionId}
                </p>
              </div>

              {/* Customer Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">
                  Customer Details
                </h3>

                <p>
                  <strong>Name :</strong>{" "}
                  {order.address?.name}
                </p>

                <p>
                  <strong>Phone :</strong>{" "}
                  {order.address?.phone}
                </p>

                <p>
                  <strong>Address :</strong>{" "}
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
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">
                  Purchased Products
                </h3>

                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded-lg p-3 mb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div>
                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p>
                        Price : ₹{item.price}
                      </p>

                      <p>
                        Quantity : {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Screenshot */}
              {order.paymentScreenshot && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    Payment Screenshot
                  </h3>

                  <a
                    href={order.paymentScreenshot}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={order.paymentScreenshot}
                      alt="Payment Screenshot"
                      className="w-48 rounded-lg border"
                    />
                  </a>
                </div>
              )}

              {/* Status Update */}
              <div className="flex items-center gap-4 mt-6">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border p-3 rounded-lg"
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;