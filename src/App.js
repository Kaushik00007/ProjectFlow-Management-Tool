import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

// added a dark mode function
const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Blue
      },
      secondary: {
        main: '#dc004e', // Pink
      },
    },
  });

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <CssBaseline /> {/* Apply baseline styles */}
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar darkMode={darkMode} />
          <div style={{ flex: 1 }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/login" element={<Login darkMode={darkMode} />} />
                <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
                <Route path="/projects" element={<Projects darkMode={darkMode} />} />
                <Route path="/tasks" element={<Tasks darkMode={darkMode} />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;