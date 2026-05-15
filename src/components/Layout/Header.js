import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext' // в начале файла
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	padding: 1.4rem 0;
	transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	background: ${props =>
		props.scrolled || props.open ? 'rgba(5, 7, 10, 0.97)' : 'transparent'};
	backdrop-filter: ${props =>
		props.scrolled || props.open ? 'blur(40px)' : 'none'};
	-webkit-backdrop-filter: ${props =>
		props.scrolled || props.open ? 'blur(40px)' : 'none'};
	border-bottom: ${props =>
		props.scrolled || props.open
			? `1px solid ${props.theme.colors.border}`
			: '1px solid transparent'};
`

const Container = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 0 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (min-width: 769px) {
		padding: 0 3rem;
	}
`

const Logo = styled(Link)`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.6rem;
	font-weight: 700;
	letter-spacing: 0.1em;
	color: ${props => props.theme.colors.accent};
	transition: color 0.5s ease;
	user-select: none;
	z-index: 102;

	span {
		color: ${props => props.theme.colors.text};
		font-weight: 400;
		margin-left: 4px;
		transition: color 0.5s ease;
	}

	&:hover {
		color: ${props => props.theme.colors.text};

		span {
			color: ${props => props.theme.colors.accent};
		}
	}

	&:active {
		transform: scale(0.97);
	}

	@media (min-width: 769px) {
		font-size: 2rem;
	}
`

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 3rem;

	@media (max-width: 768px) {
		display: ${props => (props.open ? 'flex' : 'none')};
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		height: 100dvh;
		background: rgba(5, 7, 10, 0.99);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		backdrop-filter: blur(40px);
		-webkit-backdrop-filter: blur(40px);
		z-index: 100;
		overflow-y: auto;
	}
`

const NavLink = styled(Link)`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	transition: color 0.3s;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 5px;
		height: 5px;
		background: ${props => props.theme.colors.accent};
		opacity: ${props => (props.active ? 1 : 0)};
		transition: opacity 0.3s;
	}

	&:hover {
		color: ${props => props.theme.colors.accent};
	}

	@media (max-width: 768px) {
		font-size: 1.4rem;
	}
`

const MobileProfileLink = styled(Link)`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.4rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	transition: color 0.3s;
	margin-top: 1rem;
	padding-top: 2rem;
	border-top: 1px solid ${props => props.theme.colors.border};
	width: 100%;
	text-align: center;

	&:hover {
		color: ${props => props.theme.colors.accent};
	}

	@media (min-width: 769px) {
		display: none;
	}
`

const MenuToggle = styled.button`
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	z-index: 102;
	padding: 0.5rem;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
`

const Bar = styled.span`
	display: block;
	width: 26px;
	height: 1.5px;
	background: ${props => props.theme.colors.text};
	transition: all 0.4s;

	&:nth-child(1) {
		transform: ${props =>
			props.open ? 'rotate(45deg) translate(5px, 6px)' : 'none'};
	}
	&:nth-child(2) {
		opacity: ${props => (props.open ? 0 : 1)};
	}
	&:nth-child(3) {
		transform: ${props =>
			props.open ? 'rotate(-45deg) translate(5px, -6px)' : 'none'};
	}
`

const HeaderRight = styled.div`
	display: none;
	align-items: center;
	gap: 2rem;

	@media (min-width: 769px) {
		display: flex;
	}
`

const ProfileLink = styled(Link)`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.textDimmed};
	transition: color 0.3s;

	&:hover {
		color: ${props => props.theme.colors.accent};
	}
`

const Header = () => {
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const location = useLocation()
	const { isAdmin } = useAuth()

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		setOpen(false)
	}, [location])

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.width = '100%'
		} else {
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.width = ''
		}
		return () => {
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.width = ''
		}
	}, [open])

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setOpen(false)
	}

	const links = [
		{ to: '/services', label: 'Услуги' },
		{ to: '/calculator', label: 'Расчёт' },
		{ to: '/reviews', label: 'Отзывы' },
		{ to: '/contacts', label: 'Контакты' },
		{ to: '/help', label: 'Помощь' },
	]

	return (
		<HeaderWrapper scrolled={scrolled} open={open}>
			<Container>
				<Logo to='/' onClick={handleClick}>
					CLEAR<span>BREATH</span>
				</Logo>

				<MenuToggle onClick={() => setOpen(!open)}>
					<Bar open={open} />
					<Bar open={open} />
					<Bar open={open} />
				</MenuToggle>

				<Nav open={open}>
					{links.map(link => (
						<NavLink
							key={link.to}
							to={link.to}
							active={location.pathname === link.to}
							onClick={handleClick}
						>
							{link.label}
						</NavLink>
					))}
					<MobileProfileLink
						to={isAdmin ? '/admin' : '/profile'}
						active={location.pathname === (isAdmin ? '/admin' : '/profile')}
						onClick={handleClick}
					>
						{isAdmin ? 'Админ' : 'Личный кабинет'}
					</MobileProfileLink>
				</Nav>

				<HeaderRight>
					<ProfileLink
						to={isAdmin ? '/admin' : '/profile'}
						onClick={handleClick}
					>
						{isAdmin ? 'Админ' : 'Кабинет'}
					</ProfileLink>
				</HeaderRight>
			</Container>
		</HeaderWrapper>
	)
}

export default Header
