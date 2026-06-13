import React, { useState } from 'react'
import styled from 'styled-components'
import { Send } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 3rem;
	@media (max-width: 768px) {
		padding: 1.5rem;
	}
`

const Header = styled.div`
	text-align: center;
	margin-bottom: 5rem;
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
	font-size: 3.5rem;
	font-weight: 700;
	color: ${props => props.theme.colors.text};
	@media (max-width: 480px) {
		font-size: 2.2rem;
	}
`

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	background: ${props => props.theme.colors.border};
	margin-bottom: 4rem;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const InfoBlock = styled.div`
	background: ${props => props.theme.colors.darker};
	padding: 3rem;
	transition: background 0.3s;
	&:hover {
		background: ${props => props.theme.colors.surface};
	}
`

const InfoItem = styled.div`
	margin-bottom: 2.5rem;
`

const InfoLabel = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.8rem;
`

const InfoValue = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	line-height: 1.8;
	font-weight: 300;
`

const MapBlock = styled.div`
	background: ${props => props.theme.colors.darker};
	min-height: 400px;
	overflow: hidden;
	iframe {
		width: 100%;
		height: 100%;
		min-height: 400px;
		border: none;
		display: block;
	}
`

const FormBlock = styled(GlassCard)`
	padding: 3rem;
`

const SuccessMsg = styled.div`
	text-align: center;
	padding: 2rem;
	color: #5b9a68;
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
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
	min-height: 100px;
	font-family: ${props => props.theme.fonts.secondary};
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const ErrorText = styled.span`
	color: #c84b4b;
	font-size: 0.78rem;
	display: block;
	margin-top: 0.3rem;
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

const Contacts = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phoneDigits: '',
		message: '',
	})
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState({})

	const handlePhoneChange = e => {
		const raw = e.target.value
		const digits = raw.replace(/\D/g, '').substring(0, 11)
		setForm({ ...form, phoneDigits: digits })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const newErrors = {}
		if (!form.name.trim()) newErrors.name = 'Введите имя'
		if (!form.email.trim()) {
			newErrors.email = 'Введите email'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = 'Некорректный формат email'
		}
		if (!form.phoneDigits || form.phoneDigits.length < 11) {
			newErrors.phone = 'Введите полный номер телефона (11 цифр)'
		}
		if (!form.message.trim()) newErrors.message = 'Введите сообщение'

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		try {
			await addDoc(collection(db, 'support'), {
				name: form.name,
				email: form.email,
				phone: formatPhoneForDisplay(form.phoneDigits),
				message: form.message,
				status: 'new',
				createdAt: new Date().toISOString(),
			})
			setSubmitted(true)
			setForm({ name: '', email: '', phoneDigits: '', message: '' })
			setErrors({})
		} catch (err) {
			console.error('Error:', err)
			alert('Ошибка при отправке')
		}
	}

	return (
		<Container>
			<Header>
				<Label>Contacts</Label>
				<Title>Контакты</Title>
			</Header>

			<Layout>
				<InfoBlock>
					<InfoItem>
						<InfoLabel>Телефон</InfoLabel>
						<InfoValue>
							+7 999 123-45-67
							<br />
							+7 999 765-43-21
						</InfoValue>
					</InfoItem>
					<InfoItem>
						<InfoLabel>Email</InfoLabel>
						<InfoValue>
							info@clearbreath.ru
							<br />
							support@clearbreath.ru
						</InfoValue>
					</InfoItem>
					<InfoItem>
						<InfoLabel>Адрес</InfoLabel>
						<InfoValue>
							Великий Новгород, ул. Чистая, 15
							<br />
							ТРЦ "Манго", офис 305
						</InfoValue>
					</InfoItem>
					<InfoItem>
						<InfoLabel>Режим работы</InfoLabel>
						<InfoValue>
							Пн-Пт: 9:00 – 20:00
							<br />
							Сб-Вс: 10:00 – 18:00
						</InfoValue>
					</InfoItem>
				</InfoBlock>
				<MapBlock>
					<iframe
						src='https://yandex.ru/map-widget/v1/?ll=31.285921%2C58.571321&mode=poi&poi%5Bpoint%5D=31.281892%2C58.570732&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1244298167&z=16.61'
						title='Карта'
						allowFullScreen
						loading='lazy'
					/>
				</MapBlock>
			</Layout>

			<FormBlock>
				{submitted ? (
					<SuccessMsg>
						Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
					</SuccessMsg>
				) : (
					<>
						<h3
							style={{
								fontFamily: '"Cormorant Garamond", serif',
								fontSize: '1.8rem',
								marginBottom: '2rem',
								color: '#E8E3D9',
							}}
						>
							Напишите нам
						</h3>
						<form onSubmit={handleSubmit}>
							<FormGroup>
								<FormLabel>Имя *</FormLabel>
								<FormInput
									value={form.name}
									onChange={e => setForm({ ...form, name: e.target.value })}
									placeholder='Ваше имя'
								/>
								{errors.name && <ErrorText>{errors.name}</ErrorText>}
							</FormGroup>

							<FormGroup>
								<FormLabel>Email *</FormLabel>
								<FormInput
									type='email'
									value={form.email}
									onChange={e => setForm({ ...form, email: e.target.value })}
									placeholder='example@mail.ru'
								/>
								{errors.email && <ErrorText>{errors.email}</ErrorText>}
							</FormGroup>

							<FormGroup>
								<FormLabel>Телефон *</FormLabel>
								<FormInput
									type='text'
									inputMode='numeric'
									value={formatPhoneForDisplay(form.phoneDigits)}
									onChange={handlePhoneChange}
									placeholder='+7 ___ _____ __'
								/>
								{errors.phone && <ErrorText>{errors.phone}</ErrorText>}
							</FormGroup>

							<FormGroup>
								<FormLabel>Сообщение *</FormLabel>
								<FormTextarea
									value={form.message}
									onChange={e => setForm({ ...form, message: e.target.value })}
									placeholder='Ваше сообщение...'
								/>
								{errors.message && <ErrorText>{errors.message}</ErrorText>}
							</FormGroup>

							<Button
								type='submit'
								style={{ width: '100%', justifyContent: 'center' }}
							>
								<Send size={18} /> Отправить
							</Button>
						</form>
					</>
				)}
			</FormBlock>
		</Container>
	)
}

export default Contacts
