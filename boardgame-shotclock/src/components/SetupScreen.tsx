import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SetupScreenProps {
  onStart: (players: number, turnDuration: number) => void;
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [players, setPlayers] = useState(4);
  const [turnDuration, setTurnDuration] = useState(60);

  const handleStart = () => {
    console.log(`Starting game with ${players} players and ${turnDuration}s turn duration`);
    onStart(players, turnDuration);
  };

  const incrementPlayers = () => {
    if (players < 8) setPlayers(players + 1);
  };

  const decrementPlayers = () => {
    if (players > 2) setPlayers(players - 1);
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
            <Label htmlFor="players">Number of Players: {players}</Label>
            <div className="flex items-center gap-3">
              <Button
                onClick={decrementPlayers}
                variant="outline"
                className="flex-1"
              >
                −
              </Button>
              <span className="text-2xl font-bold text-center flex-1">{players}</span>
              <Button
                onClick={incrementPlayers}
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
              min="10"
              max="300"
              value={turnDuration}
              onChange={(e) => setTurnDuration(Math.max(10, parseInt(e.target.value) || 0))}
              className="text-lg"
            />
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStart}
            className="w-full h-12 text-lg"
            size="lg"
          >
            Start Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
