import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar1">
        <div className="search">
          <img className="search-icon" alt="" src="/search.svg" />
          <h3 className="dashboard3">Dashboard</h3>
        </div>
        <div className="action">
          <div className="avatar">
            <div className="background">
              <div className="background1" />
              <div className="overlay" />
            </div>
            <img className="avatar-icon" alt="" src="/avatar@2x.png" />
          </div>
          <img className="moon-stars-icon" alt="" src="/moonstars@2x.png" />
          <img
            className="layout-grid-add-icon"
            alt=""
            src="/layoutgridadd@2x.png"
          />
          <div className="span">
            <div className="user-parent">
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
