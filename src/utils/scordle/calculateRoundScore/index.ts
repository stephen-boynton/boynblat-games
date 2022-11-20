import { GAME_STATE, WordleState } from '../../../store/scordle/types'
import {
  buildCalcHelper,
  buildGameStatusMap,
  buildStatusMap,
  calculateGameOver,
  calculateScore,
  getLettersUsed,
  updateLettersUsed,
} from './utils'

export const calculateRoundScore = (set) => () => {
  set((state: WordleState): WordleState => {
    const {
      currentRound,
      fullPoints,
      gameScore,
      gameStatusMap,
      halfPoints,
      roundScores,
      statusMaps,
      userInput,
      previousLettersUsed,
      currentRoundIndex,
    } = buildCalcHelper(state)

    const roundStatusMap = buildStatusMap(state, userInput)
    const currentLettersUsed = getLettersUsed(roundStatusMap, userInput)
    const isGameOver = calculateGameOver(roundStatusMap, currentRound)
    const lettersUsed = updateLettersUsed(
      currentLettersUsed,
      previousLettersUsed
    )

    const currentRoundScore = calculateScore({
      roundStatusMap,
      fullPoints,
      halfPoints,
      gameStatusMap,
      currentRoundIndex,
    })

    const updatedGameStatusMap = buildGameStatusMap({
      gameStatusMap,
      roundStatusMap,
    })

    return {
      ...state,
      lettersUsed,
      currentGameState: isGameOver
        ? GAME_STATE.GAME_END
        : GAME_STATE.ROUND_ACTIVE,
      currentRound: isGameOver ? state.currentRound : state.currentRound + 1,
      roundScores: [...roundScores, currentRoundScore],
      statusMaps: [...statusMaps, roundStatusMap],
      gameScore: gameScore + currentRoundScore,
      gameStatusMap: updatedGameStatusMap,
    }
  })
}
