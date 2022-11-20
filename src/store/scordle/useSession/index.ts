import create from 'zustand'
import settings from '../settings'
import { SESSION_STATE } from '../types'

type UseSession = {
  currentGameNumber: number
  currentSessionState: SESSION_STATE
  gamesLeft: number
  endSession: () => void
  setNewGame: () => void
  setCurrentSessionState: (sessionState: SESSION_STATE) => void
}

export const useSession = create<UseSession>((set) => ({
  currentGameNumber: 0,
  currentSessionState: SESSION_STATE.ACTIVE,
  gamesLeft: settings.NUMBER_OF_GAMES_PER_DAY,
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
}))
