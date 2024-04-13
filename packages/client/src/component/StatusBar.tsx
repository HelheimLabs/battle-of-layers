import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";
import { getChainImage } from "../utils/getChainImage";

export function StatusBar() {
  const account = useAccount();
  const { data } = useBalance({ address: account.address });
  return (
    <div className="absolute right-4 top-4 flex items-center justify-center">
      <div className="mr-2">You are on</div>
      <img className="w-10 h-10" src={getChainImage(account.chainId || 0)}></img>
      <div className="m-2">
        {Number(data?.formatted || 0).toPrecision(4)} {data?.symbol}
      </div>
      <ConnectKitButton />
    </div>
  );
}
