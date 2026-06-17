const suits = [
  {
    id: 1,
    name: 'Party Wear Suit',
    price: '₹3,999',
    oldPrice: '₹5,999',
    offer: '35% OFF',
    size: 'S, M, L, XL',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 2,
    name: 'Printed Cotton Suit',
    price: '₹2,499',
    oldPrice: '₹3,499',
    offer: '20% OFF',
    size: 'M, L, XL',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
  },
]

function WomenSuits() {
  return (
    <div className="px-8 md:px-16 py-20 bg-pink-50 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-16">
        Women Suits Collection
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {suits.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg"
          >

            <img
              src={item.image}
              alt={item.name}
              className="h-96 w-full object-cover"
            />

            <div className="p-6">

              <div className="bg-pink-500 text-white inline-block px-4 py-1 rounded-full mb-4">
                {item.offer}
              </div>

              <h2 className="text-3xl font-bold mb-3">
                {item.name}
              </h2>

              <p className="text-gray-500 mb-2">
                Sizes: {item.size}
              </p>

              <div className="flex gap-4 items-center mb-5">

                <p className="text-pink-500 text-3xl font-bold">
                  {item.price}
                </p>

                <p className="line-through text-gray-400">
                  {item.oldPrice}
                </p>

              </div>

              <button className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600">
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default WomenSuits