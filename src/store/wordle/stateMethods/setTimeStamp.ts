import { TimeStamp, WordleState } from '../types'

export const setTimeStamp = (set) => (timeStamp: TimeStamp) => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      timeStamps: [...state.timeStamps, timeStamp],
    })
  )
}
