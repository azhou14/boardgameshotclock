import { useState, useEffect } from "react";
import type { GameAction } from "@/gameReducer";

interface UseGameTimerProps {
  phase: "SETUP" | "RUNNING" | "PAUSED" | "EXPIRED";
  endTime: number | null;
  remainingMs: number;
  dispatch: React.Dispatch<GameAction>;
}

export function useGameTimer({
  phase,
  endTime,
  remainingMs,
  dispatch,
}: UseGameTimerProps) {
  // Calculate current remaining time
  const calculateRemaining = (): number => {
    if (phase === "PAUSED") {
      return remainingMs;
    }
    if (phase === "RUNNING" && endTime !== null) {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      return remaining;
    }
    return remainingMs;
  };

  const [displayMs, setDisplayMs] = useState(calculateRemaining());

  useEffect(() => {
    if (phase !== "RUNNING" || endTime === null) {
      return;
    }

    // Interval updates display every 50ms for smooth countdown
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      setDisplayMs(remaining);

      // Timer expired
      if (remaining === 0) {
        console.log("Timer expired!");
        dispatch({ type: "EXPIRE" });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, endTime, dispatch]);

  // Update display when paused or phase changes
  useEffect(() => {
    if (phase === "PAUSED") {
      setDisplayMs(remainingMs);
    } else if (phase === "EXPIRED") {
      setDisplayMs(0);
    }
  }, [phase, remainingMs]);

  return displayMs;
}
