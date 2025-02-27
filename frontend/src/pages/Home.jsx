import React, { useContext } from 'react';
import { Web3Context } from '../contexts/web3context';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { provider, account, contract } = useContext(Web3Context);

  if (!provider || !account || !contract) {
    return <div className="text-center text-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Decentralized File Storage</h1>
        <p className="text-lg mt-4 mx-auto max-w-md">
          Securely store & share files using blockchain and IPFS.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/upload_file">
            <button className="bg-blue-600 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Upload File
            </button>
          </Link>
          <Link to="/all_files">
            <button className="bg-gray-800 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
              View Files
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
