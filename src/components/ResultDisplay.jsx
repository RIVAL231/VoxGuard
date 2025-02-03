import PropTypes from 'prop-types'
import styles from './ResultDisplay.module.css'
import successIcon from '../assets/success.svg'
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
export default function ResultDisplay({ result }) {
  const [finalResult, setFinal] = useState();
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);

  useEffect(() => {
    const generateInsights = async () => {
      if (!result || isGeneratingInsights) return;
      
      setIsGeneratingInsights(true);
      try {
        const response = await fetch('http://localhost:3000/analyze-audio', {
          method: 'POST',
          body: JSON.stringify({
            analysisResults: JSON.stringify({
              fileName: result.file_name,
              prediction: result.message,
              confidence: result.probabilities[0][result.predicted_class],
              status: result.status
            })
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFinal(data.insights);
        console.log('Insights:', data.insights);
      } catch (error) {
        console.error('Error getting insights:', error);
        setFinal({ error: 'Failed to get insights' });
      } finally {
        setIsGeneratingInsights(false);
      }
    };

    generateInsights();
  }, [result]);

  if (!result) return null;

  // Find the highest probability and its index
  const probabilities = result.probabilities?.[0] || [];
  const maxProbability = Math.max(...probabilities);
  const maxIndex = probabilities.indexOf(maxProbability);

  return (
    <div className={styles.results}>
      {/* <pre className={styles.debug}>{JSON.stringify(result, null, 2)}</pre> */}
      
      {/* <div className={styles.content}>
        <div className={styles.row}>
          <strong>File:</strong> 
          <span>{result.file_name}</span>
        </div>

        <div className={styles.row}>
          <strong>Status:</strong> 
          <span>{result.status.charAt(0).toUpperCase()}{result.status.substring(1)}</span>
          <span><img src={successIcon} style={{height:"20px"}}></img></span>
        </div>

        <div className={styles.row}>
          <strong>Message:</strong> 
          <span>{result.message}</span>
        </div>

        {maxProbability > 0 && (
          <div className={styles.row}>
            <strong>Confidence:</strong>
            <div className={styles.probList}>
              <div>{maxProbability}%</div>
            </div>
          </div>
        )}
      </div> */}
      <div>
      {finalResult && (
          <div className={styles.insights}>
            <h3>Insights:</h3>
            {finalResult.error ? (
              <div className={styles.error}>{finalResult.error}</div>
            ) : (
              <ReactMarkdown>
                {finalResult?.candidates[0]?.content?.parts[0]?.text}
              </ReactMarkdown>
            )}
          </div>
        )}
    </div>
    </div>
  )
}

ResultDisplay.propTypes = {
  result: PropTypes.shape({
    file_name: PropTypes.string,
    status: PropTypes.string,
    message: PropTypes.string,
    predicted_class: PropTypes.number,
    probabilities: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }).isRequired
}