import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../../firebase/config'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'

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
	gap: 0.5rem;
`

const CustomerInfo = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
`

const ItemsList = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.85rem;
	margin: 0.5rem 0;
`

const StatusSelect = styled.select`
	padding: 0.5rem 1rem;
	background: transparent;
	border: 1px solid ${props => props.theme.colors.borderAccent};
	color: ${props => props.theme.colors.text};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	cursor: pointer;
	option {
		background: #14191f;
	}
`

const AdminOrders = () => {
	const [orders, setOrders] = useState([])

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

	return (
		<Grid>
			{orders.map(order => (
				<Card key={order.id}>
					<OrderHeader>
						<div>
							<strong>Заказ #{order.id.slice(-6)}</strong>
							<CustomerInfo>
								{order.customer?.name} | {order.customer?.phone} |{' '}
								{order.customer?.address}
							</CustomerInfo>
							<CustomerInfo>
								Оплата: {order.payment === 'card' ? 'Карта' : 'Наличные'} |
								Дома: {order.atHome ? 'Да' : 'Нет'}
							</CustomerInfo>
							<CustomerInfo>
								Email: {order.userEmail} |{' '}
								{new Date(order.createdAt).toLocaleString()}
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
					<ItemsList>
						{order.items?.map((item, i) => (
							<div key={i}>
								{item.title} — {item.price?.toLocaleString()} P
							</div>
						))}
					</ItemsList>
					<div
						style={{
							color: '#D4AF37',
							fontFamily: '"Cormorant Garamond", serif',
							fontSize: '1.3rem',
							marginTop: '0.5rem',
						}}
					>
						Итого: {order.totalPrice?.toLocaleString()} P
					</div>
				</Card>
			))}
		</Grid>
	)
}

export default AdminOrders
