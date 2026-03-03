import { useState, useEffect, useCallback } from "react";
import { workoutService } from "../services/workoutService";
import type { Workout } from "../types/workout";
import { useAuth } from "./useAuth";

export const useWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Käytetään useCallbackia, jotta funktiota voi turvallisesti käyttää useEffectissä
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

  // Haetaan treenit automaattisesti, kun komponentti ladataan
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  // Apufunktio uuden treenin lisäämiseen
  const addWorkout = async (workoutData: Omit<Workout, "id" | "userId">) => {
    if (!user) throw new Error("Käyttäjä ei ole kirjautunut sisään");

    // Poistettu turha try/catch. Mahdolliset virheet nousevat suoraan
    // kutsuvalle komponentille (esim. DashboardPage), joka voi käsitellä ne.
    const newWorkout: Workout = {
      ...workoutData,
      userId: user.uid,
    };

    await workoutService.createWorkout(newWorkout);
    await fetchWorkouts(); // Päivitetään lista onnistuneen tallennuksen jälkeen
  };

  return {
    workouts,
    isLoading,
    error,
    addWorkout,
    refreshWorkouts: fetchWorkouts,
  };
};
