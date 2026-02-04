import { useState } from "react";
import { SetupScreen } from "@/components/SetupScreen";
import { GameScreen } from "@/components/GameScreen";

type AppScreen = "setup" | "game";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("setup");
  const [players, setPlayers] = useState(4);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleStartGame = (numPlayers: number, _turnDuration: number) => {
    setPlayers(numPlayers);
    setCurrentPlayer(0);
    setScreen("game");
  };

  const handleNextPlayer = () => {
    const next = (currentPlayer + 1) % players;
    setCurrentPlayer(next);
  };

  const handleStop = () => {
    setCurrentPlayer(0);
    setScreen("setup");
  };

  return (
    <>
      {screen === "setup" ? (
        <SetupScreen onStart={handleStartGame} />
      ) : (
        <GameScreen
          players={players}
          currentPlayer={currentPlayer}
          onNext={handleNextPlayer}
          onPause={() => console.log("Pause")}
          onStop={handleStop}
        />
      )}
    </>
  );
}
