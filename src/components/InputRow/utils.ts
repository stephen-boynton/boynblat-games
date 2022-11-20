import { GUESS_STATE, StatusMap, WordMap } from '../../store/scordle/types'
import settings from '../../store/scordle/settings'

export const buildStatusMap = (userInput: WordMap, wordMap: WordMap) => {
  const letterNumberMap = Object.values(wordMap).reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: acc[letter] ? acc[letter] + 1 : 1,
    }),
    {}
  )

  const correctGuesses = Object.values(wordMap).map((letter, index) => {
    if (letter === userInput[index]) {
      letterNumberMap[letter] -= 1
      return GUESS_STATE.CORRECT
    }
    return letter
  })

  const statueMap = correctGuesses.reduce((acc, statOrLetter, index) => {
    if (statOrLetter === GUESS_STATE.CORRECT) {
      return {
        ...acc,
        [index]: statOrLetter,
      }
    }

    if (letterNumberMap[userInput[index]]) {
      letterNumberMap[userInput[index]] -= 1
      return {
        ...acc,
        [index]: GUESS_STATE.LETTER_IS_PRESENT,
      }
    }
    return {
      ...acc,
      [index]: GUESS_STATE.NEUTRAL,
    }
  }, {} as StatusMap)

  return statueMap
}

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

export const buildGameStatusMap = ({
  gameStatusMap,
  roundStatusMap,
}: {
  gameStatusMap: StatusMap
  roundStatusMap: StatusMap
}): StatusMap =>
  Object.entries(gameStatusMap).reduce((acc, [key, val]) => {
    const currentGuessState = roundStatusMap[key]
    const alreadyCorrect = val === GUESS_STATE.CORRECT
    const alreadyNearMiss = val === GUESS_STATE.LETTER_IS_PRESENT
    const updatedValue =
      alreadyCorrect || alreadyNearMiss ? val : currentGuessState
    return {
      ...acc,
      [key]: updatedValue,
    }
  }, {} as StatusMap)

export const calculateGameOver = (
  roundStatusMap: StatusMap,
  currentRound: number
): boolean => {
  const areAllCorrect =
    Object.values(roundStatusMap).filter(
      (status) => status === GUESS_STATE.CORRECT
    ).length === 5

  const isFinalRound = currentRound + 1 === settings.NUMBER_OF_ROUNDS

  return isFinalRound || areAllCorrect
}

export const closeOutRound = ({
  userInput,
  wordMap,
  currentRound,
  gameStatusMap,
}) => {
  const statusMap = buildStatusMap(userInput, wordMap)

  const score = calculateScore({
    currentRoundIndex: currentRound,
    roundStatusMap: statusMap,
    fullPoints: settings.POINTS_PER_ROUND[currentRound],
    halfPoints: settings.POINTS_PER_ROUND[currentRound] / 2,
    gameStatusMap,
  })

  const newGameStatusMap = buildGameStatusMap({
    gameStatusMap,
    roundStatusMap: statusMap,
  })

  const isGameOver = calculateGameOver(statusMap, currentRound)

  return {
    score,
    statusMap,
    newGameStatusMap,
    isGameOver,
  }
}
