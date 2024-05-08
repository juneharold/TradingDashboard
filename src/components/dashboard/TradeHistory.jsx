import "./TradeHistory.css";
import { IoMdMore } from "react-icons/io";
import HistoryItem from "./HistoryItem";

const TradeHistory = () => {
  return (
    <div className="card">
      <div className="header-container">
        <h3 className="header-text">Trades History</h3>
        <IoMdMore size={22} />
      </div>
      <div className="body">
        <div className="table-header-container">
          <div className="header-text-container">
            <div className="id-text">ID</div>
          </div>
          <div className="header-text-container">
            <div className="ticker-text">TICKER</div>
          </div>
          <div className="header-text-container">
            <div className="type-text">TYPE</div>
          </div>
          <div className="header-text-container">
            <div className="amount-text">AMOUNT</div>
          </div>
        </div>
        <HistoryItem id="6552" ticker="AAPL" buy={true} amount="999.29"/>
        <HistoryItem id="6551" ticker="AMZN" buy={false} amount="72.40"/>
        <HistoryItem id="6550" ticker="TWTR" buy={true} amount="99.00"/>
        <HistoryItem id="6549" ticker="AMZN" buy={true} amount="249.99"/>
        <HistoryItem id="6548" ticker="MSFT" buy={false} amount="79.40"/>
      </div>
    </div>
  );
};
export default TradeHistory;
