import { useWatchContractEvent } from "wagmi";
import { TrojanHorseAddress } from "../constant";
import { TrojanHorseAbi } from "../abis/TrojanHorse";
import { useState } from "react";

export function March({
  chainId,
  className,
}: {
  chainId: number;
  className: string;
}) {
  const [inComing, setInComing] = useState<
    {
      messageId: string;
      soldiers: number;
    }[]
  >([]);
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
  });

  return (
    <div
      className={`absolute bg-black h-1 transform flex flex-row ${className}`}
    >
      {inComing.map((i) => (
        <a id={i.messageId} href={`https://ccip.chain.link/msg/${i.messageId}`}>
          {i.soldiers}
        </a>
      ))}
    </div>
  );
}
