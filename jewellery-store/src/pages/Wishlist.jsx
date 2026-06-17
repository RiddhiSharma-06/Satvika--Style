import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistItems(wishlist);
  }, []);

  const removeWishlistItem = (index) => {
    const updatedWishlist = [...wishlistItems];

    updatedWishlist.splice(index, 1);

    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const moveToCart = (product, index) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    removeWishlistItem(index);

    alert("Moved To Cart");
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">

      <h1 className="text-5xl font-bold mb-10">
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Wishlist is Empty
          </h2>

          <p className="text-gray-600">
            Save your favourite products here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {wishlistItems.map((item, index) => (

            <div
              key={index}
              className="bg-white p-5 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6 items-center"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-2xl"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-pink-500 text-xl font-semibold mt-2">
                  {item.price}
                </p>

                <p className="text-green-600 mt-2">
                  {item.stock}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    moveToCart(item, index)
                  }
                  className="bg-pink-500 text-white px-5 py-2 rounded-full"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    removeWishlistItem(index)
                  }
                  className="bg-red-500 text-white px-5 py-2 rounded-full"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <div className="text-center mt-10">

            <button
              onClick={() => navigate("/cart")}
              className="bg-pink-500 text-white px-8 py-3 rounded-full"
            >
              Go To Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Wishlist;