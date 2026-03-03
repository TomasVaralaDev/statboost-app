import { useState, useEffect, useCallback } from "react";
import { workoutService } from "../services/workoutService";
import type { Workout } from "../types/workout";
import { useAuth } from "./useAuth";

export const useWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await workoutService.getUserWorkouts(user.uid);
      setWorkouts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Treenien haku epäonnistui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const addWorkout = async (workoutData: Omit<Workout, "id" | "userId">) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");

    const newWorkout: Workout = {
      ...workoutData,
      userId: user.uid,
    };

    await workoutService.createWorkout(newWorkout);
    await fetchWorkouts();
  };

  // KORJATTU: Lisätty user.uid kolmanneksi argumentiksi
  const updateWorkout = async (
    id: string,
    workoutData: Omit<Workout, "id" | "userId">,
  ) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");

    // Välitetään userId, workoutId ja data (varmista järjestys workoutService.ts:stä)
    await workoutService.updateWorkout(user.uid, id, workoutData);
    await fetchWorkouts();
  };

  return {
    workouts,
    isLoading,
    error,
    addWorkout,
    updateWorkout,
    refreshWorkouts: fetchWorkouts,
  };
};
