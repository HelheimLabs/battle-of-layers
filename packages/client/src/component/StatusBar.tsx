import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance } from "wagmi";

export function StatusBar() {
  const account = useAccount();
  const { data } = useBalance({ address: account.address });
  return (
    <div className="absolute right-4 top-4 flex items-center justify-center">
      <div className="m-2">
        {Number(data?.formatted || 0).toPrecision(4)} {data?.symbol}
      </div>
      <ConnectKitButton />
    </div>
  );
}
