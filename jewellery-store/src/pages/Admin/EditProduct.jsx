import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setFormData({
        name: res.data.name,
        price: res.data.price,
        category: res.data.category,
        description: res.data.description,
        stock: res.data.stock,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error loading product");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, formData);

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error updating product");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h3>Loading Product...</h3>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="mb-4">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description"
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Product
          </button>

        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;