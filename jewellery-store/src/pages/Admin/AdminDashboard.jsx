import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.name}
      </h1>

      <h2 className="text-xl mb-8">
        Admin Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/admin/add-product"
          className="border p-6 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold">
            Add Product
          </h3>

          <p>
            Create and upload new products.
          </p>
        </Link>

        <Link
          to="/admin/products"
          className="border p-6 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold">
            Manage Products
          </h3>

          <p>
            View, edit and delete products.
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="border p-6 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold">
            Manage Orders
          </h3>

          <p>
            Verify payments and confirm orders.
          </p>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href =
              "/admin/login";
          }}
          className="bg-red-500 text-white p-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;