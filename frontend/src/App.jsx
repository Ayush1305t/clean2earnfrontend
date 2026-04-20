import { Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Impact from './pages/Impact';
import Contact from './pages/Contact';
import JoinBeta from './pages/JoinBeta';

function App() {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden selection:bg-primary-light/30">
      <AnimatedBackground />

      <Navbar />

      <main className="relative z-10 w-full pt-10 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-beta" element={<JoinBeta />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
