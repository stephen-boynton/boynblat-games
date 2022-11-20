import create from 'zustand'
import settings from '../settings'
import { SESSION_STATE } from '../types'

type UseSession = {
  currentGameNumber: number
  currentSessionState: SESSION_STATE
  gamesLeft: number
  gameScores: number[]
  sessionScore: number
  endSession: () => void
  setNewGame: () => void
  setCurrentSessionState: (sessionState: SESSION_STATE) => void
  setScore: (score: number) => void
}

export const useSession = create<UseSession>((set) => ({
  currentGameNumber: 0,
  currentSessionState: SESSION_STATE.ACTIVE,
  gamesLeft: settings.NUMBER_OF_GAMES_PER_DAY,
  gameScores: [],
  sessionScore: 0,
  endSession: () => {
    set((state) => ({
      ...state,
      currentSessionState: SESSION_STATE.ENDED,
    }))
  },
  setNewGame: () => {
    set((state) => ({
      ...state,
      currentGameNumber: state.currentGameNumber + 1,
      gamesLeft: state.gamesLeft - 1,
    }))
  },
  setCurrentSessionState: (sessionState: SESSION_STATE) => {
    set((state) => ({
      ...state,
      currentSessionState: sessionState,
    }))
  },
  setScore: (score: number) => {
    set((state) => ({
      ...state,
      gameScores: [...state.gameScores, score],
      sessionScore: state.sessionScore + score,
    }))
  },
}))
