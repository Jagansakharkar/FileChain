import React, { useContext } from 'react';
import { Web3Context } from '../contexts/web3context';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers'; 

export const Account = () => {
  const { account, setAccount } = useContext(Web3Context);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Ethereum-compatible browser extension.');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error('❌ Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      {account ? (
        <div className="text-center">
          <p className="text-green-400 text-lg font-semibold">
            ✅ Connected as <span className="font-mono">{account}</span>
          </p>
          <button
            onClick={disconnectWallet}
            className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
          >
            Disconnect
          </button>

          <div className="mt-6 space-x-4">
            <Link to="/upload_file">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold rounded-lg shadow-md transition">
                Upload Files
              </button>
            </Link>
            <Link to="/all_files">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 font-semibold rounded-lg shadow-md transition">
                View Files
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 font-semibold rounded-lg shadow-md transition cursor:pointer"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
