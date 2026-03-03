import type { FormEvent } from "react";
import type { Workout } from "../../types/workout";
import type { WorkoutTemplate } from "../../data/workoutTemplates";
import { ExerciseItem } from "./ExerciseItem";
import { useWorkoutFormState } from "../../hooks/useWorkoutFormState";

interface WorkoutFormProps {
  onSave: (workout: Omit<Workout, "id" | "userId">) => Promise<void>;
  onCancel: () => void;
  onSetCompleted: (weight: number) => void;
  isResting: boolean;
  initialTemplate?: WorkoutTemplate;
  initialWorkout?: Workout;
}

export const WorkoutForm = ({
  onSave,
  onCancel,
  onSetCompleted,
  isResting,
  initialTemplate,
  initialWorkout,
}: WorkoutFormProps) => {
  const {
    name,
    setName,
    exercises,
    handleAddExercise,
    handleRemoveExercise,
    updateExerciseName,
    handleAddSet,
    toggleSet,
    updateSet,
  } = useWorkoutFormState(onSetCompleted, initialTemplate, initialWorkout);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ name, date: new Date(), exercises });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Session Title */}
      <div className="p-6 bg-surface border-2 border-gray-800 rounded-3xl shadow-xl">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-2 ml-1 text-white/40">
          Session Identifier
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent text-3xl font-black text-white italic outline-none border-b-2 border-gray-800 focus:border-primary transition-colors pb-2"
        />
      </div>

      {/* Exercises List */}
      <div className="space-y-8">
        {exercises.map((ex, exIndex) => (
          <ExerciseItem
            key={ex.id}
            exercise={ex}
            index={exIndex}
            onRemove={() => handleRemoveExercise(ex.id)}
            onUpdateName={(val) => updateExerciseName(ex.id, val)}
            onAddSet={() => handleAddSet(ex.id)}
            onUpdateSet={(setId, f, v) => updateSet(ex.id, setId, f, v)}
            onToggleSet={(setId) => toggleSet(ex.id, setId)}
            onCalc={() => {}} // Automaattinen SetItemissä
          />
        ))}

        <button
          type="button"
          onClick={handleAddExercise}
          className="w-full py-6 border-4 border-dashed border-gray-800 rounded-[2rem] text-sm font-black text-white/20 uppercase tracking-[0.4em] hover:border-primary/40 hover:text-primary/60 transition-all active:scale-[0.99]"
        >
          Add Exercise
        </button>
      </div>

      {/* Modern HUD Footer - Näkyy vain kun kello ei ole päällä */}
      {!isResting && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-lg border-t border-gray-800 p-4 pb-8 md:pb-6 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-3xl mx-auto flex gap-4 items-center">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-4 font-black text-white/20 hover:text-danger uppercase tracking-widest text-xs transition-colors"
            >
              Abort Mission
            </button>
            <button
              type="submit"
              className="flex-1 py-4 font-black text-white uppercase tracking-[0.2em] bg-primary rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20"
            >
              Complete Session
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
