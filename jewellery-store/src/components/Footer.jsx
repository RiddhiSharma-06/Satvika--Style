import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-black text-white px-8 md:px-16 py-10">
      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold mb-4 text-pink-400">
            Satvika's Style
          </h2>

          <p className="text-gray-400">
            Elegant jewellery and ethnic wear crafted with style.
          </p>
        </div>

        <div>
  <h3 className="text-xl font-semibold mb-4">
    Quick Links
  </h3>

  <ul className="space-y-2 text-gray-400">
    <li>
      <Link
        to="/"
        className="hover:text-pink-400 transition"
      >
        Home
      </Link>
    </li>

    <li>
      <Link
        to="/jewellery"
        className="hover:text-pink-400 transition"
      >
        Jewellery
      </Link>
    </li>

       <li>
       <Link
        to="/women-suits"
        className="hover:text-pink-400 transition">
        Women Suits
       </Link>
       </li>
       </ul>
       </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            WhatsApp: +91 9368166139
          </p>

          <p className="text-gray-400">
            Instagram: @Satvika The Label
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer