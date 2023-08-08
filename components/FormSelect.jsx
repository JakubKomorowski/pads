import React from 'react'

const FormSelect = ({ register, options, name, ...rest }) => {
  return (
    <>
      <label className='label'>
        <span className='label-text'>Country</span>
      </label>
      <select
        {...register(name)}
        {...rest}
        className='select select-bordered focus:border-none outline-none focus:ring-transparent'
      >
        {options.map(value => (
          <option key={value.code} value={value.code}>
            {value.country}
          </option>
        ))}
      </select>
    </>
  )
}

export default FormSelect
