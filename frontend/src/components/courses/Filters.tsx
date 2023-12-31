import useFilterStore from '../../store/filter.store';
import styles from './Filters.module.css';

const Filters: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useFilterStore();

  const filterButtons = ['All', 'Personal', 'Finance', 'Professional'];

  return (
    <div className={styles.filters}>
      {filterButtons.map((filter) => (
        <button
          key={filter}
          className={selectedFilter === filter ? styles.active : styles.defaultStyle}
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;
