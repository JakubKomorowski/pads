import Form from '../../components/Form'
import FormSelect from '../../components/FormSelect'
import FormInput from '../../components/FormInput'
import { checkout } from '../../lib/checkout'
import { useCart } from '../../context/CartContext'

const countryOptions = [
  {
    country: 'United States',
    code: 'US'
  },
  {
    country: 'Poland',
    code: 'PL'
  },
  {
    country: 'Germany',
    code: 'DE'
  },
  {
    country: 'Spain',
    code: 'ES'
  }
]

const ShippingAddress = () => {
  const { items } = useCart()

  const onSubmit = data => {
    console.log(data)
    checkout(items, data)
  }

  return (
    <section className='px-8 md:px-16'>
      <div className='container mx-auto'>
        <Form onSubmit={onSubmit} className='form-control w-full max-w-xs'>
          <FormInput name='fullName' placeholder='Full name' />
          <FormInput name='email' placeholder='Email' />
          <FormSelect name='country' options={countryOptions} />
          <FormInput name='city' placeholder='City' />
          <FormInput name='postal' placeholder='Postal code' />

          <button type='submit'>click</button>
        </Form>
      </div>
    </section>
  )
}

export default ShippingAddress
