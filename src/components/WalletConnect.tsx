
import { useState } from 'react';
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "../hooks/use-toast";

type WalletType = 'phantom' | 'solflare' | 'metamask' | null;

const WalletConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
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
            setWalletType('phantom');
            toast({
              title: "Wallet Connected",
              description: "Successfully connected to Phantom",
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
          setWalletType('solflare');
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to Solflare",
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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        setAddress(userAddress);
        setWalletType('metamask');
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to MetaMask",
        });
      } else {
        window.open('https://metamask.io/', '_blank');
        toast({
          variant: "destructive",
          title: "MetaMask not found",
          description: "Please install MetaMask",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect MetaMask",
      });
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Try Phantom first
    if ('solana' in window && window.solana?.isPhantom) {
      await connectPhantom();
    }
    // Try Solflare next
    else if ('solflare' in window) {
      await connectSolflare();
    }
    // Finally try MetaMask
    else if (typeof window.ethereum !== 'undefined') {
      await connectMetaMaskSolana();
    }
    // No wallet found
    else {
      toast({
        variant: "destructive",
        title: "No wallet found",
        description: "Please install Phantom, Solflare, or MetaMask",
      });
    }
    
    setIsConnecting(false);
  };

  return address ? (
    <Button 
      size="lg" 
      className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-semibold px-8 py-6 text-lg rounded-xl transition-all flex items-center justify-center w-full sm:w-auto"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {`${address.slice(0, 6)}...${address.slice(-4)}`}
    </Button>
  ) : (
    <Button 
      size="lg" 
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all transform hover:scale-105 inline-flex items-center justify-center w-full sm:w-auto min-w-[200px]"
      onClick={handleConnectWallet}
      disabled={isConnecting}
    >
      <span className="mx-auto">
        {isConnecting ? "Connecting..." : "Select Wallet"}
      </span>
    </Button>
  );
};

export default WalletConnect;
