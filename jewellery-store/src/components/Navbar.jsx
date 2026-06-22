import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const menuRef = useRef();
  const profileRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
    window.location.reload();
  };

  const scrollToContact = () => {
    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 px-4 md:px-8 py-4">

      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-4xl font-bold text-pink-600"
        >
          Satvika's Style
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          <Link to="/" className="hover:text-pink-500">
            Home
          </Link>

          {/* Jewellery Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-pink-500"
            >
              Jewellery ▼
            </button>

            {showDropdown && (
              <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl w-44 p-3 flex flex-col gap-2 border">
                <Link to="/necklaces">Necklaces</Link>
                <Link to="/earrings">Earrings</Link>
                <Link to="/rings">Rings</Link>
                <Link to="/anklets">Anklets</Link>
              </div>
            )}
          </div>

          <Link
            to="/women-suits"
            className="hover:text-pink-500"
          >
            Women Suits
          </Link>

          <button
            onClick={scrollToContact}
            className="hover:text-pink-500"
          >
            Contact
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            to="/cart"
            className="relative text-2xl"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full">
              {cartItems.length}
            </span>
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="bg-pink-500 text-white px-4 py-2 rounded-full"
              >
                {user.name}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl border w-48 flex flex-col p-3 gap-2">

                  <Link to="/profile">
                    My Profile
                  </Link>

                  <Link to="/orders">
                    My Orders
                  </Link>

                  <Link to="/wishlist">
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

          <Link
            to="/earrings"
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
          >
            Shop Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden"></div>
      )}

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="p-5 border-b text-xl font-bold text-pink-600">
          Menu
        </div>

        <div className="flex flex-col gap-4 p-5">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/necklaces" onClick={() => setMenuOpen(false)}>
            Necklaces
          </Link>

          <Link to="/earrings" onClick={() => setMenuOpen(false)}>
            Earrings
          </Link>

          <Link to="/rings" onClick={() => setMenuOpen(false)}>
            Rings
          </Link>

          <Link to="/anklets" onClick={() => setMenuOpen(false)}>
            Anklets
          </Link>

          <Link
            to="/women-suits"
            onClick={() => setMenuOpen(false)}
          >
            Women Suits
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartItems.length})
          </Link>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/profile">My Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/wishlist">Wishlist</Link>

              <button
                onClick={handleLogout}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>

    </nav>
  );
}

export default Navbar;