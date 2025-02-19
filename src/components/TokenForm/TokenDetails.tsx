
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { uploadFileToQuickNode } from "../../utils/ipfs";

interface TokenDetailsProps {
  onNext: () => void;
}

const TokenDetails = ({ onNext }: TokenDetailsProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleNext = () => {
    if (!image || !ipfsUri) {
      toast({
        variant: "destructive",
        title: "Image Required",
        description: "Please upload a token logo before proceeding",
      });
      return;
    }
    onNext();
  };

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width > 512 || img.height > 512) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              const scale = Math.min(512 / img.width, 512 / img.height);
              const x = (512 - img.width * scale) / 2;
              const y = (512 - img.height * scale) / 2;
              
              ctx.fillStyle = '#000000';
              ctx.fillRect(0, 0, 512, 512);
              
              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
              resolve(canvas.toDataURL('image/png'));
            } else {
              reject(new Error('Could not get canvas context'));
            }
          } else {
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
        
        // Upload to IPFS
        const uri = await uploadFileToQuickNode(file);
        setIpfsUri(uri);
        
        toast({
          title: "Image uploaded",
          description: "Image has been resized and uploaded to IPFS",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to process or upload the image",
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
        
        // Upload to IPFS
        const uri = await uploadFileToQuickNode(file);
        setIpfsUri(uri);
        
        toast({
          title: "Image uploaded",
          description: "Image has been resized and uploaded to IPFS",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to process or upload the image",
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
            className="min-h-[300px] border-2 border-dashed border-emerald-500/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors relative"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {image ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-black border-4 border-black">
                  <img 
                    src={image} 
                    alt="Token Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-emerald-500">Logo uploaded and resized to 500x500!</p>
              </div>
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <Upload className="w-12 h-12 mb-4 text-emerald-500/50" />
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
