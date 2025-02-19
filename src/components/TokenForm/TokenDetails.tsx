
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

interface TokenDetailsProps {
  onNext: () => void;
}

const TokenDetails = ({ onNext }: TokenDetailsProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Only resize if image is larger than 512x512
          if (img.width > 512 || img.height > 512) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              // Calculate scaling to maintain aspect ratio
              const scale = Math.min(512 / img.width, 512 / img.height);
              const x = (512 - img.width * scale) / 2;
              const y = (512 - img.height * scale) / 2;
              
              // Fill background with black for transparency
              ctx.fillStyle = '#000000';
              ctx.fillRect(0, 0, 512, 512);
              
              // Draw image centered
              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
              resolve(canvas.toDataURL('image/png'));
            } else {
              reject(new Error('Could not get canvas context'));
            }
          } else {
            // If image is smaller than 512x512, use it as is
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setImage(resizedImage);
        toast({
          title: "Image uploaded",
          description: "Image has been resized to 500x500",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to process the image",
        });
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const resizedImage = await resizeImage(file);
        setImage(resizedImage);
        toast({
          title: "Image uploaded",
          description: "Image has been resized to 500x500",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to process the image",
        });
      }
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
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="The Next DOGE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-gray-700 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="DOGE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Logo
          </label>
          <div 
            className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {image ? (
              <div className="w-[200px] h-[200px] mx-auto rounded-full overflow-hidden bg-black">
                <img 
                  src={image} 
                  alt="Token Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="text-gray-400">
                <Upload className="w-12 h-12 mx-auto mb-4" />
                <p>Drop your token logo here</p>
                <p className="text-sm mt-2">Images larger than 512x512 will be resized</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
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
    </div>
  );
};

export default TokenDetails;
