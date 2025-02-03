import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Detect Fake Audio with AI</h1>
        <p className={styles.mainText}>
          Protect yourself from audio deepfakes using our cutting-edge AI technology
        </p>
        <p className={styles.subText}>
          Our advanced machine learning model can detect various types of audio forgeries including speech synthesis, 
          voice conversion, and replay attacks with up to 99% accuracy.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3>99%</h3>
            <p>Accuracy Rate</p>
          </div>
          <div className={styles.stat}>
            <h3>3+</h3>
            <p>Forgery Types</p>
          </div>
          <div className={styles.stat}>
            <h3>&lt;5s</h3>
            <p>Processing Time</p>
          </div>
        </div>
        <div className={styles.ctaButtons}>
          <a href="#cta" className={styles.primaryCta}>Try it Now</a>
          <a href="/analytics" className={styles.secondaryCta}>View Analytics</a>
        </div>
      </div>
    </section>
  )
}