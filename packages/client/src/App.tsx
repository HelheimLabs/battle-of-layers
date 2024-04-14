import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
} from "viem/chains";
import { Web3Provider } from "./Web3Provider";
import { Champion } from "./component/Champion";
import { DeploymentLocation } from "./component/DeploymentLocation";
import { StatusBar } from "./component/StatusBar";
import { Title } from "./component/Title";
import "./index.css";
import { Rules } from "./component/Rules";
import { March } from "./component/March";
import { BattleLogs } from "./component/BattleLogs";

function App() {
  return (
    <Web3Provider>
      <div className="flex relative h-screen w-screen">
        <Rules />
        <StatusBar />
        <Title />
        <Champion />
        <BattleLogs />
        <March
          className="w-80 left-1/4 top-[40%]  rotate-[18deg]"
          chainId={baseSepolia.id}
        />
        <March
          className="w-80 left-1/4 bottom-[45%] rotate-[-18deg]"
          chainId={arbitrumSepolia.id}
        />

        <March
          className="w-80 right-1/4 top-[40%] rotate-[-18deg]"
          chainId={avalancheFuji.id}
        />

        <March
          className="w-80 right-1/4 bottom-[45%] rotate-[18deg]"
          chainId={bscTestnet.id}
        />

        <March
          className="w-40 left-1/2 -translate-x-1/2 bottom-[30%] rotate-[90deg]"
          chainId={optimismSepolia.id}
        />

        {/* op sepolia */}
        <DeploymentLocation
          className="left-1/2 -translate-x-1/2 bottom-[4rem] "
          chainId={optimismSepolia.id}
        />
        {/* base sepolia */}
        <DeploymentLocation
          className="left-[20rem] top-[20rem] "
          chainId={baseSepolia.id}
        />
        {/* arb sepolia */}
        <DeploymentLocation
          className="left-[20rem] bottom-[20rem] "
          chainId={arbitrumSepolia.id}
        />
        {/*fuji */}
        <DeploymentLocation
          className="right-[20rem] top-[20rem] "
          chainId={avalancheFuji.id}
        />
        {/* bsc testnet */}
        <DeploymentLocation
          className="right-[20rem] bottom-[20rem] "
          chainId={bscTestnet.id}
        />

      </div>
    </Web3Provider>
  );
}

export default App;
