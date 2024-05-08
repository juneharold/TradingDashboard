import "./HistoryItem.css";

const HistoryItem = ({id, ticker, buy, amount}) => {
    return (
        <div className="item-container">
          <div className="item-id">#{id}</div>
          <div className="item-ticker">{ticker}</div>
          <div className="item-buy">
            <div className="buy-text" style={{color: buy===true ? "#013399" : "#d02626"}}>{buy===true ? "Buy" : "Sell"}</div>
          </div>
          <div className="item-amount">${amount}</div>
        </div>
    );
}

export default HistoryItem;