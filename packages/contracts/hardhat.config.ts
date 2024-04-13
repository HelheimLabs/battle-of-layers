import "dotenv/config";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
// import "@nomiclabs/hardhat-ethers";
// import "hardhat-gas-reporter";
// import "@typechain/hardhat";
// import "solidity-coverage";
import { node_url, accounts } from "./utils/network";
import { privateKeyToAccount } from "viem/accounts";
import { Hex } from "viem";

// While waiting for hardhat PR: https://github.com/nomiclabs/hardhat/pull/1542
if (process.env.HARDHAT_FORK) {
  process.env["HARDHAT_DEPLOY_FORK"] = process.env.HARDHAT_FORK;
}
const deployer = privateKeyToAccount(accounts("sepolia")[0] as Hex).address;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: { evmVersion: "paris" },
  },
  namedAccounts: {
    deployer: deployer,
  },
  networks: {
    localhost: {
      url: node_url("localhost"),
      accounts: accounts(),
    },
    sepolia: {
      url: node_url("sepolia"),
      accounts: accounts("sepolia"),
    },
    base_sepolia: {
      url: node_url("base_sepolia"),
      accounts: accounts("base_sepolia"),
    },
    op_sepolia: {
      url: node_url("op_sepolia"),
      accounts: accounts("op_sepolia"),
    },
    arb_sepolia: {
      url: node_url("arb_sepolia"),
      accounts: accounts("arb_sepolia"),
    },
    fujin: {
      url: node_url("fujin"),
      accounts: accounts("fujin"),
    },
    bnb_test: {
      url: node_url("bnb_test"),
      accounts: accounts("bnb_test"),
    },
  },
  paths: {
    sources: "src",
  },
  mocha: {
    timeout: 0,
  },
  external: {
    contracts: [
      {
        artifacts:
          "node_modules/@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/",
      },
    ],
  },
};

export default config;
