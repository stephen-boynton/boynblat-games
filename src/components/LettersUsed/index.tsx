import React from 'react'
import { useWordleState } from '../../store/wordle'
import styles from './LettersUsed.module.scss'

export const LettersUsed = () => {
  const lettersUsed = useWordleState((state) => state.lettersUsed)
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
