import settings from '../../../store/scordle/settings'
import { GUESS_STATE, StatusMap } from '../../../store/scordle/types'

type CalculateScore = {
  roundStatusMap: StatusMap
  fullPoints: number
  halfPoints: number
  gameStatusMap: StatusMap
  currentRoundIndex: number
}

export const calculateScore = ({
  roundStatusMap,
  fullPoints,
  halfPoints,
  gameStatusMap,
  currentRoundIndex,
}: CalculateScore): number =>
  Object.values(roundStatusMap).reduce((acc, guessStatus, index) => {
    if (
      guessStatus === GUESS_STATE.CORRECT &&
      !(gameStatusMap[index] === GUESS_STATE.CORRECT)
    )
      return acc + fullPoints + settings.POINTS_PER_ROUND[currentRoundIndex]
    if (
      guessStatus === GUESS_STATE.LETTER_IS_PRESENT &&
      !(gameStatusMap[index] === GUESS_STATE.LETTER_IS_PRESENT)
    )
      return acc + halfPoints + settings.POINTS_PER_ROUND[currentRoundIndex] / 2
    return acc
  }, 0)
