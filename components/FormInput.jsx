const FormInput = ({ register, name, placeholder, errors, ...rest }) => {
  return (
    <>
      <label className='label'>
        <span className='label-text'>{placeholder}</span>
      </label>
      <input
        {...register(name)}
        {...rest}
        className='input input-bordered w-full max-w-xs'
        placeholder={placeholder}
        data-lpignore='true'
      />
      <p>{errors[name]?.message}</p>
    </>
  )
}

export default FormInput
