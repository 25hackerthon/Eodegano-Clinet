
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CreatePage from './pages/create'
import HomePage from './pages/Home'
import MapPage from "./page/Map"
import { TripProvider } from "./hooks/tripId"
import TemplatePage from "./page/templatePage";

function App() {
  return (
    <Router>
      <TripProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/Template" element={<TemplatePage />} />
          </Routes>
          </ div>
      </TripProvider>
    </Router>
  );
}

export default App;
