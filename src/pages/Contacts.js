import React, { useState } from 'react'
import styled from 'styled-components'
import { Send } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'

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
	margin-top: 2.5rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 3.5rem;
	font-weight: 700;

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
	background: ${props => props.theme.colors.surface};
	padding: 3rem;
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
	background: ${props => props.theme.colors.surface};
	padding: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 400px;
	color: ${props => props.theme.colors.textMuted};
`

const FormBlock = styled(GlassCard)`
	padding: 3rem;
`

const Contacts = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		alert('Сообщение отправлено')
		setForm({ name: '', email: '', phone: '', message: '' })
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
							Москва, ул. Чистая, 15
							<br />
							БЦ "Кристалл", офис 305
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
				<MapBlock>Интерактивная карта</MapBlock>
			</Layout>

			<FormBlock>
				<h3
					style={{
						fontFamily: '"Cormorant Garamond", serif',
						fontSize: '1.8rem',
						marginBottom: '2rem',
					}}
				>
					Напишите нам
				</h3>
				<form onSubmit={handleSubmit}>
					<Input
						label='Имя'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						required
					/>
					<Input
						label='Email'
						type='email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						required
					/>
					<Input
						label='Телефон'
						type='tel'
						value={form.phone}
						onChange={e => setForm({ ...form, phone: e.target.value })}
					/>
					<Input
						label='Сообщение'
						textarea
						value={form.message}
						onChange={e => setForm({ ...form, message: e.target.value })}
						required
					/>
					<Button
						type='submit'
						style={{ width: '100%', justifyContent: 'center' }}
					>
						<Send size={18} /> Отправить
					</Button>
				</form>
			</FormBlock>
		</Container>
	)
}

export default Contacts
