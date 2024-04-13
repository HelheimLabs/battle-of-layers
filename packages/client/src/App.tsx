import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";

function App() {
  return (
    <Web3Provider>
      <ConnectKitButton />
    </Web3Provider>
  );
}

export default App;
