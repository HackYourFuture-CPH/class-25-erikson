import useFilterStore from "../../store/filter.store";

const Filters: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useFilterStore();

  const filterButtons = ['All', 'Personal', 'Finance', 'Professional', 'Live Event'];

  return (
    <div className="filters">
      {filterButtons.map((filter) => (
        <button
          key={filter}
          className={selectedFilter === filter ? 'active' : ''}
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;