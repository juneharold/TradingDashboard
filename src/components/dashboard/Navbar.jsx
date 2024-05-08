import "./Navbar.css";

const Navbar = () => {
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
            <div className="john-doe">John Doe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
