import { useWordleState } from '../../store'
import { InputRow } from './index'

export default {
  component: InputRow,
  title: 'Scordle/Input Row',
}

export const Main = () => {
  useWordleState()
  return <InputRow isCurrentRound row={0} />
}
