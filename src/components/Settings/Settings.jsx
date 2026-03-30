import { useState } from 'react';
import { FiSettings, FiX, FiExternalLink, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { isGeminiConfigured } from '../../utils/geminiService';
import styles from './Settings.module.css';

const Settings = ({ isOpen, onClose }) => {
  const [showKey, setShowKey] = useState(false);
  const isConfigured = isGeminiConfigured();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <FiSettings /> Settings
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Google Gemini API</h3>
            
            <div className={styles.statusCard}>
              <div className={styles.statusIcon}>
                {isConfigured ? (
                  <FiCheck className={styles.successIcon} />
                ) : (
                  <FiAlertCircle className={styles.warningIcon} />
                )}
              </div>
              <div className={styles.statusText}>
                <span className={styles.statusLabel}>
                  {isConfigured ? 'API Key Configured' : 'API Key Not Found'}
                </span>
                <span className={styles.statusDescription}>
                  {isConfigured 
                    ? 'Gemini AI features are enabled'
                    : 'Add your API key to enable AI features'}
                </span>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h4>How to get your API key:</h4>
              <ol>
                <li>Visit Google AI Studio</li>
                <li>Sign in with your Google account</li>
                <li>Click "Create API Key"</li>
                <li>Copy the key and add it to your .env.local file</li>
              </ol>
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                <FiExternalLink /> Get API Key from Google AI Studio
              </a>
            </div>

            <div className={styles.envInfo}>
              <h4>Your .env.local file should contain:</h4>
              <code className={styles.code}>
                VITE_GEMINI_API_KEY=your_api_key_here
              </code>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Features Enabled</h3>
            <ul className={styles.featureList}>
              <li className={isConfigured ? styles.featureEnabled : styles.featureDisabled}>
                <span className={styles.featureIcon}>✨</span>
                Enhance prompts with AI
              </li>
              <li className={isConfigured ? styles.featureEnabled : styles.featureDisabled}>
                <span className={styles.featureIcon}>🤖</span>
                Generate prompts from descriptions
              </li>
              <li className={isConfigured ? styles.featureEnabled : styles.featureDisabled}>
                <span className={styles.featureIcon}>🎯</span>
                Platform-specific optimization
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.doneButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;