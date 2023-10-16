import { users } from '../../data/data';
import LogoutOption from './LogoutOption';

const Navbar: React.FC = () => {
  const user = users[0];

  return (
    <div className='navbar'>
      <div className='user-name'>
        {user.name}
        <span className='down-arrow'>▼</span>
        <LogoutOption />
      </div>
    </div>
  );
};

export default Navbar;
