import { GAME_STATE, WordleState, WordMap } from '../../store/scordle/types'

export const endRound = (set) => (userInput: WordMap) => {
  set((state: WordleState): WordleState => {
    return {
      ...state,
      userGuesses: [...state.userGuesses, userInput],
      currentGameState: GAME_STATE.BETWEEN_ROUNDS,
    }
  })
}
