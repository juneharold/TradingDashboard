import "./SideBarButton.css";
import { IoHome, IoList, IoAnalyticsSharp } from "react-icons/io5";
import { RiExchangeLine, RiAccountCircleLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { HiOutlineCollection } from "react-icons/hi";
import { LuAlertCircle } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import sideBarData from "../../data/SideBarButton.json";

const ICON_MAP = {
  "dashboard": IoHome,
  "watchlist": IoList,
  "transaction": RiExchangeLine,
  "withdrawal": BiMoneyWithdraw,
  "portfolio": HiOutlineCollection,
  "alerts": LuAlertCircle,
  "analytics": IoAnalyticsSharp,
  "manage-account": RiAccountCircleLine,
  "log-out": MdOutlineLogout,
};

export default function SideBarButton({ buttonName, handleClick = ()=>{} }) {
  const Icon = ICON_MAP[buttonName];
  return (
    <button className="sidebar-button-box" onClick={handleClick}>
      <Icon size={20}/>
      <h3 className="sidebar-item-name">{sideBarData[buttonName].name}</h3>
    </button>
  );
}
