import { useState } from 'react';
import { FiCopy, FiCheck, FiHeart, FiSave, FiZap, FiRefreshCw, FiX } from 'react-icons/fi';
import { enhancePrompt, isGeminiConfigured } from '../../utils/geminiService';
import styles from './PromptOutput.module.css';

const PromptOutput = ({ prompt, onSave, onFavorite }) => {
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedEnhanced, setCopiedEnhanced] = useState(false);
  const [negativeCopied, setNegativeCopied] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhancedPrompt, setEnhancedPrompt] = useState(null);
  const [error, setError] = useState(null);

  const copyToClipboard = async (text, type = 'original') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'negative') {
        setNegativeCopied(true);
        setTimeout(() => setNegativeCopied(false), 2000);
      } else if (type === 'enhanced') {
        setCopiedEnhanced(true);
        setTimeout(() => setCopiedEnhanced(false), 2000);
      } else {
        setCopiedOriginal(true);
        setTimeout(() => setCopiedOriginal(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEnhance = async () => {
    if (!isGeminiConfigured()) {
      setError('Gemini API not configured. Check Settings.');
      return;
    }

    setEnhancing(true);
    setError(null);

    try {
      const enhanced = await enhancePrompt(prompt.prompt, prompt.category || 'image');
      setEnhancedPrompt(enhanced);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnhancing(false);
    }
  };

  const acceptEnhanced = () => {
    if (enhancedPrompt && onSave) {
      onSave({
        ...prompt,
        prompt: enhancedPrompt,
        enhanced: true
      });
    }
    setEnhancedPrompt(null);
  };

  const rejectEnhanced = () => {
    setEnhancedPrompt(null);
  };

  if (!prompt || !prompt.prompt) {
    return null;
  }

  const isConfigured = isGeminiConfigured();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Generated Prompt</h2>
      
      <div className={styles.promptCard}>
        {enhancedPrompt ? (
          /* Side-by-side comparison when enhanced version exists */
          <div className={styles.comparisonContainer}>
            <div className={styles.comparisonColumn}>
              <div className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>Original</h3>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(prompt.prompt, 'original')}
                >
                  {copiedOriginal ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
                </button>
              </div>
              <div className={styles.promptText}>
                {prompt.prompt}
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={`${styles.comparisonColumn} ${styles.enhancedColumn}`}>
              <div className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>✨ Enhanced</h3>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(enhancedPrompt, 'enhanced')}
                >
                  {copiedEnhanced ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
                </button>
              </div>
              <div className={styles.enhancedText}>
                {enhancedPrompt}
              </div>
              <div className={styles.comparisonActions}>
                <button className={styles.acceptButton} onClick={acceptEnhanced}>
                  <FiCheck /> Use Enhanced
                </button>
                <button className={styles.rejectButton} onClick={rejectEnhanced}>
                  <FiX /> Keep Original
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Single view when no enhanced version */
          <div className={styles.promptSection}>
            <div className={styles.promptHeader}>
              <h3 className={styles.sectionTitle}>Prompt</h3>
              <div className={styles.promptActions}>
                <button
                  className={styles.enhanceButton}
                  onClick={handleEnhance}
                  disabled={enhancing || !isConfigured}
                  title={!isConfigured ? 'Configure Gemini API in Settings' : 'Enhance with AI'}
                >
                  {enhancing ? (
                    <><FiRefreshCw className={styles.spinning} /> Enhancing...</>
                  ) : (
                    <><FiZap /> Enhance with AI</>
                  )}
                </button>
                <button
                  className={styles.copyButton}
                  onClick={() => copyToClipboard(prompt.prompt, 'original')}
                >
                  {copiedOriginal ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
                </button>
              </div>
            </div>
            <div className={styles.promptText}>
              {prompt.prompt}
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {prompt.negativePrompt && (
          <div className={styles.promptSection}>
            <div className={styles.promptHeader}>
              <h3 className={styles.sectionTitle}>Negative Prompt</h3>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(prompt.negativePrompt, 'negative')}
              >
                {negativeCopied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
              </button>
            </div>
            <div className={styles.promptText}>
              {prompt.negativePrompt}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={() => onSave?.(prompt)}>
          <FiSave /> Save to History
        </button>
        <button className={styles.actionButton} onClick={() => onFavorite?.(prompt)}>
          <FiHeart /> Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default PromptOutput;