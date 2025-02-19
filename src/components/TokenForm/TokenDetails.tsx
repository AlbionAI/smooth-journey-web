
import { useState } from "react";
import { Upload } from "lucide-react";

interface TokenDetailsProps {
  onNext: () => void;
}

const TokenDetails = ({ onNext }: TokenDetailsProps) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Token Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="The Next DOGE"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Token Symbol
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
          placeholder="DOGE"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Logo
        </label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors">
          {image ? (
            <img src={image} alt="Token Logo" className="mx-auto max-h-48" />
          ) : (
            <div className="text-gray-400">
              <Upload className="w-12 h-12 mx-auto mb-4" />
              <p>Drop your token logo here</p>
              <p className="text-sm mt-2">Any size image will be resized to 500x500</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TokenDetails;
