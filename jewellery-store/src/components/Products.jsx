const products = [
  {
    id: 1,
    name: 'Royal Gold Necklace',
    price: '₹2,499',
    oldPrice: '₹3,499',
    offer: '30% OFF',
    size: 'Free Size',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 2,
    name: 'Diamond Earrings',
    price: '₹1,299',
    oldPrice: '₹1,999',
    offer: '20% OFF',
    size: 'Medium',
    image:
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 3,
    name: 'Party Wear Suit',
    price: '₹3,999',
    oldPrice: '₹5,499',
    offer: '40% OFF',
    size: 'S, M, L, XL',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 4,
    name: 'Silver Anklet',
    price: '₹899',
    oldPrice: '₹1,299',
    offer: '15% OFF',
    size: 'Adjustable',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
  },
]

function Products() {
  return (
  <section
   id="offers"
   className="px-8 md:px-16 py-20 bg-pink-50"
   >

      {/* Heading */}
      <div className="text-center mb-14">

        <p className="text-pink-500 font-semibold mb-2">
          TRENDING COLLECTION
        </p>

        <h2 className="text-5xl font-bold">
          Featured Products
        </h2>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 duration-300 group"
          >

            {/* Product Image */}
            <div className="relative overflow-hidden">

              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-cover group-hover:scale-110 duration-500"
              />

              {/* Offer Badge */}
              <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                {product.offer}
              </div>

            </div>

            {/* Product Details */}
            <div className="p-5">

              <h3 className="text-2xl font-semibold mb-2">
                {product.name}
              </h3>

              {/* Size */}
              <p className="text-gray-500 mb-3">
                Size Available: {product.size}
              </p>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-5">

                <p className="text-pink-500 text-2xl font-bold">
                  {product.price}
                </p>

                <p className="line-through text-gray-400">
                  {product.oldPrice}
                </p>

              </div>

              {/* Buttons */}
              <div className="space-y-3">

                <button className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 duration-300">
                  Add To Cart
                </button>

                <button className="w-full border border-pink-500 text-pink-500 py-3 rounded-full hover:bg-pink-100 duration-300">
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Products