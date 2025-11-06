import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/Home'
import CreatePage from './pages/create'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
