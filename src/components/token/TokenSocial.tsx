import { useState } from 'react';

interface TokenSocialProps {
  onBack: () => void;
}

const TokenSocial = ({ onBack }: TokenSocialProps) => {
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [website, setWebsite] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Twitter
          </label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="https://twitter.com/yourprofile"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Discord
          </label>
          <input
            type="text"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="https://discord.gg/yourserver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Website
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => console.log({ twitter, discord, website })}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSocial;
