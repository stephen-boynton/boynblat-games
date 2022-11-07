import { WordleState } from '../types'

export const getTodaysWord = (set) => (word: string) => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      todaysWordRaw: word,
      todaysWordMap: word.split('').reduce(
        (acc, letter, index) => ({
          ...acc,
          [index]: letter,
        }),
        {}
      ),
    })
  )
}
