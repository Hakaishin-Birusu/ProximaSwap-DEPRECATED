const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  networks: {
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          "jacket sniff suit february sibling imitate muscle photo picture crawl seed situate",
          "https://kovan.infura.io/v3/620c36f7c3ed450083324a7d407554bf"
        );
      },
      network_id: 42,
      gas: 5000000,
      gasPrice: 80000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.12", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
