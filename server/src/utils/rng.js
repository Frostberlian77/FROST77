const seedrandom = require('seedrandom');
const { ethers } = require('ethers');

const rng = seedrandom('frost77_seed', { entropy: true });

const getRandomSymbol = (symbols) => symbols[Math.floor(rng() * symbols.length)];

// Verifikasi Blockchain (opsional)
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_KEY');
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
  'function recordSpin(uint256 seed, string[] memory result) public',
  'function getSpin(uint256 id) public view returns (string[] memory)'
];
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const verifiedSpin = async (symbols, seed) => {
  const result = symbols.map(() => getRandomSymbol(symbols));
  await contract.recordSpin(seed, result);
  return result;
};

module.exports = { getRandomSymbol, verifiedSpin };
