export interface GameState {
  duration: number,
  playerAmount: number,
  players: {
    id: string | null,
    words: {
      ready: boolean,
      word: string
    }[]
  }[]
}

const initialState: GameState = {
  duration: 10,
  playerAmount: 2,
  players: []
}

// const gameReducer = (state:GameState = initialState, action: Action) => {
//   switch(action.type) {
//     case "SET_DURATION": {
//       return { 
//         ...state, 
//         duration: action.payload
//       }
//     }
//     default:
//       return state
//   }
// }

// export default gameReducer;