import React from 'react'
import styled from 'styled-components'
import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '../../context/ThemeContext'

const ToggleButton = styled.button`
	position: fixed;
	bottom: 2.5rem;
	left: 2.5rem;
	z-index: 99;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: ${props => props.theme.colors.surface};
	border: 1px solid ${props => props.theme.colors.borderAccent};
	color: ${props => props.theme.colors.accent};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

	&:hover {
		transform: scale(1.1);
		border-color: ${props => props.theme.colors.accent};
	}

	@media (max-width: 768px) {
		bottom: 1.5rem;
		left: 1.5rem;
		width: 40px;
		height: 40px;
	}
`

const ThemeToggle = () => {
	const { theme, toggleTheme } = useThemeContext()

	return (
		<ToggleButton
			onClick={toggleTheme}
			title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
		>
			{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
		</ToggleButton>
	)
}

export default ThemeToggle
