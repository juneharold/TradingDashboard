import "./StockOverview.css";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import StockCard from "./StockCard";

const StockOverview = () => {
  const companyList = ["nvidia", "meta", "tesla", "apple", "amd"];

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <section className="stock-card-container">
        <h3 className="my-stock">My Stock</h3>
        <nav className="stock-card-slider">
          <div className="relative flex items-center w-[105%]">
            <MdChevronLeft
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideLeft}
              size={40}
              color="black"
            />
            <div
              id="slider"
              className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {companyList.map((company) => (
                <StockCard
                  key={company}
                  companyName={company}
                  className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                />
              ))}
              {companyList.map((company) => (
                <StockCard
                  key={company}
                  companyName={company}
                  className="inline-block p-2 cursor-pointer hover:scale-110 ease-in-out duration-300"
                />
              ))}
            </div>
            <MdChevronRight
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideRight}
              size={40}
              color="black"
            />
          </div>
        </nav>
      </section>
    </>
  );
};

export default StockOverview;
