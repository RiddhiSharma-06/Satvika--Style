import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("adminUser"));

  return (
    <AdminLayout>
      <h1 className="mb-3">
        Welcome, {user?.name}
      </h1>

      <h3 className="mb-4">
        Admin Dashboard
      </h3>

      <div className="row">

        {/* Add Product */}
        <div className="col-md-6 mb-4">
          <Link
            to="/admin/add-product"
            className="text-decoration-none"
          >
            <div className="card shadow p-4">
              <h4>Add Product</h4>

              <p>
                Create and upload new products.
              </p>
            </div>
          </Link>
        </div>

        {/* Products */}
        <div className="col-md-6 mb-4">
          <Link
            to="/admin/products"
            className="text-decoration-none"
          >
            <div className="card shadow p-4">
              <h4>Manage Products</h4>

              <p>
                View, edit and delete products.
              </p>
            </div>
          </Link>
        </div>

        {/* Orders */}
        <div className="col-md-6 mb-4">
          <Link
            to="/admin/orders"
            className="text-decoration-none"
          >
            <div className="card shadow p-4">
              <h4>Manage Orders</h4>

              <p>
                Verify payments and confirm orders.
              </p>
            </div>
          </Link>
        </div>

        {/* Logout */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4">
            <h4>Logout</h4>

            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                 localStorage.removeItem("adminToken");
                 localStorage.removeItem("adminUser");
                window.location.href =
                  "/admin/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;