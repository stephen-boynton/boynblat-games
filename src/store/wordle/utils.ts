import { GUESS_STATE, StatusMap, WordMap } from './types'

export const isLetterPresentElsewhere = ({
  currentIndex,
  currentLetter,
  previousStatusMap,
  todaysWordMap,
}) => {
  const instancesOfGuessedLetter = Object.values(todaysWordMap).map(
    (letter) => letter === currentLetter
  )
  return instancesOfGuessedLetter.reduce((acc, isLetterSame, index) => {
    if (currentIndex !== index) {
      if (!previousStatusMap && isLetterSame) {
        return true
      }
      if (isLetterSame && previousStatusMap[index] !== GUESS_STATE.CORRECT) {
        return true
      }
    }
    return acc
  }, false)
}
