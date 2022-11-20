import create from 'zustand'

type UseWords = {
  words: string[]
  reset: () => void
  setWords: (words: string[]) => void
}

const DEFAULT_STATE = {
  words: [],
}

export const useWords = create<UseWords>((set) => ({
  ...DEFAULT_STATE,
  setWords: (words: string[]) => {
    set((state) => ({
      ...state,
      words,
    }))
  },
  reset: () => {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
}))
