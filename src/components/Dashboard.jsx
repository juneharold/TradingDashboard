import Navbar from "./dashboard/Navbar";
import StockOverview from "./dashboard/StockOverview";
import BalanceChart from "./dashboard/BalanceChart";
import MyPortfolio from "./dashboard/MyPortfolio";
import MarketIndices from "./dashboard/MarketIndices";
import StockPanel from "./dashboard/StockPanel";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <StockOverview />
      <StockPanel />
      <section className="panel-container">
        <MyPortfolio />
        <MarketIndices />
      </section>
      {/*<FrameComponent />*/}
    </div>
  );
};

export default Dashboard;
