import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import PromptBuilder from './components/PromptBuilder/PromptBuilder';
import AIPromptBuilder from './components/AIPromptBuilder/AIPromptBuilder';
import PromptOutput from './components/PromptOutput/PromptOutput';
import PromptHistory from './components/PromptHistory/PromptHistory';
import { generateRandomPrompt } from './utils/promptGenerator';
import { FiShuffle } from 'react-icons/fi';
import './styles/global.css';
import styles from './App.module.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('image');
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('promptHistory');
    const savedFavorites = localStorage.getItem('promptFavorites');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save to localStorage when history/favorites change
  useEffect(() => {
    localStorage.setItem('promptHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('promptFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setGeneratedPrompt(null);
  };

  const handleGenerate = (prompt) => {
    setGeneratedPrompt({
      ...prompt,
      id: Date.now(),
      category: selectedCategory,
      timestamp: Date.now()
    });
  };

  const handleSaveToHistory = (prompt) => {
    if (!history.find(p => p.prompt === prompt.prompt)) {
      setHistory(prev => [prompt, ...prev].slice(0, 50)); // Keep last 50
    }
  };

  const handleAddToFavorites = (prompt) => {
    if (!favorites.find(p => p.prompt === prompt.prompt)) {
      setFavorites(prev => [prompt, ...prev]);
    }
  };

  const handleDeleteFromHistory = (id) => {
    setHistory(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteFromFavorites = (id) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const handleLoadPrompt = (prompt) => {
    setSelectedCategory(prompt.category);
    setGeneratedPrompt(prompt);
  };

  const handleRandomPrompt = () => {
    const result = generateRandomPrompt();
    setSelectedCategory(result.category);
    setGeneratedPrompt({
      ...result,
      id: Date.now(),
      timestamp: Date.now()
    });
  };

  const renderPromptBuilder = () => {
    if (selectedCategory === 'ai-generated') {
      return <AIPromptBuilder onGenerate={handleGenerate} />;
    }
    return <PromptBuilder category={selectedCategory} onGenerate={handleGenerate} />;
  };

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Header />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.topActions}>
              <button className={styles.randomButton} onClick={handleRandomPrompt}>
                <FiShuffle /> Generate Random Prompt
              </button>
            </div>

            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className={styles.content}>
              <div className={styles.builderSection}>
                {renderPromptBuilder()}
                
                {generatedPrompt && (
                  <PromptOutput
                    prompt={generatedPrompt}
                    onSave={handleSaveToHistory}
                    onFavorite={handleAddToFavorites}
                  />
                )}
              </div>

              <aside className={styles.sidebar}>
                <PromptHistory
                  history={history}
                  favorites={favorites}
                  onDelete={handleDeleteFromHistory}
                  onDeleteFavorite={handleDeleteFromFavorites}
                  onLoad={handleLoadPrompt}
                />
              </aside>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>AI Prompt Generator - Create perfect prompts for any AI tool
Created by Ashraful Talukder</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;