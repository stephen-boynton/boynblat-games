import create from 'zustand'
import { TimeStamp } from '../types'

type UseTimeStamp = {
  timeStamps: TimeStamp[]
  reset: () => void
  setTimeStamp: (timeStamp: TimeStamp) => void
}

const DEFAULT_STATE = {
  timeStamps: [],
}

export const useTimeStamp = create<UseTimeStamp>((set) => ({
  ...DEFAULT_STATE,
  reset: () => {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setTimeStamp: (timeStamp: TimeStamp) => {
    set((state) => ({
      ...state,
      timeStamps: [...state.timeStamps, timeStamp],
    }))
  },
}))
