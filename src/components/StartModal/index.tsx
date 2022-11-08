import React from 'react'
import Modal from 'react-modal'
import { useWordleState } from '../../store/wordle'
import { GAME_STATE } from '../../store/wordle/types'
import style from './StartModal.module.scss'

Modal.setAppElement('#modal-root')

const StartContent = ({ startGame, onClose }) => (
  <div className={style['content-container']}>
    <h2 className={style.heading}>Welcome to Scordle</h2>
    <p className={style.description}>November 8, 2022</p>
    <p className={style.font}>Round: 1 of 3</p>
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
  </div>
)

export const StartModal = ({ onClose, isOpen }) => {
  const { startGame, currentGameState, todaysWordRaw, gameScore } =
    useWordleState()

  const isGameOver = currentGameState === GAME_STATE.GAME_END

  const GameOverContent = () => (
    <div className={style['content-container']}>
      <p className={style.font}>Game Over!</p>
      <p className={style.font}>Today&apos;s word was: {todaysWordRaw}!</p>
      <p className={style.font}>Your game score is: {gameScore}!</p>
      <button
        className={style.button}
        onClick={(e) => {
          e.preventDefault()
          // startGame()
          onClose()
        }}
      >
        Ok
      </button>
    </div>
  )
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(1,1,1,0.7)',
        },
        content: {
          backgroundColor: '#292929',
          padding: '50px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      {isGameOver ? (
        <GameOverContent />
      ) : (
        <StartContent onClose={onClose} startGame={startGame} />
      )}
    </Modal>
  )
}
