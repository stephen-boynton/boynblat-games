import create from 'zustand'
import {
  calculateRoundScore,
  endRound,
  getTodaysWord,
  setGameOver,
  setTimeStamp,
  startGame,
  startRound,
} from './stateMethods'
import { GAME_STATE, GUESS_STATE, WordleState } from './types'

export const useWordleState = create<WordleState>((set) => ({
  currentRound: 1,
  gameScore: 0,
  currentGameState: GAME_STATE.PRE_GAME,
  gameStatusMap: {
    0: GUESS_STATE.NEUTRAL,
    1: GUESS_STATE.NEUTRAL,
    2: GUESS_STATE.NEUTRAL,
    3: GUESS_STATE.NEUTRAL,
    4: GUESS_STATE.NEUTRAL,
  },
  lettersUsed: [],
  roundScores: [],
  statusMaps: [],
  timePerGame: 120,
  timeStamps: [],
  todaysWordMap: {},
  todaysWordRaw: '',
  userGuesses: [],
  getTodaysWord: getTodaysWord(set),
  startGame: startGame(set),
  startRound: startRound(set),
  endRound: endRound(set),
  calculateRoundScore: calculateRoundScore(set),
  setTimeStamp: setTimeStamp(set),
  setGameOver: setGameOver(set),
}))
