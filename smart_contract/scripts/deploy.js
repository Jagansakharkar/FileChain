const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy(); // Deploy contract

  await upload.waitForDeployment(); // Updated for ethers v6+

  console.log(`Upload contract deployed to: ${await upload.getAddress()}`);
}

// Proper async error handling
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
