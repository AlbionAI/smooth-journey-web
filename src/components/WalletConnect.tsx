
import { useState } from 'react';
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        setAddress(userAddress);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "MetaMask not found",
          description: "Please install MetaMask to connect your wallet",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
      });
    }
    setIsConnecting(false);
  };

  return address ? (
    <Button 
      size="lg" 
      className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-semibold px-8 py-6 text-lg rounded-xl transition-all"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {`${address.slice(0, 6)}...${address.slice(-4)}`}
    </Button>
  ) : (
    <Button 
      size="lg" 
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105"
      onClick={connectWallet}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : "Select Wallet"}
    </Button>
  );
};

export default WalletConnect;
