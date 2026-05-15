import React, { useEffect } from 'react'
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { LogOut, Package, Star, ShoppingBag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/UI/Button'

const Container = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 6rem 2rem 2rem;
`

const LoadingScreen = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	color: ${props => props.theme.colors.accent};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	gap: 1rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2rem;
`

const Nav = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
`

const NavLink = styled(Link)`
	padding: 0.8rem 1.5rem;
	border: 1px solid
		${props =>
			props.active
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1rem;
	transition: all 0.3s;
	text-decoration: none;

	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
		color: ${props => props.theme.colors.text};
	}
`

const AdminPanel = () => {
	const { isAdmin, loading, logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (!loading && !isAdmin) {
			navigate('/admin/login', { replace: true })
		}
	}, [isAdmin, loading, navigate])

	const handleLogout = async () => {
		await logout()
		navigate('/')
	}

	if (loading) {
		return (
			<Container>
				<LoadingScreen>Загрузка...</LoadingScreen>
			</Container>
		)
	}

	if (!isAdmin) {
		return null
	}

	return (
		<Container>
			<Header>
				<Title>Админ панель</Title>
				<Button variant='outline' onClick={handleLogout}>
					<LogOut size={16} /> Выйти
				</Button>
			</Header>
			<Nav>
				<NavLink
					to='/admin/orders'
					active={
						location.pathname.includes('/admin/orders') ||
						location.pathname === '/admin'
					}
				>
					<ShoppingBag
						size={16}
						style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
					/>
					Заказы
				</NavLink>
				<NavLink
					to='/admin/services'
					active={location.pathname.includes('/admin/services')}
				>
					<Package
						size={16}
						style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
					/>
					Услуги
				</NavLink>
				<NavLink
					to='/admin/reviews'
					active={location.pathname.includes('/admin/reviews')}
				>
					<Star
						size={16}
						style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
					/>
					Отзывы
				</NavLink>
			</Nav>
			<Outlet />
		</Container>
	)
}

export default AdminPanel
