import React from 'react'
import Modal from 'react-modal'
import {
  useGame,
  useGameSummary,
  useSession,
  useSessionScore,
  useWords,
} from '../../store/scordle'
import settings from '../../store/scordle/settings'
import { GAME_STATE, SESSION_STATE } from '../../store/scordle/types'
import { ScoreTable } from './ScoreTable'
import style from './StartModal.module.scss'

Modal.setAppElement('#modal-root')

const StartContent = ({
  word,
  startGame,
  currentRound,
  onClose,
  session,
  games = [],
}) => (
  <div className={style['content-container']}>
    <h2 className={style.heading}>Welcome to Scordle</h2>
    <p className={style.description}>November 8, 2022</p>
    <p className={style.font}>
      Round: {session + 1} of {settings.NUMBER_OF_GAMES_PER_DAY}
    </p>
    <ScoreTable
      currentRound={currentRound + 1}
      games={games}
      totalRounds={settings.NUMBER_OF_GAMES_PER_DAY}
    />
    <button
      className={style.button}
      onClick={(e) => {
        e.preventDefault()
        startGame(word)
        onClose()
      }}
    >
      {session > 1 ? 'Continue' : 'Start'}
    </button>
  </div>
)

const GameOverContent = ({ todaysWordRaw, gameScore, onClose }) => (
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

export const StartModal = ({ onClose, isOpen }) => {
  const { currentSessionState, currentGameNumber } = useSession()
  const { totalSessionScore } = useSessionScore()
  const { words } = useWords()
  const { currentRound, setWord, setGameState } = useGame()
  const { gameSummaries } = useGameSummary()

  console.log({ words })

  const startGame = (word: string) => {
    setWord(word)
    setGameState(GAME_STATE.GAME_START)
  }
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(1,1,1,0.7)',
        },
        content: {
          position: 'absolute',
          backgroundColor: '#292929',
          margin: '0 auto',
          padding: '50px',
          width: '600px',
          height: '600px',
        },
      }}
    >
      {currentSessionState === SESSION_STATE.ENDED ? (
        <GameOverContent
          gameScore={totalSessionScore}
          onClose={onClose}
          todaysWordRaw={words.join(', ')}
        />
      ) : (
        <StartContent
          currentRound={currentRound}
          games={gameSummaries}
          onClose={onClose}
          session={currentGameNumber}
          startGame={startGame}
          word={words[currentGameNumber]}
        />
      )}
    </Modal>
  )
}
