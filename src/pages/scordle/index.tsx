import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import styles from './ScordlePage.module.scss'
import { InputRow } from '../../components/InputRow'
import { LettersUsed } from '../../components/LettersUsed'
import { ScoreCard } from '../../components/ScoreCard'
import {
  useGame,
  useGameScore,
  useGameSummary,
  usePlayerGuesses,
  useSession,
  useStatusMaps,
  useTimeStamp,
  useWords,
} from '../../store/scordle'
import { StartModal } from '../../components/StartModal'
import { Timer } from '../../components/Timer'
import { GAME_STATE } from '../../store/scordle/types'
import { Toaster } from 'react-hot-toast'
import words from '../../words.json'
import { InputTable } from '../../components/InputTable'

const gameWord1 = words[Math.floor(Math.random() * words.length)].toUpperCase()
const gameWord2 = words[Math.floor(Math.random() * words.length)].toUpperCase()
const gameWord3 = words[Math.floor(Math.random() * words.length)].toUpperCase()

export default function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const { timeStamps } = useTimeStamp()
  const { currentGameState, resetGame } = useGame()
  const { words, setWords } = useWords()
  const { reset: resetGuesses } = usePlayerGuesses()
  const { reset: resetStatusMaps } = useStatusMaps()
  const { reset: resetGameScore } = useGameScore()

  const resetState = () => {
    resetGuesses()
    resetGame()
    resetGameScore()
    resetStatusMaps()
    setIsOpen(true)
  }

  useEffect(() => {
    if (!words.length) {
      setWords([gameWord1, gameWord2, gameWord3])
    }
  }, [words])

  useEffect(() => {
    if (currentGameState === GAME_STATE.GAME_END && timeStamps.length) {
      setTimeout(resetState, 2000)
    }
  }, [currentGameState, timeStamps])

  const onClose = () => {
    setIsOpen(false)
  }
  return (
    <section className={styles.container} id="modal-root">
      <Header />
      <div className={styles.body}>
        <InputTable />
        <section className={styles['info-section']}>
          <Timer />
          <LettersUsed />
          <ScoreCard />
        </section>
      </div>
      <StartModal isOpen={isOpen} onClose={onClose} />
      <Toaster />
    </section>
  )
}
