
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CreatePage from './pages/create'
import HomePage from './pages/Home';
import './App.css'
import MainPage from "./page/Map";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/map" element={<MainPage />} />
        </Routes>
        </div>
    </Router>
  )
}

export default App;
