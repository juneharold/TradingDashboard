import companyData from "../data/StockCard.json";

export default function StockCard({companyName}) {
  return (
    <div className="income-expenses">
      <div className="monthly-budget">
        <div className="nvidia-1-parent">
          <img
            className="nvidia-1-icon"
            loading="lazy"
            alt=""
            src={companyData[companyName].image.icon}
          />
          <div className="nvidia">{companyData[companyName].name}</div>
        </div>
        <div className="nvda-parent">
          <div className="nvda">{companyData[companyName].ticker}</div>
          <div className="am-pm-indicator">+5.63</div>
        </div>
      </div>
      <div className="deta-table-row-parent">
        <div className="deta-table-row">
          <div className="current-value">Current Value</div>
          <div className="div2">$203.65</div>
        </div>
        <img className="graph" loading="lazy" alt="" src={companyData[companyName].image.graph} />
      </div>
    </div>
  );
}
