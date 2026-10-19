import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './gsapSetup';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Ping from './pages/Ping';
import Post from './pages/Post';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  return (
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
      <AuthProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <div id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/ping" element={<Ping />} />
            <Route path="/post" element={<Post />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
