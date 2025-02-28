module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337, // Default chain ID for Hardhat
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Local node URL
      chainId: 31337, // Same as Hardhat
    },
  },
};