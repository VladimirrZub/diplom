import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Eye, EyeOff } from 'lucide-react'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'
import FormField from '../../components/UI/FormField'
import { useAuth } from '../../context/AuthContext'

const Container = styled.div`
	max-width: 460px;
	margin: 6rem auto;
	padding: 2rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2.5rem;
	text-align: center;
	margin-bottom: 2rem;
`

const ErrorMsg = styled.div`
	padding: 1rem;
	border: 1px solid rgba(200, 75, 75, 0.3);
	color: #c84b4b;
	margin-bottom: 1.5rem;
	font-size: 0.9rem;
	line-height: 1.5;
`

const AdminLogin = () => {
	const { login, logout } = useAuth() // Вынесли logout сюда
	const navigate = useNavigate()
	const [form, setForm] = useState({ email: '', password: '' })
	const [error, setError] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const isAdmin = await login(form.email, form.password)

			if (isAdmin) {
				navigate('/admin', { replace: true })
			} else {
				setError('У вас нет прав администратора')
				await logout() // Используем logout из замыкания
			}
		} catch (err) {
			setError('Неверный email или пароль')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container>
			<Title>Админ панель</Title>
			<GlassCard padding='2rem'>
				{error && <ErrorMsg>{error}</ErrorMsg>}
				<form onSubmit={handleSubmit}>
					<FormField
						label='Email'
						type='email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						placeholder='admin@clearbreath.ru'
					/>
					<FormField
						label='Пароль'
						type={showPassword ? 'text' : 'password'}
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
						placeholder='Введите пароль'
						icon={showPassword ? EyeOff : Eye}
						onIconClick={() => setShowPassword(!showPassword)}
					/>
					<Button
						type='submit'
						style={{ width: '100%', justifyContent: 'center' }}
						disabled={loading}
					>
						{loading ? 'Вход...' : 'Войти'}
					</Button>
				</form>
			</GlassCard>
		</Container>
	)
}

export default AdminLogin
