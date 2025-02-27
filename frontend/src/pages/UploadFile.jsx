import React, { useContext, useState } from 'react';
import { Web3Context } from '../contexts/web3context';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UploadFile = () => {
  const { account, provider, contract } = useContext(Web3Context);
  const [file, setFile] = useState(null);
  const [fileName, setFilename] = useState("No File Selected");
  const [uploading, setUploading] = useState(false);

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (!data) return;

    setFile(data);
    setFilename(data.name);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!contract || !provider) {
      toast.error("⚠️ Contract is not initialized yet.", { position: "top-center" });
      return;
    }

    if (!account) {
      toast.error("⚠️ Please connect your MetaMask wallet.", { position: "top-center" });
      return;
    }

    if (!file) {
      toast.warning("⚠️ No file selected!", { position: "top-center" });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({ name: file.name });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({ cidVersion: 1 });
      formData.append("pinataOptions", options);

      const resFile = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          "pinata_api_key": import.meta.env.VITE_PINATA_API_KEY,
          "pinata_secret_api_key": import.meta.env.VITE_PINATA_SECRET_API_KEY
        },
        body: formData
      });

      const responseData = await resFile.json();
      if (!responseData.IpfsHash) throw new Error("Failed to retrieve IPFS hash.");

      const fileUrl = `ipfs://${responseData.IpfsHash}`;
      console.log("✅ File uploaded to IPFS:", fileUrl);

      const signer =await provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner.add(fileUrl);
      await tx.wait();

      toast.success("🎉 File uploaded successfully!", { position: "top-center" });
      setFile(null);
      setFilename("No File Selected");

    } catch (error) {
      console.error("❌ ERROR uploading file:", error);
      toast.error("Error uploading file: " + error.message, { position: "top-center" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4">
        <form onSubmit={handleFileUpload} className="w-full max-w-lg">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG, GIF</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={retrieveFile} disabled={!account} />
            </label>
          </div>
          <span className="block text-center mt-2 text-gray-400">{fileName}</span>
          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg transition-all disabled:opacity-50 hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>
    </>
  );
};
