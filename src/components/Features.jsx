import React from 'react'
import styles from './Features.module.css'
import Footer from './Footer'

export default function Features() {
  const features = [
    {
      title: 'Fast Results',
      description: 'Get instant results on the authenticity of your audio files.'
    },
    {
      title: 'Multiple Forgery Types',
      description: 'Detect speech synthesis, voice conversion, and replay attacks.'
    },
    {
      title: 'User-Friendly Interface',
      description: 'Easily upload and analyze audio files with our intuitive interface.'
    },
    {
      title: 'Advanced AI Technology',
      description: 'Leverage cutting-edge AI models trained on extensive datasets for accurate detection.'
    },
    {
      title: 'Secure Processing',
      description: 'Your data is processed securely and is never shared with third parties.'
    },
    {
      title: 'Comprehensive Reports',
      description: 'Receive detailed reports on the analysis of your audio files.'
    }
  ]

  return (<>
    <section id="features" className={styles.features}>
      <h2>Key Features</h2>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    
    </>
  )
}