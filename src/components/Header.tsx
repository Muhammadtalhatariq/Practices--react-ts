import React from "react";
import { FiShoppingCart } from "react-icons/fi";
const Header = () => {
  const navItems = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];

  return (
    <>
      <div className="header fixed w-full bg-neutral-100 flex justify-between items-center p-2 px-4">
        <div className="logo bg-red-100 w-12 h-12 rounded-full"></div>
        <div>
          <ul className="flex gap-4">
            {navItems.map((item) => (
              <li className="cursor-pointer font-semibold">{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <FiShoppingCart size={30} />
          <div className="absolute size-6 bg-neutral-200 rounded-full -top-2 -right-3 text-center font-semibold">
         2
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
