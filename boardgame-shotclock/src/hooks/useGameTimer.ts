import { useState, useEffect, useRef } from "react";
import type { GameAction } from "@/gameReducer";
import { alarmUrl } from "@/components/audio";

interface UseGameTimerProps {
  phase: "SETUP" | "RUNNING" | "PAUSED" | "EXPIRED";
  endTime: number | null;
  remainingMs: number;
  dispatch: React.Dispatch<GameAction>;
  vibrateEnabled: boolean;
}

export function useGameTimer({
  phase,
  endTime,
  remainingMs,
  dispatch,
  vibrateEnabled,
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

  // guard to prevent double-firing of side-effects (audio/vibrate/dispatch)
  const expiredFiredRef = useRef(false);

  useEffect(() => {
    if (phase !== "RUNNING" || endTime === null) {
      return;
    }

    expiredFiredRef.current = false;

    // prepare audio element (URL provided by audio index module)
    const alarm = new Audio(alarmUrl);

    // Interval updates display every 50ms for smooth countdown
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      setDisplayMs(remaining);

      // Timer expired
      if (remaining === 0 && !expiredFiredRef.current) {
        expiredFiredRef.current = true;
        console.log("Timer expired!");
        // play alarm (best-effort)
        try {
          alarm.currentTime = 0;
          void alarm.play();
        } catch (e) {
          // ignore play errors (autoplay policies)
        }

        // vibrate if supported and enabled (guarded)
        try {
          if (vibrateEnabled && typeof navigator !== "undefined" && "vibrate" in navigator) {
            (navigator as any).vibrate?.(200);
          }
        } catch (e) {
          // ignore
        }

        // notify reducer
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
