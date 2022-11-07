import { GAME_STATE, WordleState } from '../types'

export const startRound = (set) => () => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      currentRound: state.currentRound + 1,
      currentGameState: GAME_STATE.ROUND_ACTIVE,
    })
  )
}
