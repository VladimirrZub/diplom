import React, { useState } from 'react'
import styled from 'styled-components'
import { Star, Send } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { useAuth } from '../context/AuthContext'

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

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1px;
	background: ${props => props.theme.colors.border};
	margin-bottom: 4rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const ReviewCard = styled.div`
	background: ${props => props.theme.colors.surface};
	padding: 3rem;
`

const Stars = styled.div`
	display: flex;
	gap: 0.3rem;
	margin-bottom: 1.5rem;
`

const ReviewName = styled.h4`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	margin-bottom: 0.3rem;
`

const ReviewDate = styled.span`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.8rem;
`

const ReviewText = styled.p`
	color: ${props => props.theme.colors.textDimmed};
	margin-top: 1rem;
	line-height: 1.7;
	font-weight: 300;
`

const FormBlock = styled(GlassCard)`
	max-width: 600px;
	margin: 0 auto;
	padding: 3rem;
`

const StarPicker = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 2rem;

	svg {
		cursor: pointer;
		transition: transform 0.2s;
		&:hover {
			transform: scale(1.2);
		}
	}
`

const Reviews = () => {
	const { user, isAuthenticated } = useAuth()
	const [reviews] = useState([
		{
			id: 1,
			name: 'Анна Петрова',
			date: '15.03.2025',
			rating: 5,
			text: 'Безупречное качество. Заказала генеральную уборку после ремонта — квартира выглядит лучше, чем до ремонта.',
		},
		{
			id: 2,
			name: 'Михаил Иванов',
			date: '10.03.2025',
			rating: 5,
			text: 'Регулярно заказываю уборку офиса. Всегда вовремя и на высшем уровне. Гибкий график.',
		},
		{
			id: 3,
			name: 'Елена Смирнова',
			date: '05.03.2025',
			rating: 4,
			text: 'Хорошая работа, приятные цены. Химчистка дивана прошла отлично.',
		},
		{
			id: 4,
			name: 'Дмитрий Козлов',
			date: '01.03.2025',
			rating: 5,
			text: 'Пользуюсь услугами полгода. Качество на высоте. Рекомендую!',
		},
	])
	const [newRev, setNewRev] = useState({ rating: 5, text: '' })

	const submit = () => {
		if (!newRev.text.trim() || !isAuthenticated) return
		alert('Отзыв отправлен')
		setNewRev({ rating: 5, text: '' })
	}

	return (
		<Container>
			<Header>
				<Label>Reviews</Label>
				<Title>Отзывы клиентов</Title>
			</Header>

			<Grid>
				{reviews.map(r => (
					<ReviewCard key={r.id}>
						<Stars>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={14}
									fill={i < r.rating ? '#D4AF37' : 'none'}
									color={i < r.rating ? '#D4AF37' : '#5C5850'}
								/>
							))}
						</Stars>
						<ReviewName>{r.name}</ReviewName>
						<ReviewDate>{r.date}</ReviewDate>
						<ReviewText>{r.text}</ReviewText>
					</ReviewCard>
				))}
			</Grid>

			<FormBlock>
				<h3
					style={{
						fontFamily: '"Cormorant Garamond", serif',
						fontSize: '1.8rem',
						marginBottom: '2rem',
					}}
				>
					Оставить отзыв
				</h3>
				{isAuthenticated ? (
					<>
						<StarPicker>
							{[1, 2, 3, 4, 5].map(s => (
								<Star
									key={s}
									size={28}
									fill={s <= newRev.rating ? '#D4AF37' : 'none'}
									color={s <= newRev.rating ? '#D4AF37' : '#5C5850'}
									onClick={() => setNewRev({ ...newRev, rating: s })}
								/>
							))}
						</StarPicker>
						<Input
							label='Ваш отзыв'
							textarea
							value={newRev.text}
							onChange={e => setNewRev({ ...newRev, text: e.target.value })}
						/>
						<Button
							onClick={submit}
							style={{ width: '100%', justifyContent: 'center' }}
						>
							<Send size={18} /> Отправить
						</Button>
					</>
				) : (
					<p style={{ color: '#8B8478', textAlign: 'center' }}>
						Войдите в кабинет, чтобы оставить отзыв
					</p>
				)}
			</FormBlock>
		</Container>
	)
}

export default Reviews
