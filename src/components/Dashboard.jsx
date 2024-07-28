import Navbar from "./dashboard/Navbar";
import StockOverview from "./dashboard/StockOverview";
import PlotlyChart from "./dashboard/PlotlyChart";
import BalanceChart from "./dashboard/BalanceChart";
import TradeHistory from "./dashboard/TradeHistory";
import MarketIndices from "./dashboard/MarketIndices";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <StockOverview />
      <PlotlyChart />
      <section className="panel-container">
        <TradeHistory />
        <MarketIndices />
      </section>
      {/*<FrameComponent />*/}
    </div>
  );
};

export default Dashboard;
