
import { motion } from "framer-motion";
import WalletConnect from "./WalletConnect";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-16">
        <motion.h1 
          className="text-5xl sm:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Launch a Meme Coin At Lightning Speed
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-400 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          No coding required, launched in seconds the professional way.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
        >
          <WalletConnect />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
