require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

const config = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: [
        { privateKey: "0xf187d0f342d849c9ee602b03739c15a4da8ab26f8e29fa166a4e7d50106bc8f8", balance: "10000000000000000000000" }
      ],
      forking: {
        url: 'https://polygon-rpc.com/',
      },
    },
  },
};

module.exports = config;