import { useState } from "react";
import LoginPage from "./components/LoginPage";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";

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
      {(page != "dashboard") && (
        <>
          <div className="header-box">
            <img src="/logo.svg" alt="Cinque Terre" width="70" height="70" />
            <h1 style={{ float: "right" }}>Trading Dashboard</h1>
          </div>
          <LoginPage
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
