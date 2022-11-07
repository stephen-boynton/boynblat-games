import { LetterInput } from './index'
import { action } from '@storybook/addon-actions'
import { GUESS_STATE } from '../../store/wordle/types'

export default {
  component: LetterInput,
  title: 'Scordle|Letter Input',
  controls: {
    displayState: {
      type: 'select',
      options: Object.values(GUESS_STATE),
    },
  },
}

export const main = ({ displayState }) => (
  <LetterInput
    displayState={displayState}
    handleInput={action('handleInput')}
    handleKeypress={action('handleKeypress')}
    readonly={false}
    selectorId="id"
    value="L"
  />
)
