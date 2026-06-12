import React, { useState } from 'react'
import styled from 'styled-components'
import { Plus, Edit2, Trash2, Check, X, Link } from 'lucide-react'
import { useServices } from '../../context/ServicesContext'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const Container = styled.div``

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	gap: 1rem;
`

const Title = styled.h2`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.8rem;
	color: ${props => props.theme.colors.text};
`

const AdminTabs = styled.div`
	display: flex;
	margin-bottom: 2rem;
	border: 1px solid ${props => props.theme.colors.border};
`

const AdminTab = styled.button`
	flex: 1;
	padding: 1rem;
	background: ${props =>
		props.active ? props.theme.colors.surface : 'transparent'};
	border: none;
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1rem;
	letter-spacing: 0.08em;
	cursor: pointer;
	transition: all 0.3s;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: ${props => props.theme.colors.accent};
		opacity: ${props => (props.active ? 1 : 0)};
		transition: opacity 0.3s;
	}
	&:hover {
		color: ${props => props.theme.colors.text};
	}
`

const FormCard = styled(GlassCard)`
	padding: 2rem;
	margin-bottom: 2rem;
`

const FormTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	margin-bottom: 1.5rem;
	color: ${props => props.theme.colors.text};
`

const FormGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`

const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
	display: block;
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	letter-spacing: 0.05em;
	color: ${props => props.theme.colors.textDimmed};
	margin-bottom: 0.6rem;
	text-transform: uppercase;
`

const FormInput = styled.input`
	width: 100%;
	padding: 0.875rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
	outline: none;
	transition: border-color 0.4s;
	font-family: ${props => props.theme.fonts.secondary};
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const FormSelect = styled.select`
	width: 100%;
	padding: 0.875rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
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

const FormTextarea = styled.textarea`
	width: 100%;
	padding: 0.875rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 1rem;
	outline: none;
	resize: vertical;
	min-height: 80px;
	font-family: ${props => props.theme.fonts.secondary};
	transition: border-color 0.4s;
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const FeaturesEditor = styled.div`
	margin-bottom: 1.5rem;
`

const FeatureRow = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;
`

const FeatureInput = styled.input`
	flex: 1;
	padding: 0.7rem 0;
	background: transparent;
	border: none;
	border-bottom: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.text};
	font-size: 0.9rem;
	outline: none;
	font-family: ${props => props.theme.fonts.secondary};
	&:focus {
		border-color: ${props => props.theme.colors.borderAccent};
	}
	&::placeholder {
		color: ${props => props.theme.colors.textMuted};
	}
`

const RemoveFeatureBtn = styled.button`
	background: none;
	border: none;
	color: #c84b4b;
	cursor: pointer;
	padding: 0.3rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	&:hover {
		opacity: 0.7;
	}
`

const AddFeatureBtn = styled.button`
	background: none;
	border: 1px dashed ${props => props.theme.colors.borderAccent};
	color: ${props => props.theme.colors.accent};
	padding: 0.7rem 1rem;
	cursor: pointer;
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	width: 100%;
	transition: all 0.3s;
	margin-top: 0.5rem;
	&:hover {
		background: rgba(212, 175, 55, 0.05);
	}
`

const ButtonsRow = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;
`

const TypeGroup = styled.div`
	margin-bottom: 2rem;
`

const TypeLabel = styled.h4`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${props => props.theme.colors.textDimmed};
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid ${props => props.theme.colors.border};
`

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
	gap: 1rem;
	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
`

const ServiceCard = styled(GlassCard)`
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
`

const ServiceName = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${props => props.theme.colors.text};
	margin-bottom: 0.3rem;
`

const ServiceMeta = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.85rem;
	margin-bottom: 0.5rem;
`

const ServicePrice = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.8rem;
`

const ServiceFeatures = styled.ul`
	list-style: none;
	margin-bottom: 0.5rem;
	flex: 1;
`

const ServiceFeature = styled.li`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.85rem;
	padding: 0.2rem 0;
	padding-left: 1rem;
	position: relative;
	font-weight: 300;
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 4px;
		height: 1px;
		background: ${props => props.theme.colors.accent};
	}
