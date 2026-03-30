import { useState } from 'react';
import {
  imageStyles,
  moods,
  lightingOptions,
  detailLevels,
  subjects,
  textTones,
  codeLanguages,
  codeTaskTypes,
  writingGenres,
  writingFormats,
  negativePromptSuggestions
} from '../../data/promptTemplates';
import { generatePrompt } from '../../utils/promptGenerator';
import { FiShuffle, FiChevronDown, FiX } from 'react-icons/fi';
import styles from './PromptBuilder.module.css';

const PromptBuilder = ({ category, onGenerate }) => {
  const [options, setOptions] = useState({});
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    const result = generatePrompt(category, { ...options, negativePrompt });
    onGenerate(result);
  };

  const addNegativeSuggestion = (suggestion) => {
    if (!negativePrompt.includes(suggestion)) {
      setNegativePrompt(prev => prev ? `${prev}, ${suggestion}` : suggestion);
    }
  };

  const removeNegativeTag = (tag) => {
    const tags = negativePrompt.split(', ').filter(t => t !== tag);
    setNegativePrompt(tags.join(', '));
  };

  const renderImageOptions = () => (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Subject</label>
        <select
          className={styles.select}
          value={options.subject || ''}
          onChange={(e) => handleOptionChange('subject', e.target.value)}
        >
          <option value="">Select a subject...</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Custom Description (optional)</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g., A majestic dragon flying over mountains"
          value={options.customDescription || ''}
          onChange={(e) => handleOptionChange('customDescription', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Style</label>
        <div className={styles.tagGrid}>
          {imageStyles.map(style => (
            <button
              key={style.id}
              className={`${styles.tag} ${options.style === style.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('style', style.id)}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Mood</label>
        <div className={styles.tagGrid}>
          {moods.map(mood => (
            <button
              key={mood.id}
              className={`${styles.tag} ${options.mood === mood.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('mood', mood.id)}
            >
              {mood.emoji} {mood.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Lighting</label>
        <div className={styles.tagGrid}>
          {lightingOptions.map(light => (
            <button
              key={light.id}
              className={`${styles.tag} ${options.lighting === light.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('lighting', light.id)}
            >
              {light.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Detail Level</label>
        <div className={styles.tagGrid}>
          {detailLevels.map(level => (
            <button
              key={level.id}
              className={`${styles.tag} ${options.detailLevel === level.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('detailLevel', level.id)}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Negative Prompt
          <button
            className={styles.suggestionsToggle}
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            Suggestions <FiChevronDown className={showSuggestions ? styles.chevronOpen : ''} />
          </button>
        </label>
        
        {showSuggestions && (
          <div className={styles.suggestions}>
            {negativePromptSuggestions.map(suggestion => (
              <button
                key={suggestion}
                className={styles.suggestionTag}
                onClick={() => addNegativeSuggestion(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className={styles.negativePromptContainer}>
          {negativePrompt && (
            <div className={styles.negativeTags}>
              {negativePrompt.split(', ').filter(Boolean).map(tag => (
                <span key={tag} className={styles.negativeTag}>
                  {tag}
                  <button onClick={() => removeNegativeTag(tag)}>
                    <FiX />
                  </button>
                </span>
              ))}
            </div>
          )}
          <textarea
            className={styles.textarea}
            placeholder="Things to avoid in the image..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            rows={2}
          />
        </div>
      </div>
    </>
  );

  const renderTextOptions = () => (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Task/Prompt</label>
        <textarea
          className={styles.textarea}
          placeholder="What should the AI help you with?"
          value={options.task || ''}
          onChange={(e) => handleOptionChange('task', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Tone</label>
        <div className={styles.tagGrid}>
          {textTones.map(tone => (
            <button
              key={tone.id}
              className={`${styles.tag} ${options.tone === tone.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('tone', tone.id)}
            >
              {tone.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Context (optional)</label>
        <textarea
          className={styles.textarea}
          placeholder="Additional context for the AI..."
          value={options.context || ''}
          onChange={(e) => handleOptionChange('context', e.target.value)}
          rows={2}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Additional Instructions (optional)</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Any specific requirements..."
          value={options.additionalInstructions || ''}
          onChange={(e) => handleOptionChange('additionalInstructions', e.target.value)}
        />
      </div>
    </>
  );

  const renderCodeOptions = () => (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Language</label>
        <select
          className={styles.select}
          value={options.language || ''}
          onChange={(e) => handleOptionChange('language', e.target.value)}
        >
          <option value="">Select a language...</option>
          {codeLanguages.map(lang => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Task Type</label>
        <div className={styles.tagGrid}>
          {codeTaskTypes.map(task => (
            <button
              key={task.id}
              className={`${styles.tag} ${options.taskType === task.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('taskType', task.id)}
            >
              {task.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          placeholder="Describe what you want to build..."
          value={options.description || ''}
          onChange={(e) => handleOptionChange('description', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Requirements (optional)</label>
        <textarea
          className={styles.textarea}
          placeholder="Specific requirements, constraints, or technologies to use..."
          value={options.requirements || ''}
          onChange={(e) => handleOptionChange('requirements', e.target.value)}
          rows={2}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={options.includeComments || false}
            onChange={(e) => handleOptionChange('includeComments', e.target.checked)}
          />
          Include comments in code
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={options.includeTests || false}
            onChange={(e) => handleOptionChange('includeTests', e.target.checked)}
          />
          Include unit tests
        </label>
      </div>
    </>
  );

  const renderCreativeOptions = () => (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Format</label>
        <div className={styles.tagGrid}>
          {writingFormats.map(format => (
            <button
              key={format.id}
              className={`${styles.tag} ${options.format === format.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('format', format.id)}
            >
              {format.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Genre</label>
        <div className={styles.tagGrid}>
          {writingGenres.map(genre => (
            <button
              key={genre.id}
              className={`${styles.tag} ${options.genre === genre.id ? styles.tagActive : ''}`}
              onClick={() => handleOptionChange('genre', genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Theme</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g., Redemption, Coming of age, Betrayal..."
          value={options.theme || ''}
          onChange={(e) => handleOptionChange('theme', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Setting (optional)</label>
        <input
          type="text"
          className={styles.input}
          placeholder="e.g., Medieval fantasy kingdom, Space station..."
          value={options.setting || ''}
          onChange={(e) => handleOptionChange('setting', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Characters (optional)</label>
        <textarea
          className={styles.textarea}
          placeholder="Describe the main characters..."
          value={options.characters || ''}
          onChange={(e) => handleOptionChange('characters', e.target.value)}
          rows={2}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Additional Elements (optional)</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Plot twists, specific scenes, etc..."
          value={options.additionalElements || ''}
          onChange={(e) => handleOptionChange('additionalElements', e.target.value)}
        />
      </div>
    </>
  );

  const renderOptions = () => {
    switch (category) {
      case 'image':
        return renderImageOptions();
      case 'text':
        return renderTextOptions();
      case 'code':
        return renderCodeOptions();
      case 'creative':
        return renderCreativeOptions();
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Build Your Prompt</h2>
      <div className={styles.form}>
        {renderOptions()}
        <button className={styles.generateButton} onClick={handleGenerate}>
          <FiShuffle /> Generate Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptBuilder;