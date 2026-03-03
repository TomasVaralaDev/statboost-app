import { useNavigate } from "react-router-dom";
import type { Workout } from "../../types/workout";

interface WorkoutPreviewListProps {
  workouts: Workout[];
  date: string;
  onClose: () => void;
}

export const WorkoutPreviewList = ({
  workouts,
  date,
  onClose,
}: WorkoutPreviewListProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Taustan tummennus (Backdrop) */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal-sisältö */}
      <div className="relative w-full max-w-md bg-surface border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-base/50">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
              Workouts on
            </p>
            <h3 className="text-lg font-bold text-content leading-tight">
              {formattedDate}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-base border border-gray-700 text-content-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => {
                navigate(`/workout/${workout.id}`);
                onClose();
              }}
              className="p-5 bg-base border border-gray-800 rounded-2xl hover:border-primary transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-content group-hover:text-primary transition-colors uppercase italic tracking-wide">
                  {workout.name}
                </h4>
                <span className="text-[10px] font-black text-content-muted uppercase tracking-widest bg-surface px-2 py-1 rounded-md border border-gray-800">
                  View →
                </span>
              </div>
              <div className="flex gap-4">
                <div className="text-[10px] font-bold text-content-muted uppercase">
                  <span className="text-primary mr-1">
                    {workout.exercises.length}
                  </span>{" "}
                  Exercises
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-base/30 border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3 text-xs font-black uppercase tracking-widest text-content-muted hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
