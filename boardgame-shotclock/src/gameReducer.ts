export type GamePhase = "SETUP" | "RUNNING" | "PAUSED";

export interface GameState {
  phase: GamePhase;
  players: number;
  currentPlayer: number;
  turnDuration: number;
}

export type GameAction =
  | { type: "SET_CONFIG"; payload: { players: number; turnDuration: number } }
  | { type: "START_GAME" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "NEXT_PLAYER" }
  | { type: "STOP_TO_SETUP" };

export const initialGameState: GameState = {
  phase: "SETUP",
  players: 4,
  currentPlayer: 0,
  turnDuration: 60,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        players: action.payload.players,
        turnDuration: action.payload.turnDuration,
      };

    case "START_GAME":
      return {
        ...state,
        phase: "RUNNING",
        currentPlayer: 0,
      };

    case "PAUSE":
      if (state.phase === "RUNNING") {
        return { ...state, phase: "PAUSED" };
      }
      return state;

    case "RESUME":
      if (state.phase === "PAUSED") {
        return { ...state, phase: "RUNNING" };
      }
      return state;

    case "NEXT_PLAYER":
      if (state.phase === "RUNNING" || state.phase === "PAUSED") {
        return {
          ...state,
          currentPlayer: (state.currentPlayer + 1) % state.players,
        };
      }
      return state;

    case "STOP_TO_SETUP":
      return {
        ...state,
        phase: "SETUP",
        currentPlayer: 0,
      };

    default:
      return state;
  }
}
