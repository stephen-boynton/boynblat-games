import { FormEvent } from 'react'

export const handleInput =
  (refMap, setUserInput, index: number) => (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value?.toUpperCase()
    const nextTarget: React.RefObject<HTMLInputElement> | undefined =
      refMap[index + 1]

    setUserInput(index, value)

    if (value && nextTarget && nextTarget.current) {
      nextTarget.current.focus()
    }
  }
