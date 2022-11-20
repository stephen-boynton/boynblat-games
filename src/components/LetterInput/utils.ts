import { GUESS_STATE } from '../../store/scordle/types'

export const selectFromClassMap = (displayStage, style) => {
  const selectorMap = {
    [GUESS_STATE.CORRECT]: style.correct,
    [GUESS_STATE.LETTER_IS_PRESENT]: style['present-elsewhere'],
    [GUESS_STATE.NEUTRAL]: style.neutral,
  }
  return selectorMap[displayStage]
}
