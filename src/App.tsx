import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/mainPage";
import TemplatePage from "./page/templatePage";
import { TripProvider } from "./hooks/tripId";

function App() {
  return (
    <Router>
      <TripProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Template" element={<TemplatePage />} />
        </Routes>
      </TripProvider>
    </Router>
  );
}

export default App;
