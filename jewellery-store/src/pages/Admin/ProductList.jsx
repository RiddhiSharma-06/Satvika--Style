import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Product List
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">
              {product.name}
            </h2>

            <p className="text-gray-600">
              ₹{product.price}
            </p>
            
            <p className="text-gray-600">
             Stock: {product.stock}
            </p>
            <div className="flex gap-3 mt-4">
              <button
              onClick={() =>
              navigate(
              `/admin/edit-product/${product._id}`
              )}
              className="bg-blue-500 text-white px-4 py-2 rounded">
                 Edit
              </button>

              <button
                onClick={() =>
                  deleteHandler(product._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;