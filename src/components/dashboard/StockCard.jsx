import React, { useState, useEffect } from "react";
import companyData from "../../data/StockCard.json";
import "./StockCard.css";

export default function StockCard({ companyName }) {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const ticker = companyData[companyName].ticker;
        const response = await fetch(
          `http://localhost:3001/api/stock/${ticker}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [companyName]);

  console.log(stockData);
  console.log(companyName);
  return (
    <div className="stock-card">
      <div className="upper-div">
        <div className="company-logo-container">
          <img
            className="company-logo"
            loading="lazy"
            alt=""
            src={`https://img.logo.dev/${companyName}.com?token=pk_dE_jx5XMS--t-pwbDnUpYA`}
          />
          <div className="company-name">{companyData[companyName].name}</div>
        </div>
        <div className="ticker-container">
          <div className="company-ticker">
            {companyData[companyName].ticker}
          </div>
          {stockData && (
            <div
              className="price-change-indicator"
              style={{
                color:
                  parseFloat(stockData.priceChange) < 0
                    ? "var(--color-red)"
                    : "var(--color-yellowgreen)",
              }}
            >
              {parseFloat(stockData.priceChange) >= 0 ? "+" : ""}
              {stockData.priceChange.toFixed(2)} (
              {stockData.percentChange.toFixed(2)}%)
            </div>
          )}
        </div>
      </div>
      <div className="financial-summary-container">
        <div className="financial-data-row">
          <div className="current-value">Current Value</div>
          {stockData && (
            <div className="current-price">${stockData.price.toFixed(2)}</div>
          )}
        </div>
        <img
          className="graph"
          loading="lazy"
          alt=""
          src={companyData[companyName].image.graph}
        />
      </div>
    </div>
  );
}
