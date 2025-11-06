import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CreatePage from './pages/create'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
