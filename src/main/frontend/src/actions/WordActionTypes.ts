export const CHECK_WORD_LOADING = "CHECK_WORD_LOADING";
export const CHECK_WORD_FAIL = "CHECK_WORD_FAIL";
export const CHECK_WORD_SUCCESS = "CHECK_WORD_SUCCESS";

export type WordType = {
  word: string,
  exists: boolean
}

export interface CheckWordLoading {
  type: typeof CHECK_WORD_LOADING
}

export interface CheckWordFail {
  type: typeof CHECK_WORD_FAIL,
  payload: WordType
}

export interface CheckWordSuccess {
  type: typeof CHECK_WORD_SUCCESS,
  payload: WordType
}

export type CheckWordDispatchTypes = CheckWordLoading | CheckWordFail | CheckWordSuccess;