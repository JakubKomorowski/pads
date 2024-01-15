import { useTranslation } from 'next-i18next'
import Card from '../../components/Card'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

const Products = () => {
  const uniqueProducts = [
    {
      name: 'Split pads',
      slug: 'split-pads',
      image: '/assets/images/split-green.png'
    },
    {
      name: 'Classic pads',
      slug: 'classic-pads',
      image: '/assets/images/classic-green.png'
    }
  ]

  return (
    <main>
      <div className='container mx-auto '>
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
