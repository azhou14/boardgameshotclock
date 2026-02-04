import { useReducer } from "react";
import { SetupScreen } from "@/components/SetupScreen";
import { GameScreen } from "@/components/GameScreen";
import { gameReducer, initialGameState } from "@/gameReducer";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <>
      {state.phase === "SETUP" ? (
        <SetupScreen dispatch={dispatch} state={state} />
      ) : (
        <GameScreen
          state={state}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
