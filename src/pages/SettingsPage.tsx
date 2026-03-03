import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { useTheme, type ThemeColor } from "../hooks/useTheme";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [defaultRest, setDefaultRest] = useState(
    localStorage.getItem("defaultRestTime") || "90",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const themeOptions: { id: ThemeColor; name: string; colorClass: string }[] = [
    { id: "default", name: "Emerald", colorClass: "bg-emerald-500" },
    { id: "blue", name: "Blue", colorClass: "bg-blue-500" },
    { id: "red", name: "Red", colorClass: "bg-red-500" },
  ];

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authService.updateUserProfile(displayName);
      localStorage.setItem("defaultRestTime", defaultRest);
      alert("Settings saved!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-10 px-2">
      <div className="flex items-center gap-4 border-b-2 border-gray-800 pb-6">
        <button
          onClick={() => navigate("/")}
          className="text-white/40 hover:text-primary transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          Settings
        </h2>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        <section className="space-y-6">
          <h3 className="text-xl font-black text-primary uppercase italic tracking-wider">
            Training Controls
          </h3>
          <div className="p-8 bg-surface border-2 border-gray-800 rounded-3xl shadow-xl space-y-6">
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">
                Default Rest Time (seconds)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="15"
                  value={defaultRest}
                  onChange={(e) => setDefaultRest(e.target.value)}
                  className="flex-1 accent-primary h-2 bg-base rounded-full appearance-none cursor-pointer"
                />
                <span className="text-2xl font-black text-white italic w-20 text-right">
                  {defaultRest}s
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase italic tracking-wider">
            Profile & Theme
          </h3>
          <div className="p-8 bg-surface border-2 border-gray-800 rounded-3xl shadow-xl space-y-6">
            <div>
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-base border border-gray-800 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all ${theme === t.id ? "border-primary bg-primary/10 text-primary font-black" : "border-gray-800 text-white/40 hover:border-gray-600"}`}
                >
                  <span
                    className={`w-4 h-4 rounded-full ${t.colorClass}`}
                  ></span>{" "}
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-primary text-white font-black uppercase rounded-2xl shadow-xl hover:bg-primary/90 transition-all active:scale-95"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
};
