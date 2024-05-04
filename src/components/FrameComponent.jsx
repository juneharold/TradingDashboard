import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <section className="dashboard-inner">
      <div className="card-parent">
        <div className="card">
          <div className="header">
            <div className="text">
              <h3 className="text1">Trades History</h3>
            </div>
            <img
              className="dots-vertical-icon"
              loading="lazy"
              alt=""
              src="/dotsvertical.svg"
            />
          </div>
          <div className="body">
            <div className="deta-table-row1">
              <div className="deta-table-cell">
                <div className="id">ID</div>
                <div className="arrow">
                  <img
                    className="fichevron-up-icon"
                    alt=""
                    src="/fichevronup.svg"
                  />
                  <img
                    className="chevron-down-icon1"
                    alt=""
                    src="/chevrondown.svg"
                  />
                </div>
              </div>
              <div className="deta-table-cell1">
                <div className="ticker">TICKER</div>
                <div className="arrow1">
                  <img
                    className="fichevron-up-icon1"
                    alt=""
                    src="/fichevronup-1.svg"
                  />
                  <img
                    className="chevron-down-icon2"
                    alt=""
                    src="/chevrondown.svg"
                  />
                </div>
              </div>
              <div className="deta-table-cell2">
                <div className="type">TYPE</div>
                <div className="arrow2">
                  <img
                    className="fichevron-up-icon2"
                    alt=""
                    src="/fichevronup-1.svg"
                  />
                  <img
                    className="chevron-down-icon3"
                    alt=""
                    src="/chevrondown.svg"
                  />
                </div>
              </div>
              <div className="deta-table-cell3">
                <div className="amount5">AMOUNT</div>
              </div>
            </div>
            <div className="list8">
              <div className="list-item">#6552</div>
              <div className="list-item1">AAPL</div>
              <div className="list-item2">
                <div className="list-item3">Buy</div>
              </div>
              <div className="list-item4">$999.29</div>
            </div>
            <div className="list9">
              <div className="text2">#6551</div>
              <div className="text3">AMZN</div>
              <div className="ellipse-parent">
                <div className="ellipse-div" />
                <div className="text4">Sell</div>
              </div>
              <div className="text5">$72.40</div>
            </div>
            <div className="list10">
              <div className="text6">#6550</div>
              <div className="text7">TWTR</div>
              <div className="ellipse-group">
                <div className="frame-child5" />
                <div className="text8">Buy</div>
              </div>
              <div className="text9">$99.90</div>
            </div>
            <div className="list11">
              <div className="text10">#6549</div>
              <div className="text11">AMZN</div>
              <div className="ellipse-parent1">
                <div className="frame-child6" />
                <div className="text12">Buy</div>
              </div>
              <div className="text13">$249.99</div>
            </div>
            <div className="list12">
              <div className="text14">#6548</div>
              <div className="text15">MSFT</div>
              <div className="ellipse-parent2">
                <div className="frame-child7" />
                <div className="text16">Sell</div>
              </div>
              <div className="text17">$79.40</div>
            </div>
          </div>
        </div>
        <div className="market-indices-label">
          <h3 className="market-indices">Market Indices</h3>
          <div className="matchmaker">
            <button className="nasdaq-wrapper">
              <div className="nasdaq">NASDAQ</div>
            </button>
            <div className="kospi-wrapper">
              <div className="kospi">KOSPI</div>
            </div>
            <div className="nikkei-wrapper">
              <div className="nikkei">Nikkei</div>
            </div>
            <div className="dija-wrapper">
              <div className="dija">DIJA</div>
            </div>
            <div className="eurostoxx-wrapper">
              <div className="eurostoxx">EuroStoxx</div>
            </div>
          </div>
          <div className="frame-parent13">
            <div className="frame-wrapper3">
              <div className="d-parent">
                <div className="d">1D</div>
                <div className="k-o-s-p-i-label" />
              </div>
            </div>
            <div className="line-div" />
            <div className="d-wrapper">
              <div className="d1">5D</div>
            </div>
            <div className="frame-child8" />
            <div className="m-wrapper">
              <div className="m">1M</div>
            </div>
            <div className="frame-child9" />
            <div className="m-container">
              <div className="m1">6M</div>
            </div>
            <div className="frame-child10" />
            <div className="y-wrapper">
              <div className="y">1Y</div>
            </div>
          </div>
          <div className="frame-parent14">
            <div className="parent">
              <div className="div11">11,700</div>
              <div className="div12">11,650</div>
              <div className="div13">11,600</div>
              <div className="high-label-parent">
                <div className="high-label">
                  <div className="div14">11,550</div>
                  <div className="high">High</div>
                  <div className="div15">11,691.89</div>
                </div>
                <div className="low-parent">
                  <div className="low">Low</div>
                  <div className="div16">11,470.47</div>
                </div>
              </div>
            </div>
            <div className="frame-parent15">
              <div className="frame-parent16">
                <img
                  className="frame-child11"
                  loading="lazy"
                  alt=""
                  src="/group-1213.svg"
                />
                <div className="am">10 am</div>
                <div className="am1">11 am</div>
                <div className="pm">12 pm</div>
              </div>
              <div className="market-indices-rows">
                <div className="prev-close-avr-28-days-parent">
                  <div className="prev-close-avr">Prev close (Avr 28 Days)</div>
                  <div className="high-low-values">11,512.41</div>
                </div>
              </div>
              <div className="market-indices-rows1">
                <div className="open-parent">
                  <div className="open">Open</div>
                  <div className="div17">11,690.11</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
