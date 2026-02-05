import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameTimer } from "@/hooks/useGameTimer";
import { stopAlarm } from "@/components/audio";
import type { GameState, GameAction } from "@/gameReducer";

interface GameScreenProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function GameScreen({ state, dispatch }: GameScreenProps) {
  const displayMs = useGameTimer({
    phase: state.phase,
    endTime: state.endTime,
    remainingMs: state.remainingMs,
    dispatch,
    vibrateEnabled: state.vibrateEnabled,
  });

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const secondsLeft = Math.ceil(displayMs / 1000);
  const fraction = Math.max(0, Math.min(1, displayMs / (state.turnDuration * 1000)));

  const handlePause = () => {
    console.log("Pause");
    dispatch({ type: "PAUSE", payload: { remainingMs: displayMs } });
  };

  const handleResume = () => {
    console.log("Resume");
    dispatch({ type: "RESUME" });
  };

  const handleNext = () => {
    console.log("Next player");
    dispatch({ type: "NEXT_PLAYER" });
    // stop any playing alarm immediately when moving to next player
    try {
      stopAlarm();
    } catch (e) {
      // ignore
    }
  };

  const handleStop = () => {
    console.log("Stop");
    dispatch({ type: "STOP_TO_SETUP" });
    try {
      stopAlarm();
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            Player {state.currentPlayer + 1} of {state.players}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timer Display */}
          <div className="flex flex-col items-center gap-3">
            <div className={`text-8xl font-extrabold font-mono tracking-wider ${secondsLeft > 0 && secondsLeft <= 5 ? 'text-destructive' : 'text-primary'} ${state.phase === 'EXPIRED' ? 'animate-pulse' : ''}`}>
              {formatTime(displayMs)}
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div
                className={`h-2 bg-primary transition-[width] duration-200 ${state.phase === 'EXPIRED' ? 'bg-destructive' : ''}`}
                style={{ width: `${Math.round(fraction * 100)}%` }}
              />
            </div>
          </div>

          {/* Player Label */}
          <div className="text-center">
            <p className="text-2xl font-semibold">
              Player {state.currentPlayer + 1}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {state.players - state.currentPlayer - 1} remaining
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {state.phase === "EXPIRED" ? "⏱️ Time's up!" : `Phase: ${state.phase}`}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col gap-3">
            {state.phase === "RUNNING" ? (
              <Button
                onClick={handlePause}
                variant="secondary"
                className="w-full h-10"
              >
                Pause
              </Button>
            ) : (
              <Button
                onClick={handleResume}
                variant="secondary"
                className="w-full h-10"
                disabled={state.phase === "SETUP"}
              >
                Resume
              </Button>
            )}
            <Button onClick={handleNext} className="w-full h-10">
              Next Player
            </Button>
            <Button onClick={handleStop} variant="destructive" className="w-full h-10">
              Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
