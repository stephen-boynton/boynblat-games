import { TimeStamp, WordleState } from '../../store/scordle/types'

export const setTimeStamp = (set) => (timeStamp: TimeStamp) => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      timeStamps: [...state.timeStamps, timeStamp],
    })
  )
}
