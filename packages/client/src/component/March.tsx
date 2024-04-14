import { usePublicClient, useWatchContractEvent } from "wagmi";
import { TrojanHorseAddress, TroyAddress } from "../constant";
import { TrojanHorseAbi } from "../abis/TrojanHorse";
import { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { TroyAbi } from "../abis/Troy";
import { sepolia } from "viem/chains";

export function March({
  chainId,
  className,
}: {
  chainId: number;
  className: string;
}) {
  const client = usePublicClient({ chainId: chainId });
  const sepoliaClient = usePublicClient({ chainId: sepolia.id });

  const [inComing, setInComing] = useState<
    {
      messageId: string;
      soldiers: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchOldEvent() {
      const blockNumber = await client!.getBlockNumber();

      const logs = await client!.getLogs({
        address: TrojanHorseAddress[chainId],
        event: parseAbiItem(
          "event HorseSent(bytes32 indexed messageId, uint256 soldierAmount, uint256 fees)"
        ),
        fromBlock: blockNumber - 1800n,
        toBlock: blockNumber,
      });

      setInComing(
        (
          await Promise.all(
            logs.map(async (log) => {
              const fulfilled = await sepoliaClient?.readContract({
                address: TroyAddress,
                abi: TroyAbi,
                functionName: "isMessageIdFulFilled",
                args: [log.args.messageId!],
              });

              if (fulfilled) {
                return undefined;
              }
              return {
                messageId: log.args.messageId!,
                soldiers: Number(log.args.soldierAmount!),
              };
            })
          )
        ).filter(Boolean) as {
          messageId: string;
          soldiers: number;
        }[]
      );
    }

    fetchOldEvent();
  }, []);

  useWatchContractEvent({
    address: TrojanHorseAddress[chainId],
    abi: TrojanHorseAbi,
    eventName: "HorseSent",
    onLogs(logs) {
      logs.forEach((log) => {
        setInComing([
          ...inComing,
          {
            messageId: log.args.messageId!,
            soldiers: Number(log.args.soldierAmount!),
          },
        ]);
      });
    },
    chainId: chainId,
    poll: true,
    pollingInterval: 10000,
    strict: true,
  });

  return (
    <div
      className={`absolute bg-black h-1 transform flex flex-row ${className}`}
    >
      {inComing.map((i) => (
        <a
          className="m-2 animate-blink"
          id={i.messageId}
          href={`https://ccip.chain.link/msg/${i.messageId}`}
        >
          {i.soldiers}
        </a>
      ))}
    </div>
  );
}
