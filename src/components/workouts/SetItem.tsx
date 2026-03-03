import type { WorkoutSet } from "../../types/workout";
import { calculatePlates } from "../../utils/plateMath";

interface SetItemProps {
  set: WorkoutSet;
  index: number;
  onUpdate: (field: "reps" | "weight", val: number) => void;
  onToggle: () => void;
  onCalc?: (weight: number) => void;
}

export const SetItem = ({ set, index, onUpdate, onToggle }: SetItemProps) => {
  // Puhdas muuttuja renderöintiä varten, ei aiheuta sivuvaikutuksia
  const plateInfo = set.weight > 20 ? calculatePlates(set.weight) : null;

  return (
    <div
      className={`grid grid-cols-12 gap-3 items-start p-3 rounded-2xl transition-all duration-300 ${
        set.completed
          ? "bg-primary/5 border border-primary/20"
          : "bg-base/50 border border-gray-800/50"
      }`}
    >
      <div className="col-span-1 pt-3 text-center text-[10px] font-black text-white/20 uppercase">
        {index + 1}
      </div>

      <div className="col-span-5 flex flex-col gap-1.5">
        <div className="relative group/input">
          <input
            type="number"
            value={set.weight || ""}
            placeholder="0"
            // Tapahtumankäsittelijät ovat turvallisia paikkoja tilan muutoksille
            onChange={(e) => onUpdate("weight", Number(e.target.value))}
            className="w-full bg-base border border-gray-800 rounded-xl py-3 text-center text-white font-black focus:border-primary outline-none transition-all"
          />
        </div>

        {plateInfo && plateInfo.plates.length > 0 && (
          <div className="px-1 flex flex-wrap gap-x-2 gap-y-1 animate-in fade-in slide-in-from-top-1 duration-300">
            {plateInfo.plates.map((p, i) => (
              <span
                key={i}
                className="text-[9px] font-black uppercase tracking-tighter text-white/40"
              >
                {p.weight}kg x{p.count}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-3">
        <input
          type="number"
          value={set.reps || ""}
          placeholder="0"
          onChange={(e) => onUpdate("reps", Number(e.target.value))}
          className="w-full bg-base border border-gray-800 rounded-xl py-3 text-center text-white font-black focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="col-span-3 flex justify-end">
        <button
          type="button"
          onClick={() => onToggle()} // Varmistettu kutsu vain klikatessa
          className={`w-full py-3 rounded-xl flex items-center justify-center transition-all font-black text-xs italic tracking-widest ${
            set.completed
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "bg-gray-800 text-white/20 hover:text-white hover:border-gray-600"
          }`}
        >
          {set.completed ? "✓" : "DONE"}
        </button>
      </div>
    </div>
  );
};
