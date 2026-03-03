import { useMemo, useState } from "react";
import type { Workout } from "../../types/workout";

interface WorkoutCalendarProps {
  workouts: Workout[];
  onDateClick: (date: string) => void;
}

export const WorkoutCalendar = ({
  workouts,
  onDateClick,
}: WorkoutCalendarProps) => {
  const [viewDate, setViewDate] = useState(new Date());
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const calendarData = useMemo(() => {
    const viewMonth = viewDate.getMonth();
    const viewYear = viewDate.getFullYear();
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === viewMonth && today.getFullYear() === viewYear;

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysArray = [];
    for (let i = 0; i < startingDay; i++) daysArray.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObject = new Date(viewYear, viewMonth, d);
      const dateStr = dateObject.toDateString();
      const hasWorkout = workouts.some(
        (w) => w.date.toDateString() === dateStr,
      );
      daysArray.push({ day: d, hasWorkout, fullDateStr: dateStr });
    }

    const monthName = viewDate.toLocaleString("en-US", { month: "long" });
    return {
      days: daysArray,
      monthName,
      viewYear,
      todayDate: isCurrentMonth ? today.getDate() : null,
    };
  }, [workouts, viewDate]);

  const changeMonth = (offset: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1),
    );
  };

  return (
    <div className="p-8 bg-surface border border-gray-800 rounded-2xl shadow-xl h-full flex flex-col">
      {/* HEADER: Siistitty navigointi */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-content uppercase tracking-tight leading-tight">
            {calendarData.monthName}
          </h3>
          <span className="text-xs font-black text-primary italic tracking-widest">
            {calendarData.viewYear}
          </span>
        </div>

        {/* Tyylitelty navigointipalkki */}
        <div className="flex items-center bg-base border border-gray-800 rounded-xl p-1 shadow-inner">
          <button
            onClick={() => changeMonth(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-content-muted hover:text-primary hover:bg-surface transition-all font-bold"
          >
            ←
          </button>
          <button
            onClick={() => setViewDate(new Date())}
            className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-content-muted hover:text-white transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-content-muted hover:text-primary hover:bg-surface transition-all font-bold"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-4 mb-6 text-center">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-[10px] font-black text-content-muted tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {calendarData.days.map((item, index) => {
            if (item === null)
              return <div key={`empty-${index}`} className="aspect-square" />;
            const isToday = item.day === calendarData.todayDate;

            return (
              <button
                key={item.day}
                onClick={() => item.hasWorkout && onDateClick(item.fullDateStr)}
                disabled={!item.hasWorkout}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-base font-black transition-all border-2
                  ${
                    item.hasWorkout
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 cursor-pointer hover:scale-110 active:scale-95"
                      : "bg-transparent text-white border-gray-800/50 cursor-default"
                  }
                  ${isToday ? "ring-2 ring-primary ring-offset-4 ring-offset-surface" : ""}
                `}
              >
                {item.day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
