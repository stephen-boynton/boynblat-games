import { GameSummary } from '../../store/scordle/types'

export const setRoundSummary = (set) => (gameSummary: GameSummary) => {
  set((state) => ({
    ...state,
    gamesLeft: state.gamesLeft - 1,
    gameNumber: state.gameNumber + 1,
  }))
}
