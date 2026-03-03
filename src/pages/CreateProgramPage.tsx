import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { programService } from "../services/programService";
import { ExerciseAutocomplete } from "../components/workouts/ExerciseAutocomplete";
import type { WorkoutTemplate } from "../data/workoutTemplates";

export const CreateProgramPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [templates, setTemplates] = useState<Omit<WorkoutTemplate, "id">[]>([
    { name: "Day 1", description: "", exercises: [""] },
  ]);

  const addRoutine = () => {
    setTemplates([
      ...templates,
      {
        name: `Day ${templates.length + 1}`,
        description: "",
        exercises: [""],
      },
    ]);
  };

  const removeRoutine = (index: number) => {
    if (templates.length > 1) {
      setTemplates(templates.filter((_, i) => i !== index));
    }
  };

  // KORJAUS: Poistettu 'any' ja käytetty spread-operaattoria tyyppiturvalliseen päivitykseen
  const updateRoutine = (
    index: number,
    field: keyof Omit<WorkoutTemplate, "id">,
    value: string,
  ) => {
    if (field === "exercises") return;

    setTemplates((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addExercise = (rIndex: number) => {
    const updated = [...templates];
    updated[rIndex].exercises.push("");
    setTemplates(updated);
  };

  const updateExercise = (rIndex: number, eIndex: number, value: string) => {
    const updated = [...templates];
    updated[rIndex].exercises[eIndex] = value;
    setTemplates(updated);
  };

  const removeExercise = (rIndex: number, eIndex: number) => {
    const updated = [...templates];
    if (updated[rIndex].exercises.length > 1) {
      updated[rIndex].exercises.splice(eIndex, 1);
      setTemplates(updated);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name) return;

    setIsSubmitting(true);
    try {
      const finalTemplates = templates.map((t) => ({
        ...t,
        id: crypto.randomUUID(),
      })) as WorkoutTemplate[];

      await programService.createProgram(user.uid, {
        name,
        description,
        templates: finalTemplates,
      });

      navigate("/");
    } catch {
      // KORJAUS: Poistettu käyttämätön 'err' muuttuja
      alert("Failed to save program. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <header className="flex items-center gap-4 border-b border-gray-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-content-muted hover:text-primary transition-colors focus:outline-none"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-black text-content uppercase tracking-tight">
          Create Plan
        </h2>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="p-6 bg-surface border border-gray-800 rounded-2xl space-y-4 shadow-xl">
          <div className="space-y-2">
            <label className="text-xs font-bold text-content-muted uppercase tracking-widest">
              Plan Name
            </label>
            <input
              type="text"
              placeholder="e.g. Hypertrophy Split"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-base border border-gray-700 rounded-xl p-4 text-xl font-bold text-content focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-content-muted uppercase tracking-widest">
              Description (Optional)
            </label>
            <textarea
              placeholder="What is the goal of this plan?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-base border border-gray-700 rounded-xl p-4 text-content-muted outline-none h-24 resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          {templates.map((routine, rIndex) => (
            <div
              key={rIndex}
              className="p-6 bg-surface border border-gray-800 rounded-2xl space-y-6 relative group"
            >
              <button
                type="button"
                onClick={() => removeRoutine(rIndex)}
                className="absolute top-6 right-6 text-content-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all text-xs font-bold uppercase"
              >
                Remove Day
              </button>

              <div className="space-y-4">
                <input
                  type="text"
                  value={routine.name}
                  onChange={(e) =>
                    updateRoutine(rIndex, "name", e.target.value)
                  }
                  placeholder="Routine Name"
                  className="bg-transparent text-lg font-bold text-primary outline-none border-b border-transparent focus:border-primary pb-1"
                />

                <div className="space-y-3">
                  {routine.exercises.map((ex, eIndex) => (
                    <div key={eIndex} className="flex gap-2 items-center">
                      <ExerciseAutocomplete
                        value={ex}
                        onChange={(val) => updateExercise(rIndex, eIndex, val)}
                      />
                      {routine.exercises.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExercise(rIndex, eIndex)}
                          className="text-content-muted hover:text-danger p-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addExercise(rIndex)}
                    className="text-xs font-bold text-primary hover:text-white transition-colors"
                  >
                    + Add Exercise
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoutine}
            className="w-full py-4 border-2 border-dashed border-gray-800 rounded-2xl text-content-muted hover:text-primary transition-all font-bold uppercase tracking-widest text-sm"
          >
            + Add Another Day
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-primary-hover transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Saving Plan..." : "Save Training Plan"}
        </button>
      </form>
    </div>
  );
};
