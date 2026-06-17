import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
});

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      // Upload image
      const imageData = new FormData();
      imageData.append("image", image);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        imageData
      );

      const imageUrl = uploadRes.data.imageUrl;

      // Create product
      const productData = {
        ...formData,
        image: imageUrl,
      };

      await axios.post(
        "http://localhost:5000/api/products",
        productData
      );

      alert("Product Added Successfully");

      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
      });

      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      ><input
       type="number"
       name="stock"
       placeholder="Stock"
       value={formData.stock}
       onChange={handleChange}
       className="w-full border p-3 rounded"
       required
       />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="4"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;