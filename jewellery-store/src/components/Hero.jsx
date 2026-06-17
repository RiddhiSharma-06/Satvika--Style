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
    <section className="grid md:grid-cols-2 items-center px-8 md:px-16 py-16 bg-pink-50">

      <div>

        <p className="text-pink-500 font-semibold mb-3">
          Elegant Fashion Collection
        </p>

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Discover Beautiful Jewellery & Women Suits
        </h1>

        <p className="text-gray-600 mb-6">
          Premium quality jewellery and ethnic fashion crafted with love.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          {/* Explore Collection */}
          <button
            onClick={() => navigate('/necklaces')}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
          >
            Explore Collection
          </button>

          {/* View Offers */}
          <button
            onClick={goToOffers}
            className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-100"
          >
            View Offers
          </button>

        </div>

      </div>

      {/* Hero Image */}
      <div className="mt-10 md:mt-0 flex justify-center">

        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
          alt="Jewellery"
          className="rounded-3xl shadow-2xl w-full max-w-md"
        />

      </div>

    </section>
  )
}

export default Hero