import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiZap } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <FiZap className={styles.logoIcon} size={40} />
          <h1 className={styles.title}>AI Prompt Generator</h1>
        </div>
        <p className={styles.subtitle}>
          Create perfect prompts for AI image generators, text models, code assistants, and creative writing
        </p>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;