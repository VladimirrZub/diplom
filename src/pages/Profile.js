import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
	User,
	History,
	MessageSquare,
	LogOut,
	Edit2,
	Save,
	Star,
} from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import FormField from '../components/UI/FormField'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

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

const Layout = styled.div`
	display: grid;
	grid-template-columns: 240px 1fr;
	gap: 2rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const Sidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const SideBtn = styled.button`
	width: 100%;
	padding: 1rem;
	background: ${props =>
		props.active ? props.theme.colors.surface : 'transparent'};
	border: 1px solid
		${props => (props.active ? props.theme.colors.borderAccent : 'transparent')};
	color: ${props =>
		props.active ? props.theme.colors.text : props.theme.colors.textMuted};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1rem;
	letter-spacing: 0.05em;
	display: flex;
	align-items: center;
	gap: 0.8rem;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.colors.text};
		border-color: ${props => props.theme.colors.border};
	}
	svg {
		color: ${props =>
			props.active ? props.theme.colors.accent : props.theme.colors.textMuted};
	}
`

const Section = styled(GlassCard)`
	padding: 2rem;
	@media (min-width: 768px) {
		padding: 3rem;
	}
`

const SectionTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const FormGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.5rem;
	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
`

const OrderItem = styled.div`
	border-bottom: 1px solid ${props => props.theme.colors.border};
	padding: 1.2rem 0;
	&:last-child {
		border: none;
	}
`

const OrderTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 0.5rem;
	flex-wrap: wrap;
	gap: 0.5rem;
`

const OrderTitle = styled.h4`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
`

const OrderDate = styled.span`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.8rem;
`

const OrderPrice = styled.div`
	color: ${props => props.theme.colors.accent};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
	margin-top: 0.3rem;
`

const OrderItems = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.85rem;
	margin-top: 0.5rem;
`

const StatusBadge = styled.span`
	font-size: 0.75rem;
	padding: 0.2rem 0.8rem;
	border: 1px solid
		${props => {
			switch (props.s) {
				case 'completed':
					return '#5B9A68'
				case 'processing':
					return '#D4AF37'
				case 'confirmed':
					return '#6C63FF'
				default:
					return '#C84B4B'
			}
		}};
	color: ${props => {
		switch (props.s) {
			case 'completed':
				return '#5B9A68'
			case 'processing':
				return '#D4AF37'
			case 'confirmed':
				return '#6C63FF'
			default:
				return '#C84B4B'
		}
	}};
	white-space: nowrap;
`

const ReviewBtn = styled(Button)`
	margin-top: 0.8rem;
`

