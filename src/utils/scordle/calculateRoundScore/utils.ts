import uniq from 'lodash.uniq'
import settings from '../../../store/scordle/settings'
import {
  GAME_STATE,
  GUESS_STATE,
  StatusMap,
  WordleState,
  WordMap,
} from '../../../store/scordle/types'

const isLetterPresentElsewhere = ({
  currentIndex,
  currentLetter,
  todaysWordMap,
}) => {
  const instancesOfGuessedLetter = Object.values(todaysWordMap).map(
    (letter) => letter === currentLetter
  )

  return instancesOfGuessedLetter.reduce((acc, isLetterSame, index) => {
    if (currentIndex !== index) {
      if (isLetterSame) {
        return true
      }
    }
    return acc
  }, false)
}

export const buildStatusMap = (
  { todaysWordMap }: WordleState,
  userInput: WordMap
) => {
  const letterNumberMap = Object.values(todaysWordMap).reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: acc[letter] ? acc[letter] + 1 : 1,
    }),
    {}
  )

  const correctGuesses = Object.values(todaysWordMap).map((letter, index) => {
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

export const getLettersUsed = (roundStatusMap: StatusMap, userInput: WordMap) =>
  Object.values(userInput).reduce((letters, letter, index) => {
    if (roundStatusMap[index] === GUESS_STATE.NEUTRAL) {
      return [...letters, letter]
    }
    return letters
  }, [] as string[])

export const buildCalcHelper = ({
  currentRound,
  timeStamps,
  statusMaps,
  gameScore,
  roundScores,
  gameStatusMap,
  userGuesses,
  lettersUsed,
}: WordleState): {
  currentRound
  currentRoundIndex: number
  currentTimeInSec: number
  fullPoints: number
  gameScore: number
  gameStatusMap: StatusMap
  halfPoints: number
  isFirstRound: boolean
  minutes: number
  previousLettersUsed: string[]
  roundScores: number[]
  seconds: number
  statusMaps: StatusMap[]
  userInput: WordMap
} => {
  const isFirstRound = currentRound === 1
  const currentRoundIndex = currentRound - 1
  const { minutes, seconds } = timeStamps[currentRoundIndex]
  const currentTimeInSec = minutes * 60 + seconds
  const fullPoints = settings.TIME_PER_GAME_IN_SEC - currentTimeInSec
  const halfPoints = fullPoints / 2
  const userInput = userGuesses[currentRoundIndex]
  return {
    currentRound,
    currentRoundIndex,
    currentTimeInSec,
    fullPoints,
    gameScore,
    gameStatusMap,
    halfPoints,
    isFirstRound,
    minutes,
    previousLettersUsed: lettersUsed,
    roundScores,
    seconds,
    statusMaps,
    userInput,
  }
}

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

export const updateLettersUsed = (
  currentLettersUsed: string[],
  prevLettersUsed: string[]
): string[] =>
  uniq([...prevLettersUsed, ...currentLettersUsed]).sort((a, b) =>
    a.localeCompare(b)
  )

export const calculateGameOver = (
  roundStatusMap: StatusMap,
  currentRound: number
): boolean => {
  const areAllCorrect =
    Object.values(roundStatusMap).filter(
      (status) => status === GUESS_STATE.CORRECT
    ).length === 5

  const isFinalRound = currentRound === 6

  return isFinalRound || areAllCorrect
}
