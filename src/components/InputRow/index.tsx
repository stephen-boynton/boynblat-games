import React, { KeyboardEvent, useRef } from 'react'
import { useState } from 'react'
import {
  useGame,
  useGameScore,
  usePlayerGuesses,
  useSession,
  useSessionScore,
  useStatusMaps,
} from '../../store/scordle'
import { GAME_STATE } from '../../store/scordle/types'
import { LetterInput } from '../LetterInput'
import styles from './InputRow.module.scss'
import words from '../../words.json'
import toast from 'react-hot-toast'
import { closeOutRound } from './utils'
import { handleInput } from './handlers'
import settings from '../../store/scordle/settings'

const LETTER_COUNT = ['first', 'second', 'third', 'fourth', 'fifth']

const getInputValue = ({
  isCurrentRound,
  userInput,
  userGuesses,
  index,
  currentRound,
}) => {
  return isCurrentRound ? userInput[index] : userGuesses[currentRound]?.[index]
}

export const InputRow = ({ row, isCurrentRound }) => {
  const [userInput, setUserInput] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  })

  const firstRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)
  const thirdRef = useRef<HTMLInputElement>(null)
  const fourthRef = useRef<HTMLInputElement>(null)
  const fifthRef = useRef<HTMLInputElement>(null)

  const refMap = {
    0: firstRef,
    1: secondRef,
    2: thirdRef,
    3: fourthRef,
    4: fifthRef,
  }
  const { userGuesses, setGuess } = usePlayerGuesses()
  const { setNewGame, currentGameNumber } = useSession()

  const {
    currentGameState,
    currentRound,
    setGameState,
    startNextRound,
    wordMap,
  } = useGame()

  const { setStatusMaps, gameStatusMap, statusMaps } = useStatusMaps()
  const { setRoundScore } = useGameScore()
  const { setSessionScore } = useSessionScore()

  const isGameOver = currentGameState === GAME_STATE.GAME_END
  const hasFullInput =
    Object.values(userInput).filter((input) => input).length === 5

  const handleKeyPress = (index: number) => (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const prevTarget = refMap[index - 1]
      const currentValue = userInput[index]
      if (prevTarget?.current && currentValue === '') {
        prevTarget.current.focus()
      }
    }

    if (e.key === 'Enter' && hasFullInput) {
      const guessedWord = Object.values(userInput).join('').toLowerCase()
      if (words.includes(guessedWord)) {
        const { score, statusMap, newGameStatusMap, isGameOver } =
          closeOutRound({
            userInput,
            wordMap,
            currentRound,
            gameStatusMap,
          })

        setGuess(userInput, Object.values(userInput))
        setRoundScore(score)
        setStatusMaps(statusMap, newGameStatusMap)

        if (isGameOver) {
          if (currentGameNumber < settings.NUMBER_OF_GAMES_PER_DAY) {
            setNewGame()
          }
          setSessionScore(score)
          setGameState(GAME_STATE.GAME_END)
        } else {
          startNextRound()
        }
      } else {
        toast.error('Your guess is not on the word list')
      }
    }
  }

  return (
    <div className={styles.container} id={`wordle-row-${row}`}>
      {LETTER_COUNT.map((letter, index) => (
        <LetterInput
          displayState={statusMaps[row]?.[index]}
          handleInput={handleInput(refMap, setUserInput, index)}
          handleKeypress={handleKeyPress(index)}
          key={letter}
          readonly={!isCurrentRound && !isGameOver}
          ref={refMap[index]}
          selectorId={`row-${row}-input-${index}`}
          value={getInputValue({
            userInput,
            isCurrentRound,
            currentRound,
            index,
            userGuesses,
          })}
        />
      ))}
    </div>
  )
}
