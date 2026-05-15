import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../../firebase/config'
import {
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'
import { Star } from 'lucide-react'

const Grid = styled.div`
	display: grid;
	gap: 1rem;
`
const Card = styled(GlassCard)`
	padding: 1.5rem;
`

const AdminReviews = () => {
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		fetchReviews()
	}, [])

	const fetchReviews = async () => {
		const snapshot = await getDocs(collection(db, 'reviews'))
		setReviews(
			snapshot.docs
				.map(d => ({ id: d.id, ...d.data() }))
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
		)
	}

	const approve = async id => {
		await updateDoc(doc(db, 'reviews', id), { status: 'approved' })
		fetchReviews()
	}

	const reject = async id => {
		await deleteDoc(doc(db, 'reviews', id))
		fetchReviews()
	}

	return (
		<Grid>
			{reviews.map(review => (
				<Card key={review.id}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							flexWrap: 'wrap',
							gap: '1rem',
						}}
					>
						<div>
							<div
								style={{
									display: 'flex',
									gap: '0.25rem',
									marginBottom: '0.5rem',
								}}
							>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={14}
										fill={i < review.rating ? '#D4AF37' : 'none'}
										color={i < review.rating ? '#D4AF37' : '#5C5850'}
									/>
								))}
							</div>
							<p style={{ color: '#8B8478', lineHeight: 1.6 }}>{review.text}</p>
							<div
								style={{
									color: '#5C5850',
									fontSize: '0.8rem',
									marginTop: '0.5rem',
								}}
							>
								{review.userName} | {review.userEmail} |{' '}
								{new Date(review.createdAt).toLocaleDateString()}
							</div>
						</div>
						<div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
							{review.status === 'pending' && (
								<>
									<Button size='small' onClick={() => approve(review.id)}>
										Одобрить
									</Button>
									<Button
										size='small'
										variant='outline'
										onClick={() => reject(review.id)}
										style={{
											color: '#C84B4B',
											borderColor: 'rgba(200,75,75,0.3)',
										}}
									>
										Отклонить
									</Button>
								</>
							)}
							{review.status === 'approved' && (
								<span style={{ color: '#5B9A68', fontSize: '0.85rem' }}>
									Одобрен
								</span>
							)}
						</div>
					</div>
				</Card>
			))}
		</Grid>
	)
}

export default AdminReviews
