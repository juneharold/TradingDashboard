import "./SideBarButton.css";
import { IoHome, IoList, IoAnalyticsSharp } from "react-icons/io5";
import { RiExchangeLine, RiAccountCircleLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { HiOutlineCollection } from "react-icons/hi";
import { LuAlertCircle } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";

const ICON_MAP = {
  "Dashboard": IoHome,
  "Watchlist": IoList,
  "Transaction": RiExchangeLine,
  "Withdrawal": BiMoneyWithdraw,
  "Portfolio": HiOutlineCollection,
  "Alerts": LuAlertCircle,
  "Analytics": IoAnalyticsSharp,
  "Manage Account": RiAccountCircleLine,
  "Log Out": MdOutlineLogout,
};

export default function SideBarButton({ buttonName, handleClick = ()=>{} }) {
  const Icon = ICON_MAP[buttonName];
  return (
    <button className="sidebar-button-box" onClick={handleClick}>
      <Icon size={20}/>
      <h3 className="sidebar-item-name">{buttonName}</h3>
    </button>
  );
}
