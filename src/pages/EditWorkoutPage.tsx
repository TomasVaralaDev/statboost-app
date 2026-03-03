import { useParams, useNavigate } from "react-router-dom";
import { useWorkout } from "../hooks/useWorkout";
import { workoutService } from "../services/workoutService";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import type { Workout } from "../types/workout";

export const EditWorkoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workout, isLoading, error } = useWorkout(id);

  const handleSave = async (workoutData: Omit<Workout, "id" | "userId">) => {
    if (!id) return;
    try {
      await workoutService.updateWorkout(id, workoutData);
      navigate(`/workout/${id}`); // Palataan treenin yksityiskohtiin tallennuksen jälkeen
    } catch (err) {
      console.error("Failed to update workout:", err);
      alert("Could not update workout. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl font-bold text-content-muted animate-pulse">
          Loading workout data...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="p-4 text-danger bg-danger/20 border border-danger/50 rounded-lg">
        {error || "Workout not found."}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/workout/${id}`)}
          className="text-content-muted hover:text-primary transition-colors focus:outline-none"
        >
          ← Cancel
        </button>
        <h2 className="text-3xl font-bold text-content uppercase tracking-wide">
          Edit Workout
        </h2>
      </div>

      <WorkoutForm
        onSave={handleSave}
        onCancel={() => navigate(`/workout/${id}`)}
        initialWorkout={workout}
      />
    </div>
  );
};
