const categories = [
  {
    title: 'Necklaces',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Earrings',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Women Suits',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
  },
]

function Categories() {
  return (
    <section className="px-8 md:px-16 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Shop By Category
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-80 w-full object-cover group-hover:scale-110 duration-300"
            />

            <div className="p-5 bg-white">
              <h3 className="text-2xl font-semibold text-center">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories