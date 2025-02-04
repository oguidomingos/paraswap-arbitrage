const { ethers } = require("ethers");

function generateKey() {
  // Cria uma carteira aleatória
  const wallet = ethers.Wallet.createRandom();
  console.log("Chave privada:", wallet.privateKey);
  console.log("Endereço:", wallet.address);
}

generateKey();