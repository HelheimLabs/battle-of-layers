export function getChainImage(chainId: number) {
  switch (chainId) {
    // bnb chain
    case 97:
      return "/assets/layers/bnb.png";
    // arb sepolia
    case 421614:
      return "/assets/layers/arb.png";
    // base sepolia
    case 84532:
      return "/assets/layers/base.png";
    // op sepolia
    case 11155420:
      return "/assets/layers/op.png";
    // fujin
    case 43113:
      return "/assets/layers/avax.png";
  }
}
