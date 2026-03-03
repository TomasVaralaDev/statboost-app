import { useMemo, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import type { Workout } from "../../types/workout";

interface ProgressChartProps {
  workouts: Workout[];
}

export const ProgressChart = ({ workouts }: ProgressChartProps) => {
  const allExerciseNames = useMemo(() => {
    const names = new Set<string>();
    workouts.forEach((w) =>
      w.exercises.forEach((ex) => {
        if (ex.name) names.add(ex.name);
      }),
    );
    return Array.from(names).sort();
  }, [workouts]);

  const [selectedExercise, setSelectedExercise] = useState(
    allExerciseNames[0] || "",
  );

  const chartData = useMemo(() => {
    if (!selectedExercise) return [];
    return workouts
      .filter((w) => w.exercises.some((ex) => ex.name === selectedExercise))
      .map((w) => {
        const exercise = w.exercises.find((ex) => ex.name === selectedExercise);
        const maxWeight = exercise
          ? Math.max(...exercise.sets.map((s) => s.weight || 0))
          : 0;
        return {
          date: w.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          weight: maxWeight,
          fullDate: w.date,
        };
      })
      .sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
  }, [workouts, selectedExercise]);

  if (workouts.length === 0 || allExerciseNames.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center p-8 bg-surface border-2 border-gray-800 rounded-3xl text-center text-white/40 italic">
        Not enough data yet. Keep training!
      </div>
    );
  }

  return (
    <div className="p-6 bg-surface border-2 border-gray-800 rounded-3xl shadow-xl h-full flex flex-col min-h-[400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-xl font-black text-white uppercase tracking-wider italic">
          Weight <span className="text-primary">Progress</span>
        </h3>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="bg-base border-2 border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:border-primary outline-none cursor-pointer"
        >
          {allExerciseNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Tärkeä korjaus: ResponsiveContainer tarvitsee selkeän korkeuden vanhemmaltaan */}
      <div
        className="flex-1 w-full"
        style={{ minHeight: "300px", minWidth: "0" }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          debounce={50} // Lisää pienen viiveen laskentaan vakauden parantamiseksi
        >
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="rgb(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit="kg"
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #374151",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
              }}
              itemStyle={{ color: "rgb(var(--primary))", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="rgb(var(--primary))"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorWeight)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
