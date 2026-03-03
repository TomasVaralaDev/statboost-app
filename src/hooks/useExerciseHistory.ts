import { useMemo } from "react";
import type { Workout, WorkoutSet } from "../types/workout";

export const useExerciseHistory = (
  workouts: Workout[],
  exerciseName: string,
  currentWorkoutId?: string,
): WorkoutSet[] | null => {
  return useMemo(() => {
    // SUOJATARKISTUS: Jos treenejä ei ole vielä ladattu, palautetaan null
    if (!workouts || !Array.isArray(workouts)) {
      return null;
    }

    // Luodaan kopio ja suodatetaan nykyinen treeni pois
    const previousWorkouts = [...workouts]
      .filter((w) => w.id !== currentWorkoutId)
      // Varmistetaan että pvm-vertailu onnistuu
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const workout of previousWorkouts) {
      const exercise = workout.exercises.find(
        (ex) => ex.name.toLowerCase() === exerciseName.toLowerCase(),
      );

      if (exercise && exercise.sets.length > 0) {
        return exercise.sets;
      }
    }
    return null;
  }, [workouts, exerciseName, currentWorkoutId]);
};
