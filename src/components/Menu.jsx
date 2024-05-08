import "./Menu.css";
import SideBarButton from "./menu/SideBarButton";

const MAIN_MENU_BUTTON_LIST = [
  "dashboard",
  "watchlist",
  "transaction",
  "withdrawal",
];

const TODO_BUTTON_LIST = [
  "portfolio",
  "alerts",
  "analytics"
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
          <SideBarButton key="manage-account" buttonName="manage-account"/>
        </div>
      </div>
    </div>
  );
};

export default Menu;
