export const DashboardHeader = () => (
  <header className="flex flex-col gap-2 px-2 relative">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
        Dashboard
      </h2>
    </div>
    <p className="text-sm md:text-lg text-white/50 font-bold italic ml-5">
      Mission status: <span className="text-primary uppercase">Ready.</span>
    </p>
  </header>
);
