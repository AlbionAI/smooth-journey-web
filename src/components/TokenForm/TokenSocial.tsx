
import { useState } from 'react';
import { Switch } from "../../components/ui/switch";
import { useToast } from "../../hooks/use-toast";

interface TokenSocialProps {
  onBack: () => void;
}

const TokenSocial = ({ onBack }: TokenSocialProps) => {
  const [revokeFreeze, setRevokeFreeze] = useState(false);
  const [revokeMint, setRevokeMint] = useState(false);
  const [revokeUpdate, setRevokeUpdate] = useState(false);
  const [modifyCreator, setModifyCreator] = useState(false);
  const { toast } = useToast();

  const handleCreateToken = () => {
    toast({
      title: "Creating token",
      description: "Your token is being created...",
    });
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">Modify Creator Information</h3>
            <p className="text-sm text-gray-400">(+0.1 SOL)</p>
          </div>
          <Switch
            checked={modifyCreator}
            onCheckedChange={setModifyCreator}
          />
        </div>
        
        {modifyCreator && (
          <div className="space-y-4 mt-4">
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
      </div>

      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-2">Revoke Authorities</h3>
        <p className="text-sm text-gray-400 mb-4">
          Enhance trust and decentralization by revoking token authorities. This prevents
          future changes to your token's supply, transfers, and metadata - making it more
          appealing to investors who value security and immutability
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#0B1220] border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Revoke Freeze</h4>
                <p className="text-xs text-gray-400">+0.1 SOL</p>
              </div>
              <Switch
                checked={revokeFreeze}
                onCheckedChange={setRevokeFreeze}
              />
            </div>
            <p className="text-sm text-gray-400">
              Freeze Authority allows you to freeze token accounts of any holder.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B1220] border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Revoke Mint</h4>
                <p className="text-xs text-gray-400">+0.1 SOL</p>
              </div>
              <Switch
                checked={revokeMint}
                onCheckedChange={setRevokeMint}
              />
            </div>
            <p className="text-sm text-gray-400">
              Mint Authority allows you to mint more supply of your token.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0B1220] border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Revoke Update</h4>
                <p className="text-xs text-gray-400">+0.1 SOL</p>
              </div>
              <Switch
                checked={revokeUpdate}
                onCheckedChange={setRevokeUpdate}
              />
            </div>
            <p className="text-sm text-gray-400">
              Update Authority allows you to update the token metadata.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        <div className="text-lg">
          Total Cost: <span className="text-emerald-400">0.5 %</span>
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
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Create Token
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSocial;
