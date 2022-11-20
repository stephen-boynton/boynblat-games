import React, { FormEvent, KeyboardEvent } from 'react'
import { GUESS_STATE } from '../../store/scordle/types'
import styles from './LetterInput.module.scss'
import { selectFromClassMap } from './utils'

interface LetterInputProps {
  handleInput: (e: FormEvent<HTMLInputElement>) => void
  handleKeypress: (e: KeyboardEvent) => void
  value: string
  readonly: boolean
  selectorId: string
  displayState?: GUESS_STATE
}

export const LetterInput = React.forwardRef<HTMLInputElement, LetterInputProps>(
  (
    { handleInput, handleKeypress, value, readonly, selectorId, displayState },
    ref
  ) => {
    const inputStateClass = selectFromClassMap(displayState, styles)
    return (
      <input
        autoComplete="off"
        className={`${styles.input} ${inputStateClass}`}
        id={selectorId}
        maxLength={1}
        onChange={handleInput}
        onKeyDown={handleKeypress}
        pattern="[A-Za-z]"
        readOnly={readonly}
        ref={ref}
        type="text"
        value={value}
      />
    )
  }
)
