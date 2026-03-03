import type { Exercise } from "../../types/workout";
import { ExerciseAutocomplete } from "./ExerciseAutocomplete";
import { SetItem } from "./SetItem";

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  onRemove: () => void;
  onUpdateName: (name: string) => void;
  onAddSet: () => void;
  onUpdateSet: (setId: string, field: "reps" | "weight", val: number) => void;
  onToggleSet: (setId: string) => void;
  onCalc: (weight: number) => void;
}

export const ExerciseItem = ({
  exercise,
  index,
  onRemove,
  onUpdateName,
  onAddSet,
  onUpdateSet,
  onToggleSet,
  onCalc,
}: ExerciseItemProps) => (
  <div className="relative group bg-surface border-2 border-gray-800 rounded-[2rem] p-6 md:p-8 shadow-xl overflow-hidden">
    <div className="absolute -top-4 -right-4 opacity-[0.03] text-9xl font-black italic uppercase select-none pointer-events-none text-white">
      {index + 1}
    </div>
    <div className="relative z-10 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <ExerciseAutocomplete value={exercise.name} onChange={onUpdateName} />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-white/20 hover:text-danger transition-colors text-[10px] font-black uppercase tracking-widest"
        >
          Remove
        </button>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-4">
          <div className="col-span-2">Set</div>
          <div className="col-span-4">Weight</div>
          <div className="col-span-3">Reps</div>
          <div className="col-span-3 text-right">Status</div>
        </div>
        {exercise.sets.map((set, sIndex) => (
          <SetItem
            key={set.id}
            set={set}
            index={sIndex}
            onUpdate={(f, v) => onUpdateSet(set.id, f, v)}
            onToggle={() => onToggleSet(set.id)}
            onCalc={onCalc}
          />
        ))}
        <button
          type="button"
          onClick={onAddSet}
          className="w-full py-4 mt-2 bg-base/30 border-2 border-dashed border-gray-800 rounded-2xl text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-all"
        >
          + Add Set
        </button>
      </div>
    </div>
  </div>
);
