import React, { useState, useContext } from "react";
import { Web3Context } from "../contexts/web3context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const UploadFile = () => {
  const navigator = useNavigate()
  const { contract, account } = useContext(Web3Context);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Upload file to Pinata
  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
        },
        body: formData,
      });

      const result = await response.json();
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    } catch (err) {
      console.error("Pinata upload error:", err);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Upload file to Pinata and store the URL in the smart contract
  const uploadFile = async () => {

    // check account present or not
    if (!account) {
      toast.error("Please connect to MetaMask first.");

      // redirect to connect 
      navigator('/account')

    }

    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (!contract) {
      toast.error("Smart contract is not loaded");
      return;
    }


    setUploading(true);
    try {
      // Upload file to Pinata
      const fileUrl = await uploadToPinata(file);
      console.log("File uploaded to Pinata:", fileUrl);

      if (!fileUrl || fileUrl.length > 1000) {
        throw new Error("Invalid file URL");
      }

      // Store the Pinata URL in the smart contract
      const tx = await contract.add(fileUrl, { gasLimit: 500000 });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);

      if (receipt.status === 0) {
        console.error("Transaction reverted");
      } else {
        console.log("Transaction succeeded");
      }

      toast.success(`File "${file.name}" uploaded successfully`);
      setFile(null); // Reset file input
    } catch (error) {
      console.error("Upload failed", error);
      if (error.data) {
        console.error("Revert reason:", error.data.message);
      }
      toast.error("Upload failed: " + error.message);
    }
    setUploading(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center sm:w-full px-4">
      {/* File Upload UI */}
      <div className="flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-400 dark:bg-gray-700 transition border-gray-300">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG, or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* File Preview & Name */}
      {file && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-md flex items-center gap-3">
          {file.type.startsWith("image/") ? (
            <img src={URL.createObjectURL(file)} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
          ) : (
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold rounded-lg">
              {file.name.split(".").pop().toUpperCase()}
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{file.name}</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={uploading || !file}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}