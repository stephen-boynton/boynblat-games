import React from 'react'
import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'
import { useGame, useTimeStamp } from '../../store/scordle'
import { GAME_STATE } from '../../store/scordle/types'
import style from './Timer.module.scss'

const formatSeconds = (seconds: number) => {
  if (seconds === 0) return '00'
  if (seconds < 10) return `0${seconds}`
  return seconds
}

export enum TIMER_EVENT {
  ROUND_START = 'ROUND_START',
  GAME_END = 'GAME_END',
}

export const Timer = () => {
  const expiryTimestamp = new Date()
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 2)
  const { start, pause, seconds, minutes } = useTimer({
    expiryTimestamp,
    autoStart: false,
  })

  const { currentGameState, setGameState } = useGame()
  const { setTimeStamp } = useTimeStamp()

  const isGameStarted = currentGameState === GAME_STATE.GAME_START
  const isCurrentRoundOver = currentGameState === GAME_STATE.BETWEEN_ROUNDS
  const isGameOver = currentGameState === GAME_STATE.GAME_END

  useEffect(() => {
    if (isGameStarted) start()
    if (isGameOver) pause()
    if (isCurrentRoundOver)
      setTimeStamp({ minutes, seconds, event: TIMER_EVENT.ROUND_START })
  }, [currentGameState])

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setGameState(GAME_STATE.GAME_END)
    }
  }, [seconds])

  return (
    <div>
      <p className={style.font}>
        <span>{minutes}</span>:<span>{formatSeconds(seconds)}</span>
      </p>
    </div>
  )
}
