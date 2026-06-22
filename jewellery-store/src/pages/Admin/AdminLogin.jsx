import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Check if admin is already logged in
  const admin = JSON.parse(localStorage.getItem("adminUser"));

  if (admin?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data.user.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      // Save admin separately
      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(res.data.user)
      );

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-dark"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;