import { useState, useEffect, useCallback, useRef } from "react";

export const useRestTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setTimeLeft(null);
  }, []);

  // Efekti 1: Laskurin tikitys
  useEffect(() => {
    if (isActive && timeLeft !== null && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft]);

  // Efekti 2: Valmistumisen käsittely asynkronisesti (Korjaa ESLint-virheen)
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      const timeoutId = setTimeout(() => {
        stopTimer();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [timeLeft, isActive, stopTimer]);

  const startTimer = useCallback((seconds: number) => {
    // Tyhjennetään mahdollinen vanha kello ennen uuden aloitusta
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }
    setTimeLeft(seconds);
    setIsActive(true);
  }, []);

  const adjustTimer = useCallback((seconds: number) => {
    setTimeLeft((prev) => (prev !== null ? Math.max(0, prev + seconds) : null));
  }, []);

  return { timeLeft, isActive, startTimer, adjustTimer, stopTimer };
};
