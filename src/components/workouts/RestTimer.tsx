import { useState } from "react";
import { PlateCalculator } from "./PlateCalculator";

interface RestTimerProps {
  seconds: number;
  onAdjust: (amount: number) => void;
  onSkip: () => void;
  currentWeight?: number;
}

export const RestTimer = ({
  seconds,
  onAdjust,
  onSkip,
  currentWeight,
}: RestTimerProps) => {
  const [showPlates, setShowPlates] = useState(false);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-in slide-in-from-bottom duration-300">
      {/* HUD Bar */}
      <div className="bg-surface/95 backdrop-blur-md border-t-2 border-primary p-4 pb-8 md:pb-6 shadow-[0_-10px_40px_rgba(var(--primary),0.2)]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Time & Title */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none mb-1">
                Recovery
              </span>
              <div className="text-4xl font-black text-white italic tabular-nums leading-none">
                {minutes}:{secs < 10 ? `0${secs}` : secs}
              </div>
            </div>

            {currentWeight && (
              <button
                onClick={() => setShowPlates(true)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/60 uppercase hover:text-primary hover:border-primary/40 transition-all"
              >
                Load: {currentWeight}kg
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onAdjust(-30)}
              className="flex-1 md:px-6 py-3 bg-base border border-gray-800 rounded-xl text-white font-black hover:border-primary transition-all active:scale-90"
            >
              -30s
            </button>
            <button
              onClick={onSkip}
              className="flex-1 md:px-8 py-3 bg-primary text-white font-black rounded-xl hover:brightness-110 active:scale-90 uppercase text-xs tracking-widest shadow-lg shadow-primary/20"
            >
              Skip
            </button>
            <button
              onClick={() => onAdjust(30)}
              className="flex-1 md:px-6 py-3 bg-base border border-gray-800 rounded-xl text-white font-black hover:border-primary transition-all active:scale-90"
            >
              +30s
            </button>
          </div>
        </div>
      </div>

      {showPlates && currentWeight && (
        <PlateCalculator
          weight={currentWeight}
          onClose={() => setShowPlates(false)}
        />
      )}
    </div>
  );
};
