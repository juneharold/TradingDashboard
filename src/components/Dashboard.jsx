import Navbar from "../components/Navbar";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import PriceContainer from "../components/PriceContainer";
import PriceSelectionContainer from "../components/PriceSelectionContainer";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <FrameComponent1 />
      <PriceSelectionContainer />
      <FrameComponent />
    </div>
  );
};

export default Dashboard;
