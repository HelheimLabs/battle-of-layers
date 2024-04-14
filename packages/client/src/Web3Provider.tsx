import { WagmiProvider, createConfig, http } from "wagmi";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  bscTestnet,
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
      baseSepolia,
    ],
    transports: {
      [avalancheFuji.id]: http(
        "https://avalanche-fuji-c-chain-rpc.publicnode.com"
      ),
      [optimismSepolia.id]: http("https://optimism-sepolia-rpc.publicnode.com"),
      [arbitrumSepolia.id]: http("https://arbitrum-sepolia-rpc.publicnode.com"),
      [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
      [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
      [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    },

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
