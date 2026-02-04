import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameScreenProps {
  players: number;
  currentPlayer: number;
  onNext: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function GameScreen({
  players,
  currentPlayer,
  onNext,
  onPause,
  onStop,
}: GameScreenProps) {
  const handleNext = () => {
    console.log(`Next player`);
    onNext();
  };

  const handlePause = () => {
    console.log(`Pause`);
    onPause();
  };

  const handleStop = () => {
    console.log(`Stop`);
    onStop();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Player {currentPlayer + 1} of {players}</CardTitle>
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
              Player {currentPlayer + 1}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {players - currentPlayer - 1} remaining
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handlePause}
              variant="secondary"
              className="w-full h-10"
            >
              Pause
            </Button>
            <Button
              onClick={handleNext}
              className="w-full h-10"
            >
              Next Player
            </Button>
            <Button
              onClick={handleStop}
              variant="destructive"
              className="w-full h-10"
            >
              Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
