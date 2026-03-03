import { calculatePlates } from "../../utils/plateMath";

interface PlateCalculatorProps {
  weight: number;
  onClose: () => void;
}

export const PlateCalculator = ({ weight, onClose }: PlateCalculatorProps) => {
  const { plates, remainder } = calculatePlates(weight);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-base/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface border-2 border-primary rounded-[2.5rem] p-8 w-full max-w-sm shadow-[0_0_50px_rgba(var(--primary),0.4)]">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
            Loadout Analysis
          </span>
          <h3 className="text-4xl font-black text-white italic tracking-tighter mt-1">
            {weight} KG
          </h3>
          <p className="text-[10px] text-white/30 font-bold uppercase mt-2 italic">
            Standard 20kg Barbell
          </p>
        </div>

        <div className="space-y-3">
          {plates.length > 0 ? (
            plates.map((p) => (
              <div
                key={p.weight}
                className="flex items-center justify-between p-4 bg-base border border-gray-800 rounded-2xl group hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-10 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]`}
                  />
                  <span className="text-xl font-black text-white italic">
                    {p.weight} KG
                  </span>
                </div>
                <span className="text-2xl font-black text-primary">
                  x{p.count}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-white/40 italic py-4">
              Barbell only. No plates required.
            </p>
          )}
        </div>

        {remainder > 0 && (
          <div className="mt-4 p-3 bg-danger/10 border border-danger/20 rounded-xl text-center">
            <p className="text-[10px] font-black text-danger uppercase tracking-widest">
              Weight mismatch: {remainder}kg missing
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-8 py-4 bg-primary text-white font-black uppercase rounded-2xl hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-primary/20"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
