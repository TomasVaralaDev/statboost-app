import { calculateLevel } from "../../utils/levelLogic";

interface StatLevelCardProps {
  label: string;
  volume: number;
}

export const StatLevelCard = ({ label, volume }: StatLevelCardProps) => {
  const { level, progress } = calculateLevel(volume);

  return (
    <div className="bg-surface/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 group hover:border-primary/30 transition-all duration-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white italic uppercase leading-none">
              LVL {level}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-primary/60 tabular-nums uppercase tracking-tighter">
            {Math.floor(volume).toLocaleString()} KG
          </span>
        </div>
      </div>

      {/* HUD-tyylinen kapea progress-palkki */}
      <div className="relative h-1.5 bg-base rounded-full overflow-hidden border border-gray-800/30">
        <div
          className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.4)] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
