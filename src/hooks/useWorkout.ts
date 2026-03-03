import { useState, useEffect, useCallback } from "react";
import { workoutService } from "../services/workoutService";
import { useAuth } from "./useAuth";
import type { Workout } from "../types/workout";

export const useWorkout = (workoutId: string | undefined) => {
  const { user } = useAuth();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkout = useCallback(async () => {
    if (!user || !workoutId) return;

    setIsLoading(true);
    try {
      const data = await workoutService.getWorkout(user.uid, workoutId);
      setWorkout(data);
    } catch {
      setError("Failed to load workout details.");
    } finally {
      setIsLoading(false);
    }
  }, [user, workoutId]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  const deleteWorkout = async () => {
    if (!user || !workoutId) return false;
    try {
      await workoutService.deleteWorkout(user.uid, workoutId);
      return true;
    } catch {
      return false;
    }
  };

  return {
    workout,
    isLoading,
    error,
    deleteWorkout,
    refreshWorkout: fetchWorkout,
  };
};
