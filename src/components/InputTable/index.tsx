import React, { useEffect } from 'react'
import settings from '../../store/scordle/settings'
import styles from './InputTable.module.scss'
import { InputRow } from '../InputRow'
import { useGame } from '../../store/scordle'
import { GAME_STATE } from '../../store/scordle/types'

export const InputTable = () => {
  const { currentRound } = useGame()
  useEffect(() => {
    document.body
      .querySelector<HTMLInputElement>(`#row-${currentRound}-input-0`)
      .focus()
  }, [currentRound])

  return (
    <div className={styles.container}>
      {new Array(settings.NUMBER_OF_ROUNDS).fill('').map((round, index) => (
        <InputRow
          isCurrentRound={currentRound === index}
          key={round}
          row={index}
        />
      ))}
    </div>
  )
}
