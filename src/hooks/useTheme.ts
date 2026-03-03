import { useState, useEffect } from "react";

export type ThemeColor = "default" | "blue" | "red" | "orange" | "purple";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeColor>(() => {
    return (localStorage.getItem("statboost-theme") as ThemeColor) || "default";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Poistetaan kaikki mahdolliset teemaluokat
    root.classList.remove(
      "theme-blue",
      "theme-red",
      "theme-orange",
      "theme-purple",
    );

    // Lisätään uusi, jos se ei ole default
    if (theme !== "default") {
      root.classList.add(`theme-${theme}`);
    }

    localStorage.setItem("statboost-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
