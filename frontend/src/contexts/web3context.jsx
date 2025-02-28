import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

// import contract Upload
import Upload from '../../../smart_contract/artifacts/contracts/Upload.sol/Upload.json';

const Web3Context = createContext();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        setLoading(false);
        return;
      }

      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a provider using window.ethereum
        const providerInstance = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
        const signer = await providerInstance.getSigner(); // Await the signer
        const userAddress = await signer.getAddress();

        setAccount(userAddress);
        setProvider(providerInstance);

        // Check if contract address is set
        if (!contractAddress) {
          alert("Smart contract address is not set.");
          setLoading(false);
          return;
        }

        // Create a contract instance
        const contractInstance = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contractInstance);

        console.log("Contract Loaded Successfully");
      } catch (err) {
        console.error("❌ ERROR: Failed to load provider/contract:", err);
        alert("Error connecting to MetaMask: " + err.message);
      }
      setLoading(false);
    };

    loadProvider();

    // Handle account or network changes
    window.ethereum.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    return () => {
      window.ethereum.removeListener('accountsChanged', () => { });
      window.ethereum.removeListener('chainChanged', () => { });
    };
  }, []);

  return (
    <Web3Context.Provider value={{ provider, account, contract, loading, setAccount }}>
      {loading ? <div>Loading...</div> : children}
    </Web3Context.Provider>
  );
};

export { Web3Provider, Web3Context };