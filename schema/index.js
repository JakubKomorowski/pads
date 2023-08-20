import * as yup from 'yup'

export const schema = yup.object({
  fullName: yup.string().required('Full name is a required field'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  city: yup.string().required('City is a required field'),
  postal: yup.string().required('Postal code is a required field'),
  street: yup.string().required('Street address is a required field'),
  'different-address': yup.boolean(),
  'shipping-city': yup.string().when('different-address', {
    is: true,
    then: () => yup.string().required('Must enter email address')
  })
})
// .required()
