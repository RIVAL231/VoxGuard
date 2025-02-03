import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Audio Forensics</div>
      <nav className={styles.nav}>
        <a href="#features">Features</a>
        <a href="#cta">Get Started</a>
      </nav>
    </header>
  )
}

