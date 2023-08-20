import React from 'react'
import { useFormContext } from 'react-hook-form'

const FormCheckbox = ({ name }) => {
  const {
    formState: { errors },
    register
  } = useFormContext()
  return (
    <label className='label cursor-pointer'>
      <span className='label-text'>Different shipping address</span>
      <input
        {...register(name)}
        type='checkbox'
        className='checkbox focus:border-none  focus:ring-grey'
        data-lpignore='true'
      />
    </label>
  )
}

export default FormCheckbox
