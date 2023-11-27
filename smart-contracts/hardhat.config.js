/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");

// const { API_URL, PRIVATE_KEY } = process.env;

// module.exports = {
//    solidity: "0.8.11",
//    defaultNetwork: "volta",
//    networks: {
//       hardhat: {},
//       volta: {
//          url: API_URL,
//          accounts: [`0x${PRIVATE_KEY}`],
//          gas: 210000000,
//          gasPrice: 800000000000,
//       }
//    },
// }

require("@nomicfoundation/hardhat-toolbox");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const INFURA_API_KEY = process.env.API_KEY;

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};