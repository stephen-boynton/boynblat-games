import { DEFAULT_WORDLE_STATE } from '../../store/scordle'
import { GAME_STATE, WordleState } from '../../store/scordle/types'

export const startGame = (set) => (word: string) => {
  set(
    (state): WordleState => ({
      ...state,
      ...DEFAULT_WORDLE_STATE,
      currentRound: state.currentRound,
      currentGameState: GAME_STATE.GAME_START,
      todaysWordRaw: word,
      todaysWordMap: word.split('').reduce(
        (acc, letter, index) => ({
          ...acc,
          [index]: letter,
        }),
        {}
      ),
    })
  )
}
