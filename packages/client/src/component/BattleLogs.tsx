import { useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import { usePublicClient } from "wagmi";
import { TroyAddress } from "../constant";
import { parseAbiItem } from "viem";
import * as dayjs from "dayjs";
import { BattleLogsText } from "./BattleLogsText";

export function BattleLogs() {
  const sepoliaClient = usePublicClient({ chainId: sepolia.id });

  const [battleLogs, setBattleLogs] = useState<
    {
      timestamp: bigint;
      fromChainId: bigint;
      fromAmount: bigint;
      initChampion: bigint;
      initAmount: bigint;
      laterChampion: bigint;
      laterAmount: bigint;
    }[]
  >([]);

  useEffect(() => {
    async function fetchOldData() {
      const currentBlockNumber = await sepoliaClient!.getBlockNumber();
      const logs = await sepoliaClient!.getLogs({
        address: TroyAddress,
        event: parseAbiItem(
          "event SoldiersArrive(bytes32 indexed messageId,uint256 indexed chainId,uint256 amount,uint256 initChampion,uint256 initAmount,uint256 laterChampion,uint256 laterAmount)"
        ),
        fromBlock: currentBlockNumber - 5000n,
        toBlock: currentBlockNumber,
        strict: true,
      });

      setBattleLogs(
        await Promise.all(
          logs.map(async (l) => {
            return {
              timestamp: (
                await sepoliaClient!.getBlock({ blockHash: l.blockHash })
              ).timestamp,
              fromChainId: l.args.chainId,
              fromAmount: l.args.amount,
              initChampion: l.args.initChampion,
              initAmount: l.args.initAmount,
              laterChampion: l.args.laterChampion,
              laterAmount: l.args.laterAmount,
            };
          })
        )
      );
    }
    fetchOldData();
  }, []);

  return (
    <div className="w-auto h-40 absolute left-[1rem] bottom-[1rem] overflow-scroll rounded border p-2">
      <div className=" text-2xl font-bold">Battle Logs</div>
      {battleLogs
        .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
        .map((l) => (
          <div>
            <div className="flex flex-row">
              {dayjs.unix(Number(l.timestamp)).format()}
              <BattleLogsText log={l} />
            </div>
          </div>
        ))}
    </div>
  );
}
