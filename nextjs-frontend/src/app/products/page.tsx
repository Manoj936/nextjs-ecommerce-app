"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import "@fontsource/poppins";
import "@fontsource/inter";
export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [query, category, minPrice, maxPrice, sortBy, page]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products/search",
        {
          params: {
            query,
            category,
            minPrice,
            maxPrice,
            sortBy,
            page,
            limit: 6,
          },
        }
      );
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 md:px-8">
      <motion.h1
        className="text-3xl md:text-2xl text-center font-extrabold mb-4 text-gray-900 tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Explore Our<span className="text-blue-500"> Products</span>
      </motion.h1>
      <motion.div
        className="flex flex-wrap gap-4 justify-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <input
          className="border p-2 rounded border-black text-gray-700"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded border-black  text-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <input
          className="border p-2 rounded border-black text-gray-700"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded border-black text-gray-700 placeholder-gray-700"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          className="border p-2 rounded border-black text-gray-700 placeholder-gray-700"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <motion.div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <Link
              to={`/products/${product._id}`}
              className="block mt-2 text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </section>
    </div>
  );
}
