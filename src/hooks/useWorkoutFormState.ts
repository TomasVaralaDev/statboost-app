import { useState } from "react";
import type { Workout, Exercise } from "../types/workout";
import type { WorkoutTemplate } from "../data/workoutTemplates";

export const useWorkoutFormState = (
  onSetCompleted: (weight: number) => void,
  initialTemplate?: WorkoutTemplate,
  initialWorkout?: Workout,
) => {
  const [name, setName] = useState(
    initialWorkout
      ? initialWorkout.name
      : initialTemplate
        ? initialTemplate.name
        : "New Session",
  );

  const [exercises, setExercises] = useState<Exercise[]>(() => {
    if (initialWorkout) return initialWorkout.exercises;
    if (initialTemplate) {
      return initialTemplate.exercises.map((exName) => ({
        id: crypto.randomUUID(),
        name: exName,
        sets: [
          { id: crypto.randomUUID(), reps: 0, weight: 0, completed: false },
        ],
      }));
    }
    return [];
  });

  const handleAddExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        sets: [
          { id: crypto.randomUUID(), reps: 0, weight: 0, completed: false },
        ],
      },
    ]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const updateExerciseName = (id: string, newName: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, name: newName } : ex)),
    );
  };

  const handleAddSet = (exId: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: crypto.randomUUID(),
                  reps: 0,
                  weight: 0,
                  completed: false,
                },
              ],
            }
          : ex,
      ),
    );
  };

  const toggleSet = (exId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => {
            if (s.id !== setId) return s;
            if (!s.completed) onSetCompleted(s.weight || 20);
            return { ...s, completed: !s.completed };
          }),
        };
      }),
    );
  };

  const updateSet = (
    exId: string,
    setId: string,
    field: "reps" | "weight",
    val: number,
  ) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, [field]: val } : s,
              ),
            }
          : ex,
      ),
    );
  };

  return {
    name,
    setName,
    exercises,
    handleAddExercise,
    handleRemoveExercise,
    updateExerciseName,
    handleAddSet,
    toggleSet,
    updateSet,
  };
};
