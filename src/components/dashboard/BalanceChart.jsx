import "./BalanceChart.css";

const BalanceChart = () => {
  return (
    <div className="heading-parent">
      <div className="heading">Your Total Balance</div>
      <div className="heading1">$ 1234.56</div>
      <div className="months-parent">
        <div className="months">
          <div className="text22">Jan</div>
          <div className="text23">Feb</div>
          <div className="text24">Mar</div>
          <div className="text25">Apr</div>
          <div className="text26">May</div>
          <div className="text27">Jun</div>
          <div className="text28">Jul</div>
          <div className="text29">Aug</div>
          <div className="text30">Sep</div>
          <div className="text31">Oct</div>
          <div className="text32">Nov</div>
          <div className="text33">Dec</div>
        </div>
        <div className="tip-parent">
          <div className="tip">
            <div className="income">Income</div>
            <div className="tip-child" />
          </div>
          <div className="tip1">
            <div className="tip-item" />
            <div className="expenses">Expenses</div>
          </div>
        </div>
        <div className="amount1">
          <div className="amount2">$4000</div>
          <div className="amount3">$3000</div>
          <div className="amount4">$2000</div>
          <div className="amount5">$1000</div>
          <div className="amount6">0</div>
        </div>
        <div className="lines-parent">
          <div className="lines">
            <div className="line" />
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
            <div className="line4" />
          </div>
          <img className="group-item" alt="" src="/main-menu.svg" />
          <img className="group-inner" alt="" src="/vector-61.svg" />
        </div>
        <div className="date">
          <div className="date-child" />
          <select className="iconarrow-square-down" />
          <div className="monthly">Monthly</div>
        </div>
        <div className="tooltips">
          <div className="tooltips-child" />
          <div className="tooltips-button" />
          <div className="tooltip">
            <div className="wrapper-group-14">
              <img
                className="wrapper-group-14-child"
                alt=""
                src="/group-14@2x.png"
              />
            </div>
            <div className="value">$224.00</div>
            <div className="value1">Income</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceChart;
