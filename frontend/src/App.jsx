import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Components/AuthPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Backpacks from "./Components/Backpacks";
import Search from "./Components/Search";
import NotFound from "./Components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/fonts.css";
import "./assets/css/styles.css";

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
