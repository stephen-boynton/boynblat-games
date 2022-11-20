import create from 'zustand'

import { GAME_STATE, GUESS_STATE, StatusMap } from '../types'

type UseStatusMaps = {
  gameStatusMap: StatusMap
  statusMaps: StatusMap[]
  reset: () => void
  setStatusMaps: (statusMap: StatusMap, gameStatusMap: StatusMap) => void
}

const DEFAULT_STATE = {
  gameStatusMap: {
    0: GUESS_STATE.NEUTRAL,
    1: GUESS_STATE.NEUTRAL,
    2: GUESS_STATE.NEUTRAL,
    3: GUESS_STATE.NEUTRAL,
    4: GUESS_STATE.NEUTRAL,
  },
  statusMaps: [],
}

export const useStatusMaps = create<UseStatusMaps>((set) => ({
  ...DEFAULT_STATE,
  reset: () => {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setStatusMaps: (statusMap: StatusMap, gameStatusMap: StatusMap) => {
    set((state) => ({
      ...state,
      gameStatusMap,
      statusMaps: [...state.statusMaps, statusMap],
    }))
  },
}))
