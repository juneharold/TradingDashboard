import "./MarketIndices.css"

const MarketIndices = () => {
    return (
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
    );
}
export default MarketIndices;