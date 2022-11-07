import React from 'react'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Scordle</h1>
    </div>
  )
}
