import React from 'react'
import Modal from 'react-modal'
import { useWordleState } from '../../store/wordle'
import { GAME_STATE } from '../../store/wordle/types'
import style from './StartModal.module.scss'

Modal.setAppElement('#modal-root')

export const StartModal = ({ onClose, isOpen }) => {
  const { startGame, currentGameState, todaysWordRaw, gameScore } =
    useWordleState()

  const isGameOver = currentGameState === GAME_STATE.GAME_END

  const StartContent = () => (
    <>
      <p className={style.font}>Ready?</p>
      <button
        className={style.button}
        onClick={(e) => {
          e.preventDefault()
          startGame()
          onClose()
        }}
      >
        Start!
      </button>
    </>
  )

  const GameOverContent = () => (
    <>
      <p className={style.font}>Game Over!</p>
      <p className={style.font}>Today&apos;s word was: {todaysWordRaw}!</p>
      <p className={style.font}>Your game score is: {gameScore}!</p>
      <button
        className={style.button}
        onClick={(e) => {
          e.preventDefault()
          startGame()
          onClose()
        }}
      >
        Ok
      </button>
    </>
  )
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(1,1,1,0.7)',
        },
        content: {
          top: '50%',
          left: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      {isGameOver ? <GameOverContent /> : <StartContent />}
    </Modal>
  )
}
