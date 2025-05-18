import { Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import CategoryPage from "./components/CategoryPage";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
