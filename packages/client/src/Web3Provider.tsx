import { WagmiProvider, createConfig, http } from "wagmi";
import {
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  bscTestnet,
  mainnet,
  optimismSepolia,
  sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      sepolia,
      avalancheFuji,
      optimismSepolia,
      arbitrumSepolia,
      bscTestnet,
    ],
    // transports: {},

    // Required API Keys
    walletConnectProjectId: "",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};