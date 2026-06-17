const rings = [
  {
    id: 1,
    name: 'Couple Ring',
    price: '₹999',
    oldPrice: '₹1,499',
    offer: '15% OFF',
    size: '6, 7, 8',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
  },
]

function Rings() {
  return (
    <div className="px-8 md:px-16 py-20 bg-pink-50 min-h-screen">

      <h1 className="text-5xl font-bold text-center mb-16">
        Rings Collection
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {rings.map((item) => (

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

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Rings