"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/freshcart-logo.svg";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

interface CartRes {
  numOfCartItems?: number;
}

export default function Navbar() {
  const { data: cart } = useQuery<CartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        return { numOfCartItems: 0 };
      }
      return res.json();
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const links = [
    { path: "/products", element: "Products" },
    { path: "/categories", element: "Categories" },
    { path: "/brands", element: "Brands" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="FreshCart" width={120} height={40} />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 w-full md:w-auto absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-50`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.element}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 mt-4 md:mt-0 md:ml-6">
            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-emerald-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600">
                  Hi, {session?.user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
                <Link
                  href="/wishlist"
                  className="text-red-500 hover:text-red-700"
                  aria-label="Wishlist"
                >
                  ❤️
                </Link>
                <Link
                  href="/cart"
                  className="relative text-gray-700 hover:text-emerald-600"
                  aria-label="Cart"
                >
                  🛒
                  {cart?.numOfCartItems ? (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.numOfCartItems}
                    </span>
                  ) : null}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}