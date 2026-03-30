import { categories } from '../../data/promptTemplates';
import styles from './CategorySelector.module.css';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose a Category</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.card} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className={styles.icon}>{category.icon}</span>
            <h3 className={styles.cardTitle}>{category.name}</h3>
            <p className={styles.cardDescription}>{category.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;