import create from 'zustand'

type UseSessionScore = {
  gameScores: number[]
  totalSessionScore: number
  setSessionScore: (gameScore: number) => void
}

const DEFAULT_STATE = {
  gameScores: [],
  totalSessionScore: 0,
}

export const useSessionScore = create<UseSessionScore>((set) => ({
  ...DEFAULT_STATE,
  setSessionScore: (gameScore: number) => {
    set((state) => ({
      ...state,
      gameScores: [...state.gameScores, gameScore],
      totalSessionScore: state.totalSessionScore + gameScore,
    }))
  },
}))
