import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Components/AuthPage";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/fonts.css";
import "./assets/css/styles.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <hr />
    </div>
  );
}

export default App;