`

const LinkedExtras = styled.div`
	margin-top: 0.5rem;
	padding-top: 0.5rem;
	border-top: 1px solid ${props => props.theme.colors.border};
`

const LinkedExtraItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem 0;
	font-size: 0.8rem;
	color: ${props => props.theme.colors.textDimmed};
`

const CardActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid ${props => props.theme.colors.border};
	flex-wrap: wrap;
`

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem;
	color: ${props => props.theme.colors.textMuted};
`

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
`

const ModalContent = styled.div`
	background: ${props => props.theme.colors.surface};
	border: 1px solid ${props => props.theme.colors.borderAccent};
	padding: 2rem;
	max-width: 600px;
	width: 100%;
	max-height: 80vh;
	overflow-y: auto;
`

const ModalTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	margin-bottom: 1.5rem;
	color: ${props => props.theme.colors.text};
`

const ExtraCheckItem = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.8rem;
	border: 1px solid
		${props =>
			props.checked
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	background: ${props =>
		props.checked ? 'rgba(212,175,55,0.05)' : 'transparent'};
	cursor: pointer;
	transition: all 0.3s;
	margin-bottom: 0.5rem;
	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
	}
`

const drycleaningTypes = [
	{ value: 'clothing', label: 'Одежда' },
	{ value: 'curtains', label: 'Шторы и текстиль' },
	{ value: 'furniture', label: 'Мебель' },
	{ value: 'carpets', label: 'Ковры' },
	{ value: 'shoes', label: 'Обувь' },
	{ value: 'laundry', label: 'Стирка и глажка' },
]

const AdminServices = () => {
	const { services, addService, updateService, deleteService } = useServices()
	const [adminTab, setAdminTab] = useState('cleaning')
	const [showForm, setShowForm] = useState(false)
	const [editing, setEditing] = useState(null)
	const [form, setForm] = useState({
		name: '',
		category: 'cleaning',
		serviceType: 'base',
		dcType: 'clothing',
		price: '',
		unit: '',
		description: '',
		features: [''],
		parentId: '',
	})

	const [extrasModalOpen, setExtrasModalOpen] = useState(false)
	const [extrasModalService, setExtrasModalService] = useState(null)
	const [selectedExtras, setSelectedExtras] = useState([])

	const cleaningBaseServices = services.filter(
		s => s.category === 'cleaning' && s.type === 'base',
	)
	const cleaningExtraServices = services.filter(
		s => s.category === 'cleaning' && s.type === 'extra',
	)
	const dryCleaningServices = services.filter(s => s.category === 'drycleaning')

	const resetForm = () => {
		setForm({
			name: '',
			category: adminTab,
			serviceType: 'base',
			dcType: 'clothing',
			price: '',
			unit: '',
			description: '',
			features: [''],
			parentId: '',
		})
		setEditing(null)
		setShowForm(false)
	}

	const openForm = () => {
		resetForm()
		setShowForm(true)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleAddFeature = () =>
		setForm({ ...form, features: [...form.features, ''] })

	const handleFeatureChange = (index, value) => {
		const newFeatures = [...form.features]
		newFeatures[index] = value
		setForm({ ...form, features: newFeatures })
	}

	const handleRemoveFeature = index => {
		const newFeatures = form.features.filter((_, i) => i !== index)
		setForm({ ...form, features: newFeatures.length > 0 ? newFeatures : [''] })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const data = {
			name: form.name,
			category: form.category,
			type: form.category === 'drycleaning' ? form.dcType : form.serviceType,
			subtype: form.category === 'drycleaning' ? form.dcType : 'base',
			price: Number(form.price),
			unit: form.unit,
			description: form.description,
			features: form.features.filter(f => f.trim() !== ''),
		}

		try {
			if (editing) {
				if (form.serviceType === 'extra' && form.parentId) {
					const oldService = services.find(s => s.id === editing)
					if (oldService?.parentId && oldService.parentId !== form.parentId) {
						const oldParent = services.find(s => s.id === oldService.parentId)
						if (oldParent) {
							await updateService(oldParent.id, {
								extras: (oldParent.extras || []).filter(id => id !== editing),
							})
						}
					}
					const newParent = services.find(s => s.id === form.parentId)
					if (newParent && !(newParent.extras || []).includes(editing)) {
						await updateService(form.parentId, {
							extras: [...(newParent.extras || []), editing],
						})
					}
				}
				await updateService(editing, { ...data, parentId: form.parentId || '' })
			} else {
				const docRef = await addDoc(collection(db, 'services'), {
					...data,
					parentId: form.parentId || '',
					createdAt: new Date().toISOString(),
				})
				if (form.serviceType === 'extra' && form.parentId) {
					const parent = services.find(s => s.id === form.parentId)
					if (parent) {
						await updateService(form.parentId, {
							extras: [...(parent.extras || []), docRef.id],
						})
					}
				}
			}
			resetForm()
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const startEdit = service => {
		setEditing(service.id)
		setForm({
			name: service.name || '',
			category: service.category || 'cleaning',
			serviceType:
				service.category === 'drycleaning'
					? 'base'
					: service.type === 'base'
						? 'base'
						: 'extra',
			dcType:
				service.category === 'drycleaning'
					? service.type || 'clothing'
					: 'clothing',
			price: service.price?.toString() || '',
			unit: service.unit || '',
			description: service.description || '',
			features:
				(service.features || []).length > 0 ? [...service.features] : [''],
			parentId: service.parentId || '',
		})
		setShowForm(true)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleDelete = async id => {
		if (window.confirm('Удалить услугу?')) {
			const service = services.find(s => s.id === id)
			if (service?.parentId) {
				const parent = services.find(s => s.id === service.parentId)
				if (parent) {
					await updateService(parent.id, {
						extras: (parent.extras || []).filter(eid => eid !== id),
					})
				}
			}
			if (service?.type === 'base' && service?.extras?.length > 0) {
				for (const extraId of service.extras) {
					await updateService(extraId, { parentId: '' })
				}
			}
			await deleteService(id)
		}
	}

	const openExtrasModal = service => {
		setExtrasModalService(service)
		setSelectedExtras(service.extras || [])
		setExtrasModalOpen(true)
	}

	const saveExtras = async () => {
		if (extrasModalService) {
			const removed = (extrasModalService.extras || []).filter(
				id => !selectedExtras.includes(id),
			)
			for (const id of removed) {
				await updateService(id, { parentId: '' })
			}
			const added = selectedExtras.filter(
				id => !(extrasModalService.extras || []).includes(id),
			)
			for (const id of added) {
				await updateService(id, { parentId: extrasModalService.id })
			}
			await updateService(extrasModalService.id, { extras: selectedExtras })
		}
		setExtrasModalOpen(false)
		setExtrasModalService(null)
	}

	const toggleExtraInModal = extraId => {
		setSelectedExtras(prev =>
			prev.includes(extraId)
				? prev.filter(id => id !== extraId)
				: [...prev, extraId],
		)
	}

	const renderServiceCard = service => {
		const linkedExtras = cleaningExtraServices.filter(e =>
			(service.extras || []).includes(e.id),
		)

		return (
			<ServiceCard key={service.id}>
				<ServiceName>{service.name}</ServiceName>
				<ServiceMeta>{service.unit}</ServiceMeta>
				<ServicePrice>{service.price?.toLocaleString()} P</ServicePrice>
				{service.description && (
					<p
						style={{
							color: '#8B8478',
							fontSize: '0.85rem',
							marginBottom: '0.8rem',
							lineHeight: 1.5,
						}}
					>
						{service.description}
					</p>
				)}
				{service.features && service.features.length > 0 && (
					<ServiceFeatures>
						{service.features.map((f, i) => (
							<ServiceFeature key={i}>{f}</ServiceFeature>
						))}
					</ServiceFeatures>
				)}

				{linkedExtras.length > 0 && (
					<LinkedExtras>
						<div
							style={{
								fontSize: '0.75rem',
								color: '#D4AF37',
								marginBottom: '0.3rem',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
							}}
						>
							Допы:
						</div>
						{linkedExtras.map(e => (
							<LinkedExtraItem key={e.id}>
								<span>{e.name}</span>
								<span>+{e.price?.toLocaleString()} P</span>
							</LinkedExtraItem>
						))}
					</LinkedExtras>
				)}

				<CardActions>
					<Button
						variant='outline'
						size='small'
						onClick={() => startEdit(service)}
					>
						<Edit2 size={14} /> Ред.
					</Button>
					{service.type === 'base' && (
						<Button
							variant='outline'
							size='small'
							onClick={() => openExtrasModal(service)}
						>
							<Link size={14} /> Допы
						</Button>
					)}
					<Button
						variant='outline'
						size='small'
						onClick={() => handleDelete(service.id)}
						style={{ color: '#C84B4B', borderColor: 'rgba(200,75,75,0.3)' }}
					>
						<Trash2 size={14} /> Уд.
					</Button>
				</CardActions>
			</ServiceCard>
		)
	}

	return (
		<Container>
			<Header>
				<Title>Управление услугами</Title>
				{!showForm && (
					<Button onClick={openForm}>
						<Plus size={16} /> Добавить услугу
					</Button>
				)}
			</Header>

			<AdminTabs>
				<AdminTab
					active={adminTab === 'cleaning'}
					onClick={() => setAdminTab('cleaning')}
				>
					Уборка
				</AdminTab>
				<AdminTab
					active={adminTab === 'drycleaning'}
					onClick={() => setAdminTab('drycleaning')}
				>
					Химчистка
				</AdminTab>
			</AdminTabs>

			{showForm && (
				<FormCard>
					<FormTitle>
						{editing ? 'Редактировать услугу' : 'Новая услуга'}
					</FormTitle>
					<form onSubmit={handleSubmit}>
						<FormGrid>
							<FormGroup>
								<FormLabel>Название *</FormLabel>
								<FormInput
									value={form.name}
									onChange={e => setForm({ ...form, name: e.target.value })}
									placeholder='Мытьё окон'
									required
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel>Цена (P) *</FormLabel>
								<FormInput
									type='number'
									value={form.price}
									onChange={e => setForm({ ...form, price: e.target.value })}
									placeholder='3500'
									required
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel>Категория *</FormLabel>
								<FormSelect
									value={form.category}
									onChange={e => setForm({ ...form, category: e.target.value })}
								>
									<option value='cleaning'>Уборка</option>
									<option value='drycleaning'>Химчистка</option>
								</FormSelect>
							</FormGroup>
							{form.category === 'cleaning' ? (
								<>
									<FormGroup>
										<FormLabel>Тип услуги</FormLabel>
										<FormSelect
											value={form.serviceType}
											onChange={e =>
												setForm({ ...form, serviceType: e.target.value })
											}
										>
											<option value='base'>Основная услуга</option>
											<option value='extra'>Дополнительная опция</option>
										</FormSelect>
									</FormGroup>
									{form.serviceType === 'extra' && (
										<FormGroup>
											<FormLabel>Привязать к основной услуге</FormLabel>
											<FormSelect
												value={form.parentId}
												onChange={e =>
													setForm({ ...form, parentId: e.target.value })
												}
											>
												<option value=''>Без привязки</option>
												{cleaningBaseServices.map(s => (
													<option key={s.id} value={s.id}>
														{s.name}
													</option>
												))}
											</FormSelect>
										</FormGroup>
									)}
								</>
							) : (
								<FormGroup>
									<FormLabel>Категория химчистки</FormLabel>
									<FormSelect
										value={form.dcType}
										onChange={e => setForm({ ...form, dcType: e.target.value })}
									>
										{drycleaningTypes.map(opt => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</FormSelect>
								</FormGroup>
							)}
							<FormGroup>
								<FormLabel>Ед. измерения</FormLabel>
								<FormInput
									value={form.unit}
									onChange={e => setForm({ ...form, unit: e.target.value })}
									placeholder='за окно / за изделие'
								/>
							</FormGroup>
						</FormGrid>
						<FormGroup>
							<FormLabel>Описание</FormLabel>
							<FormTextarea
								value={form.description}
								onChange={e =>
									setForm({ ...form, description: e.target.value })
								}
								placeholder='Краткое описание'
							/>
						</FormGroup>
						<FeaturesEditor>
							<FormLabel>Что входит</FormLabel>
							{form.features.map((feature, index) => (
								<FeatureRow key={index}>
									<FeatureInput
										value={feature}
										onChange={e => handleFeatureChange(index, e.target.value)}
										placeholder={`Пункт ${index + 1}`}
									/>
									{form.features.length > 1 && (
										<RemoveFeatureBtn
											type='button'
											onClick={() => handleRemoveFeature(index)}
										>
											<X size={16} />
										</RemoveFeatureBtn>
									)}
								</FeatureRow>
							))}
							<AddFeatureBtn type='button' onClick={handleAddFeature}>
								+ Добавить пункт
							</AddFeatureBtn>
						</FeaturesEditor>
						<ButtonsRow>
							<Button variant='outline' type='button' onClick={resetForm}>
								<X size={16} /> Отмена
							</Button>
							<Button type='submit'>
								<Check size={16} /> {editing ? 'Сохранить' : 'Добавить'}
							</Button>
						</ButtonsRow>
					</form>
				</FormCard>
			)}

			{extrasModalOpen && (
				<ModalOverlay onClick={() => setExtrasModalOpen(false)}>
					<ModalContent onClick={e => e.stopPropagation()}>
						<ModalTitle>
							Управление допами — {extrasModalService?.name}
						</ModalTitle>
						{cleaningExtraServices.length === 0 ? (
							<p
								style={{
									color: '#8B8478',
									textAlign: 'center',
									padding: '2rem',
								}}
							>
								Нет дополнительных услуг. Сначала создайте их.
							</p>
						) : (
							cleaningExtraServices.map(extra => (
								<ExtraCheckItem
									key={extra.id}
									checked={selectedExtras.includes(extra.id)}
								>
									<div>
										<div style={{ color: '#E8E3D9' }}>{extra.name}</div>
										<div style={{ color: '#5C5850', fontSize: '0.8rem' }}>
											+{extra.price?.toLocaleString()} P
										</div>
									</div>
									<input
										type='checkbox'
										checked={selectedExtras.includes(extra.id)}
										onChange={() => toggleExtraInModal(extra.id)}
										style={{
											accentColor: '#D4AF37',
											width: '18px',
											height: '18px',
										}}
									/>
								</ExtraCheckItem>
							))
						)}
						<ButtonsRow style={{ marginTop: '1.5rem' }}>
							<Button
								variant='outline'
								onClick={() => setExtrasModalOpen(false)}
							>
								<X size={16} /> Отмена
							</Button>
							<Button onClick={saveExtras}>
								<Check size={16} /> Сохранить
							</Button>
						</ButtonsRow>
					</ModalContent>
				</ModalOverlay>
			)}

			{adminTab === 'cleaning' && (
				<>
					<TypeGroup>
						<TypeLabel>Основные услуги</TypeLabel>
						{cleaningBaseServices.length > 0 ? (
							<ServicesGrid>
								{cleaningBaseServices.map(renderServiceCard)}
							</ServicesGrid>
						) : (
							<EmptyState>Нет услуг</EmptyState>
						)}
					</TypeGroup>
					<TypeGroup>
						<TypeLabel>Дополнительные услуги</TypeLabel>
						{cleaningExtraServices.length > 0 ? (
							<ServicesGrid>
								{cleaningExtraServices.map(renderServiceCard)}
							</ServicesGrid>
						) : (
							<EmptyState>Нет услуг</EmptyState>
						)}
					</TypeGroup>
				</>
			)}

			{adminTab === 'drycleaning' && (
				<>
					{drycleaningTypes.map(st => {
						const typeServices = dryCleaningServices.filter(
							s => s.type === st.value,
						)
						return (
							<TypeGroup key={st.value}>
								<TypeLabel>{st.label}</TypeLabel>
								{typeServices.length > 0 ? (
									<ServicesGrid>
										{typeServices.map(renderServiceCard)}
									</ServicesGrid>
								) : (
									<EmptyState>Нет услуг</EmptyState>
								)}
							</TypeGroup>
						)
					})}
				</>
			)}
		</Container>
	)
}

export default AdminServices
