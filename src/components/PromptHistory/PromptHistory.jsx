import { useState } from 'react';
import { FiTrash2, FiCopy, FiCheck, FiHeart, FiClock, FiStar } from 'react-icons/fi';
import styles from './PromptHistory.module.css';

const PromptHistory = ({ history, favorites, onDelete, onDeleteFavorite, onLoad }) => {
  const [activeTab, setActiveTab] = useState('history');
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      image: '🖼️',
      text: '💬',
      code: '💻',
      creative: '✍️'
    };
    return icons[category] || '📝';
  };

  const renderList = (items, type) => {
    if (items.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No {type === 'history' ? 'saved prompts' : 'favorites'} yet.</p>
          <p className={styles.emptyHint}>
            {type === 'history' 
              ? 'Generate a prompt and click "Save to History"' 
              : 'Generate a prompt and click "Add to Favorites"'}
          </p>
        </div>
      );
    }

    return (
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <span className={styles.category}>
                {getCategoryIcon(item.category)} {item.category}
              </span>
              <span className={styles.date}>{formatDate(item.timestamp)}</span>
            </div>
            <div className={styles.promptPreview}>
              {item.prompt.length > 150 
                ? `${item.prompt.substring(0, 150)}...` 
                : item.prompt}
            </div>
            {item.negativePrompt && (
              <div className={styles.negativePreview}>
                <strong>Negative:</strong> {item.negativePrompt.length > 100 
                  ? `${item.negativePrompt.substring(0, 100)}...` 
                  : item.negativePrompt}
              </div>
            )}
            <div className={styles.itemActions}>
              <button
                className={styles.actionBtn}
                onClick={() => copyToClipboard(item.prompt, item.id)}
              >
                {copiedId === item.id ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => onLoad?.(item)}
              >
                Load
              </button>
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => type === 'history' ? onDelete?.(item.id) : onDeleteFavorite?.(item.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FiClock /> History ({history.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'favorites' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <FiHeart /> Favorites ({favorites.length})
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === 'history' 
          ? renderList(history, 'history') 
          : renderList(favorites, 'favorites')}
      </div>
    </div>
  );
};

export default PromptHistory;