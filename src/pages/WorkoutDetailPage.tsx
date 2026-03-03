import { useParams, useNavigate } from "react-router-dom";
import { useWorkout } from "../hooks/useWorkout";

export const WorkoutDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workout, isLoading, error, deleteWorkout } = useWorkout(id);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this workout? This action cannot be undone.",
    );

    if (isConfirmed) {
      const success = await deleteWorkout();
      if (success) {
        navigate("/");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-xl font-bold text-white/40 animate-pulse">
          Loading workout details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-white/40 hover:text-primary transition-colors focus:outline-none"
        >
          ← Back to Dashboard
        </button>
        <div className="p-4 text-danger bg-danger/20 border border-danger/50 rounded-lg">
          {error || "Workout not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/40 hover:text-primary transition-colors focus:outline-none"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-wide">
              {workout.name}
            </h2>
            <p className="text-primary font-bold uppercase text-xs tracking-widest">
              {workout.date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-workout/${workout.id}`)}
            className="px-4 py-2 text-xs font-black text-white bg-surface border-2 border-gray-800 rounded-xl hover:border-primary transition-all active:scale-95 shadow-lg focus:outline-none"
          >
            EDIT
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-xs font-black text-danger border-2 border-danger/30 rounded-xl hover:bg-danger hover:text-white transition-all active:scale-95 focus:outline-none"
          >
            DELETE
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Lisätty varmistettu key {ex.id || index} */}
        {workout.exercises.map((ex, index) => (
          <div
            key={ex.id || index}
            className="p-6 bg-surface border-2 border-gray-800 rounded-3xl shadow-xl"
          >
            <h3 className="text-xl font-black text-white italic mb-4">
              <span className="text-primary mr-2">{index + 1}.</span>
              {ex.name}
            </h3>

            <div className="grid grid-cols-3 gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-2 border-b border-gray-800 pb-3 mb-3 text-center">
              <div>Set</div>
              <div>Weight (kg)</div>
              <div>Reps</div>
            </div>

            <div className="space-y-2">
              {ex.sets.map((set, sIndex) => (
                <div
                  key={set.id || sIndex}
                  className="grid grid-cols-3 gap-4 items-center py-2 bg-base/50 rounded-xl border border-gray-800 text-center"
                >
                  <div className="text-sm font-bold text-white/40">
                    {sIndex + 1}
                  </div>
                  <div className="font-black text-white">{set.weight}</div>
                  <div className="font-black text-white">{set.reps}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
