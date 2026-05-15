import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import GlobalStyles from './styles/GlobalStyles'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ServicesProvider } from './context/ServicesContext'
import Layout from './components/Layout/Layout'
import PageTransition from './components/UI/PageTransition'
import Home from './pages/Home'
import Services from './pages/Services'
import Calculator from './pages/Calculator'
import Reviews from './pages/Reviews'
import Contacts from './pages/Contacts'
import Help from './pages/Help'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPanel from './pages/admin/AdminPanel'
import AdminOrders from './pages/admin/AdminOrders'
import AdminServices from './pages/admin/AdminServices'
import AdminReviews from './pages/admin/AdminReviews'
import LeaveReview from './pages/LeaveReview'

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
}

const AnimatedRoutes = () => {
	const location = useLocation()
	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route
					path='/'
					element={
						<PageTransition>
							<Home />
						</PageTransition>
					}
				/>
				<Route
					path='/services'
					element={
						<PageTransition>
							<Services />
						</PageTransition>
					}
				/>
				<Route
					path='/calculator'
					element={
						<PageTransition>
							<Calculator />
						</PageTransition>
					}
				/>
				<Route
					path='/reviews'
					element={
						<PageTransition>
							<Reviews />
						</PageTransition>
					}
				/>
				<Route
					path='/contacts'
					element={
						<PageTransition>
							<Contacts />
						</PageTransition>
					}
				/>
				<Route
					path='/help'
					element={
						<PageTransition>
							<Help />
						</PageTransition>
					}
				/>
				<Route
					path='/cart'
					element={
						<PageTransition>
							<Cart />
						</PageTransition>
					}
				/>
				<Route
					path='/checkout'
					element={
						<PageTransition>
							<Checkout />
						</PageTransition>
					}
				/>
				<Route
					path='/login'
					element={
						<PageTransition>
							<Login />
						</PageTransition>
					}
				/>
				<Route
					path='/register'
					element={
						<PageTransition>
							<Register />
						</PageTransition>
					}
				/>
				<Route
					path='/profile'
					element={
						<PageTransition>
							<Profile />
						</PageTransition>
					}
				/>
				<Route
					path='/review/:orderId'
					element={
						<PageTransition>
							<LeaveReview />
						</PageTransition>
					}
				/>
				<Route
					path='/admin/login'
					element={
						<PageTransition>
							<AdminLogin />
						</PageTransition>
					}
				/>
				<Route
					path='/admin'
					element={
						<PageTransition>
							<AdminPanel />
						</PageTransition>
					}
				>
					<Route
						index
						element={
							<PageTransition>
								<AdminOrders />
							</PageTransition>
						}
					/>
					<Route
						path='orders'
						element={
							<PageTransition>
								<AdminOrders />
							</PageTransition>
						}
					/>
					<Route
						path='services'
						element={
							<PageTransition>
								<AdminServices />
							</PageTransition>
						}
					/>
					<Route
						path='reviews'
						element={
							<PageTransition>
								<AdminReviews />
							</PageTransition>
						}
					/>
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<BrowserRouter>
				<AuthProvider>
					<ServicesProvider>
						<CartProvider>
							<Layout>
								<AnimatedRoutes />
							</Layout>
						</CartProvider>
					</ServicesProvider>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
