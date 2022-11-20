import React from 'react'
import { usePlayerGuesses } from '../../store/scordle'
import styles from './LettersUsed.module.scss'

export const LettersUsed = () => {
  const { lettersUsed } = usePlayerGuesses()
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Letters Attempted</h2>
      <hr />
      <p className={styles.font}>
        {lettersUsed.map((letter) => (
          <span key={letter}>{letter}</span>
        ))}
      </p>
    </div>
  )
}
