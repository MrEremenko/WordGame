import { Dispatch } from "redux";
import { CheckWordDispatchTypes, CHECK_WORD_LOADING, CHECK_WORD_FAIL, CHECK_WORD_SUCCESS } from "./WordActionTypes";
import axios from "axios";


export const CheckWord = (word: string) => async(dispatch: Dispatch<CheckWordDispatchTypes>) => {
  try {
    dispatch({ type: CHECK_WORD_LOADING });
    const res = await axios.head(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    dispatch({ 
      type: CHECK_WORD_SUCCESS, 
      payload: {
        word: word,
        exists: true
      } 
    });
  } catch(e) {
    // console.clear();
    dispatch({ 
      type: CHECK_WORD_FAIL,
      payload: {
        word: word,
        exists: false
      }
     });
  }
}