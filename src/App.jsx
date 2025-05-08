import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import CategoryPage from "./components/CategoryPage";
import Dashboard from "./components/Dashboard";

function App() {
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

export default App;
