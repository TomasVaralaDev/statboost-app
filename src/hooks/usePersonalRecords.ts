import { useMemo } from "react";
import type { Workout } from "../types/workout";

export const usePersonalRecords = (workouts: Workout[]) => {
  return useMemo(() => {
    const records: Record<string, number> = {};
    workouts.forEach((w) => {
      w.exercises.forEach((ex) => {
        const maxWeight = Math.max(...ex.sets.map((s) => s.weight || 0));
        if (!records[ex.name] || maxWeight > records[ex.name]) {
          records[ex.name] = maxWeight;
        }
      });
    });
    return Object.entries(records)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [workouts]);
};
