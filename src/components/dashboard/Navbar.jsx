import './Navbar.css';
import useAuth from '../useAuth';

const Navbar = () => {
  const { user, loading } = useAuth();
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h3 className="dashboard-text">Dashboard</h3>
        <div className="account-container">
          <div className="span">
            <div className="user-icon-container">
              <div className="user" />
              <img className="user-icon" alt="" src="/user@2x.png" />
            </div>
            <div className="john-doe">{loading ? 'Loading...' : user ? `${user.first_name} ${user.last_name}` : 'Not logged in'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
