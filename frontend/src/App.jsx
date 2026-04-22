import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Contact from './pages/Contact';
import JoinBeta from './pages/JoinBeta';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative w-full overflow-x-hidden selection:bg-primary-light/30">
        <AnimatedBackground />

        <Navbar />

        <main className="relative z-10 w-full pt-10 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join-beta" element={<JoinBeta />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
