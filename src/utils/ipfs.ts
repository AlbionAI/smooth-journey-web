
import axios from 'axios';

// QuickNode IPFS Gateway URL
const QUICKNODE_IPFS_GATEWAY_URL = 'https://mememinticon.quicknode-ipfs.com/ipfs';

// Function to upload a file to QuickNode's IPFS gateway
export const uploadFileToQuickNode = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    // Upload the file to QuickNode's IPFS gateway
    const response = await axios.post(
      'https://mememinticon.quicknode-ipfs.com/api/v0/add', 
      formData, 
      { headers }
    );

    const ipfsHash = response.data.Hash; // This will be the IPFS hash returned
    const ipfsUri = `${QUICKNODE_IPFS_GATEWAY_URL}${ipfsHash}`;

    console.log("File uploaded successfully. IPFS URI:", ipfsUri);
    return ipfsUri; // Return the IPFS URI to be sent to the backend
  } catch (error) {
    console.error("Error uploading file to QuickNode IPFS:", error);
    throw error;
  }
};
