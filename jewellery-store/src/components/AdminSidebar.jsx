import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("adminUser");
  localStorage.removeItem("adminToken");

  navigate("/admin/login");
};

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#212529",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Admin Panel</h3>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link
          to="/admin/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add-product"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Add Product
        </Link>

        <Link
          to="/admin/products"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Orders
        </Link>

        <button
          className="btn btn-danger mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;