const Profile = () => {
	const navigate = useNavigate()
	const [tab, setTab] = useState('profile')
	const [edit, setEdit] = useState(false)
	const [orders, setOrders] = useState([])
	const [userReviews, setUserReviews] = useState([])
	const { user, isAuthenticated, isAdmin, logout, updateUser } = useAuth()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		} else if (isAdmin) {
			navigate('/admin')
		}
	}, [isAuthenticated, isAdmin, navigate])

	useEffect(() => {
		if (user?.uid) {
			fetchOrders()
			fetchUserReviews()
		}
	}, [user])

	const fetchOrders = async () => {
		try {
			const q = query(collection(db, 'orders'), where('userId', '==', user.uid))
			const snapshot = await getDocs(q)
			const ordersData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}))
			setOrders(
				ordersData.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
				),
			)
		} catch (err) {
			console.error('Error fetching orders:', err)
		}
	}

	const fetchUserReviews = async () => {
		try {
			const q = query(
				collection(db, 'reviews'),
				where('userId', '==', user.uid),
			)
			const snapshot = await getDocs(q)
			setUserReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
		} catch (err) {
			console.error('Error fetching reviews:', err)
		}
	}

	const handleLogout = async () => {
		await logout()
		navigate('/')
	}

	if (!isAuthenticated) return null

	return (
		<Container>
			<Header>
				<Label>Account</Label>
				<Title>Личный кабинет</Title>
			</Header>

			<Layout>
				<Sidebar>
					<SideBtn active={tab === 'profile'} onClick={() => setTab('profile')}>
						<User size={18} /> Профиль
					</SideBtn>
					<SideBtn active={tab === 'history'} onClick={() => setTab('history')}>
						<History size={18} /> История заказов
					</SideBtn>
					<SideBtn active={tab === 'reviews'} onClick={() => setTab('reviews')}>
						<MessageSquare size={18} /> Мои отзывы
					</SideBtn>
					<SideBtn onClick={handleLogout}>
						<LogOut size={18} /> Выйти
					</SideBtn>
				</Sidebar>

				<div>
					{tab === 'profile' && (
						<Section>
							<SectionTitle>
								Личные данные
								<Button
									variant='outline'
									size='small'
									onClick={() => {
										if (edit) updateUser(user)
										setEdit(!edit)
									}}
								>
									{edit ? <Save size={16} /> : <Edit2 size={16} />}
									{edit ? 'Сохранить' : 'Редактировать'}
								</Button>
							</SectionTitle>
							<FormGrid>
								<FormField
									label='ФИО'
									value={user.name || ''}
									onChange={e => updateUser({ ...user, name: e.target.value })}
									disabled={!edit}
								/>
								<FormField
									label='Телефон'
									value={user.phone || ''}
									onChange={e => updateUser({ ...user, phone: e.target.value })}
									disabled={!edit}
								/>
								<FormField
									label='Email'
									type='email'
									value={user.email || ''}
									disabled
								/>
								<FormField
									label='Адрес'
									value={user.address || ''}
									onChange={e =>
										updateUser({ ...user, address: e.target.value })
									}
									disabled={!edit}
								/>
							</FormGrid>
						</Section>
					)}

					{tab === 'history' && (
						<Section>
							<SectionTitle>История заказов</SectionTitle>
							{orders.length === 0 ? (
								<p style={{ color: '#8B8478' }}>У вас пока нет заказов</p>
							) : (
								orders.map(order => (
									<OrderItem key={order.id}>
										<OrderTop>
											<OrderTitle>Заказ #{order.id.slice(-6)}</OrderTitle>
											<OrderDate>
												{new Date(order.createdAt).toLocaleDateString()}
											</OrderDate>
										</OrderTop>
										<OrderPrice>
											{order.totalPrice?.toLocaleString()} P
										</OrderPrice>
										<OrderItems>
											{order.items?.map((item, i) => (
												<div key={i}>
													{item.title} x{item.quantity || 1}
												</div>
											))}
										</OrderItems>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: '0.8rem',
												flexWrap: 'wrap',
												gap: '0.5rem',
											}}
										>
											<StatusBadge s={order.status}>
												{{
													new: 'Новый',
													confirmed: 'Подтверждён',
													processing: 'В работе',
													completed: 'Выполнен',
													cancelled: 'Отменён',
												}[order.status] || order.status}
											</StatusBadge>
											{order.status === 'completed' && (
												<ReviewBtn
													variant='outline'
													size='small'
													onClick={() => navigate(`/review/${order.id}`)}
												>
													<Star size={14} /> Оставить отзыв
												</ReviewBtn>
											)}
										</div>
									</OrderItem>
								))
							)}
						</Section>
					)}

					{tab === 'reviews' && (
						<Section>
							<SectionTitle>Мои отзывы</SectionTitle>
							{userReviews.length === 0 ? (
								<p style={{ color: '#8B8478' }}>У вас пока нет отзывов</p>
							) : (
								userReviews.map(review => (
									<OrderItem key={review.id}>
										<OrderTop>
											<div style={{ display: 'flex', gap: '0.25rem' }}>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														size={14}
														fill={i < review.rating ? '#D4AF37' : 'none'}
														color={i < review.rating ? '#D4AF37' : '#5C5850'}
													/>
												))}
											</div>
											<OrderDate>
												{new Date(review.createdAt).toLocaleDateString()}
											</OrderDate>
										</OrderTop>
										<p style={{ color: '#8B8478', marginTop: '0.5rem' }}>
											{review.text}
										</p>
										{review.status === 'pending' && (
											<p
												style={{
													color: '#D4AF37',
													fontSize: '0.8rem',
													marginTop: '0.5rem',
												}}
											>
												На модерации
											</p>
										)}
									</OrderItem>
								))
							)}
						</Section>
					)}
				</div>
			</Layout>
		</Container>
	)
}

export default Profile
