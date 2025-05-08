import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import EventPage from "./components/EventPage.jsx";
import CategoryPage from "./components/CategoryPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import '../src/styles/app.scss';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}


