import { CheckWordDispatchTypes, CHECK_WORD_FAIL, CHECK_WORD_LOADING, CHECK_WORD_SUCCESS, WordType } from "../actions/WordActionTypes"

interface DefaultStateI {
  loading: boolean,
  words: {},
}

const defaultState: DefaultStateI = {
  loading: false,
  words: {}
}

const wordReducer = (state: DefaultStateI = defaultState, action: CheckWordDispatchTypes) : DefaultStateI => {
  
    switch(action.type) {
      case CHECK_WORD_FAIL:
        return {
          ...state,
          loading: false,
          words: {
            ...state.words,
            [action.payload.word]: action.payload.exists
          }
        }
      case CHECK_WORD_LOADING:
        return {
          ...state,
          loading: true
        }
      case CHECK_WORD_SUCCESS:
        return {
          ...state,
          loading: false,
          words: {
            ...state.words,
            [action.payload.word]: action.payload.exists
          }
        }
      default:
        return state;
    }
}

export default wordReducer;