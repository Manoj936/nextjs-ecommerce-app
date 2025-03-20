"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import "@fontsource/poppins";
import "@fontsource/inter";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 font-[Poppins]">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-blue-600">
          Skecth
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
          <Link href="/checkout" className="text-gray-700 hover:text-blue-600">Cart</Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/checkout" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Profile</Link>
        </motion.div>
      )}
    </nav>
  );
}
