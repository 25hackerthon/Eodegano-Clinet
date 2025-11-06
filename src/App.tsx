import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage";
import TemplatePage from "./page/templatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Template" element={<TemplatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
