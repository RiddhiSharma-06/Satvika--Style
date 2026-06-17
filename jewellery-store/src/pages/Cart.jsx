import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    phone: localStorage.getItem("phone") || "",
    houseNo: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  // REMOVE ITEM
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // TOTAL
  const total = cart.reduce((sum, item) => {
    return (
      sum +
      Number(String(item.price).replace("₹", "")) *
        (item.quantity || 1)
    );
  }, 0);

  // SAVE ADDRESS + MOVE TO CHECKOUT
  const saveAddress = () => {
    const { name, phone, houseNo, area, city, state, pincode } = formData;

    if (!name || !phone || !houseNo || !area || !city || !state || !pincode) {
      alert("Please fill all details");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter valid phone number");
      return;
    }

    if (pincode.length !== 6) {
      alert("Enter valid pincode");
      return;
    }

    localStorage.setItem("deliveryAddress", JSON.stringify(formData));

    // IMPORTANT: save cart snapshot for checkout
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    setShowAddressModal(false);

    setTimeout(() => {
      navigate("/checkout", { replace: true });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-5xl font-bold mb-10">My Cart</h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <p className="text-xl">Cart is Empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="grid gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-lg flex items-center gap-6"
              >
                <img
                  src={item.image}
                  className="w-32 h-32 object-cover rounded-xl"
                  alt=""
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="text-pink-500 text-xl">
                    {item.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-5 py-2 rounded-full"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* CHECKOUT BUTTON */}
          <div className="mt-10">
            <button
              onClick={() => setShowAddressModal(true)}
              className="bg-pink-500 text-white px-6 py-3 rounded-full"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowAddressModal(false)}
          />

          {/* MODAL */}
          <div className="relative bg-white p-8 rounded-3xl w-[600px] z-50">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Delivery Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="House No."
                value={formData.houseNo}
                onChange={(e) =>
                  setFormData({ ...formData, houseNo: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Area"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                className="border p-3 rounded-xl col-span-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddressModal(false)}
                className="border px-6 py-3 rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={saveAddress}
                className="bg-pink-500 text-white px-6 py-3 rounded-full"
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;