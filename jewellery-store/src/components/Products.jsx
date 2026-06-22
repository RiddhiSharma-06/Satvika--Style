import { useEffect, useState } from "react";
import API from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section
      id="offers"
      className="px-8 md:px-16 py-20 bg-pink-50"
    >
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-pink-500 font-semibold mb-2">
          TRENDING COLLECTION
        </p>

        <h2 className="text-5xl font-bold">
          Featured Products
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 duration-300 group"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="h-80 w-full object-cover group-hover:scale-110 duration-500"
              />
            </div>

            {/* Product Details */}
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2">
                {product.name}
              </h3>

              <p className="text-gray-500 mb-3">
                Category: {product.category}
              </p>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-5">
                <p className="text-pink-500 text-2xl font-bold">
                  ₹{product.price}
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 duration-300">
                  Add To Cart
                </button>

                <button className="w-full border border-pink-500 text-pink-500 py-3 rounded-full hover:bg-pink-100 duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Products;