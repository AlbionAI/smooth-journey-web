
import { useState } from 'react';
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "../hooks/use-toast";

type WalletType = 'phantom' | 'solflare' | 'metamask' | null;

const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulated wallet connection for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
      setAddress(mockAddress);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect wallet. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return address ? (
    <Button 
      size="lg" 
      className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-semibold px-8 py-6 text-lg rounded-xl transition-all flex items-center justify-center"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {`${address.slice(0, 6)}...${address.slice(-4)}`}
    </Button>
  ) : (
    <Button 
      size="lg" 
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105 flex items-center justify-center"
      onClick={handleConnectWallet}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : "Select Wallet"}
    </Button>
  );
};

export default WalletConnect;
