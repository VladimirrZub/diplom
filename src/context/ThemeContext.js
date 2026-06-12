import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useThemeContext = () => {
	const context = useContext(ThemeContext)
	if (!context)
		throw new Error('useThemeContext must be used within ThemeContextProvider')
	return context
}

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('clearbreath_theme') || 'dark'
	})

	useEffect(() => {
		localStorage.setItem('clearbreath_theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
