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

const Register = () => {
	const { register } = useAuth()
	const navigate = useNavigate()
	const [form, setForm] = useState({
		name: '',
		email: '',
		phoneDigits: '',
		password: '',
		confirmPassword: '',
	})
	const [fieldErrors, setFieldErrors] = useState({})
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [error, setError] = useState('')

	const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

	const formatPhoneForDisplay = digits => {
		if (!digits) return ''
		let formatted = '+'
		if (digits.length > 0) formatted += digits[0]
		if (digits.length > 1) formatted += ' ' + digits.slice(1, 4)
		if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7)
		if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9)
		if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11)
		return formatted.trim()
	}

	const handlePhoneChange = e => {
		const raw = e.target.value
		const digits = raw.replace(/\D/g, '').substring(0, 11)
		setForm({ ...form, phoneDigits: digits })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setFieldErrors({})
		setError('')

		const errors = {}
		if (!form.name.trim()) errors.name = 'Введите имя'
		if (!form.email) errors.email = 'Введите email'
		else if (!validateEmail(form.email))
			errors.email = 'Некорректный формат email'
		if (!form.password) errors.password = 'Введите пароль'
		else if (form.password.length < 6)
			errors.password = 'Пароль минимум 6 символов'
		if (form.password !== form.confirmPassword)
			errors.confirmPassword = 'Пароли не совпадают'

		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors)
			return
		}

		const formattedPhone = form.phoneDigits
			? formatPhoneForDisplay(form.phoneDigits)
			: '+7 999 000 00 00'

		try {
			await register(form.email, form.password, {
				name: form.name,
				phone: formattedPhone,
				address: 'Не указан',
			})
			navigate('/profile', { replace: true })
		} catch (err) {
			setError('Ошибка регистрации. Возможно, email уже используется.')
		}
	}

	return (
		<Container>
			<Header>
				<Label>Account</Label>
				<Title>Регистрация</Title>
			</Header>

			<AuthForm>
				<FormTitle>Создать аккаунт</FormTitle>

				{error && <ErrorMsg>{error}</ErrorMsg>}

				<form onSubmit={handleSubmit}>
					<FormField
						label='Имя *'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						placeholder='Ваше имя'
						error={fieldErrors.name}
					/>
					<FormField
						label='Email *'
						type='email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						placeholder='example@mail.ru'
						error={fieldErrors.email}
					/>
					<FormField
						label='Телефон'
						type='text'
						inputMode='numeric'
						value={formatPhoneForDisplay(form.phoneDigits)}
						onChange={handlePhoneChange}
						placeholder='+7 ___ _____ __'
						error={fieldErrors.phone}
					/>
					<FormField
						label='Пароль *'
						type={showPassword ? 'text' : 'password'}
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
						placeholder='Минимум 6 символов'
						error={fieldErrors.password}
						icon={showPassword ? EyeOff : Eye}
						onIconClick={() => setShowPassword(!showPassword)}
					/>
					<FormField
						label='Подтвердите пароль *'
						type={showConfirmPassword ? 'text' : 'password'}
						value={form.confirmPassword}
						onChange={e =>
							setForm({ ...form, confirmPassword: e.target.value })
						}
						placeholder='Повторите пароль'
						error={fieldErrors.confirmPassword}
						icon={showConfirmPassword ? EyeOff : Eye}
						onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
					/>

					<Button
						type='submit'
						style={{ width: '100%', justifyContent: 'center' }}
					>
						Зарегистрироваться
					</Button>
				</form>

				<SwitchText>
					Уже есть аккаунт? <Link to='/login'>Войти</Link>
				</SwitchText>
			</AuthForm>
		</Container>
	)
}

export default Register
