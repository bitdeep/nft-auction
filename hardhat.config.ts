require('dotenv').config({path: '.env'});
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
// import 'hardhat-gas-reporter';
// import 'hardhat-spdx-license-identifier';
// import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 12_450_000,
      hardfork: "london"
    },
    localhost: {
      url: 'http://localhost:8545',
    },
    cronos: {
      url: 'https://evm-cronos.crypto.org',
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
  paths: {
    sources: 'contracts',
  },
  mocha: {
    timeout: 0,
  },
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY"
  }
};

export default config;
