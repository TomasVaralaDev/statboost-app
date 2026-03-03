import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWorkouts } from "../hooks/useWorkouts";
import { WorkoutForm } from "../components/workouts/WorkoutForm";
import { RestTimer } from "../components/workouts/RestTimer";
import { useRestTimer } from "../hooks/useRestTimer";
import type { Workout } from "../types/workout";
import type { WorkoutTemplate } from "../data/workoutTemplates";

export const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addWorkout } = useWorkouts();
  const { timeLeft, isActive, startTimer, adjustTimer, stopTimer } =
    useRestTimer();

  // Tärkeää: seurataan viimeisintä painoa taukokelloa varten
  const [lastWeight, setLastWeight] = useState<number>(20);

  const template = location.state?.template as WorkoutTemplate | undefined;

  const handleSave = async (workoutData: Omit<Workout, "id" | "userId">) => {
    try {
      await addWorkout(workoutData);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error saving session.");
    }
  };

  const handleSetCompleted = (weight: number) => {
    setLastWeight(weight);
    const defaultRest = Number(localStorage.getItem("defaultRestTime")) || 90;
    startTimer(defaultRest);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-40 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-6 pt-4">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center bg-surface border border-gray-800 rounded-xl text-white/40 hover:text-primary transition-all"
        >
          ←
        </button>
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            {template ? "Mission" : "Custom"}
          </h2>
          <p className="text-primary font-bold uppercase text-[9px] tracking-[0.4em] mt-1">
            Status: Recording
          </p>
        </div>
      </div>

      <WorkoutForm
        onSave={handleSave}
        onCancel={() => navigate("/")}
        onSetCompleted={handleSetCompleted}
        isResting={isActive} // Kerrotaan lomakkeelle että kello on päällä
        initialTemplate={template}
      />

      {isActive && timeLeft !== null && (
        <RestTimer
          seconds={timeLeft}
          onAdjust={adjustTimer}
          onSkip={stopTimer}
          currentWeight={lastWeight} // Syötetään paino taukokellolle
        />
      )}
    </div>
  );
};
