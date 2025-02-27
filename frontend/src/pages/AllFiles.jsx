import React, { useContext, useState } from 'react';
import { Web3Context } from '../contexts/web3context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllFiles = () => {
  const { account, contract } = useContext(Web3Context);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (!contract) {
      toast.error("⚠️ Contract is not initialized!", { position: "top-center" });
      return;
    }

    if (!account) {
      toast.warning("⚠️ Please connect your wallet!", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const dataArray = await contract.display(account);
      console.log("📂 Fetched files:", dataArray);

      if (!dataArray || dataArray.length === 0) {
        toast.info("📁 No files found.", { position: "top-center" });
        setFiles([]);
      } else {
        const fileLinks = dataArray.map((item, i) => {
          const fileUrl = `https://gateway.pinata.cloud/ipfs/${item.replace("ipfs://", "")}`;
          return (
            <a href={fileUrl} key={i} target="_blank" rel="noopener noreferrer" className="file-item">
              <img className="w-full h-40 object-cover rounded-lg border border-gray-600" src={fileUrl} alt={`File ${i}`} onError={(e) => e.target.style.display = 'none'} />
            </a>
          );
        });

        setFiles(fileLinks);
      }
    } catch (error) {
      console.error("❌ Error fetching files:", error);
      toast.error("Failed to retrieve files.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6">
        {/* Button at the top */}
        <div className="mb-6 flex justify-center">
          <button onClick={getData} disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-lg transition-all disabled:opacity-50">
            {loading ? "Fetching..." : "Get Files"}
          </button>
        </div>

        {/* Files appear below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
          {loading ? <p className="text-center text-gray-400">Loading files...</p> : files.length > 0 ? files : <p className="text-center text-gray-400">No files available.</p>}
        </div>
      </section>
    </>
  );
};
