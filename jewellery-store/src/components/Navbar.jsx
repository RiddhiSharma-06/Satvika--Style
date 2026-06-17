import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const cartItems =
    JSON.parse(localStorage.getItem('cart')) || []

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  const scrollToContact = () => {
    const section = document.getElementById('contact')

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="flex justify-between items-center px-8 py-5 shadow-md sticky top-0 bg-white z-50">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-pink-600"
      >
        Satvika's Style
      </Link>

      {/* Navigation */}
      <ul className="hidden md:flex gap-8 font-medium items-center">

        <Link
          to="/"
          className="hover:text-pink-500 duration-300"
        >
          Home
        </Link>

        {/* Jewellery Dropdown */}
        <li
          className="relative py-2"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="cursor-pointer hover:text-pink-500">
            Jewellery ▼
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 bg-white shadow-xl rounded-2xl p-5 w-56 border">

              <div className="flex flex-col gap-4">

                <Link
                  to="/necklaces"
                  className="hover:text-pink-500"
                >
                  Necklaces
                </Link>

                <Link
                  to="/earrings"
                  className="hover:text-pink-500"
                >
                  Earrings
                </Link>

                <Link
                  to="/rings"
                  className="hover:text-pink-500"
                >
                  Rings
                </Link>

                <Link
                  to="/anklets"
                  className="hover:text-pink-500"
                >
                  Anklets
                </Link>

              </div>

            </div>
          )}
        </li>

        <Link
          to="/women-suits"
          className="hover:text-pink-500"
        >
          Women Suits
        </Link>

        <li
          onClick={scrollToContact}
          className="cursor-pointer hover:text-pink-500"
        >
          Contact
        </li>

      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-2xl hover:scale-110 duration-300"
        >
          🛒

          <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 rounded-full">
            {cartItems.length}
          </span>
        </Link>

        {/* Login / Profile */}
        {!user ? (

          <Link
            to="/login"
            className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-50"
          >
            Login
          </Link>

        ) : (

          <div
            className="relative"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >

            <button className="bg-pink-500 text-white px-5 py-2 rounded-full">
              {user.name}
            </button>

            {showProfile && (

              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-2xl w-52 border">

                <div className="flex flex-col p-4 gap-3">

                  <Link
                    to="/profile"
                    className="hover:text-pink-500"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="hover:text-pink-500"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="hover:text-pink-500"
                  >
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-red-500"
                  >
                    Logout
                  </button>

                </div>

              </div>

            )}

          </div>

        )}

        {/* Shop Now */}
        <Link
          to="/earrings"
          className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600"
        >
          Shop Now
        </Link>

      </div>

    </nav>
  )
}

export default Navbar