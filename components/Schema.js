import * as yup from 'yup'

export const schema = yup
  .object({
    fullName: yup.string().required('Full name is a required name'),
    email: yup.string().email('Must be a valid email').required()
  })
  .required()
