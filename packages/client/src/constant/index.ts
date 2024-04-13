import { Hex } from "viem";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
} from "viem/chains";

export const TroyAddress = "0x10d5617ef73E62545F45017A0F85847c081b9fcE";

export const TrojanHorseAddress: Record<number, Hex> = {
  [optimismSepolia.id]: "0x70116e215a2188E4D0b2eC8df2f2F44B85e7B9BF",
  [arbitrumSepolia.id]: "0x9de2aF3C2c3B111b0BFa1e2a2068BeB74a1B9347",
  [baseSepolia.id]: "0xFE823dddB1e0f5162a1A500672FB06f11142fF14",
  [avalancheFuji.id]: "0xD8224921832bc7Fb86225B5092D7156c05751ef8",
  [bscTestnet.id]: "0x493A69ec1de995B5b0fB968Bc67022D1C54E490e",
};
