import React, { useState, useEffect } from "react";
import StockGraph from "./StockGraph";
import axios from 'axios';
import "./StockCard.css";

const FMP_API_KEY = import.meta.env.VITE_FMP; 

export default function StockCard({ ticker }) {
  const [stockData, setStockData] = useState(null);
  const [websiteLink, setWebsiteLink] = useState(null); // websiteLink should be something like "apple.com" to search images

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response1 = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${FMP_API_KEY}`);
        if (response1.data && response1.data.length > 0) {
          setStockData(response1.data[0]);
        }
        const response2 = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${FMP_API_KEY}`);
        if (response2.data && response2.data.length > 0) {
          const url = new URL(response2.data[0].website);
          let domain = url.hostname;
          // Remove 'www.' if it exists
          if (domain.startsWith('www.')) {
            domain = domain.replace('www.', '');
          }
          setWebsiteLink(domain);
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
            src={`https://img.logo.dev/${websiteLink}?token=pk_dE_jx5XMS--t-pwbDnUpYA`}
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
