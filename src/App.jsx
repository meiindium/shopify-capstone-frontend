import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;