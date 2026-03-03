interface PersonalRecordsCardProps {
  records: [string, number][];
}

export const PersonalRecordsCard = ({ records }: PersonalRecordsCardProps) => (
  <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
    <h3 className="text-xl font-black text-white uppercase tracking-wider">
      Personal Records
    </h3>
    <div className="bg-surface border-2 border-gray-800 rounded-3xl p-6 shadow-xl space-y-5">
      {records.map(([exercise, weight]) => (
        <div key={exercise} className="flex justify-between items-center group">
          <span className="text-xs font-black text-white/60 uppercase group-hover:text-white transition-colors">
            {exercise}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary italic leading-none">
              {weight}
            </span>
            <span className="text-[10px] font-black text-white/30 uppercase">
              kg
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
