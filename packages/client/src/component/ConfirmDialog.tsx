import { useCallback, useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { TrojanHorseAbi } from "../abis/TrojanHorse";
import { formatEther, parseEther } from "viem";
import { TrojanHorseAddress } from "../constant";

export interface IConfirmDialog {
  chainId: number;
  isShow: boolean;
}

export function ConfirmDialog(props: IConfirmDialog) {
  const [fundAmount, setFundAmount] = useState<string>("0");

  const account = useAccount();
  const { data: balanceData } = useBalance({
    address: account.address,
    chainId: props.chainId,
  });

  const { data } = useReadContract({
    abi: TrojanHorseAbi,
    address: TrojanHorseAddress[props.chainId],
    functionName: "getFee",
    args: [parseEther(fundAmount)],
    chainId: props.chainId,
  });

  const fees = data?.[0];
  const estimateSoldierAmount = data?.[1];

  const { writeContract } = useWriteContract();

  const ConfirmFn = useCallback(() => {
    if (!fees) {
      console.error("cannot calculate fees");
      return;
    }
    writeContract({
      abi: TrojanHorseAbi,
      address: TrojanHorseAddress[props.chainId],
      functionName: "sendHorse",
      args: [parseEther(fundAmount)],
      value: parseEther(fundAmount) + fees,
      chainId: props.chainId,
    });
  }, [fees, props.chainId, writeContract, fundAmount]);

  return (
    <dialog
      className={`absolute w-96 h-72 border rounded-xl flex flex-col modal-box z-100 ${props.isShow ? "" : "hidden"} overflow-hidden`}
    >
      <div className="text-2xl font-bold my-2">Fund Soldiers</div>
      <div className="flex flex-row items-center justify-center">
        <div className="-ml-12 mr-4">Fund {balanceData?.symbol} amount</div>
        <input
          className="input w-20 input-bordered"
          type="text"
          onChange={(e) => {
            setFundAmount(e.target.value);
          }}
        ></input>
      </div>
      <div className="my-2 flex flex-row items-center">
        <div className="ml-12"> Soldiers amount </div>
        <div className="ml-8">{Number(estimateSoldierAmount || 0)}</div>
      </div>
      <div className="my-2 flex flex-row items-center justify-center">
        <div className="mx-2">Transport cost</div>
        <div className="ml-6">
          {Number(formatEther(fees || 0n, "wei")).toPrecision(3)}{" "}
          {balanceData?.symbol}
        </div>
      </div>

      <button
        onClick={() => {
          ConfirmFn();
        }}
        className="btn my-2"
      >
        Confirm
      </button>
    </dialog>
  );
}
