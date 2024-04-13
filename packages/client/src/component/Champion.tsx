import { useChampion } from "../hooks/useChampion";
import { ChampionImage } from "./ChampionImage";

export function Champion() {
  const { championSoldiersAmount } = useChampion();
  return (
    <div>
      <div className="absolute flex items-center justify-center w-60 h-60 rounded-full bg-[url('/assets/eth.png')] bg-contain left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="absolute -top-8 text-2xl -mt-4">soldiers: {Number(championSoldiersAmount || 0)}</div>
        <div className="">
          <ChampionImage />
        </div>
      </div>
    </div>
  );
}
