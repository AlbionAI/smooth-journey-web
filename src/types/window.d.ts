
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
    on: (event: string, callback: (accounts: string[]) => void) => void;
    removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    isSolana?: boolean;
  };
  solana?: {
    isPhantom?: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    publicKey?: {
      toString: () => string;
    };
  };
  solflare?: {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    publicKey?: {
      toString: () => string;
    };
  };
}
