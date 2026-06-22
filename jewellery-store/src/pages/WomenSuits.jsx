import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WomenSuits() {
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      const suitsOnly = res.data.filter(
        (item) => item.category === "Women Suits"
      );

      setDbProducts(suitsOnly);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- Helpers ----------

  const checkLogin = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const getPriceNumber = (price) => {
    return Number(String(price).replace(/[^0-9]/g, ""));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      id: product.id,
      name: product.name,
      price: getPriceNumber(product.price),
      image: product.image,
      quantity: 1,
      type: "women-suit",
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const buyNow = (product) => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: product.id,
          name: product.name,
          price: getPriceNumber(product.price),
          image: product.image,
          quantity: 1,
          type: "women-suit",
        },
      ])
    );

    navigate("/checkout");
  };

  const addToWishlist = (product) => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist");
  };

  return (
    <div className="px-8 md:px-16 py-20 bg-pink-50 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-16">
        Women Suits Collection
      </h1>

      {/* GRID */}
      <div className="grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {dbProducts.map((item) => {
          const product = {
            id: item._id,
            name: item.name,
            price: `₹${item.price}`,
            oldPrice: item.oldPrice ? `₹${item.oldPrice}` : "",
            offer: item.offer || "NEW",
            size: item.size || "Available",
            stock: item.stock > 0 ? "In Stock" : "Out Of Stock",
            image: item.images?.[0] || "",
            images: item.images || [],
          };

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="h-96 w-full object-cover cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedImage(product.images?.[0] || product.image);
                }}
              />

              <div className="p-6">
                <div className="bg-pink-500 text-white inline-block px-4 py-1 rounded-full mb-4">
                  {product.offer}
                </div>

                <h2 className="text-3xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-green-600 mb-2">
                  {product.stock}
                </p>

                <p className="text-gray-500 mb-2">
                  Size: {product.size}
                </p>

                <div className="flex gap-4 items-center mb-5">
                  <p className="text-pink-500 text-3xl font-bold">
                    {product.price}
                  </p>

                  {product.oldPrice && (
                    <p className="line-through text-gray-400">
                      {product.oldPrice}
                    </p>
                  )}
                </div>

                {/* BUTTONS */}
                <button
                  onClick={() => checkLogin() && buyNow(product)}
                  className="w-full bg-pink-500 text-white py-3 rounded-full"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => checkLogin() && addToCart(product)}
                  className="w-full bg-pink-500 text-white py-3 rounded-full mt-4"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    checkLogin() && addToWishlist(product)
                  }
                  className="w-full bg-pink-100 text-pink-600 py-3 rounded-full mt-4"
                >
                  Wishlist
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
         <div className="bg-white rounded-3xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">

           <button
  onClick={() => {
    setSelectedProduct(null);
    setSelectedImage(null);
  }}
  className="absolute top-3 right-3 text-2xl w-10 h-10 flex items-center justify-center bg-white rounded-full shadow"
>
  ✕
</button>

            <div className="grid md:grid-cols-2 gap-8">

              {/* LEFT IMAGE */}
              <div>
                <img
  src={selectedImage || selectedProduct?.image}
                  className="w-full h-[500px] object-cover rounded-2xl"
                  alt=""
                />

                <div className="flex gap-3 mt-4 flex-wrap">
                  {(selectedProduct.images || [
                    selectedProduct.image,
                  ]).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl cursor-pointer border-2 ${
                        selectedImage === img
                          ? "border-pink-500"
                          : "border-gray-300"
                      }`}
                      alt=""
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT INFO */}
              <div>
                <div className="bg-pink-500 text-white inline-block px-4 py-1 rounded-full mb-4">
                  {selectedProduct?.offer}
                </div>

                <h2 className="text-4xl font-bold mb-4">
                  {selectedProduct?.name}
                </h2>

                <p className="text-green-600 mb-3">
                  {selectedProduct?.stock}
                </p>

                <p className="text-gray-500 mb-4">
                  Size : {selectedProduct?.size}
                </p>

                <div className="flex gap-4 items-center mb-6">
                  <p className="text-pink-500 text-4xl font-bold">
                    {selectedProduct?.price}
                  </p>

                  {selectedProduct.oldPrice && (
                    <p className="line-through text-gray-400">
                      {selectedProduct?.oldPrice}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() =>
                    checkLogin() && buyNow(selectedProduct)
                  }
                  className="w-full bg-pink-500 text-white py-3 rounded-full"
                >
                  Buy Now
                </button>

                <button
                  onClick={() =>
                    checkLogin() && addToCart(selectedProduct)
                  }
                  className="w-full bg-pink-500 text-white py-3 rounded-full mt-4"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    checkLogin() &&
                    addToWishlist(selectedProduct)
                  }
                  className="w-full bg-pink-100 text-pink-600 py-3 rounded-full mt-4"
                >
                  Wishlist
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WomenSuits;