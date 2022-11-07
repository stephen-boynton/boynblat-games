import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import styles from './ScordlePage.module.scss'
import { InputRow } from '../../components/InputRow'
import { LettersUsed } from '../../components/LettersUsed'
import { ScoreCard } from '../../components/ScoreCard'
import { useWordleState } from '../../store/wordle'
import { StartModal } from '../../components/StartModal'
import { Timer } from '../../components/Timer'
import words from '../../words.json'
import { GAME_STATE } from '../../store/wordle/types'

const ROUND_COUNT = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
const gameWord = words[Math.floor(Math.random() * words.length)]

export default function Home() {
  const [isOpen, setIsOpen] = useState(true)
  const getTodaysWord = useWordleState((state) => state.getTodaysWord)

  const currentRound = useWordleState((state) => state.currentRound)
  const currentGameState = useWordleState((state) => state.currentGameState)
  const calculateRoundScore = useWordleState(
    (state) => state.calculateRoundScore
  )

  getTodaysWord(gameWord.toUpperCase())

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const isFinalRound = currentRound === ROUND_COUNT.length
    if (currentGameState === GAME_STATE.BETWEEN_ROUNDS) {
      if (!isFinalRound) {
        const nextRoundFirstInput = document.querySelector(
          `#row-${currentRound}-input-0`
        )

        ;(nextRoundFirstInput as HTMLInputElement)?.focus()
      }

      calculateRoundScore()
    }
    if (currentGameState === GAME_STATE.GAME_END) {
      setIsOpen(true)
    }
  }, [currentGameState])

  return (
    <section className={styles.container} id="modal-root">
      <Header />
      <div className={styles.body}>
        <div className={styles['input-row-container']}>
          {ROUND_COUNT.map((round, index) => (
            <InputRow
              isCurrentRound={currentRound - 1 === index}
              key={round}
              row={index}
            />
          ))}
        </div>
        <section className={styles['info-section']}>
          <Timer />
          <LettersUsed />
          <ScoreCard />
        </section>
      </div>
      <StartModal isOpen={isOpen} onClose={onClose} />
    </section>
  )
}
