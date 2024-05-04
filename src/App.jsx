import { useState } from "react";
import Form from "./components/Form";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import PriceContainer from "./components/PriceContainer";
import PriceSelectionContainer from "./components/PriceSelectionContainer";

export default function App() {
  const [page, changePage] = useState("login");
  function handleFormPage() {
    if (page === "signup") changePage("login");
    else changePage("signup");
    console.log(page);
  }
  function handleToDashboard() {
    changePage("dashboard");
  }

  return (
    <main>
      {(page === "login" || page === "signup") && (
        <>
          <div className="topleft">
            <img src="/logo.svg" alt="Cinque Terre" width="70" height="70" />
            <h1 style={{ float: "right" }}>Trading Dashboard</h1>
          </div>
          <Form
            type={page}
            handleProceed={handleToDashboard}
            handleFormPage={handleFormPage}
          />
        </>
      )}
      {page === "dashboard" && (
        <div className="dashboard-container">
          <Menu />
          <Dashboard />
        </div>
      )}
    </main>
  );
}
