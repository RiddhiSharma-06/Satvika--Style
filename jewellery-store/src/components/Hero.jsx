import { useNavigate } from 'react-router-dom'

function Hero() {

  const navigate = useNavigate()

  const goToOffers = () => {
    const section = document.getElementById('offers')

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
  <section className="grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-6 md:px-16 py-12 md:py-16 bg-pink-50 gap-10">

    {/* LEFT CONTENT */}
    <div className="text-center md:text-left">

      <p className="text-pink-500 font-semibold mb-3 text-sm sm:text-base">
        Elegant Fashion Collection
      </p>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
        Discover Beautiful Jewellery & Women Suits
      </h1>

      <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg">
        Premium quality jewellery and ethnic fashion crafted with love.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

        <button
          onClick={() => navigate('/necklaces')}
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 w-full sm:w-auto"
        >
          Explore Collection
        </button>

        <button
          onClick={goToOffers}
          className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-100 w-full sm:w-auto"
        >
          View Offers
        </button>

      </div>

    </div>

    {/* IMAGE */}
    <div className="flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
        alt="Jewellery"
        className="rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg"
      />
    </div>

  </section>
)
}

export default Hero