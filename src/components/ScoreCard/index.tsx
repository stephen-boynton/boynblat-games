import React from 'react'
import { useWordleState } from '../../store/wordle'
import styles from './ScoreCard.module.scss'

export const ScoreCard = () => {
  const gameScore = useWordleState((state) => state.gameScore)
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ScoreCard</h2>
      <hr />
      <p className={styles.font}>Game Score: {gameScore}</p>
      <p className={styles.font}>Global Score: 00</p>
    </div>
  )
}
