import { WordleSessionState } from '../../store/scordle/types'

export const getTodaysWords = (set) => (words: string[]) => {
  set(
    (state: WordleSessionState): WordleSessionState => ({
      ...state,
      todaysWords: words,
    })
  )
}
