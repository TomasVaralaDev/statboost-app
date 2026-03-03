import { useNavigate, useParams } from "react-router-dom";
import { useWorkouts } from "../hooks/useWorkouts";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import { useRestTimer } from "../hooks/useRestTimer";
import type { Workout } from "../types/workout";

export const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, updateWorkout, deleteWorkout, isLoading } = useWorkouts();
  const { isActive } = useRestTimer();

  const workout = workouts.find((w) => w.id === id);

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
      if (id && workout.userId) {
        await updateWorkout(workout.userId, id, workoutData);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating session.");
    }
  };

  // UUSI: Poistologiikka
  const handleDelete = async () => {
    if (
      window.confirm(
        "ARE YOU SURE YOU WANT TO DELETE THIS MISSION? DATA WILL BE LOST FOREVER.",
      )
    ) {
      try {
        if (id) {
          await deleteWorkout(id);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete mission.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-40 px-4 md:px-0">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-6">
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

        {/* UUSI: Poistonappi yläreunassa */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 border border-danger/20 text-danger/40 hover:bg-danger/10 hover:text-danger rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Delete Mission
        </button>
      </div>

      <WorkoutForm
        onSave={handleSave}
        onCancel={() => navigate("/")}
        initialWorkout={workout}
        onSetCompleted={() => {}}
        isResting={isActive}
      />
    </div>
  );
};
