import { useNavigate, useParams } from "react-router-dom";
import { useWorkouts } from "../hooks/useWorkouts";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import { useRestTimer } from "../hooks/useRestTimer";
import type { Workout } from "../types/workout";

export const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // updateWorkout on nyt saatavilla hookista
  const { workouts, updateWorkout, isLoading } = useWorkouts();
  const { isActive } = useRestTimer();

  const workout = workouts.find((w) => w.id === id);

  // Käsitellään lataustila ja puuttuva treeni
  if (isLoading)
    return (
      <div className="p-8 text-primary animate-pulse uppercase font-black">
        Loading Mission Data...
      </div>
    );
  if (!workout)
    return (
      <div className="p-8 text-white uppercase font-black">
        Workout not found.
      </div>
    );

  const handleSave = async (workoutData: Omit<Workout, "id" | "userId">) => {
    try {
      if (id) {
        await updateWorkout(id, workoutData);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating session.");
    }
  };

  const handleSetCompleted = (weight: number) => {
    console.log("Edit mode: Set completed with weight:", weight);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-40 px-4 md:px-0">
      <div className="flex items-center gap-6 pt-4">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center bg-surface border border-gray-800 rounded-xl text-white/40 hover:text-primary transition-all"
        >
          ←
        </button>
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Edit Mission
          </h2>
          <p className="text-primary font-bold uppercase text-[9px] tracking-[0.4em] mt-1">
            Status: Modifying Data
          </p>
        </div>
      </div>

      <WorkoutForm
        onSave={handleSave}
        onCancel={() => navigate("/")}
        initialWorkout={workout}
        onSetCompleted={handleSetCompleted}
        isResting={isActive}
      />
    </div>
  );
};
