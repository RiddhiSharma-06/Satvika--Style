const necklaces = [
  {
    id: 1,
    name: 'Royal Gold Necklace',
    price: '₹2,999',
    oldPrice: '₹4,999',
    offer: '40% OFF',
    size: 'Free Size',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop',
  },

  {
    id: 2,
    name: 'Diamond Necklace',
    price: '₹3,499',
    oldPrice: '₹5,499',
    offer: '35% OFF',
    size: 'Adjustable',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
  },
]

function Necklaces() {
  return (
    <div className="px-8 md:px-16 py-20 bg-pink-50 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-16">
        Necklace Collection
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {necklaces.map((item) => (

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
                Size: {item.size}
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

export default Necklaces