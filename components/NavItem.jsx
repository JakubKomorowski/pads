import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const NavItem = ({ href, text }) => {
  const router = useRouter()
  const { locale } = router
  return (
    <Link href={href} locale={locale}>
      <a className='w-full flex justify-center'>{text}</a>
    </Link>
  )
}

export default NavItem
