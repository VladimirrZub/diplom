import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Star, Send } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import FormField from '../components/UI/FormField'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 2rem;
`
const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2rem;
	text-align: center;
	margin: 3rem 0 2rem;
`
const StarsRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 2rem;
	justify-content: center;
`

const LeaveReview = () => {
	const { orderId } = useParams()
	const { user } = useAuth()
	const navigate = useNavigate()
	const [rating, setRating] = useState(5)
	const [text, setText] = useState('')
	const [submitted, setSubmitted] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await addDoc(collection(db, 'reviews'), {
				orderId,
				userId: user.uid,
				userName: user.name,
				userEmail: user.email,
				rating,
				text,
				status: 'pending',
				createdAt: new Date().toISOString(),
			})
			setSubmitted(true)
		} catch (err) {
			console.error('Error submitting review:', err)
		}
	}

	if (submitted) {
		return (
			<Container>
				<Title>Спасибо за отзыв!</Title>
				<p
					style={{
						textAlign: 'center',
						color: '#8B8478',
						marginBottom: '2rem',
					}}
				>
					Ваш отзыв отправлен на модерацию
				</p>
				<Button
					onClick={() => navigate('/profile')}
					style={{ width: '100%', justifyContent: 'center' }}
				>
					В личный кабинет
				</Button>
			</Container>
		)
	}

	return (
		<Container>
			<Title>Оставить отзыв</Title>
			<GlassCard padding='2rem'>
				<form onSubmit={handleSubmit}>
					<p
						style={{
							color: '#8B8478',
							marginBottom: '1rem',
							textAlign: 'center',
						}}
					>
						Оценка
					</p>
					<StarsRow>
						{[1, 2, 3, 4, 5].map(s => (
							<Star
								key={s}
								size={32}
								fill={s <= rating ? '#D4AF37' : 'none'}
								color={s <= rating ? '#D4AF37' : '#5C5850'}
								onClick={() => setRating(s)}
								style={{ cursor: 'pointer' }}
							/>
						))}
					</StarsRow>
					<FormField
						label='Ваш отзыв'
						textarea
						value={text}
						onChange={e => setText(e.target.value)}
						placeholder='Поделитесь впечатлениями...'
						required
					/>
					<Button
						type='submit'
						style={{ width: '100%', justifyContent: 'center' }}
					>
						<Send size={16} /> Отправить
					</Button>
				</form>
			</GlassCard>
		</Container>
	)
}

export default LeaveReview
