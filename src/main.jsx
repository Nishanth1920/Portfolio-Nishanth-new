import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';
import App from './App';
import AdminApp from './pages/AdminApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route
            path="*"
            element={
              <PortfolioProvider>
                <App />
              </PortfolioProvider>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
