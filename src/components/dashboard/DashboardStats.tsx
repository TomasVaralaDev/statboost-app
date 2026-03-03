import { useMemo } from "react";
import type { Workout } from "../../types/workout";

interface DashboardStatsProps {
  workouts: Workout[];
}

export const DashboardStats = ({ workouts }: DashboardStatsProps) => {
  // useMemo varmistaa, että nämä lasketaan uudelleen vain jos treenilista muuttuu
  const stats = useMemo(() => {
    let totalVolume = 0;
    let thisMonthCount = 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    workouts.forEach((workout) => {
      // Tarkistetaan onko treeni tehty tässä kuussa
      if (
        workout.date.getMonth() === currentMonth &&
        workout.date.getFullYear() === currentYear
      ) {
        thisMonthCount++;
      }

      // Lasketaan kokonaisvolyymi (paino * toistot kaikista sarjoista)
      workout.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          // Varmistetaan, että paino ja toistot ovat olemassa ja lukuja
          const weight = set.weight || 0;
          const reps = set.reps || 0;
          totalVolume += weight * reps;
        });
      });
    });

    return {
      totalWorkouts: workouts.length,
      totalVolume,
      thisMonthCount,
    };
  }, [workouts]);

  // Jos treenejä ei ole vielä ollenkaan, ei näytetä tilastoja
  if (workouts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Stat 1: Total Workouts */}
      <div className="p-5 bg-surface border border-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <span className="text-xs font-bold text-content-muted uppercase tracking-widest mb-1">
          Total Workouts
        </span>
        <span className="text-3xl font-black text-primary">
          {stats.totalWorkouts}
        </span>
      </div>

      {/* Stat 2: This Month */}
      <div className="p-5 bg-surface border border-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <span className="text-xs font-bold text-content-muted uppercase tracking-widest mb-1">
          This Month
        </span>
        <span className="text-3xl font-black text-content">
          {stats.thisMonthCount}
        </span>
      </div>

      {/* Stat 3: Total Volume */}
      <div className="p-5 bg-surface border border-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <span className="text-xs font-bold text-content-muted uppercase tracking-widest mb-1">
          Total Volume
        </span>
        <span className="text-3xl font-black text-primary italic">
          {stats.totalVolume > 999
            ? `${(stats.totalVolume / 1000).toFixed(1)}k`
            : stats.totalVolume}{" "}
          <span className="text-lg text-content-muted not-italic">kg</span>
        </span>
      </div>
    </div>
  );
};
