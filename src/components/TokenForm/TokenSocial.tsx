import { useState } from 'react';
import { Lock, Coins, FileEdit } from 'lucide-react';
import { Switch } from "../../components/ui/switch";

interface TokenSocialProps {
  onBack: () => void;
}

const TokenSocial = ({ onBack }: TokenSocialProps) => {
  const [revokeFreeze, setRevokeFreeze] = useState(false);
  const [revokeMint, setRevokeMint] = useState(false);
  const [revokeUpdate, setRevokeUpdate] = useState(false);
  const [modifyCreator, setModifyCreator] = useState(false);

  const handleCreateToken = () => {
    // Add token creation logic here
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 text-white">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Website
        </label>
        <input
          type="url"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="https://yourmemecoin.co"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Twitter
        </label>
        <input
          type="url"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="https://twitter.com/yourmemecoin"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Telegram
        </label>
        <input
          type="url"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="https://t.me/yourchannel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Discord
        </label>
        <input
          type="url"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="https://discord.gg/your-server"
        />
      </div>

      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-white">Modify Creator Information</h3>
            <p className="text-sm text-gray-400">Additional cost: +0.1 SOL</p>
          </div>
          <Switch
            checked={modifyCreator}
            onCheckedChange={setModifyCreator}
          />
        </div>
        
        {modifyCreator && (
          <div className="space-y-4 mb-6 p-4 rounded-lg bg-[#0B1220] border border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Creator Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="MemeMint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Creator Website
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="https://mememint.co"
              />
            </div>
          </div>
        )}

        <h3 className="text-lg font-medium text-white mb-2">Revoke Authorities</h3>
        <p className="text-sm text-gray-400 mb-4">
          Enhance trust and decentralization by revoking token authorities. This prevents
          future changes to your token's supply, transfers, and metadata - making it more
          appealing to investors who value security and immutability.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-6 rounded-xl bg-[#0B1220] border transition-all duration-300 ${
            revokeFreeze 
              ? 'border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.3)]' 
              : 'border-[#1d2535] hover:border-[#00A3FF]/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Lock className="w-6 h-6 text-[#00A3FF]" />
              <span className="text-[#00A3FF]">+0.1 SOL</span>
            </div>
            <h4 className="text-lg font-medium mb-2">Revoke Freeze</h4>
            <p className="text-sm text-gray-400 mb-4">
              Freeze Authority allows you to freeze token accounts of holders.
            </p>
            <button
              onClick={() => setRevokeFreeze(!revokeFreeze)}
              className={`w-full py-2 rounded-lg border transition-all duration-300 ${
                revokeFreeze
                  ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00A3FF]'
                  : 'border-gray-600 text-gray-400 hover:border-[#00A3FF]/50'
              }`}
            >
              {revokeFreeze ? 'Selected' : 'Select to Revoke'}
            </button>
          </div>

          <div className={`p-6 rounded-xl bg-[#0B1220] border transition-all duration-300 ${
            revokeMint 
              ? 'border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.3)]' 
              : 'border-[#1d2535] hover:border-[#00A3FF]/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <Coins className="w-6 h-6 text-[#00A3FF]" />
              <span className="text-[#00A3FF]">+0.1 SOL</span>
            </div>
            <h4 className="text-lg font-medium mb-2">Revoke Mint</h4>
            <p className="text-sm text-gray-400 mb-4">
              Mint Authority allows you to mint more supply of your token.
            </p>
            <button
              onClick={() => setRevokeMint(!revokeMint)}
              className={`w-full py-2 rounded-lg border transition-all duration-300 ${
                revokeMint
                  ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00A3FF]'
                  : 'border-gray-600 text-gray-400 hover:border-[#00A3FF]/50'
              }`}
            >
              {revokeMint ? 'Selected' : 'Select to Revoke'}
            </button>
          </div>

          <div className={`p-6 rounded-xl bg-[#0B1220] border transition-all duration-300 ${
            revokeUpdate 
              ? 'border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.3)]' 
              : 'border-[#1d2535] hover:border-[#00A3FF]/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <FileEdit className="w-6 h-6 text-[#00A3FF]" />
              <span className="text-[#00A3FF]">+0.1 SOL</span>
            </div>
            <h4 className="text-lg font-medium mb-2">Revoke Update</h4>
            <p className="text-sm text-gray-400 mb-4">
              Update Authority allows you to update the token metadata.
            </p>
            <button
              onClick={() => setRevokeUpdate(!revokeUpdate)}
              className={`w-full py-2 rounded-lg border transition-all duration-300 ${
                revokeUpdate
                  ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00A3FF]'
                  : 'border-gray-600 text-gray-400 hover:border-[#00A3FF]/50'
              }`}
            >
              {revokeUpdate ? 'Selected' : 'Select to Revoke'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        <div className="flex items-center text-xl font-medium">
          <span className="mr-2">Total Cost:</span>
          <span className="text-[#00A3FF] flex items-center">
            0.5
            <Coins className="w-5 h-5 ml-1" />
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleCreateToken}
            className="px-6 py-3 bg-[#00A3FF] text-white rounded-lg hover:bg-[#00A3FF]/90 transition-colors"
          >
            Create Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSocial;
