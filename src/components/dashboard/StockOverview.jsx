import './StockOverview.css';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import StockCard from './StockCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StockOverview = () => {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    const fetchCompanyList = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/current-portfolio`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.stocks_owned.length > 0) {
          var tickers = [];
          for (const stock of response.data.stocks_owned) {
            tickers.push(stock.ticker);
          }
          setCompanyList(tickers);
        } else {
          console.log('No stocks found');
        }
      } catch (error) {
        console.error("Error fetching user's portfolio data:", error);
      }
    };
    fetchCompanyList();
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <section className="stock-card-container">
        <h3 className="my-stock">My Stock</h3>
        <nav className="stock-card-slider">
          <div className="relative flex items-center w-[105%]">
            <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} color="black" />
            <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              { companyList ? companyList.map(ticker => (
                <StockCard key={ticker} ticker={ticker} className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" />
              )) : "You don't own any stocks"}
            </div>
            <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40} color="black" />
          </div>
        </nav>
      </section>
    </>
  );
};

export default StockOverview;
