import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    size: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select product images.");
      return;
    }

    try {
      setLoading(true);

      const uploadedImages = [];

      for (const img of images) {
        const imageData = new FormData();
        imageData.append("image", img);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          imageData
        );

        uploadedImages.push(uploadRes.data.imageUrl);
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: uploadedImages,
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
        stock: "",
        size: "",
      });

      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Stock */}
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Necklaces">
              Necklaces
            </option>

            <option value="Earrings">
              Earrings
            </option>

            <option value="Rings">
              Rings
            </option>

            <option value="Anklets">
              Anklets
            </option>

            <option value="Women Suits">
              Women Suits
            </option>
          </select>

          {/* Size - Only for Women Suits */}
          {formData.category === "Women Suits" && (
            <input
              type="text"
              name="size"
              placeholder="Sizes (Example: S, M, L, XL)"
              value={formData.size}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          )}

          {/* Description */}
          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          {/* Images */}
          <div>
            <label className="font-semibold block mb-2">
              Product Images (Select up to 4)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">
                Preview Images
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map(
                  (image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-lg border"
                    />
                  )
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60"
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;