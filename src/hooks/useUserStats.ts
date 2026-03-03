import { useMemo } from "react";
// Tärkeä korjaus verbatimModuleSyntax-asetukselle
import type { Workout } from "../types/workout";
import { MUSCLE_GROUP_MAP } from "../data/muscleGroups";

export const useUserStats = (workouts: Workout[]) => {
  return useMemo(() => {
    // Alustetaan stats-objekti, joka vastaa MUSCLE_GROUP_MAP:ia
    const stats: Record<string, number> = {
      Chest: 0,
      Legs: 0,
      Back: 0,
      Shoulders: 0,
      Arms: 0,
    };

    workouts.forEach((workout) => {
      workout.exercises.forEach((ex) => {
        const group = MUSCLE_GROUP_MAP[ex.name] || "Other";
        const volume = ex.sets.reduce(
          (acc, set) => (set.completed ? acc + set.weight * set.reps : acc),
          0,
        );
        if (stats[group] !== undefined) stats[group] += volume;
      });
    });

    return stats;
  }, [workouts]);
};
