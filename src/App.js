import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TenantPage from "./components/TenantPage";
import CustomerPage from "./components/CustomerPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TenantPage />} />
        <Route
          path="tenants/:tenantId/customer/:customerId"
          element={<CustomerPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
