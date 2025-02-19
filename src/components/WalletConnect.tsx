
import { useState } from 'react';
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const connectPhantom = async () => {
    try {
      if ('solana' in window) {
        const provider = window.solana;
        if (provider?.isPhantom) {
          await provider.connect();
          const address = provider.publicKey?.toString();
          if (address) {
            setAddress(address);
            toast({
              title: "Phantom Wallet Connected",
              description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
            });
          }
        } else {
          window.open('https://phantom.app/', '_blank');
          toast({
            variant: "destructive",
            title: "Phantom not found",
            description: "Please install Phantom wallet",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect Phantom wallet",
      });
    }
  };

  const connectSolflare = async () => {
    try {
      if ('solflare' in window) {
        const provider = window.solflare;
        await provider.connect();
        const address = provider.publicKey?.toString();
        if (address) {
          setAddress(address);
          toast({
            title: "Solflare Wallet Connected",
            description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
          });
        }
      } else {
        window.open('https://solflare.com/', '_blank');
        toast({
          variant: "destructive",
          title: "Solflare not found",
          description: "Please install Solflare wallet",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect Solflare wallet",
      });
    }
  };

  const connectMetaMaskSolana = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Check if MetaMask has Solana support
        if ('isSolana' in window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const userAddress = accounts[0];
          setAddress(userAddress);
          toast({
            title: "MetaMask Solana Connected",
            description: `Connected to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "MetaMask Solana not supported",
            description: "Please install MetaMask Solana extension",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "MetaMask not found",
          description: "Please install MetaMask to connect",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect MetaMask Solana",
      });
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Try connecting to Phantom first
      if ('solana' in window && window.solana?.isPhantom) {
        await connectPhantom();
      }
      // Try Solflare next
      else if ('solflare' in window) {
        await connectSolflare();
      }
      // Finally try MetaMask Solana
      else if (typeof window.ethereum !== 'undefined') {
        await connectMetaMaskSolana();
      }
      else {
        toast({
          variant: "destructive",
          title: "No wallet found",
          description: "Please install Phantom, Solflare, or MetaMask Solana",
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
