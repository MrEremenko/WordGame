export const UPDATE_WINS = "UPDATE_WINS";


export type GameType = {
  word: 2 | 3 | 4,
  update: number
}

export interface UpdateWins {
  type: typeof UPDATE_WINS,
  payload: GameType
}

export type UpdateWinsDispatchTypes = UpdateWins;