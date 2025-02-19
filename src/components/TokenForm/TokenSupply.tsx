
interface TokenSupplyProps {
  onNext: () => void;
  onBack: () => void;
}

const TokenSupply = ({ onNext, onBack }: TokenSupplyProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Decimals
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="18"
              defaultValue="9"
              className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="9"
            />
            <p className="mt-1 text-sm text-gray-400">
              Enter a value between 0 and 18 decimals
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Total Supply
          </label>
          <input
            type="text"
            defaultValue="1000000000"
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="1000000000"
          />
          <div className="mt-1 text-sm text-gray-400">
            <p>Common supply is 1 billion</p>
            <p>With commas: 1,000,000,000</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors min-h-[120px]"
            placeholder="Enter your token description"
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
            onClick={onNext}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSupply;
