import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../../firebase/config'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { Search, ArrowUpDown } from 'lucide-react'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'

const Container = styled.div``

const Controls = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	align-items: center;
`

const SearchInput = styled.input`
	flex: 1;
	min-width: 200px;
	padding: 0.7rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 0.95rem;
	outline: none;
	font-family: ${props => props.theme.fonts.secondary};
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
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
	gap: 1rem;
`

const Card = styled(GlassCard)`
	padding: 1.5rem;
`

const OrderHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	gap: 1rem;
`

const OrderTitle = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
	color: ${props => props.theme.colors.text};
`

const CustomerInfo = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.9rem;
	line-height: 1.6;
`

const ItemsList = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.85rem;
	margin: 0.5rem 0;
`

const CommentBlock = styled.div`
	background: ${props => props.theme.colors.elevated};
	padding: 1rem;
	margin-top: 0.8rem;
	border-left: 3px solid ${props => props.theme.colors.accent};
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.9rem;
	font-style: italic;
	line-height: 1.5;
`

const CommentLabel = styled.div`
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.3rem;
	font-style: normal;
	font-weight: 600;
`

const TotalPrice = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.4rem;
	color: ${props => props.theme.colors.accent};
	margin-top: 0.5rem;
	font-weight: 600;
`

const StatusSelect = styled.select`
	padding: 0.5rem 1rem;
	background: transparent;
	border: 1px solid ${props => props.theme.colors.borderAccent};
	color: ${props => props.theme.colors.text};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	cursor: pointer;
	border-radius: 4px;
	option {
		background: ${props => props.theme.colors.surface};
		color: ${props => props.theme.colors.text};
	}
`

const DateText = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`

const CountBadge = styled.span`
	background: ${props => props.theme.colors.accent};
	color: ${props => props.theme.colors.darker};
	padding: 0.1rem 0.5rem;
	border-radius: 10px;
	font-size: 0.75rem;
	margin-left: 0.5rem;
	font-family: ${props => props.theme.fonts.secondary};
`

const AdminOrders = () => {
	const [orders, setOrders] = useState([])
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [sortBy, setSortBy] = useState('newest')

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		const snapshot = await getDocs(collection(db, 'orders'))
		setOrders(
			snapshot.docs
				.map(d => ({ id: d.id, ...d.data() }))
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
		)
	}

	const updateStatus = async (orderId, status) => {
		await updateDoc(doc(db, 'orders', orderId), { status })
		fetchOrders()
	}

	const statusLabels = {
		new: 'Новый',
		confirmed: 'Подтверждён',
		processing: 'В работе',
		completed: 'Выполнен',
		cancelled: 'Отменён',
	}

	// Фильтрация
	let filtered = orders

	// Поиск
	if (search) {
		const q = search.toLowerCase()
		filtered = filtered.filter(
			o =>
				o.id.slice(-6).toLowerCase().includes(q) ||
				o.customer?.name?.toLowerCase().includes(q) ||
				o.customer?.phone?.includes(q) ||
				o.customer?.address?.toLowerCase().includes(q) ||
				o.userEmail?.toLowerCase().includes(q) ||
				o.comment?.toLowerCase().includes(q),
		)
	}

	// Фильтр по статусу
	if (statusFilter !== 'all') {
		filtered = filtered.filter(o => o.status === statusFilter)
	}

	// Сортировка
	if (sortBy === 'oldest') {
		filtered = [...filtered].sort(
			(a, b) => new Date(a.createdAt) - new Date(b.createdAt),
		)
	} else if (sortBy === 'price_asc') {
		filtered = [...filtered].sort(
			(a, b) => (a.totalPrice || 0) - (b.totalPrice || 0),
		)
	} else if (sortBy === 'price_desc') {
		filtered = [...filtered].sort(
			(a, b) => (b.totalPrice || 0) - (a.totalPrice || 0),
		)
	}

	return (
		<Container>
			<Controls>
				<div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
					<SearchInput
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder='Поиск по имени, телефону, адресу, email...'
					/>
				</div>

				<Select
					value={statusFilter}
					onChange={e => setStatusFilter(e.target.value)}
				>
					<option value='all'>Все статусы</option>
					<option value='new'>Новые</option>
					<option value='confirmed'>Подтверждённые</option>
					<option value='processing'>В работе</option>
					<option value='completed'>Выполненные</option>
					<option value='cancelled'>Отменённые</option>
				</Select>

				<Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
					<option value='newest'>Сначала новые</option>
					<option value='oldest'>Сначала старые</option>
					<option value='price_desc'>По цене (дороже)</option>
					<option value='price_asc'>По цене (дешевле)</option>
				</Select>

				<CountBadge>
					{filtered.length} / {orders.length}
				</CountBadge>
			</Controls>

			<Grid>
				{filtered.length === 0 && (
					<Card>
						<p style={{ color: '#8B8478', textAlign: 'center' }}>
							Заказы не найдены
						</p>
					</Card>
				)}
				{filtered.map(order => (
					<Card key={order.id}>
						<OrderHeader>
							<div style={{ flex: 1 }}>
								<OrderTitle>Заказ #{order.id.slice(-6)}</OrderTitle>
								<DateText>
									{new Date(order.createdAt).toLocaleString()}
								</DateText>
								<CustomerInfo>
									<strong>{order.customer?.name}</strong> |{' '}
									{order.customer?.phone}
								</CustomerInfo>
								<CustomerInfo>{order.customer?.address}</CustomerInfo>
								<CustomerInfo>Email: {order.userEmail}</CustomerInfo>
								<CustomerInfo>
									Оплата: {order.payment === 'card' ? 'Карта' : 'Наличные'} |
									Клиент дома: {order.atHome ? 'Да' : 'Нет'}
								</CustomerInfo>
							</div>
							<StatusSelect
								value={order.status}
								onChange={e => updateStatus(order.id, e.target.value)}
							>
								{Object.entries(statusLabels).map(([val, label]) => (
									<option key={val} value={val}>
										{label}
									</option>
								))}
							</StatusSelect>
						</OrderHeader>

						{order.comment && (
							<CommentBlock>
								<CommentLabel>Комментарий клиента</CommentLabel>
								{order.comment}
							</CommentBlock>
						)}

						<ItemsList>
							{order.items?.map((item, i) => (
								<div key={i}>
									{item.title} — {item.price?.toLocaleString()} P
									{item.details && (
										<span style={{ color: '#5C5850', fontSize: '0.8rem' }}>
											{' '}
											({item.details})
										</span>
									)}
								</div>
							))}
						</ItemsList>
						<TotalPrice>
							Итого: {order.totalPrice?.toLocaleString()} P
						</TotalPrice>
					</Card>
				))}
			</Grid>
		</Container>
	)
}

export default AdminOrders
