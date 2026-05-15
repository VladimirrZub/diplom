import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight, Check } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import FormField from '../components/UI/FormField'
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

	@media (min-width: 768px) {
		font-size: 3rem;
	}
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const TwoColumns = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
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

const Checkout = () => {
	const { items, totalPrice, clearCart } = useCart()
	const { user } = useAuth()
	const navigate = useNavigate()
	const [submitted, setSubmitted] = useState(false)
	const [form, setForm] = useState({
		name: user?.name || '',
		phone: user?.phone || '',
		address: user?.address || '',
		payment: 'card',
		atHome: true,
	})

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const orderData = {
				userId: user?.uid || 'guest',
				userEmail: user?.email || 'guest',
				customer: {
					name: form.name,
					phone: form.phone,
					address: form.address,
				},
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
			console.error('Error creating order:', error)
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
						Ожидайте звонка для подтверждения заявки. Наш менеджер свяжется с
						вами в ближайшее время.
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
					<FormField
						label='ФИО *'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						placeholder='Иванов Иван Иванович'
						required
					/>

					<FormField
						label='Телефон *'
						type='tel'
						value={form.phone}
						onChange={e => setForm({ ...form, phone: e.target.value })}
						placeholder='+7 (999) 123-45-67'
						required
					/>

					<FormField
						label='Адрес *'
						value={form.address}
						onChange={e => setForm({ ...form, address: e.target.value })}
						placeholder='Город, улица, дом, квартира'
						required
					/>

					<div style={{ marginBottom: '1rem' }}>
						<Label style={{ marginBottom: '0.8rem' }}>Способ оплаты</Label>
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
					</div>

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
