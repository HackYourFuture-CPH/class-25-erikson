import { users } from "../../data/data";
import useFilterStore from "../../store/filter.store";

const LogoutOption: React.FC = () => {
  const { selectedFilter } = useFilterStore();

  return (
    <div className="logout-option" style={{ display: selectedFilter === 'All' ? 'none' : 'block' }}>
      <button onClick={() => console.log(users[0].name)}>Console</button>
    </div>
  );
};

export default LogoutOption;