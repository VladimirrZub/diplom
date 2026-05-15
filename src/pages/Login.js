import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Eye, EyeOff } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import FormField from '../components/UI/FormField'
import { useAuth } from '../context/AuthContext'

const Container = styled.div`
	max-width: 1100px;
	margin: 0 auto;
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1.5rem;
	}
`

const Header = styled.div`
	text-align: center;
	margin-bottom: 3rem;
	padding-top: 3rem;
`

const Label = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 1.5rem;
	margin-top: 2.5rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2.5rem;
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 3.5rem;
	}
`

const AuthForm = styled(GlassCard)`
	max-width: 460px;
	margin: 2rem auto;
	padding: 2rem;

	@media (min-width: 768px) {
		padding: 3rem;
	}
`

const FormTitle = styled.h2`
	font-family: ${props => props.theme.fonts.primary};
	text-align: center;
	margin-bottom: 2rem;
	font-size: 1.8rem;
`

const ErrorMsg = styled.div`
	padding: 1rem;
	border: 1px solid rgba(200, 75, 75, 0.3);
	color: #c84b4b;
	margin-bottom: 1.5rem;
	font-size: 0.9rem;
	line-height: 1.5;
`

const SwitchText = styled.p`
	text-align: center;
	color: ${props => props.theme.colors.textDimmed};
	margin-top: 1.5rem;
	font-size: 0.9rem;

	a {
		color: ${props => props.theme.colors.accent};
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
		}
	}
`

const Login = () => {
	const { login } = useAuth()
	const navigate = useNavigate()
	const [form, setForm] = useState({ email: '', password: '' })
	const [fieldErrors, setFieldErrors] = useState({})
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')

	const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

	const handleSubmit = async e => {
		e.preventDefault()
		setFieldErrors({})
		setError('')

		const errors = {}
		if (!form.email) errors.email = 'Введите email'
		else if (!validateEmail(form.email))
			errors.email = 'Некорректный формат email'
		if (!form.password) errors.password = 'Введите пароль'

		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors)
			return
		}

		try {
			const isAdmin = await login(form.email, form.password)

			// Редирект в зависимости от роли
			if (isAdmin) {
				navigate('/admin', { replace: true })
			} else {
				navigate('/profile', { replace: true })
			}
		} catch (err) {
			console.error('Login error:', err)
			setError('Неверный email или пароль')
		}
	}

	return (
		<Container>
			<Header>
				<Label>Account</Label>
				<Title>Вход</Title>
			</Header>

			<AuthForm>
				<FormTitle>Войти в аккаунт</FormTitle>

				{error && <ErrorMsg>{error}</ErrorMsg>}

				<form onSubmit={handleSubmit}>
					<FormField
						label='Email'
						type='email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						placeholder='example@mail.ru'
						error={fieldErrors.email}
					/>

					<FormField
						label='Пароль'
						type={showPassword ? 'text' : 'password'}
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
						placeholder='Введите пароль'
						error={fieldErrors.password}
						icon={showPassword ? EyeOff : Eye}
						onIconClick={() => setShowPassword(!showPassword)}
					/>

					<Button
						type='submit'
						style={{ width: '100%', justifyContent: 'center' }}
					>
						Войти
					</Button>
				</form>

				<SwitchText>
					Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
				</SwitchText>
			</AuthForm>
		</Container>
	)
}

export default Login
