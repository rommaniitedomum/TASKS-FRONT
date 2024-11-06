import React from "react";
import { Link } from "react-router-dom";
import { navMenus } from "../utills/data";

const Navbar = ({ menuIdx }) => {
  console.log(menuIdx);
  return (
    <nav
      className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500
    py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/">Lorem</Link>
        </h2>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className="rounded-sm mb-1 border border-gray-700
          hover:bg-gray-950 transition-all duration-300">
            <Link to={menu.to} className="flex gap-4 items-center py-2 px-10">
              {menu.icon}
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <button>sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
