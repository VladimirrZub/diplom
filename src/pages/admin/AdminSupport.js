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
import { Trash2, Check } from 'lucide-react'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'

const Grid = styled.div`
	display: grid;
	gap: 1rem;
`

const Card = styled(GlassCard)`
	padding: 1.5rem;
`

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	gap: 1rem;
`

const Name = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${props => props.theme.colors.text};
`

const ContactInfo = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.9rem;
	line-height: 1.6;
`

const Message = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.95rem;
	line-height: 1.7;
	padding: 1rem;
	background: ${props => props.theme.colors.elevated};
	margin-top: 0.8rem;
	border-left: 3px solid ${props => props.theme.colors.accent};
`

const DateText = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`

const StatusBadge = styled.span`
	font-size: 0.75rem;
	padding: 0.2rem 0.8rem;
	border: 1px solid
		${props => (props.status === 'read' ? '#5B9A68' : '#D4AF37')};
	color: ${props => (props.status === 'read' ? '#5B9A68' : '#D4AF37')};
	white-space: nowrap;
`

const Actions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
`

const EmptyText = styled.div`
	text-align: center;
	padding: 3rem;
	color: ${props => props.theme.colors.textMuted};
`

const AdminSupport = () => {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		fetchMessages()
	}, [])

	const fetchMessages = async () => {
		const snapshot = await getDocs(collection(db, 'support'))
		setMessages(
			snapshot.docs
				.map(d => ({ id: d.id, ...d.data() }))
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
		)
	}

	const markAsRead = async id => {
		await updateDoc(doc(db, 'support', id), { status: 'read' })
		fetchMessages()
	}

	const handleDelete = async id => {
		if (window.confirm('Удалить сообщение?')) {
			await deleteDoc(doc(db, 'support', id))
			fetchMessages()
		}
	}

	return (
		<Grid>
			<h3
				style={{
					fontFamily: '"Cormorant Garamond", serif',
					fontSize: '1.5rem',
					color: '#D4AF37',
				}}
			>
				Обращения из формы контактов
			</h3>
			{messages.length === 0 && <EmptyText>Нет обращений</EmptyText>}
			{messages.map(msg => (
				<Card key={msg.id}>
					<CardHeader>
						<div>
							<Name>{msg.name}</Name>
							<DateText>{new Date(msg.createdAt).toLocaleString()}</DateText>
							<ContactInfo>
								{msg.email} | {msg.phone}
							</ContactInfo>
						</div>
						<StatusBadge status={msg.status}>
							{msg.status === 'new' ? 'Новое' : 'Прочитано'}
						</StatusBadge>
					</CardHeader>
					<Message>{msg.message}</Message>
					<Actions>
						{msg.status === 'new' && (
							<Button
								variant='outline'
								size='small'
								onClick={() => markAsRead(msg.id)}
							>
								<Check size={14} /> Прочитано
							</Button>
						)}
						<Button
							variant='outline'
							size='small'
							onClick={() => handleDelete(msg.id)}
							style={{ color: '#C84B4B', borderColor: 'rgba(200,75,75,0.3)' }}
						>
							<Trash2 size={14} /> Удалить
						</Button>
					</Actions>
				</Card>
			))}
		</Grid>
	)
}

export default AdminSupport
