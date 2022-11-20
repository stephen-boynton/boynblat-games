import uniq from 'lodash.uniq'
import create from 'zustand'
import { WordMap } from '../types'

type UsePlayerGuesses = {
  lettersUsed: string[]
  userGuesses: WordMap[]
  reset: () => void
  setLettersUsed: (letters: string[]) => void
  setGuess: (userGuess: WordMap, letters: string[]) => void
}

const DEFAULT_STATE = {
  lettersUsed: [],
  userGuesses: [],
}

export const usePlayerGuesses = create<UsePlayerGuesses>((set) => ({
  ...DEFAULT_STATE,
  reset() {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setLettersUsed(letters) {
    set((state) => ({
      ...state,
      lettersUsed: uniq([...state.lettersUsed, ...letters]).sort((a, b) =>
        a.localeCompare(b)
      ),
    }))
  },
  setGuess: (userGuess, letters: string[]) => {
    set((state) => ({
      ...state,
      lettersUsed: uniq([...state.lettersUsed, ...letters]),
      userGuesses: [...state.userGuesses, userGuess],
    }))
  },
}))
