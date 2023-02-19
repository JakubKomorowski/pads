import Link from 'next/link'
import React from 'react'

const NavItem = ({ href, text }) => {
  return (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  )
}

export default NavItem
