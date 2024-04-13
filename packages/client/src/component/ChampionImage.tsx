import { useChampion } from "../hooks/useChampion";
import { getChainImage } from "../utils/getChainImage";

export function ChampionImage() {
  const { champion } = useChampion();

  if (!champion) {
    return <div></div>;
  } else {
    return (
      <img className="w-24 h-24" src={getChainImage(Number(champion))}></img>
    );
  }
}
