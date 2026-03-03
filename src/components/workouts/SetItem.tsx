import type { WorkoutSet } from "../../types/workout";
import { calculatePlates } from "../../utils/plateMath";

interface SetItemProps {
  set: WorkoutSet;
  index: number;
  onUpdate: (field: "reps" | "weight", val: number) => void;
  onToggle: () => void;
  onCalc?: (weight: number) => void;
  prevSet?: WorkoutSet; // Uusi prop historiallista vertailua varten
}

export const SetItem = ({
  set,
  index,
  onUpdate,
  onToggle,
  prevSet,
}: SetItemProps) => {
  // Lasketaan levyt renderöintiä varten
  const plateInfo = set.weight > 20 ? calculatePlates(set.weight) : null;

  return (
    <div
      className={`grid grid-cols-12 gap-3 items-start p-3 rounded-2xl transition-all duration-300 ${
        set.completed
          ? "bg-primary/5 border border-primary/20"
          : "bg-base/50 border border-gray-800/50"
      }`}
    >
      {/* Sarjanumero */}
      <div className="col-span-1 pt-3 text-center text-[10px] font-black text-white/20 uppercase">
        {index + 1}
      </div>

      {/* Painon syöttö ja HUD-infot */}
      <div className="col-span-5 flex flex-col gap-1.5">
        <div className="relative group/input">
          <input
            type="number"
            value={set.weight || ""}
            placeholder="0"
            onChange={(e) => onUpdate("weight", Number(e.target.value))}
            className="w-full bg-base border border-gray-800 rounded-xl py-3 text-center text-white font-black focus:border-primary outline-none transition-all"
          />
        </div>

        {/* Infokerros: Levyt ja Historiadata */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 px-1">
          {/* Automaattinen levylaskuri */}
          {plateInfo && plateInfo.plates.length > 0 && (
            <div className="flex flex-wrap gap-x-1 animate-in fade-in slide-in-from-top-1 duration-300">
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

          {/* Progressive Overload -haamu */}
          {prevSet && (
            <div className="ml-auto animate-in fade-in zoom-in duration-500">
              <span className="text-[9px] font-bold text-primary/40 uppercase tracking-tighter italic">
                Last: {prevSet.weight} kg × {prevSet.reps}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Toistojen syöttö */}
      <div className="col-span-3">
        <input
          type="number"
          value={set.reps || ""}
          placeholder="0"
          onChange={(e) => onUpdate("reps", Number(e.target.value))}
          className="w-full bg-base border border-gray-800 rounded-xl py-3 text-center text-white font-black focus:border-primary outline-none transition-all"
        />
      </div>

      {/* Kuittauspainike */}
      <div className="col-span-3 flex justify-end">
        <button
          type="button"
          onClick={() => onToggle()}
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
