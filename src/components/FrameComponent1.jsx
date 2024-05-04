import "./FrameComponent1.css";
import React from "react";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import StockCard from "./StockCard";

const FrameComponent1 = () => {
  const companyList = ["nvidia", "meta", "tesla", "apple", "amd"];

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <div className="relative flex items-center w-[1200px]">
        <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} color="black"/>
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
          <img className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300" src="/nvidia-1.svg" alt="/" />
        </div>
        <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40} color="black"/>
      </div>

      <section className="stock-card-container">
        <h3 className="my-stock">My Stock</h3>
        <nav className="stock-card-slider">
          
          {
            companyList.map((company) => (
              <StockCard key={company} companyName={company} />
            ))
          }
          {/*<div className="income-expenses">
            <div className="monthly-budget">
              <div className="nvidia-1-parent">
                <img className="nvidia-1-icon" loading="lazy" alt="" src="/nvidia-1.svg" />
                <div className="nvidia">Nvidia</div>
              </div>
              <div className="nvda-parent">
                <div className="nvda">NVDA</div>
                <div className="am-pm-indicator">+5.63</div>
              </div>
            </div>
            <div className="deta-table-row-parent">
              <div className="deta-table-row">
                <div className="current-value">Current Value</div>
                <div className="div2">$203.65</div>
              </div>
              <img className="group-icon" loading="lazy" alt="" src="/group-3.svg" />
            </div>
          </div>
          <div className="income-expenses1">
            <div className="frame-parent5">
              <div className="meta-1-1-parent">
                <img className="meta-1-1-icon" loading="lazy" alt="" src="/meta1-1.svg" />
                <div className="meta">Meta</div>
              </div>
              <div className="meta-parent">
                <div className="meta1">Meta</div>
                <div className="div3">-4.44</div>
              </div>
            </div>
            <div className="frame-parent6">
              <div className="current-value-parent">
                <div className="current-value1">Current Value</div>
                <div className="div4">$151.74</div>
              </div>
              <img className="frame-child1" loading="lazy" alt="" src="/group-3-1.svg" />
            </div>
          </div>
          <div className="income-expenses2">
            <div className="frame-parent7">
              <div className="tesla-motors-1-1-parent">
                <img className="tesla-motors-1-1-icon" loading="lazy" alt="" src="/teslamotors1-1.svg" />
                <div className="tesla-inc">Tesla Inc</div>
              </div>
              <div className="tsla-parent">
                <div className="tsla">TSLA</div>
                <div className="div5">+17.63</div>
              </div>
            </div>
            <div className="frame-parent8">
              <div className="current-value-group">
                <div className="current-value2">Current Value</div>
                <div className="div6">$177.90</div>
              </div>
              <img className="frame-child2" loading="lazy" alt="" src="/group-3-2@2x.png" />
            </div>
          </div>
          <div className="income-expenses3">
            <div className="frame-parent9">
              <div className="frame-parent10">
                <div className="px-apple-logo-black-1-parent">
                  <img className="px-apple-logo-black-1-icon" alt="" src="/391pxapple-logo-black-1@2x.png" />
                  <img className="px-apple-logo-black-2-icon" alt="" src="/391pxapple-logo-black-2@2x.png" />
                </div>
                <div className="apple-inc">Apple Inc</div>
              </div>
              <div className="aapl-parent">
                <div className="aapl">AAPL</div>
                <div className="div7">+23.41</div>
              </div>
            </div>
            <div className="frame-parent11">
              <div className="current-value-container">
                <div className="current-value3">Current Value</div>
                <div className="div8">$145.93</div>
              </div>
              <img className="frame-child3" loading="lazy" alt="" src="/group-3-2@2x.png" />
            </div>
          </div>
          <div className="open-prev-close-avg-days">
            <div className="amd-logo-1-1-parent">
              <img className="amd-logo-1-1-icon" loading="lazy" alt="" src="/amdlogo1-1.svg" />
              <div className="current-value4">Current Value</div>
              <div className="div9">$75.40</div>
              <img className="frame-child4" alt="" src="/group-3-4.svg" />
              <div className="frame-parent12">
                <div className="amd-wrapper">
                  <div className="amd">AMD</div>
                </div>
                <div className="advanced-micro-devices">
                  Advanced Micro Devices, Inc.
                </div>
                <div className="wrapper">
                  <div className="div10">-2.01</div>
                </div>
                <div className="rectangle-div" />
              </div>
            </div>
            <div className="arrow-right-wrapper">
              <img className="arrow-right-icon" loading="lazy" alt="" src="/arrowright.svg" />
            </div>
          </div>*/}
        </nav>
      </section>
    </>
  );
};

export default FrameComponent1;
