import { TIMER_EVENT } from '../../components/Timer'

export type WordMap = {
  0: string
  1: string
  2: string
  3: string
  4: string
}

export enum GAME_STATE {
  PRE_GAME = 'PRE_GAME',
  GAME_START = 'GAME_START',
  ROUND_ACTIVE = 'ROUND_ACTIVE',
  BETWEEN_ROUNDS = 'BETWEEN_ROUNDS',
  GAME_END = 'GAME_END',
}

export type StatusMap = {
  0: GUESS_STATE
  1: GUESS_STATE
  2: GUESS_STATE
  3: GUESS_STATE
  4: GUESS_STATE
}

export type TimeStamp = { minutes: number; seconds: number; event: TIMER_EVENT }

export type WordleState = {
  currentRound: number
  gameScore: number
  currentGameState: GAME_STATE
  gameStatusMap: StatusMap
  lettersUsed: string[] | []
  roundScores: number[]
  statusMaps: StatusMap[] | []
  timePerGame: number
  timeStamps: TimeStamp[]
  todaysWordMap: Partial<WordMap>
  todaysWordRaw: string
  userGuesses: WordMap[]
  getTodaysWord: (word: string) => void
  startGame: () => void
  startRound: () => void
  endRound: (userInput: WordMap) => void
  calculateRoundScore: () => void
  setTimeStamp: (timeStamp: TimeStamp) => void
  setGameOver: () => void
}

export enum GUESS_STATE {
  CORRECT = 'CORRECT',
  NEUTRAL = 'NEUTRAL',
  LETTER_IS_PRESENT = 'LETTER_IS_PRESENT',
}
