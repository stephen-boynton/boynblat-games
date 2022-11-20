import create from 'zustand'

import { GAME_STATE, WordMap } from '../types'

type UseGame = {
  currentGameState: GAME_STATE
  currentRound: number
  word: string
  wordMap: Partial<WordMap>
  resetGame: () => void
  startNextRound: () => void
  setGameState: (gameState: GAME_STATE) => void
  setWord: (word: string) => void
}

const DEFAULT_STATE = {
  currentGameState: GAME_STATE.PRE_GAME,
  currentRound: 0,
  word: '',
  wordMap: {},
}

export const useGame = create<UseGame>((set) => ({
  ...DEFAULT_STATE,
  resetGame: () => {
    set((state) => ({
      ...state,
      ...DEFAULT_STATE,
    }))
  },
  setGameState: (gameState: GAME_STATE) => {
    console.log('setting game state')
    set((state) => ({
      ...state,
      currentGameState: gameState,
    }))
  },
  setWord: (word: string) => {
    set((state) => ({
      ...state,
      word,
      wordMap: word.split('').reduce(
        (acc, letter, index) => ({
          ...acc,
          [index]: letter,
        }),
        {}
      ),
    }))
  },
  startNextRound: () => {
    set((state) => ({
      ...state,
      currentRound: state.currentRound + 1,
    }))
  },
}))
