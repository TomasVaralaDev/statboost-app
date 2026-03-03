import { type TrainingProgram } from "../../data/workoutTemplates";

interface ProgramSelectorModalProps {
  programs: TrainingProgram[];
  activeProgramId: string;
  onSelect: (program: TrainingProgram) => void;
  onClose: () => void;
  onCreateNew: () => void;
}

export const ProgramSelectorModal = ({
  programs,
  activeProgramId,
  onSelect,
  onClose,
  onCreateNew,
}: ProgramSelectorModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-content uppercase tracking-wide">
            Training Plans
          </h3>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {programs.map((prog) => (
            <button
              key={prog.id}
              onClick={() => {
                onSelect(prog);
                onClose();
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all group ${
                activeProgramId === prog.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-800 bg-base hover:border-gray-600"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`font-bold uppercase tracking-wide ${
                    activeProgramId === prog.id
                      ? "text-primary"
                      : "text-content"
                  }`}
                >
                  {prog.name}
                </span>
                {activeProgramId === prog.id && (
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-black uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-content-muted group-hover:text-content leading-relaxed">
                {prog.description}
              </p>
            </button>
          ))}
        </div>

        <div className="p-4 bg-base/50 border-t border-gray-800 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onCreateNew();
            }}
            className="w-full py-3 bg-primary/10 border border-primary/30 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs"
          >
            + Create Your Own Plan
          </button>
          <button
            onClick={onClose}
            className="text-xs font-bold text-content-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};
