import React, { createContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import Upload from '../../../smart_contract/artifacts/contracts/Upload.sol/Upload.json'; 

const Web3Context = createContext();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // Ensure this is set in .env

console.log(contractAddress);

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
        const providerInstance = new BrowserProvider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []); 

        const signer = await providerInstance.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);
        setProvider(providerInstance);

        if (!contractAddress) {
          console.error("❌ ERROR: Contract address is missing! Check your .env file.");
          alert("Smart contract address is not set.");
          setLoading(false);
          return;
        }

        const contractInstance = new Contract(contractAddress, Upload.abi, signer);
        setContract(contractInstance);
        console.log("✅ Contract Loaded Successfully:", contractInstance);
      } catch (err) {
        console.error("❌ ERROR: Failed to load provider/contract:", err);
        alert("Error connecting to MetaMask: " + err.message);
      }

      setLoading(false);
    };

    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, account, contract, loading ,setAccount}}>
      {loading ? <div>Loading...</div> : children}
    </Web3Context.Provider>
  );
};

export { Web3Provider, Web3Context };
