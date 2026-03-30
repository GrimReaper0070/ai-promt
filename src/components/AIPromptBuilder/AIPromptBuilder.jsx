import { useState } from 'react';
import { FiZap, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { targetPlatforms } from '../../data/promptTemplates';
import { generatePromptFromDescription, isGeminiConfigured } from '../../utils/geminiService';
import styles from './AIPromptBuilder.module.css';

const AIPromptBuilder = ({ onGenerate }) => {
  const [description, setDescription] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('general');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description of what you want');
      return;
    }

    if (!isGeminiConfigured()) {
      setError('Gemini API not configured. Please add your API key in Settings.');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const prompt = await generatePromptFromDescription(description, selectedPlatform);
      onGenerate({
        prompt,
        category: 'ai-generated',
        platform: selectedPlatform,
        description
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const isConfigured = isGeminiConfigured();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AI-Generated Prompt</h2>
      <p className={styles.subtitle}>
        Describe what you want and let Gemini create an optimized prompt for you
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>
            What do you want to create?
          </label>
          <textarea
            className={styles.textarea}
            placeholder="e.g., A beautiful sunset over mountains with a lake in the foreground, realistic photography style"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Target Platform
          </label>
          <div className={styles.platformGrid}>
            {targetPlatforms.map(platform => (
              <button
                key={platform.id}
                className={`${styles.platformCard} ${selectedPlatform === platform.id ? styles.platformActive : ''}`}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <span className={styles.platformIcon}>{platform.icon}</span>
                <span className={styles.platformName}>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            <FiAlertCircle /> {error}
          </div>
        )}

        <button
          className={styles.generateButton}
          onClick={handleGenerate}
          disabled={generating || !description.trim() || !isConfigured}
        >
          {generating ? (
            <><FiRefreshCw className={styles.spinning} /> Generating...</>
          ) : (
            <><FiZap /> Generate Prompt</>
          )}
        </button>

        {!isConfigured && (
          <div className={styles.warning}>
            <FiAlertCircle /> Configure your Gemini API key in Settings to use this feature
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPromptBuilder;