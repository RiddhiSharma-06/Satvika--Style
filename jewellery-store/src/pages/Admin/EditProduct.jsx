import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Edit Product
      </h1>

      <p>Product ID: {id}</p>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows="4"
        />

        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;