import React from 'react'
import styles from './CallToAction.module.css'

export default function CallToAction() {
  return (
    <section id="cta" className={styles.cta}>
      <h2>Ready to Detect Fake Audio?</h2>
      <p>Our advanced AI-powered audio forensics tool can help you identify and protect yourself from deepfake audio. Whether you're a journalist, investigator, or just someone who values authenticity, our tool is designed to provide accurate and reliable results.</p>
      <ul className={styles.features}>
        <li>🔍 <strong>Accurate Detection:</strong> Our AI model is trained on a vast dataset to ensure high accuracy in detecting fake audio.</li>
        <li>⚡ <strong>Fast Analysis:</strong> Get results in seconds with our optimized processing pipeline.</li>
        <li>🔒 <strong>Secure:</strong> Your data is processed securely and is never shared with third parties.</li>
        <li>🌐 <strong>Accessible:</strong> Use our tool from anywhere, anytime, on any device.</li>
      </ul>
      <p>Don't let fake audio deceive you. Take control and verify the authenticity of your audio files with our tool.</p>
      <a href="/analytics" className={styles.button}>Start Analyzing</a>
    </section>
  )
}
