import Card from '../../components/Card'

const Products = () => {
  const uniqueProducts = [
    {
      name: 'Split pad',
      slug: 'split-pad',
      image: '/assets/images/split-green.png'
    },
    {
      name: 'Classic pad',
      slug: 'classic-pad',
      image: '/assets/images/classic-green.png'
    }
  ]

  return (
    <main className='px-8 md:px-16'>
      <div className='container mx-auto '>
        <h2 className='text-2xl font-bold text-gray-900 mt-4'>
          Online Courses
        </h2>
        <div className='mt-8  gap-y-12 gap-x-8  grid grid-cols-fluid '>
          {uniqueProducts.map(product => (
            <Card key={product.name} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Products
