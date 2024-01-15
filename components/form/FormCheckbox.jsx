import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

const FormCheckbox = ({ name }) => {
  const { t } = useTranslation()
  const {
    formState: { errors },
    register
  } = useFormContext()
  return (
    <label className='label cursor-pointer'>
      <span className='label-text'>{t('different_addres')}</span>
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
