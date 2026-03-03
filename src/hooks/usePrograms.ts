import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { programService } from "../services/programService";
import {
  trainingPrograms,
  type TrainingProgram,
} from "../data/workoutTemplates";

export const usePrograms = () => {
  const { user } = useAuth();
  const [customPrograms, setCustomPrograms] = useState<TrainingProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrograms = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Tämä hakee nyt myös uudet tallennetut pohjat
      const programs = await programService.getUserPrograms(user.uid);
      setCustomPrograms(programs);
    } catch (error) {
      console.error("Failed to load custom programs", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const allPrograms = [...trainingPrograms, ...customPrograms];

  return {
    allPrograms,
    customPrograms,
    isLoading,
    refreshPrograms: fetchPrograms,
  };
};
