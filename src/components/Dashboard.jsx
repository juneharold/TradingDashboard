import Navbar from "./dashboard/Navbar";
import StockOverview from "./dashboard/StockOverview";
import FrameComponent from "./FrameComponent";
import BalanceChart from "./dashboard/BalanceChart";
import TradeHistory from "./dashboard/TradeHistory";
import MarketIndices from "./dashboard/MarketIndices";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <StockOverview />
      <BalanceChart />
      <section className="panel-container">
        <TradeHistory />
        <MarketIndices />
      </section>
      {/*<FrameComponent />*/}
    </div>
  );
};

export default Dashboard;
