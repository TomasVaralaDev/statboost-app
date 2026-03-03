import type { WorkoutTemplate } from "../../data/workoutTemplates";

interface ActiveProgramSectionProps {
  program: {
    name: string;
    description: string;
    templates: WorkoutTemplate[];
  };
  onOpenModal: () => void;
  onStartRoutine: (template: WorkoutTemplate) => void;
  onQuickStart: () => void;
}

export const ActiveProgramSection = ({
  program,
  onOpenModal,
  onStartRoutine,
  onQuickStart,
}: ActiveProgramSectionProps) => (
  <section className="space-y-8 px-2">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-gray-800 pb-6">
      <div className="space-y-1">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
          Protocol
        </span>
        <h3 className="text-3xl font-black text-white uppercase italic">
          {program.name}
        </h3>
      </div>
      <button
        onClick={onOpenModal}
        className="px-8 py-3 text-[10px] font-black uppercase bg-surface border-2 border-gray-800 rounded-2xl hover:border-primary transition-all active:scale-95 shadow-xl"
      >
        Switch Routine
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {program.templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onStartRoutine(template)}
          className="group relative p-6 bg-surface border-2 border-gray-800/50 rounded-3xl shadow-xl cursor-pointer hover:border-primary transition-all active:scale-95 min-h-[160px] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -top-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-8xl font-black italic uppercase select-none">
            {template.name[0]}
          </div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-wide group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <div className="pt-4 border-t border-gray-800/50 flex justify-between items-center">
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-md">
              {template.exercises.length} EXERCISES
            </span>
            <span className="text-primary font-black">→</span>
          </div>
        </div>
      ))}
      <div
        onClick={onQuickStart}
        className="p-6 bg-base border-2 border-dashed border-gray-800 rounded-3xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center min-h-[140px] group"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-gray-800 mb-2 group-hover:border-primary">
          <span className="text-2xl font-light text-white/40 group-hover:text-primary">
            +
          </span>
        </div>
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-primary">
          Quick Start
        </span>
      </div>
    </div>
  </section>
);
