import React from 'react'
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import GlobalStyles from './styles/GlobalStyles'
import { useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ServicesProvider } from './context/ServicesContext'
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext'
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
import LeaveReview from './pages/LeaveReview'
import AdminPanel from './pages/admin/AdminPanel'
import AdminOrders from './pages/admin/AdminOrders'
import AdminServices from './pages/admin/AdminServices'
import AdminReviews from './pages/admin/AdminReviews'
import AdminSupport from './pages/admin/AdminSupport'

const lightTheme = {
	colors: {
		dark: '#F5F5F5',
		darker: '#FFFFFF',
		surface: 'rgba(255, 255, 255, 0.9)',
		elevated: '#FAFAFA',
		accent: '#1A1A1A',
		accentLight: '#333333',
		goldGradient: 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
		text: '#1A1A1A',
		textDimmed: '#555555',
		textMuted: '#888888',
		error: '#C84B4B',
		success: '#5B9A68',
		border: 'rgba(0, 0, 0, 0.1)',
		borderAccent: 'rgba(0, 0, 0, 0.25)',
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

const darkTheme = {
	colors: {
		dark: '#0B0E11',
		darker: '#05070A',
		surface: 'rgba(5, 7, 10, 0.80)',
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

// Admin route protection
const AdminRoute = ({ children }) => {
	const { isAdmin, loading } = useAuth()
	if (loading)
		return (
			<div style={{ padding: '6rem', textAlign: 'center' }}>Загрузка...</div>
		)
	if (!isAdmin) return <Navigate to='/profile' replace />
	return children
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
					path='/admin'
					element={
						<PageTransition>
							<AdminRoute>
								<AdminPanel />
							</AdminRoute>
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
					<Route
						path='support'
						element={
							<PageTransition>
								<AdminSupport />
							</PageTransition>
						}
					/>
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

const AppContent = () => {
	const { theme } = useThemeContext()
	const currentTheme = theme === 'light' ? lightTheme : darkTheme

	return (
		<ThemeProvider theme={currentTheme}>
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

function App() {
	return (
		<ThemeContextProvider>
			<AppContent />
		</ThemeContextProvider>
	)
}

export default App
