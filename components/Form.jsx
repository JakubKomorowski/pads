import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './Schema'

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) })
  const {
    handleSubmit,
    formState: { errors }
  } = methods

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='form-control w-full max-w-xs'
    >
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                errors: errors
              }
            })
          : child
      })}
    </form>
  )
}
