import { useState } from "react";
import { useEffect } from "react";
import API from "../../api/axios";

function Admin() {
  const [orders, setOrders] =
  useState([]);
  useEffect(() => {
  fetchOrders();
}, []);

const fetchOrders = async () => {
  try {
    const res = await API.get("/orders");

    setOrders(res.data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="p-5">
      {orders.map((order, index) => (
        <div
          key={index}
          className="border p-5 rounded-xl mb-5"
        >
          <h2>
            Order #{index + 1}
          </h2>

          <p>
            Customer:
            {order.address?.name}
          </p>

          <p>
            Phone:
            {order.address?.phone}
          </p>

          <p>
            Total:
            ₹{order.total}
          </p>

          <p>
            Status:
            {order.status}
          </p>
          <p>
         <strong>Address:</strong>
         {order.address?.fullAddress}
        </p>
          {/* PRODUCTS SECTION */}
          <div className="mt-4">
            {order.items?.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />

                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Admin;