import type { Workout } from "../../types/workout";

interface RecentWorkoutsListProps {
  workouts: Workout[];
  onNavigate: (id: string) => void;
}

export const RecentWorkoutsList = ({
  workouts,
  onNavigate,
}: RecentWorkoutsListProps) => (
  <section className="space-y-6">
    <h3 className="text-xl font-black text-white uppercase tracking-wider border-b border-gray-800 pb-4">
      Recent Workouts
    </h3>
    <div className="grid gap-4 sm:grid-cols-2">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          // Lisätty tarkistus: onNavigate kutsutaan vain jos workout.id on olemassa
          onClick={() => workout.id && onNavigate(workout.id)}
          className="p-5 flex justify-between items-center bg-surface border-2 border-gray-800 rounded-2xl shadow-lg cursor-pointer hover:border-primary active:bg-gray-800 transition-all group"
        >
          <div className="min-w-0 flex-1">
            <h4 className="font-black text-white uppercase italic truncate group-hover:text-primary transition-colors">
              {workout.name}
            </h4>
            <p className="text-[10px] text-white/40 font-bold uppercase">
              {workout.exercises.length} exercises
            </p>
          </div>
          <span className="text-[10px] font-black px-2 py-1 bg-base text-white/70 rounded-md border border-gray-800 uppercase tracking-tighter">
            {workout.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  </section>
);
