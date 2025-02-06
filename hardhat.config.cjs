// hardhat.config.cjs
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: "https://polygon-rpc.com/",
        blockNumber: 15000000  // Ajuste para um número de bloco recente e com estado disponível
      },
    },
  },
};