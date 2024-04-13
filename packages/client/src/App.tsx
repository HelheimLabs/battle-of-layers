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

function App() {
  return (
    <Web3Provider>
      <div className="flex relative h-screen w-screen">
        <StatusBar />
        <Title />
        <Champion />
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
