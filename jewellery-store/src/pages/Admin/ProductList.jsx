import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Error deleting product");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-pink-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Manage Products
        </h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {product.description}
                  </p>

                  <p className="mt-3">
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹
                    {product.price}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {product.stock}
                  </p>

                  <p
                    className={`font-bold mt-2 ${
                      product.stock === 0
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : "In Stock"}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-product/${product._id}`
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteHandler(product._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductList;