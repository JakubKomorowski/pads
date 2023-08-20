import FormInput from '../../components/form/FormInput'
import { checkout } from '../../lib/checkout'
import { useCart } from '../../context/CartContext'
import FormCheckbox from '../../components/form/FormCheckbox'
import FormSelect from '../../components/form/FormSelect'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../schema'

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
  const methods = useForm({
    resolver: yupResolver(schema)
  })

  const { watch } = methods

  const differentAddress = watch('different-address')

  console.log(differentAddress)

  const onSubmit = data => {
    console.log(data)
    checkout(items, data, items[0].currency)
  }

  return (
    <section className='px-8 md:px-16 w-full  flex justify-center  flex-col mt-10'>
      <div className='container mx-auto flex justify-center items-center flex-col mb-10'>
        <div>
          <h1 className='justify-self-start'>Billing details</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='form-control w-full gap-1'
            >
              <FormInput name='fullName' placeholder='Full name' />
              <FormInput name='email' placeholder='Email' />
              <div className='flex justify-center  gap-4 items-start'>
                <FormSelect name='country' options={countryOptions} />
                <FormInput name='city' placeholder='City' />
              </div>
              <FormInput name='street' placeholder='Street address' />
              <div className='flex justify-center items-start gap-4'>
                <FormInput name='postal' placeholder='Postal code' />
                <FormInput name='state' placeholder='State' />
              </div>
              <FormCheckbox name='different-address' />
              {differentAddress && (
                <>
                  <h2>Shipping address</h2>
                  <div className='flex justify-center  gap-4 items-start'>
                    <FormSelect
                      name='shipping-country'
                      options={countryOptions}
                    />
                    <FormInput name='shipping-city' placeholder='City' />
                  </div>
                  <FormInput
                    name='shipping-street'
                    placeholder='Street address'
                  />
                  <div className='flex justify-center items-start gap-4'>
                    <FormInput
                      name='shipping-postal'
                      placeholder='Postal code'
                    />
                    <FormInput name='shipping-state' placeholder='State' />
                  </div>
                </>
              )}
              <div className='w-full flex justify-end mt-4'>
                <button
                  className='w-fit ease-in duration-100 flex items-center justify-center rounded-md border border-transparent  bg-main px-6 py-3 text-base font-medium text-white shadow-sm hover:border hover:border-secondary hover:bg-white hover:text-secondary'
                  type='submit'
                >
                  Next
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  )
}

export default ShippingAddress
