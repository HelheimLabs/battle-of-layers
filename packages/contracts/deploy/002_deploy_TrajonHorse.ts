import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { keccak256, stringToBytes } from "viem";
import { getAggregator, getRouter } from "../utils/network";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = await hre.getChainId();
  const router = getRouter(chainId);
  const aggregator = getAggregator(chainId);

  // manually set receiver
  const receiver = "0x10d5617ef73E62545F45017A0F85847c081b9fcE";

  await deploy("TrojanHorse", {
    from: deployer,
    args: [],
    proxy: {
      proxyContract: "ERC1967Proxy",
      proxyArgs: ["{implementation}", "{data}"],
      execute: {
        init: {
          methodName: "initialize",
          // chain selector
          args: [deployer, router, aggregator, "16015286601757825753", receiver],
        },
      },
      upgradeFunction: {
        methodName: "upgradeToAndCall",
        upgradeArgs: ["{implementation}", "{data}"],
      },
      checkProxyAdmin: false,
    },
    deterministicDeployment: keccak256(stringToBytes("TrojanHorse")),
    log: true,
  });
};
export default func;
func.tags = ["TrojanHorse"];
