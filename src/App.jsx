import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
