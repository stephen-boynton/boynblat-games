import create from 'zustand'

type UseGameScore = {
  roundScores: number[]
  totalGameScore: number
  reset: () => void
  setRoundScore: (roundScore: number) => void
}

const DEFAULT_STATE = {
  roundScores: [],
  totalGameScore: 0,
}

export const useGameScore = create<UseGameScore>((set) => ({
  ...DEFAULT_STATE,
  reset: () => {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setRoundScore: (roundScore: number) => {
    set((state) => ({
      ...state,
      roundScores: [...state.roundScores, roundScore],
      totalGameScore: state.totalGameScore + roundScore,
    }))
  },
}))
