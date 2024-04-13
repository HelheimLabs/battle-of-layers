import { useState } from "react";
import { getChainImage } from "../utils/getChainImage";
import { ConfirmDialog } from "./ConfirmDialog";
import { useSwitchChain } from "wagmi";

export interface IDeploymentLocation {
  chainId: number;
  className?: string;
}

export function DeploymentLocation(props: IDeploymentLocation) {
  const { switchChain } = useSwitchChain();

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className={`absolute w-40 h-40 flex flex-col items-center justify-center ${props.className}`}
    >
      <img className="mb-4" src={getChainImage(props.chainId)}></img>
      <button
        onClick={() => {
          if (!isShow) {
            switchChain({ chainId: props.chainId });
          }
          setIsShow(!isShow);
        }}
        className="btn"
      >
        Boost Soldiers
      </button>
      <div className=" absolute -top-[17rem] -left-24  translate-x-1/2">
        <ConfirmDialog chainId={props.chainId} isShow={isShow} />
      </div>
      {/* <div className="absolute bg-black h-1 w-full transform -rotate-12"></div> */}
    </div>
  );
}
