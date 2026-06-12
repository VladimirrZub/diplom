import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import CartIcon from './CartIcon'
import ThemeToggle from './ThemeToggle'
import { useCart } from '../../context/CartContext'

const Main = styled.main`
	min-height: 100vh;
	padding-top: 0;
	position: relative;
	z-index: 1;
`

const ParallaxBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	z-index: 0;
	overflow: hidden;
`

const GradientLayer = styled.div`
	position: absolute;
	top: -100vh;
	left: -100vw;
	width: 300vw;
	height: 300vh;
	background:
		radial-gradient(
			ellipse at 20% 20%,
			${props => props.theme.colors.accent}10 0%,
			transparent 40%
		),
		radial-gradient(
			ellipse at 80% 60%,
			${props => props.theme.colors.accent}08 0%,
			transparent 40%
		),
		radial-gradient(
			ellipse at 40% 85%,
			${props => props.theme.colors.accent}06 0%,
			transparent 40%
		);
`

const GridLayer = styled.div`
	position: absolute;
	top: -100vh;
	left: -100vw;
	width: 300vw;
	height: 300vh;
	background-image:
		linear-gradient(
			${props => props.theme.colors.accent}10 1px,
			transparent 1px
		),
		linear-gradient(
			90deg,
			${props => props.theme.colors.accent}10 1px,
			transparent 1px
		);
	background-size: 100px 100px;
`

const Vignette = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: radial-gradient(
		ellipse at center,
		transparent 30%,
		${props => props.theme.colors.darker}cc 100%
	);
	pointer-events: none;
	z-index: 0;
`

const Layout = ({ children }) => {
	const { isVisible } = useCart()
	const gradientRef = useRef(null)
	const gridRef = useRef(null)
	const rafRef = useRef(null)
	const currentScrollRef = useRef(0)
	const targetScrollRef = useRef(0)

	useEffect(() => {
		const handleScroll = () => {
			targetScrollRef.current = window.pageYOffset
		}

		const animate = () => {
			currentScrollRef.current +=
				(targetScrollRef.current - currentScrollRef.current) * 0.06
			const scrolled = currentScrollRef.current

			if (gradientRef.current) {
				gradientRef.current.style.transform = `translate3d(0, ${scrolled * 0.08}px, 0)`
			}
			if (gridRef.current) {
				gridRef.current.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`
			}

			rafRef.current = requestAnimationFrame(animate)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		rafRef.current = requestAnimationFrame(animate)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [])

	return (
		<>
			<ParallaxBackground>
				<GradientLayer ref={gradientRef} />
				<GridLayer ref={gridRef} />
			</ParallaxBackground>
			<Vignette />
			<Header />
			<Main>{children}</Main>
			{isVisible && <CartIcon />}
			<ThemeToggle />
			<Footer />
		</>
	)
}

export default Layout
