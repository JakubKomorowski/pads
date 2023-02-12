import Link from "next/link";
import React from "react";
import { MENU_LIST } from "../../routes";
import NavItem from "./NavItem";
import logo from "../../assets/logo.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className=" border-b border-grey px-16 font-mukta text-xl ">
      <div className="container mx-auto flex justify-between h-16 items-center">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8">
              <img className="w-8 h-8" src="/assets/logo.svg" alt="logo" />
            </div>
            Logo
          </div>
        </Link>
        <ul className="flex gap-16">
          {MENU_LIST.map((menu) => {
            return (
              <li key={menu.text}>
                <NavItem {...menu} />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
