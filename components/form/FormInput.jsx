import { useFormContext } from 'react-hook-form'

const FormInput = ({ name, placeholder }) => {
  const {
    formState: { errors },
    register
  } = useFormContext()
  return (
    <div className='w-full '>
      <label className='label'>
        <span className='label-text'>{placeholder}</span>
      </label>
      <input
        {...register(name)}
        className='input input-bordered w-full min-w-[300px]'
        placeholder={placeholder}
        data-lpignore='true'
      />
      <p>{errors[name]?.message}</p>
    </div>
  )
}

export default FormInput
