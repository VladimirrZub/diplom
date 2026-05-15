import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';
import Help from './pages/Help';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const theme = {
  colors: {
    dark: '#0B0E11',
    darker: '#05070A',
    surface: '#14191F',
    elevated: '#1C2128',
    accent: '#D4AF37',
    accentLight: '#F0D060',
    goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
    text: '#E8E3D9',
    textDimmed: '#8B8478',
    textMuted: '#5C5850',
    error: '#C84B4B',
    success: '#5B9A68',
    border: 'rgba(212, 175, 55, 0.1)',
    borderAccent: 'rgba(212, 175, 55, 0.25)',
  },
  fonts: {
    primary: "'Cormorant Garamond', serif",
    secondary: "'Inter', sans-serif",
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1400px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/help" element={<Help />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;