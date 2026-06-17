import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>

      <section id="home">
        <Hero />
      </section>

      <Categories />

      <Products />

      <section
        id="contact"
        className="bg-pink-50 py-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-5">
          Contact Us
        </h2>

        <p className="text-lg text-gray-600">
          WhatsApp: +91 9368166139
        </p>

        <p className="text-lg text-gray-600 mt-2">
          Instagram: @Satvika The Label
        </p>
      </section>

      <Footer />

    </div>
  )
}

export default Home