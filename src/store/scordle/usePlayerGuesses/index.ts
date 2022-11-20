import uniq from 'lodash.uniq'
import create from 'zustand'
import settings from '../settings'
import { WordMap } from '../types'

type UsePlayerGuesses = {
  lettersUsed: string[]
  userGuesses: WordMap[]
  reset: () => void
  setLettersUsed: (letters: string[]) => void
  setGuess: (userGuess: WordMap, index: number) => void
}

const DEFAULT_STATE = {
  lettersUsed: [],
  userGuesses: new Array(settings.NUMBER_OF_ROUNDS).fill({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  }),
}

export const usePlayerGuesses = create<UsePlayerGuesses>((set) => ({
  ...DEFAULT_STATE,
  reset() {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setLettersUsed(letters: string[]) {
    set((state) => ({
      ...state,
      lettersUsed: uniq([...state.lettersUsed, ...letters]),
    }))
  },
  setGuess(userGuess: WordMap, index: number) {
    set((state) => {
      const newUserGuesses = [...state.userGuesses]
      newUserGuesses[index] = userGuess
      return {
        ...state,
        userGuesses: newUserGuesses,
      }
    })
  },
}))
