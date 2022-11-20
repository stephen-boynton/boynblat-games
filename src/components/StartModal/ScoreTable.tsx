import React from 'react'
import { GameSummary } from '../../store/scordle/types'
import styles from './StartModal.module.scss'

interface IScoreTable {
  games: GameSummary[]
  totalRounds: number
  currentRound: number
}

const DEFAULT_ROUND: GameSummary = {
  score: 0,
  round: 0,
  time: '0:00',
}

export const ScoreTable: React.FC<IScoreTable> = ({
  games,
  totalRounds,
  currentRound,
}) => {
  const hasSummaries = games.length
  let roundSummaries
  if (hasSummaries) {
    roundSummaries = games
  } else {
    const defaultSummaries = new Array(totalRounds).fill(DEFAULT_ROUND)
    roundSummaries = defaultSummaries.map((defaultSummary, index) => ({
      ...defaultSummary,
      round: index + 1,
    }))
  }
  return (
    <table>
      <tbody className={styles.table}>
        <tr>
          <th>Round</th>
          <th>Score</th>
          <th>Time</th>
          <th>Rating</th>
        </tr>
        {roundSummaries.map((round) => (
          <tr
            className={round.round === currentRound ? styles.current : ''}
            key={round.round + round.score}
          >
            <th>{round.round}</th>
            <td>{round.score}</td>
            <td>{round.time}</td>
            <td>{round.metaScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
