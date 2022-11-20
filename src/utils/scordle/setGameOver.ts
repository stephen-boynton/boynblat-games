import { GAME_STATE, WordleState } from '../../store/scordle/types'

export const setGameOver = (set) => () => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      currentGameState: GAME_STATE.GAME_END,
    })
  )
}
