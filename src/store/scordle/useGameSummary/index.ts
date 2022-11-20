import create from 'zustand'
import { GameSummary } from '../types'

type UseGameSummary = {
  gameSummaries: GameSummary[]
  setGameSummary: (gameSummary: GameSummary) => void
}

export const useGameSummary = create<UseGameSummary>((set) => ({
  gameSummaries: [],
  setGameSummary: (gameSummary: GameSummary) => {
    set((state) => ({
      ...state,
      gameSummaries: [...state.gameSummaries, gameSummary],
    }))
  },
}))
