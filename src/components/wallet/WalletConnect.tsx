
import { useEffect } from "react";

interface WalletConnectProps {
  onConnect: () => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        console.log("Connected with Public Key:", response.publicKey.toString());
        onConnect();
      } catch (err) {
        console.error("Connection failed:", err);
      }
    } else {
      alert("Phantom wallet not found. Please install it.");
    }
  };

  useEffect(() => {
    if (!window.solana) return;

    const handleDisconnect = () => {
      console.log("Disconnected from wallet");
    };

    window.solana.on("disconnect", handleDisconnect);

    return () => {
      window.solana.disconnect();
      window.solana.removeListener("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
