import { useReadContract } from "wagmi";
import { TroyAbi } from "../abis/Troy";
import { TroyAddress } from "../constant";
import { sepolia } from "viem/chains";

export function useChampion() {
  const troyStorage = useReadContract({
    abi: TroyAbi,
    address: TroyAddress,
    functionName: "readStorageValue",
    chainId: sepolia.id,
  });

  const champion = troyStorage.data?.championChainId;
  const championSoldiersAmount = troyStorage.data?.soldierAmount;
  return { champion, championSoldiersAmount };
}
