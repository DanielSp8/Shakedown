import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/common/Dashboard";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Backpacks from "./components/backpacks/Backpacks";
import Search from "./components/search/Search";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/fonts.css";
import "./assets/css/styles.css";
import "./assets/css/navbar.css";
import "./assets/css/modal.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="backpacks" element={<Backpacks />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
