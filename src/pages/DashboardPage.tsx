import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../hooks/useWorkouts";
import { usePrograms } from "../hooks/usePrograms";
import { usePersonalRecords } from "../hooks/usePersonalRecords";
import { useUserStats } from "../hooks/useUserStats";

// Komponentit
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ActiveProgramSection } from "../components/dashboard/ActiveProgramSection";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { WorkoutCalendar } from "../components/dashboard/WorkoutCalendar";
import { WorkoutPreviewList } from "../components/dashboard/WorkoutPreviewList";
import { ProgramSelectorModal } from "../components/dashboard/ProgramSelectorModal";
import { ProgressChart } from "../components/dashboard/ProgressChart";
import { PersonalRecordsCard } from "../components/dashboard/PersonalRecordsCard";
import { RecentWorkoutsList } from "../components/dashboard/RecentWorkoutsList";
import { StatLevelCard } from "../components/dashboard/StatLevelCard";

import type { Workout } from "../types/workout";
import type { WorkoutTemplate } from "../data/workoutTemplates";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { workouts, isLoading: workoutsLoading } = useWorkouts();
  const { allPrograms, isLoading: programsLoading } = usePrograms();
  const personalRecords = usePersonalRecords(workouts);
  const stats = useUserStats(workouts);

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null,
  );
  const [previewData, setPreviewData] = useState<{
    date: string;
    workouts: Workout[];
  } | null>(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  const activeProgram =
    allPrograms.find((p) => p.id === selectedProgramId) || allPrograms[0];

  if (programsLoading || (workoutsLoading && workouts.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-primary animate-pulse font-black uppercase tracking-[0.3em] px-4">
        STATBOOST LOADING...
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-20 pb-16 overflow-x-hidden">
      <DashboardHeader />

      {activeProgram && (
        <ActiveProgramSection
          program={activeProgram}
          onOpenModal={() => setIsProgramModalOpen(true)}
          onStartRoutine={(template: WorkoutTemplate) =>
            navigate("/create-workout", { state: { template } })
          }
          onQuickStart={() => navigate("/create-workout")}
        />
      )}

      {/* Analytiikka ja Aktiviteetti ylhäällä */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-2 items-stretch">
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">
            Growth Analytics
          </h3>
          <div className="flex-1">
            <ProgressChart workouts={workouts} />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">
            Activity
          </h3>
          <div className="flex-1">
            <WorkoutCalendar
              workouts={workouts}
              onDateClick={(dateStr: string) => {
                const ws = workouts.filter(
                  (w) => w.date.toDateString() === dateStr,
                );
                if (ws.length > 0)
                  setPreviewData({ date: dateStr, workouts: ws });
              }}
            />
          </div>
        </div>
      </div>

      {/* Alaosio: Suorituskyky ja Hahmon tasot vierekkäin */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-2">
        <div className="lg:col-span-3 space-y-12">
          {/* Performance Insightit ja Statsit */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              Performance Insights
            </h3>
            <DashboardStats workouts={workouts} />
          </section>

          {/* UUSI SIJAINTI: Character Attributes */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider italic">
              Character Attributes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatLevelCard label="Leg Power" volume={stats.Legs} />
              <StatLevelCard
                label="Push Strength"
                volume={stats.Chest + stats.Shoulders}
              />
              <StatLevelCard label="Back Dominance" volume={stats.Back} />
              <StatLevelCard label="Arm Precision" volume={stats.Arms} />
            </div>
          </section>

          <RecentWorkoutsList
            workouts={workouts.slice(0, 4)}
            onNavigate={(id: string) => navigate(`/workout/${id}`)}
          />
        </div>

        {/* PR-Kortti sivussa */}
        <div className="lg:col-span-2">
          <PersonalRecordsCard records={personalRecords} />
        </div>
      </div>

      {/* Modaalit pysyvät samoina */}
      {previewData && (
        <WorkoutPreviewList
          workouts={previewData.workouts}
          date={previewData.date}
          onClose={() => setPreviewData(null)}
        />
      )}

      {isProgramModalOpen && (
        <ProgramSelectorModal
          programs={allPrograms}
          activeProgramId={activeProgram?.id || ""}
          onSelect={(prog) => setSelectedProgramId(prog.id)}
          onClose={() => setIsProgramModalOpen(false)}
          onCreateNew={() => navigate("/create-program")}
        />
      )}
    </div>
  );
};
