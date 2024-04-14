import { getChainImage } from "../utils/getChainImage";

export function BattleLogsText({
  log,
}: {
  log: {
    timestamp: bigint;
    fromChainId: bigint;
    fromAmount: bigint;
    initChampion: bigint;
    initAmount: bigint;
    laterChampion: bigint;
    laterAmount: bigint;
  };
}) {
  if (log.fromChainId === log.initChampion) {
    return (
      <div className="flex flex-row">
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.initChampion))}
        ></img>
        <div>
          solder increase from ${Number(log.initAmount)} to $
          {Number(log.laterAmount)}
        </div>
      </div>
    );
  } else if (log.initChampion === log.laterChampion) {
    return (
      <div className="flex flex-row">
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.fromChainId))}
        ></img>
        <div>attacked</div>
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.initChampion))}
        ></img>
        <div>with {Number(log.fromAmount)} soldiers but failed. </div>
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.initChampion))}
        ></img>
        <div>soldiers decrease to {Number(log.laterAmount)}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.fromChainId))}
        ></img>
        <div>attacked</div>
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.initChampion))}
        ></img>
        <div>
          with {Number(log.fromAmount)} soldiers and win. The new champion is
        </div>
        <img
          className="w-5 h-5 m-1"
          src={getChainImage(Number(log.laterChampion))}
        ></img>
        <div>with {Number(log.laterAmount)} soldiers</div>
      </div>
    );
  }
}
