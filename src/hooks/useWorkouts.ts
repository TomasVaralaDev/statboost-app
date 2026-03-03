import { useState, useEffect, useCallback } from "react";
import { workoutService } from "../services/workoutService";
// Tuodaan Exercise-tyyppi
import type { Workout, Exercise } from "../types/workout";
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
      setError(
        err instanceof Error ? err.message : "Treenien haku epäonnistui.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const addWorkout = async (workoutData: Omit<Workout, "id" | "userId">) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");
    const newWorkout: Workout = { ...workoutData, userId: user.uid };
    await workoutService.createWorkout(newWorkout);
    await fetchWorkouts();
  };

  const updateWorkout = async (
    userId: string,
    id: string,
    workoutData: Omit<Workout, "id" | "userId">,
  ) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");
    await workoutService.updateWorkout(userId, id, workoutData);
    await fetchWorkouts();
  };

  const deleteWorkout = async (id: string) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");
    await workoutService.deleteWorkout(user.uid, id);
    await fetchWorkouts();
  };

  // KORJATTU: any[] korvattu Exercise[]-tyypillä
  const saveAsTemplate = async (name: string, exercises: Exercise[]) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");
    await workoutService.createTemplate(user.uid, { name, exercises });
  };

  return {
    workouts,
    isLoading,
    error,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    saveAsTemplate,
    refreshWorkouts: fetchWorkouts,
  };
};
