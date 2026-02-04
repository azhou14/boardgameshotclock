export type GamePhase = "SETUP" | "RUNNING" | "PAUSED" | "EXPIRED";

export interface GameState {
  phase: GamePhase;
  players: number;
  currentPlayer: number;
  turnDuration: number;
  endTime: number | null; // timestamp when current turn ends
  remainingMs: number; // milliseconds remaining (used when paused)
}

export type GameAction =
  | { type: "SET_CONFIG"; payload: { players: number; turnDuration: number } }
  | { type: "START_GAME" }
  | { type: "PAUSE"; payload: { remainingMs: number } }
  | { type: "RESUME" }
  | { type: "NEXT_PLAYER" }
  | { type: "EXPIRE" }
  | { type: "STOP_TO_SETUP" };

export const initialGameState: GameState = {
  phase: "SETUP",
  players: 4,
  currentPlayer: 0,
  endTime: null,
  remainingMs: 0,
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
        endTime: Date.now() + state.turnDuration * 1000,
        remainingMs: state.turnDuration * 1000,
      };

    case "PAUSE":
      if (state.phase === "RUNNING") {
        return {
          ...state,
          phase: "PAUSED",
          endTime: null,
          remainingMs: action.payload.remainingMs,
        };
      }
      return state;

    case "RESUME":
      if (state.phase === "PAUSED") {
        return {
          ...state,
          phase: "RUNNING",
          endTime: Date.now() + state.remainingMs,
        };
      }
      return state;

    case "NEXT_PLAYER":
      if (state.phase === "RUNNING" || state.phase === "PAUSED" || state.phase === "EXPIRED") {
        const nextPlayer = (state.currentPlayer + 1) % state.players;
        return {
          ...state,
          currentPlayer: nextPlayer,
          phase: "RUNNING",
          endTime: Date.now() + state.turnDuration * 1000,
          remainingMs: state.turnDuration * 1000,
        };
      }
      return state;

    case "EXPIRE":
      if (state.phase === "RUNNING") {
        return {
          ...state,
          phase: "EXPIRED",
          endTime: null,
          remainingMs: 0,
        };
      }
      return state;

    case "STOP_TO_SETUP":
      return {
        ...state,
        phase: "SETUP",
        currentPlayer: 0,
        endTime: null,
        remainingMs: 0,
      };

    default:
      return state;
  }
}
