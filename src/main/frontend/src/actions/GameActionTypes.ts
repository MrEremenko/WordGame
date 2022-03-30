export const START_GAME_LOADING = "START_GAME_LOADING";
export const START_GAME_FAIL = "START_GAME_FAIL";
export const START_GAME_SUCCESS = "START_GAME_SUCCESS";

export type Action = { type: "SET_DURATION", payload: number }

export interface StartGameLoading {
  type: typeof START_GAME_LOADING
}

export interface StartGameFail {
  type: typeof START_GAME_FAIL
}

export interface StartGameSuccess {
  type: typeof START_GAME_SUCCESS,
  payload: string
}

export type StartGameDispatchTypes = StartGameLoading | StartGameFail | StartGameSuccess;


//game action types
//start (join) game
//add user to game
//remove user from game
//start game
//send new word
//receive other player entered a new word
//receive round result (contains end game, all words from players, whoever is removed, or game over)
