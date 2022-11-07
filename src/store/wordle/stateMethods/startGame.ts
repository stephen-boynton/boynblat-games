import { GAME_STATE, WordleState } from '../types'

export const startGame = (set) => () => {
  set(
    (state: WordleState): WordleState => ({
      ...state,
      currentGameState: GAME_STATE.GAME_START,
    })
  )
}
