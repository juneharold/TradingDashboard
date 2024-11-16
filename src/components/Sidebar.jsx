import "./Sidebar.css";
import SideBarButton from "./sidebar/SideBarButton";

const MAIN_MENU_BUTTON_LIST = [
  "Dashboard",
  "Watchlist",
  "Transaction",
  "Withdrawal",
];

const TODO_BUTTON_LIST = [
  "Portfolio",
  "Alerts",
  "Analytics"
];

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu1">
        <div className="section">
          <div className="main-menu">MAIN MENU</div>
        </div>
        <div className="apps-pages">
          {MAIN_MENU_BUTTON_LIST.map((buttonName)=>(<SideBarButton key={buttonName} buttonName={buttonName}/>))}
        </div>
        <div className="section1">
          <div className="todo">TODO</div>
        </div>
        <div className="apps-pages1">
          {TODO_BUTTON_LIST.map((buttonName)=>(<SideBarButton key={buttonName} buttonName={buttonName}/>))}
        </div>
        <div className="section2">
          <div className="settings">SETTINGS</div>
        </div>
        <div className="components">
          <SideBarButton key="Manage Account" buttonName="Manage Account"/>
          <SideBarButton key="Log Out" buttonName="Log Out" handleClick={() => localStorage.removeItem('token')}/>
        </div>
      </div>
    </div>
  );
};

export default Menu;
