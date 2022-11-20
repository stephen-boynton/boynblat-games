import React from 'react'
import { useGameScore, useSessionScore } from '../../store/scordle'
import styles from './ScoreCard.module.scss'

export const ScoreCard = () => {
  const { totalGameScore } = useGameScore()
  const { totalSessionScore } = useSessionScore()
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>ScoreCard</h2>
      <hr />
      <p className={styles.font}>Game Score: {totalGameScore}</p>
      <p className={styles.font}>Global Score: {totalSessionScore}</p>
    </div>
  )
}
