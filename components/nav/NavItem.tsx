import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
}

const NavItem = ({ href, text }: Props) => {
  return (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  );
};

export default NavItem;
