interface DefaultStateI {
  id: string | null;
  twoPlayerWins: string | null;
  threePlayerWins: string | null;
  fourPlayerWins: string | null;
}

const defaultState: DefaultStateI = {
  id: localStorage.getItem("id"),
  twoPlayerWins: localStorage.getItem("twoPlayerWins"),
  threePlayerWins: localStorage.getItem("twoPlayerWins"),
  fourPlayerWins: localStorage.getItem("twoPlayerWins")
}

const UserReducer = (state: DefaultStateI = defaultState, action: string) : DefaultStateI => {
  return state;
}

export default UserReducer;