import { useState, useRef, useEffect } from "react";
import { exerciseLibrary } from "../../data/exercises";

interface ExerciseAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExerciseAutocomplete = ({
  value,
  onChange,
}: ExerciseAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Suodatetaan liikelistaa syötteen perusteella (case-insensitive)
  const filteredExercises = exerciseLibrary.filter((ex) =>
    ex.toLowerCase().includes(value.toLowerCase()),
  );

  // Suljetaan pudotusvalikko, jos käyttäjä klikkaa sen ulkopuolelle
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Exercise Name (e.g. Bench Press)"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        required
        className="w-full bg-transparent border-b border-gray-700 focus:border-primary outline-none py-1 text-lg text-content transition-colors"
      />

      {/* Pudotusvalikko (näytetään vain jos auki, tekstiä on kirjoitettu ja osumia löytyy) */}
      {isOpen && value && filteredExercises.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-surface border border-gray-700 rounded-lg shadow-xl max-h-48 overflow-auto">
          {filteredExercises.map((ex) => (
            <li
              key={ex}
              onClick={() => {
                onChange(ex); // Asetetaan valittu arvo
                setIsOpen(false); // Suljetaan valikko
              }}
              className="px-4 py-3 hover:bg-gray-800 cursor-pointer text-content transition-colors border-b border-gray-800 last:border-0"
            >
              {ex}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
