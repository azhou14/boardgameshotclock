import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GameState, GameAction } from "@/gameReducer";

interface GameScreenProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function GameScreen({ state, dispatch }: GameScreenProps) {
  const handlePause = () => {
    console.log("Pause");
    dispatch({ type: "PAUSE" });
  };

  const handleResume = () => {
    console.log("Resume");
    dispatch({ type: "RESUME" });
  };

  const handleNext = () => {
    console.log("Next player");
    dispatch({ type: "NEXT_PLAYER" });
  };

  const handleStop = () => {
    console.log("Stop");
    dispatch({ type: "STOP_TO_SETUP" });
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
          <div className="flex justify-center">
            <div className="text-7xl font-bold font-mono tracking-wider text-primary">
              00:00
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
              Phase: {state.phase}
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
