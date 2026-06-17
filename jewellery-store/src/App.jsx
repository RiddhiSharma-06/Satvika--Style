import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import ProductList from "./pages/Admin/ProductList";
import EditProduct from "./pages/Admin/EditProduct";
import AdminOrders from "./pages/Admin/AdminOrders";

// Customer Pages
import Home from "./pages/Home";
import Necklaces from "./pages/Necklaces";
import Earrings from "./pages/Earrings";
import Rings from "./pages/Rings";
import Anklets from "./pages/Anklets";
import WomenSuits from "./pages/WomenSuits";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

function Layout() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/necklaces"
          element={<Necklaces />}
        />

        <Route
          path="/earrings"
          element={<Earrings />}
        />

        <Route
          path="/rings"
          element={<Rings />}
        />

        <Route
          path="/anklets"
          element={<Anklets />}
        />

        <Route
          path="/women-suits"
          element={<WomenSuits />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Redirect /admin */}
        <Route
          path="/admin"
          element={
            <Navigate to="/admin/dashboard" />
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;