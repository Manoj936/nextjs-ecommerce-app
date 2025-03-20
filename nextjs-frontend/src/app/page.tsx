"use client";
import { motion } from "framer-motion";
import "@fontsource/poppins";
import "@fontsource/inter";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-4 md:px-8">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold text-gray-900 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Give your device <span className="text-blue-500">Skecth</span> Now!✒️
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl font-[Inter]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Give your device The protection it needs & The Style it deserves 👑
        </motion.p>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl font-[Inter]"
          initial={{ opacity: 0  }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
         Get 👉 Set 👉 <span className="text-blue-500">Skecth</span>
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            onClick={() => router.push("/products")}
            className="px-6 md:px-8 py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 font-[Poppins]"
          >
            Shop Now
          </button>
        </motion.div>
      </section>

      {/* Featured Products */}
      {/* <motion.section className="py-16 px-4 md:px-8"  initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scaleZ: 1}}
          transition={{ delay: 0.5, duration: 2 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 font-[Poppins]">Trending Products</h2>
        <div className="flex  space-x-6 px-4 py-4  snap-x snap-mandatory">
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              className="  rounded-xl shadow-lg p-4 md:p-6 border bg-white transition-transform transform hover:scale-105 hover:shadow-2xl font-[Inter] snap-center"
              whileHover={{ scale: 1.05 }}
          
              transition={{ type: "Tween", stiffness: 300 }}
            >
              <div className="h-40 md:h-56 bg-gray-300 rounded-lg" />
              <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold font-[Poppins]">Product {item}</h3>
              <p className="text-gray-500 mt-2">Experience top-quality fashion with our exclusive collection.</p>
              <button className="mt-4 md:mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full py-2 md:py-3 font-medium hover:opacity-90 transition-transform transform hover:scale-105 font-[Poppins]">
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section> */}
    </div>
  );
}
