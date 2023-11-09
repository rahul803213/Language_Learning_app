"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightNav from "../right-nav/RightNav";

const Header = ({ user }) => {
  const pathname = usePathname();
  return (
    <header className=" text-black sm:py-4 p-2 w-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h2 className="uppercase text-sm sm:text-3xl p-x-2 font-bold ">
            Indi<span className="text-blue-900">Lingua.</span>
          </h2>
          <h1 className="font-bold tracking-widest sm:tracking-[5px] ">
            connect.Learn.grow.
          </h1>
        </Link>
        {(pathname === "/" ||
          pathname === "/signup" ||
          pathname === "/login") && (
          <div className="flex items-center">
            <div className="sm:text-xl text-sm mr-4 opacity-7 hidden sm:flex">
              Site Language:
            </div>
            <select className="p-2 rounded sm:text-xl text-sm">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        )}
        {pathname.startsWith("/home") && <RightNav />}
      </div>
    </header>
  );
};

export default Header;
