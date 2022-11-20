export * from './useGame'
export * from './useGameScore'
export * from './useGameSummary'
export * from './usePlayerGuesses'
export * from './useSession'
export * from './useSessionScore'
export * from './useStatusMaps'
export * from './useTimeStamp'
export * from './useWords'

// export const useWordleSessionState = create<WordleSessionState>((set) => ({
//   gamesLeft: settings.NUMBER_OF_GAMES_PER_DAY,
//   gameNumber: 1,
//   roundSummarys: [],
//   todaysWords: [],
//   sessionState: SESSION_STATE.ACTIVE,
//   startNextGame: startNextGame(set),
//   getTodaysWords: getTodaysWords(set),
// }))

// export const DEFAULT_WORDLE_STATE = {
//   currentRound: 1,
//   gameScore: 0,
//   currentGameState: GAME_STATE.PRE_GAME,
//   gameStatusMap: {
//     0: GUESS_STATE.NEUTRAL,
//     1: GUESS_STATE.NEUTRAL,
//     2: GUESS_STATE.NEUTRAL,
//     3: GUESS_STATE.NEUTRAL,
//     4: GUESS_STATE.NEUTRAL,
//   },
//   lettersUsed: [],
//   roundScores: [],
//   statusMaps: [],
//   timePerGame: 120,
//   timeStamps: [],
//   todaysWordMap: {},
//   todaysWordRaw: '',
//   userGuesses: [],
// }

// export const useWordleState = create<WordleState>((set) => ({
//   ...DEFAULT_WORDLE_STATE,
//   startGame: startGame(set),
//   startRound: startRound(set),
//   endRound: endRound(set),
//   calculateRoundScore: calculateRoundScore(set),
//   setTimeStamp: setTimeStamp(set),
//   setGameOver: setGameOver(set),
// }))
