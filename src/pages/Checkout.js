import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight, Check } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
	@media (max-width: 768px) {
		padding: 1rem;
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
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2.5rem;
	font-weight: 700;
	color: ${props => props.theme.colors.text};
	@media (min-width: 768px) {
		font-size: 3rem;
	}
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

const RadioGroup = styled.div`
	display: flex;
	gap: 1rem;
	margin: 0.5rem 0;
`

const RadioLabel = styled.label`
	flex: 1;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 1rem;
	border: 1px solid
		${props =>
			props.checked
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	background: ${props =>
		props.checked ? 'rgba(212, 175, 55, 0.05)' : 'transparent'};
	cursor: pointer;
	transition: all 0.3s;
	color: ${props => props.theme.colors.text};
	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const RadioInput = styled.input`
	accent-color: ${props => props.theme.colors.accent};
`

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	color: ${props => props.theme.colors.textDimmed};
	cursor: pointer;
	padding: 0.5rem 0;
	font-size: 0.95rem;
`

const SuccessBlock = styled.div`
	text-align: center;
	padding: 4rem 2rem;
`

const SuccessIcon = styled.div`
	width: 80px;
	height: 80px;
	border: 2px solid ${props => props.theme.colors.success};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 2rem;
	color: ${props => props.theme.colors.success};
`

const SectionLabel = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.8rem;
	margin-top: 1rem;
`

const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
	display: block;
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	letter-spacing: 0.05em;
	color: ${props => props.theme.colors.textDimmed};
	margin-bottom: 0.6rem;
	text-transform: uppercase;
`

const FormInput = styled.input`
	width: 100%;
	padding: 0.875rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
	outline: none;
	transition: border-color 0.4s;
	font-family: ${props => props.theme.fonts.secondary};
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const FormTextarea = styled.textarea`
	width: 100%;
	padding: 0.875rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
	outline: none;
	resize: vertical;
	min-height: 80px;
	font-family: ${props => props.theme.fonts.secondary};
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const SuggestionsList = styled.ul`
	list-style: none;
	background: ${props => props.theme.colors.surface};
	border: 1px solid ${props => props.theme.colors.borderAccent};
	margin-top: 0.5rem;
	max-height: 200px;
	overflow-y: auto;
`

const SuggestionItem = styled.li`
	padding: 0.8rem 1rem;
	cursor: pointer;
	color: ${props => props.theme.colors.text};
	font-size: 0.9rem;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	&:last-child {
		border-bottom: none;
	}
	&:hover {
		background: ${props => props.theme.colors.elevated};
	}
`

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

const Checkout = () => {
	const { items, totalPrice, clearCart } = useCart()
	const { user } = useAuth()
	const navigate = useNavigate()
	const [submitted, setSubmitted] = useState(false)
	const [form, setForm] = useState({
		name: user?.name || '',
		phoneDigits: user?.phone ? user.phone.replace(/\D/g, '') : '',
		address: user?.address || '',
		comment: '',
		payment: 'card',
		atHome: true,
	})
	const [suggestions, setSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const debounceTimer = useRef(null)

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	const fetchSuggestions = query => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}

		if (query.length < 4) {
			setSuggestions([])
			setShowSuggestions(false)
			return
		}

		debounceTimer.current = setTimeout(async () => {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=ru&accept-language=ru`,
					{
						headers: {
							'User-Agent': 'ClearBreathApp/1.0 (clearbreath.ru)',
						},
					},
				)

				if (response.status === 429) {
					console.warn('Слишком много запросов, ждём...')
					return
				}

				const data = await response.json()
				const results = data.map(item => item.display_name)
				setSuggestions(results)
				setShowSuggestions(results.length > 0)
			} catch (err) {
				console.error('Ошибка:', err)
			}
		}, 1500) // Увеличил до 1.5 секунд
	}

	const handleAddressChange = e => {
		const value = e.target.value
		setForm({ ...form, address: value })
		fetchSuggestions(value)
	}

	const selectSuggestion = suggestion => {
		setForm({ ...form, address: suggestion })
		setShowSuggestions(false)
		setSuggestions([])
	}

	const handlePhoneChange = e => {
		const raw = e.target.value
		const digits = raw.replace(/\D/g, '').substring(0, 11)
		setForm({ ...form, phoneDigits: digits })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!form.name.trim()) {
			alert('Введите ФИО')
			return
		}
		if (!form.phoneDigits || form.phoneDigits.length < 11) {
			alert('Введите полный номер телефона (11 цифр)')
			return
		}
		if (!form.address.trim()) {
			alert('Введите адрес')
			return
		}

		try {
			const orderData = {
				userId: user?.uid || 'guest',
				userEmail: user?.email || 'guest',
				customer: {
					name: form.name,
					phone: formatPhoneForDisplay(form.phoneDigits),
					address: form.address,
				},
				comment: form.comment,
				items: items,
				totalPrice: totalPrice,
				payment: form.payment,
				atHome: form.atHome,
				status: 'new',
				createdAt: new Date().toISOString(),
			}
			await addDoc(collection(db, 'orders'), orderData)
			clearCart()
			setSubmitted(true)
		} catch (error) {
			console.error('Error:', error)
			alert('Ошибка при оформлении заказа')
		}
	}

	if (submitted) {
		return (
			<Container>
				<SuccessBlock>
					<SuccessIcon>
						<Check size={40} />
					</SuccessIcon>
					<Title style={{ marginBottom: '1rem' }}>Заявка отправлена</Title>
					<p
						style={{ color: '#8B8478', marginBottom: '2rem', lineHeight: 1.8 }}
					>
						Ожидайте звонка для подтверждения заявки.
					</p>
					<Button onClick={() => navigate('/')}>
						На главную <ArrowRight size={18} />
					</Button>
				</SuccessBlock>
			</Container>
		)
	}

	return (
		<Container>
			<Header>
				<Label>Checkout</Label>
				<Title>Оформление заказа</Title>
			</Header>
			<GlassCard padding='2rem'>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<FormLabel>ФИО *</FormLabel>
						<FormInput
							value={form.name}
							onChange={e => setForm({ ...form, name: e.target.value })}
							placeholder='Иванов Иван Иванович'
							required
						/>
					</FormGroup>
					<FormGroup>
						<FormLabel>Телефон *</FormLabel>
						<FormInput
							type='text'
							inputMode='numeric'
							value={formatPhoneForDisplay(form.phoneDigits)}
							onChange={handlePhoneChange}
							placeholder='+7 ___ _____ __'
							required
						/>
					</FormGroup>
					<FormGroup>
						<FormLabel>Адрес *</FormLabel>
						<FormInput
							value={form.address}
							onChange={handleAddressChange}
							placeholder='Начните вводить адрес...'
							autoComplete='off'
							required
						/>
						{showSuggestions && suggestions.length > 0 && (
							<SuggestionsList>
								{suggestions.map((s, i) => (
									<SuggestionItem key={i} onClick={() => selectSuggestion(s)}>
										{s}
									</SuggestionItem>
								))}
							</SuggestionsList>
						)}
					</FormGroup>
					<FormGroup>
						<FormLabel>Комментарий</FormLabel>
						<FormTextarea
							value={form.comment}
							onChange={e => setForm({ ...form, comment: e.target.value })}
							placeholder='Особые пожелания, код домофона...'
						/>
					</FormGroup>
					<SectionLabel>Способ оплаты</SectionLabel>
					<RadioGroup>
						<RadioLabel checked={form.payment === 'card'}>
							<RadioInput
								type='radio'
								name='payment'
								checked={form.payment === 'card'}
								onChange={() => setForm({ ...form, payment: 'card' })}
							/>
							Банковской картой
						</RadioLabel>
						<RadioLabel checked={form.payment === 'cash'}>
							<RadioInput
								type='radio'
								name='payment'
								checked={form.payment === 'cash'}
								onChange={() => setForm({ ...form, payment: 'cash' })}
							/>
							Наличными
						</RadioLabel>
					</RadioGroup>
					<CheckboxLabel>
						<RadioInput
							type='checkbox'
							checked={form.atHome}
							onChange={e => setForm({ ...form, atHome: e.target.checked })}
						/>
						Я буду дома во время уборки
					</CheckboxLabel>
					<Button
						type='submit'
						size='large'
						style={{
							width: '100%',
							justifyContent: 'center',
							marginTop: '1rem',
						}}
					>
						Отправить заявку <ArrowRight size={18} />
					</Button>
				</Form>
			</GlassCard>
		</Container>
	)
}

export default Checkout
