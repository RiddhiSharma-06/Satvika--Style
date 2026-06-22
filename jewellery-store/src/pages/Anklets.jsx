import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Anklets() {
  const [dbProducts, setDbProducts] = useState([]);
  const navigate = useNavigate();

const [selectedProduct, setSelectedProduct] = useState(null);

const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  


  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      const ankletsOnly = res.data.filter(
        (item) => item.category === "Anklets"
      );

      setDbProducts(ankletsOnly);
    } catch (error) {
      console.log(error);
    }
  };
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
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: getPriceNumber(product.price),
    image: product.image,
    quantity: 1,
    type: "anklet",
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

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
        type: "anklet",
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

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  alert("Added to wishlist");
};
  return (
    <div className="px-8 md:px-16 py-20 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-16">
        Anklets Collection
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

       {dbProducts
  .map((item) => ({
    id: item._id,
    name: item.name,
    price: `₹${item.price}`,
    oldPrice: item.oldPrice
      ? `₹${item.oldPrice}`
      : "",
    offer: item.offer || "NEW",
    size: item.size || "Available",
    stock:
      item.stock > 0
        ? "In Stock"
        : "Out Of Stock",
    image: item.images?.[0] || "",
    images: item.images || [],
  }))
  .map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg"
          >

            <img
  src={item.image}
  alt={item.name}
  className="h-96 w-full object-cover cursor-pointer"
  onClick={() => {
    setSelectedProduct(item);
    setSelectedImage(
      item.images?.[0] || item.image
    );
  }}
/>

            <div className="p-6">

              <div className="bg-pink-500 text-white inline-block px-4 py-1 rounded-full mb-4">
                {item.offer}
              </div>

              <h2 className="text-3xl font-bold mb-3">
                {item.name}
              </h2>
              <p className="text-green-600 mb-2">
  {item.stock}
</p>
              <p className="text-gray-500 mb-2">
                Size: {item.size}
              </p>

              <div className="flex gap-4 items-center mb-5">

                <p className="text-pink-500 text-3xl font-bold">
                  {item.price}
                </p>

               {item.oldPrice && (
               <p className="line-through text-gray-400">
               {item.oldPrice}
               </p>
               )}

              </div>
              <button
  onClick={() => checkLogin() && buyNow(item)}
  className="w-full bg-pink-500 text-white py-3 rounded-full"
>
  Buy Now
</button>

<button
  onClick={() => checkLogin() && addToCart(item)}
  className="w-full bg-pink-500 text-white py-3 rounded-full mt-4"
>
  Add To Cart
</button>

<button
  onClick={() => checkLogin() && addToWishlist(item)}
  className="w-full bg-pink-100 text-pink-600 py-3 rounded-full mt-4"
>
  Wishlist
</button>

            </div>

          </div>

        ))}

      </div>
          {/* Product Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
  onClick={() => {
    setSelectedProduct(null);
    setSelectedImage(null);
  }}
  className="absolute top-3 right-3 text-2xl w-10 h-10 flex items-center justify-center bg-white rounded-full shadow"
>
  ✕
</button>

           <div className="space-y-6">

              {/* Left Side */}
              <div>

                <img
                  src={selectedImage || selectedProduct?.image}
alt={selectedProduct?.name}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />

                <div className="flex gap-2 mt-4 overflow-x-auto">

                  {(selectedProduct.images || [
                    selectedProduct.image,
                  ]).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      onClick={() =>
                        setSelectedImage(img)
                      }
                      className={`w-20 h-20 rounded-xl cursor-pointer border-2 ${
                        selectedImage === img
                          ? "border-pink-500"
                          : "border-gray-300"
                      }`}
                    />
                  ))}

                </div>

              </div>

              {/* Right Side */}
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
                      {selectedProduct.oldPrice}
                    </p>
                  )}

                </div>

                <button
                  onClick={() =>
                    checkLogin() &&
                    buyNow(selectedProduct)
                  }
                  className="w-full bg-pink-500 text-white py-3 rounded-full"
                >
                  Buy Now
                </button>

                <button
                  onClick={() =>
                    checkLogin() &&
                    addToCart(selectedProduct)
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
  )
}

export default Anklets