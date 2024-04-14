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

  const champion = troyStorage.data?.[0];
  const championSoldiersAmount = troyStorage.data?.[1];
  return { champion, championSoldiersAmount };
}
