import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

import WordReducer from "./WordReducer";

const RootReducer = combineReducers({
  word: WordReducer,
  user: UserReducer
})

export default RootReducer;