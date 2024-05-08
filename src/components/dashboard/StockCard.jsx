import companyData from "../../data/StockCard.json";
import "./StockCard.css";

export default function StockCard({companyName}) {
  return (
    <div className="stock-card">
      <div className="upper-div">
        <div className="company-logo-container">
          <img
            className="company-logo"
            loading="lazy"
            alt=""
            src={companyData[companyName].image.icon}
          />
          <div className="company-name">{companyData[companyName].name}</div>
        </div>
        <div className="ticker-container">
          <div className="company-ticker">{companyData[companyName].ticker}</div>
          <div className="price-change-indicator">+5.63</div>
        </div>
      </div>
      <div className="financial-summary-container">
        <div className="financial-data-row">
          <div className="current-value">Current Value</div>
          <div className="current-price">$203.65</div>
        </div>
        <img className="graph" loading="lazy" alt="" src={companyData[companyName].image.graph} />
      </div>
    </div>
  );
}
