
import { Link, useNavigate } from "react-router-dom";
import { Home, Rocket, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    // Check if wallet is connected by looking for publicKey in window.solana or window.solflare
    const checkWalletConnection = () => {
      const hasPhantom = window.solana?.isPhantom && window.solana.publicKey;
      const hasSolflare = window.solflare?.publicKey;
      setIsWalletConnected(!!hasPhantom || !!hasSolflare);
    };

    checkWalletConnection();

    // Set up interval to periodically check wallet connection
    const intervalId = setInterval(checkWalletConnection, 1000);

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isWalletConnected) {
      navigate('/');
      window.location.reload(); // Force reload to ensure wallet connection prompt appears
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center pl-8">
            <Link 
              to="/" 
              className="text-emerald-400 text-xl font-semibold"
              onClick={handleNavigation}
            >
              MemeMint
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
              onClick={handleNavigation}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/promote"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Promote
            </Link>
            <a
              href="https://raydium.io/liquidity-pools/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <Droplets className="w-4 h-4 mr-2" />
              Liquidity
            </a>
          </div>

          <div className="w-[120px]">
            {/* Empty div to maintain spacing for center alignment */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
