import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// images
import earringImage from "../assets/images/earring1.jpeg";
import earring1a from "../assets/images/earring1a.jpeg";
import earring1b from "../assets/images/earring1b.jpeg";
import earring1c from "../assets/images/earring1c.jpeg";

import earring2 from "../assets/images/earringa.jpeg";
import earring2a from "../assets/images/earring2a.png";
import earring2b from "../assets/images/earring2b.png";
import earring2c from "../assets/images/earring2c.png";

import earring3 from "../assets/images/earring3.png";
import earring3a from "../assets/images/earring3a.png";
import earring3b from "../assets/images/earring3b.png";
import earring3c from "../assets/images/earring3c.png";

import earring4 from "../assets/images/earring4.png";
import earring4a from "../assets/images/earring4a.png";
import earring4b from "../assets/images/earring4b.png";

import earring5 from "../assets/images/earring5.png";
import earring5a from "../assets/images/earring5a.png";
import earring5b from "../assets/images/earring5b.png";
import earring5c from "../assets/images/earring5c.png";

import earring6 from "../assets/images/earring6.png";
import earring6a from "../assets/images/earring6a.png";
import earring6b from "../assets/images/earring6b.png";
import earring6c from "../assets/images/earring6c.png";

import earring7 from "../assets/images/earring7.png";
import earring7a from "../assets/images/earring7a.png";
import earring7b from "../assets/images/earring7b.png";
import earring7c from "../assets/images/earring7c.png";

function Earrings() {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      const earringsOnly = res.data.filter(
        (item) => item.category === "Earrings"
      );

      setDbProducts(earringsOnly);
    } catch (error) {
      console.log(error);
    }
  };
  // login check
  const checkLogin = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }
    return true;
  };

  // clean price helper
  const getPriceNumber = (price) => {
    return Number(String(price).replace(/[^0-9]/g, ""));
  };

  // ADD TO CART
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      id: product.id,
      name: product.name,
      price: getPriceNumber(product.price),
      image: product.image,
      quantity: 1,
      type: "earring",
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  // BUY NOW
  const buyNow = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      price: getPriceNumber(product.price),
      image: product.image,
      quantity: 1,
      type: "earring",
    };

    localStorage.setItem("cart", JSON.stringify([item]));
    navigate("/checkout");
  };

  // wishlist
  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist");
  };

  // PRODUCTS
  const products = [
    {
      id: 1,
      name: "Floral Stone Earrings",
      price: "₹187",
      oldPrice: "₹220",
      offer: "15% OFF",
      stock: "In Stock",
      image: earringImage,
      images: [earringImage, earring1a, earring1b, earring1c],
    },
    {
      id: 2,
      name: "Shimmery Studs",
      price: "₹200",
      oldPrice: "₹250",
      offer: "20% OFF",
      stock: "In Stock",
      image: earring2,
      images: [earring2, earring2a, earring2b, earring2c],
    },
    {
      id: 3,
      name: "Floral AD",
      price: "₹160",
      oldPrice: "₹200",
      offer: "20% OFF",
      stock: "In Stock",
      image: earring3,
      images: [earring3, earring3a, earring3b, earring3c],
    },
    {
      id: 4,
      name: "Shimmery Duck",
      price: "₹160",
      oldPrice: "₹200",
      offer: "20% OFF",
      stock: "In Stock",
      image: earring4,
      images: [earring4, earring4a, earring4b],
    },
    {
      id: 5,
      name: "Rose Fans",
      price: "₹200",
      oldPrice: "₹220",
      offer: "10% OFF",
      stock: "In Stock",
      image: earring5,
      images: [earring5, earring5a, earring5b, earring5c],
    },
    {
      id: 6,
      name: "Mini Love",
      price: "₹200",
      oldPrice: "₹220",
      offer: "10% OFF",
      stock: "In Stock",
      image: earring6,
      images: [earring6, earring6a, earring6b, earring6c],
    },
    {
      id: 7,
      name: "Star Studs",
      price: "₹150",
      oldPrice: "₹190",
      offer: "20% OFF",
      stock: "In Stock",
      image: earring7,
      images: [earring7, earring7a, earring7b, earring7c],
    },
  ];
  const allProducts = [
  ...products,

  ...dbProducts.map((item) => ({
    id: item._id,
    name: item.name,
    price: `₹${item.price}`,
    oldPrice: "",
    offer: "",
    stock:
      item.stock > 0
        ? "In Stock"
        : "Out Of Stock",
    image: item.images?.[0] || "",
    images: item.images || [],
  })),
];

  return (
    <div className="px-8 md:px-16 py-20 bg-pink-50 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-16">
        Earrings Collection
      </h1>

      {/* PRODUCTS */}
      <div className="grid md:grid-cols-3 gap-10">
        {allProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <img
              src={product.image || product.images?.[0]}
              className="h-96 w-full object-cover cursor-pointer"
              onClick={() => {
              setSelectedProduct(product);
              setSelectedImage(
              product.image || product.images?.[0]
              );
              }}
            />

            <div className="p-6">

              <div className="bg-pink-500 text-white px-3 py-1 rounded-full inline-block mb-3">
                {product.offer}
              </div>

              <h2 className="text-2xl font-bold">{product.name}</h2>

              <p className="text-green-600">{product.stock}</p>

              <div className="flex gap-3 mt-3">
                <p className="text-pink-500 font-bold text-xl">
                  {product.price}
                </p>
                <p className="line-through text-gray-400">
                  {product.oldPrice}
                </p>
              </div>

              <button
                onClick={() => checkLogin() && addToCart(product)}
                className="w-full bg-pink-500 text-white py-2 mt-4 rounded-full"
              >
                Add To Cart
              </button>

              <button
                onClick={() => checkLogin() && buyNow(product)}
                className="w-full border border-pink-500 text-pink-500 py-2 mt-2 rounded-full"
              >
                Buy Now
              </button>

              <button
                onClick={() => checkLogin() && addToWishlist(product)}
                className="w-full bg-pink-100 text-pink-600 py-3 mt-2 rounded-full"
              >
                Wishlist
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-3xl w-[900px] relative">

            <button
              onClick={() => {
                setSelectedProduct(null);
                setSelectedImage(null);
              }}
              className="absolute top-3 right-3 bg-pink-500 text-white w-8 h-8 rounded-full"
            >
              X
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              <img
                src={selectedImage}
                className="w-full h-[400px] object-cover rounded-2xl"
              />

              <div>

                <h2 className="text-3xl font-bold">
                  {selectedProduct.name}
                </h2>

                <p className="text-pink-500 text-2xl mt-3">
                  {selectedProduct.price}
                </p>

                <button
                  onClick={() => checkLogin() && addToCart(selectedProduct)}
                  className="w-full bg-pink-500 text-white py-3 mt-5 rounded-full"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => checkLogin() && buyNow(selectedProduct)}
                  className="w-full border border-pink-500 text-pink-500 py-3 mt-3 rounded-full"
                >
                  Buy Now
                </button>

                <div className="flex gap-3 mt-5 flex-wrap">
                  {selectedProduct.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Earrings;