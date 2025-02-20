import { useState } from 'react';

interface TokenDetailsProps {
  onNext: () => void;
}

const TokenDetails = ({ onNext }: TokenDetailsProps) => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');

  const handleNext = () => {
    if (tokenName && tokenSymbol) {
      onNext();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Token Name
          </label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Enter your token name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Enter your token symbol"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            value={tokenDescription}
            onChange={(e) => setTokenDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors min-h-[120px]"
            placeholder="Enter your token description"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
