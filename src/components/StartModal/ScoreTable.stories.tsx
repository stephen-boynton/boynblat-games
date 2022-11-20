import React from 'react'
import { META_SCORE } from '../../store/scordle/types'
import { ScoreTable } from './ScoreTable'

export default {
  component: ScoreTable,
  title: 'Scordle/ScoreTable',
}

const props = {
  round: 0,
  score: 1234,
  time: '1:34',
  metaScore: META_SCORE.G00D,
}

export const main = () => <ScoreTable rounds={[props, props]} totalRounds={3} />
