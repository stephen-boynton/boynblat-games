import React, { FormEvent, KeyboardEvent, useRef } from 'react'
import { useState } from 'react'
import { useWordleState } from '../../store/wordle'
import { GAME_STATE } from '../../store/wordle/types'
import { LetterInput } from '../LetterInput'
import styles from './InputRow.module.scss'
import words from '../../words.json'
import toast from 'react-hot-toast'

const LETTER_COUNT = ['first', 'second', 'third', 'fourth', 'fifth']

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

  const { endRound, statusMaps, currentGameState } = useWordleState()

  const isGameOver = currentGameState === GAME_STATE.GAME_END
  const hasFullInput =
    Object.values(userInput).filter((input) => input).length === 5

  const handleInput = (index: number) => (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value?.toUpperCase()
    const nextTarget: React.RefObject<HTMLInputElement> | undefined =
      refMap[index + 1]

    setUserInput((state) => ({ ...state, [index]: value }))

    if (value && nextTarget && nextTarget.current) {
      nextTarget.current.focus()
    }
  }

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
        endRound(userInput)
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
          handleInput={handleInput(index)}
          handleKeypress={handleKeyPress(index)}
          key={letter}
          readonly={!isCurrentRound && !isGameOver}
          ref={refMap[index]}
          selectorId={`row-${row}-input-${index}`}
          value={userInput[index]}
        />
      ))}
    </div>
  )
}
