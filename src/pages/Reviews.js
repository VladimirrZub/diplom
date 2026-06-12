import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Star, ArrowDown } from 'lucide-react'
import Button from '../components/UI/Button'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

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
	margin-bottom: 4rem;
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

const Controls = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 2rem;
`

const Select = styled.select`
	padding: 0.7rem 2rem 0.7rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 0.9rem;
	outline: none;
	cursor: pointer;
	font-family: ${props => props.theme.fonts.secondary};
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
	option {
		background: ${props => props.theme.colors.surface};
		color: ${props => props.theme.colors.text};
	}
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1px;
	background: transparent;
	margin-bottom: 2rem;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const ReviewCard = styled.div`
	background: ${props => props.theme.colors.darker};
	padding: 3rem;
	transition: background 0.3s;
	border: 1px solid ${props => props.theme.colors.border};
	&:hover {
		background: ${props => props.theme.colors.surface};
		border-color: ${props => props.theme.colors.borderAccent};
	}
	@media (max-width: 480px) {
		padding: 2rem 1.5rem;
	}
`

const Stars = styled.div`
	display: flex;
	gap: 0.3rem;
	margin-bottom: 1.5rem;
`

const ReviewName = styled.h4`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	color: ${props => props.theme.colors.text};
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

const LoadMoreBtn = styled.div`
	text-align: center;
	margin-bottom: 4rem;
`

const LoadingText = styled.div`
	text-align: center;
	padding: 2rem;
	color: ${props => props.theme.colors.textMuted};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1rem;
`

const EmptyText = styled.div`
	text-align: center;
	padding: 4rem;
	color: ${props => props.theme.colors.textMuted};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
`

const REVIEWS_PER_PAGE = 6

const Reviews = () => {
	const [allReviews, setAllReviews] = useState([])
	const [visibleReviews, setVisibleReviews] = useState([])
	const [sortBy, setSortBy] = useState('newest')
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)

	useEffect(() => {
		loadAllReviews()
	}, [])

	useEffect(() => {
		sortAndPaginate()
	}, [sortBy, allReviews])

	const loadAllReviews = async () => {
		try {
			const snapshot = await getDocs(collection(db, 'reviews'))
			const reviews = snapshot.docs
				.map(d => ({ id: d.id, ...d.data() }))
				.filter(r => r.status === 'approved')
			setAllReviews(reviews)
			setLoading(false)
		} catch (err) {
			console.error('Error:', err)
			setLoading(false)
		}
	}

	const sortAndPaginate = () => {
		let sorted = [...allReviews]

		if (sortBy === 'newest') {
			sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		} else if (sortBy === 'oldest') {
			sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		} else if (sortBy === 'rating_desc') {
			sorted.sort((a, b) => b.rating - a.rating)
		} else if (sortBy === 'rating_asc') {
			sorted.sort((a, b) => a.rating - b.rating)
		}

		const paginated = sorted.slice(0, REVIEWS_PER_PAGE)
		setVisibleReviews(paginated)
		setPage(1)
		setHasMore(sorted.length > REVIEWS_PER_PAGE)
	}

	const handleLoadMore = () => {
		setLoadingMore(true)

		let sorted = [...allReviews]
		if (sortBy === 'newest') {
			sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		} else if (sortBy === 'oldest') {
			sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		} else if (sortBy === 'rating_desc') {
			sorted.sort((a, b) => b.rating - a.rating)
		} else if (sortBy === 'rating_asc') {
			sorted.sort((a, b) => a.rating - b.rating)
		}

		const nextPage = page + 1
		const paginated = sorted.slice(0, nextPage * REVIEWS_PER_PAGE)

		setVisibleReviews(paginated)
		setPage(nextPage)
		setHasMore(paginated.length < sorted.length)
		setLoadingMore(false)
	}

	if (loading) {
		return (
			<Container>
				<Header>
					<Label>Reviews</Label>
					<Title>Отзывы клиентов</Title>
				</Header>
				<LoadingText>Загрузка отзывов...</LoadingText>
			</Container>
		)
	}

	return (
		<Container>
			<Header>
				<Label>Reviews</Label>
				<Title>Отзывы клиентов</Title>
			</Header>

			{allReviews.length > 0 && (
				<Controls>
					<Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
						<option value='newest'>Сначала новые</option>
						<option value='oldest'>Сначала старые</option>
						<option value='rating_desc'>По рейтингу (высокий)</option>
						<option value='rating_asc'>По рейтингу (низкий)</option>
					</Select>
				</Controls>
			)}

			{visibleReviews.length > 0 ? (
				<>
					<Grid>
						{visibleReviews.map(r => (
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
								<ReviewName>{r.userName}</ReviewName>
								<ReviewDate>
									{new Date(r.createdAt).toLocaleDateString()}
								</ReviewDate>
								<ReviewText>{r.text}</ReviewText>
							</ReviewCard>
						))}
					</Grid>

					{hasMore && (
						<LoadMoreBtn>
							<Button
								variant='outline'
								onClick={handleLoadMore}
								disabled={loadingMore}
							>
								<ArrowDown size={18} />{' '}
								{loadingMore ? 'Загрузка...' : 'Загрузить ещё'}
							</Button>
						</LoadMoreBtn>
					)}

					{!hasMore && <LoadingText>Все отзывы загружены</LoadingText>}
				</>
			) : (
				<EmptyText>Пока нет отзывов</EmptyText>
			)}
		</Container>
	)
}

export default Reviews
