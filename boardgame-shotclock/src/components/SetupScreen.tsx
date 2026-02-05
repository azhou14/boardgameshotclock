import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { GameState, GameAction } from "@/gameReducer";

interface SetupScreenProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function SetupScreen({ state, dispatch }: SetupScreenProps) {
  const handlePlayerChange = (delta: number) => {
    const newPlayers = Math.max(2, Math.min(8, state.players + delta));
    dispatch({
      type: "SET_CONFIG",
      payload: { players: newPlayers, turnDuration: state.turnDuration },
    });
  };

  const handleDurationChange = (duration: number) => {
    dispatch({
      type: "SET_CONFIG",
      payload: { players: state.players, turnDuration: duration },
    });
  };

  const handleStart = () => {
    console.log(
      `Starting game with ${state.players} players and ${state.turnDuration}s turn duration`
    );
    dispatch({ type: "START_GAME" });
  };

  const handleVibrateToggle = (enabled: boolean) => {
    dispatch({ type: "SET_VIBRATE", payload: { enabled } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Board Game Shot Clock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Players Selector */}
          <div className="space-y-3">
            <Label htmlFor="players">Number of Players: {state.players}</Label>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handlePlayerChange(-1)}
                variant="outline"
                className="flex-1"
              >
                −
              </Button>
              <span className="text-2xl font-bold text-center flex-1">
                {state.players}
              </span>
              <Button
                onClick={() => handlePlayerChange(1)}
                variant="outline"
                className="flex-1"
              >
                +
              </Button>
            </div>
          </div>

          {/* Turn Duration Input */}
          <div className="space-y-2">
            <Label htmlFor="duration">Turn Duration (seconds)</Label>
            <Input
              id="duration"
              type="number"
              min="5"
              max="300"
              value={state.turnDuration}
              onChange={(e) =>
                handleDurationChange(Math.max(5, parseInt(e.target.value) || 0))
              }
              className="text-lg"
            />
          </div>

          {/* Vibration Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="vibrate"
              type="checkbox"
              checked={state.vibrateEnabled}
              onChange={(e) => handleVibrateToggle(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="vibrate">Vibrate on expiry</Label>
          </div>

          {/* Start Button */}
          <Button onClick={handleStart} className="w-full h-12 text-lg" size="lg">
            Start Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
