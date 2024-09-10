import React, { useState, useEffect } from "react";
import StockGraph from "./StockGraph";
import axios from 'axios';
import companyData from "../../data/StockCard.json";
import "./StockCard.css";

export default function StockCard({ ticker }) {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=a9f21eab275bad66a23aadba66f3b626`);
        if (response.data && response.data.length > 0) {
          setStockData(response.data[0]);
          console.log(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [ticker]);

  return (
    <div className="stock-card">
      <div className="upper-div">
        <div className="company-logo-container">
          <img
            className="company-logo1"
            loading="lazy"
            alt=""
            src={`https://img.logo.dev/apple.com?token=pk_dE_jx5XMS--t-pwbDnUpYA`}
          />
          <div className="company-name1">{stockData ? stockData.name : "-"}</div>
        </div>
        <div className="ticker-container">
          <div className="company-ticker">
            {ticker}
          </div>
          {stockData && (
            <div
              className="price-change-indicator"
              style={{
                color:
                  parseFloat(stockData.change) < 0
                    ? "var(--color-red)"
                    : "var(--color-yellowgreen)",
              }}
            >
              {parseFloat(stockData.change) >= 0 ? "+" : ""}
              {stockData.change.toFixed(2)} (
              {stockData.changesPercentage.toFixed(2)}%)
            </div>
          )}
        </div>
      </div>
      <div className="financial-summary-container">
        <div className="financial-data-row">
          <div className="current-value">Current Value</div>
            <div className="current-price">{(stockData!=null ? "$"+stockData.price.toFixed(2) : "*No Data")}</div>
        </div>
        <StockGraph symbol={ticker} timeRange={"1week"} graphType={"sparkline"}/>
      </div>
    </div>
  );
}
