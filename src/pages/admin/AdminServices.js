// pages/admin/AdminServices.js
import React, { useState } from 'react'
import styled from 'styled-components'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'
import { useServices } from '../../context/ServicesContext'
import GlassCard from '../../components/UI/GlassCard'
import Button from '../../components/UI/Button'

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
`

const FormCard = styled(GlassCard)`
	padding: 2rem;
	margin-bottom: 2rem;
`

const FormTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	margin-bottom: 1.5rem;
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
		background: #14191f;
		color: #e8e3d9;
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

const CategorySection = styled.div`
	margin-bottom: 3rem;
`

const CategoryTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 1.5rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
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
	margin-bottom: 0.3rem;
`

const ServiceMeta = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.85rem;
	margin-bottom: 0.8rem;
`

const ServicePrice = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.8rem;
`

const ServiceFeatures = styled.ul`
	list-style: none;
	margin-bottom: 1rem;
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

const CardActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid ${props => props.theme.colors.border};
`

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem;
	color: ${props => props.theme.colors.textMuted};
`

const AdminServices = () => {
	const { services, addService, updateService, deleteService } = useServices()
	const [showForm, setShowForm] = useState(false)
	const [editing, setEditing] = useState(null)
	const [form, setForm] = useState({
		name: '',
		category: 'cleaning',
		serviceType: 'base',
		subtype: 'regular',
		price: '',
		unit: '',
		description: '',
		features: [''],
	})

	const cleaningSubtypes = [
		{ value: 'regular', label: 'Регулярная' },
		{ value: 'general', label: 'Генеральная' },
		{ value: 'afterRepair', label: 'После ремонта' },
	]

	const drycleaningSubtypes = [
		{ value: 'clothing', label: 'Одежда' },
		{ value: 'curtains', label: 'Шторы и текстиль' },
		{ value: 'furniture', label: 'Мебель' },
		{ value: 'carpets', label: 'Ковры' },
		{ value: 'shoes', label: 'Обувь' },
		{ value: 'laundry', label: 'Стирка и глажка' },
	]

	const subtypeOptions =
		form.category === 'cleaning' ? cleaningSubtypes : drycleaningSubtypes

	const typeLabels = {
		regular: 'Регулярная',
		general: 'Генеральная',
		afterRepair: 'После ремонта',
		clothing: 'Одежда',
		curtains: 'Шторы и текстиль',
		furniture: 'Мебель',
		carpets: 'Ковры',
		shoes: 'Обувь',
		laundry: 'Стирка и глажка',
	}

	const resetForm = () => {
		setForm({
			name: '',
			category: 'cleaning',
			serviceType: 'base',
			subtype: 'regular',
			price: '',
			unit: '',
			description: '',
			features: [''],
		})
		setEditing(null)
		setShowForm(false)
	}

	const handleAddFeature = () => {
		setForm({ ...form, features: [...form.features, ''] })
	}

	const handleFeatureChange = (index, value) => {
		const newFeatures = [...form.features]
		newFeatures[index] = value
		setForm({ ...form, features: newFeatures })
	}

	const handleRemoveFeature = index => {
		const newFeatures = form.features.filter((_, i) => i !== index)
		setForm({ ...form, features: newFeatures.length > 0 ? newFeatures : [''] })
	}

	const handleCategoryChange = e => {
		const newCategory = e.target.value
		setForm({
			...form,
			category: newCategory,
			subtype: newCategory === 'cleaning' ? 'regular' : 'clothing',
			serviceType: newCategory === 'drycleaning' ? 'base' : form.serviceType,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const data = {
			name: form.name,
			category: form.category,
			type: form.category === 'drycleaning' ? form.subtype : form.serviceType,
			subtype: form.subtype,
			price: Number(form.price),
			unit: form.unit,
			description: form.description,
			features: form.features.filter(f => f.trim() !== ''),
		}

		try {
			if (editing) {
				await updateService(editing, data)
			} else {
				await addService(data)
			}
			resetForm()
		} catch (error) {
			console.error('Error saving service:', error)
		}
	}

	const startEdit = service => {
		setEditing(service.id)
		setForm({
			name: service.name || '',
			category: service.category || 'cleaning',
			serviceType:
				service.type === 'base'
					? 'base'
					: service.type === 'extra'
						? 'extra'
						: 'base',
			subtype: service.subtype || service.type || 'regular',
			price: service.price?.toString() || '',
			unit: service.unit || '',
			description: service.description || '',
			features:
				(service.features || []).length > 0 ? [...service.features] : [''],
		})
		setShowForm(true)
	}

	const handleDelete = async id => {
		if (window.confirm('Удалить услугу?')) {
			await deleteService(id)
		}
	}

	const cleaningBaseServices = services.filter(
		s => s.category === 'cleaning' && s.type === 'base',
	)
	const cleaningExtraServices = services.filter(
		s => s.category === 'cleaning' && s.type === 'extra',
	)
	const dryCleaningServices = services.filter(s => s.category === 'drycleaning')

	const renderServiceCard = service => (
		<ServiceCard key={service.id}>
			<ServiceName>{service.name}</ServiceName>
			<ServiceMeta>
				{service.unit} | {typeLabels[service.subtype] || service.subtype}
			</ServiceMeta>
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
			<CardActions>
				<Button
					variant='outline'
					size='small'
					onClick={() => startEdit(service)}
				>
					<Edit2 size={14} /> Ред.
				</Button>
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

	return (
		<Container>
			<Header>
				<Title>Управление услугами</Title>
				{!showForm && (
					<Button
						onClick={() => {
							resetForm()
							setShowForm(true)
						}}
					>
						<Plus size={16} /> Добавить услугу
					</Button>
				)}
			</Header>

			{showForm && (
				<FormCard>
					<FormTitle>
						{editing ? 'Редактировать услугу' : 'Новая услуга'}
					</FormTitle>
					<form onSubmit={handleSubmit}>
						<FormGrid>
							<FormGroup>
								<FormLabel>Название услуги *</FormLabel>
								<FormInput
									value={form.name}
									onChange={e => setForm({ ...form, name: e.target.value })}
									placeholder='Например: Мытьё окон'
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
									onChange={handleCategoryChange}
								>
									<option value='cleaning'>Уборка</option>
									<option value='drycleaning'>Химчистка</option>
								</FormSelect>
							</FormGroup>

							{form.category === 'cleaning' && (
								<FormGroup>
									<FormLabel>Тип услуги</FormLabel>
									<FormSelect
										value={form.serviceType}
										onChange={e =>
											setForm({ ...form, serviceType: e.target.value })
										}
									>
										<option value='base'>Базовая (основной тип уборки)</option>
										<option value='extra'>Дополнительная (доп опция)</option>
									</FormSelect>
								</FormGroup>
							)}

							<FormGroup>
								<FormLabel>
									{form.category === 'cleaning'
										? 'Подтип уборки'
										: 'Категория химчистки'}
								</FormLabel>
								<FormSelect
									value={form.subtype}
									onChange={e => setForm({ ...form, subtype: e.target.value })}
								>
									{subtypeOptions.map(opt => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</FormSelect>
							</FormGroup>

							<FormGroup>
								<FormLabel>Единица измерения</FormLabel>
								<FormInput
									value={form.unit}
									onChange={e => setForm({ ...form, unit: e.target.value })}
									placeholder='за окно / за изделие / за м2'
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
								placeholder='Краткое описание услуги'
							/>
						</FormGroup>

						<FeaturesEditor>
							<FormLabel>Что входит в услугу</FormLabel>
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
							<Button type='submit'>
								<Check size={16} /> {editing ? 'Сохранить' : 'Добавить'}
							</Button>
							<Button variant='outline' type='button' onClick={resetForm}>
								<X size={16} /> Отмена
							</Button>
						</ButtonsRow>
					</form>
				</FormCard>
			)}

			{/* Уборка — Базовые типы */}
			<CategorySection>
				<CategoryTitle>Уборка — Базовые типы</CategoryTitle>
				{cleaningSubtypes.map(st => {
					const typeServices = cleaningBaseServices.filter(
						s => s.subtype === st.value,
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
			</CategorySection>

			{/* Уборка — Дополнительные услуги */}
			<CategorySection>
				<CategoryTitle>Уборка — Дополнительные услуги</CategoryTitle>
				{cleaningSubtypes.map(st => {
					const typeServices = cleaningExtraServices.filter(
						s => s.subtype === st.value,
					)
					return (
						<TypeGroup key={st.value}>
							<TypeLabel>{st.label} — допы</TypeLabel>
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
			</CategorySection>

			{/* Химчистка */}
			<CategorySection>
				<CategoryTitle>Химчистка</CategoryTitle>
				{drycleaningSubtypes.map(st => {
					const typeServices = dryCleaningServices.filter(
						s => s.type === st.value || s.subtype === st.value,
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
			</CategorySection>
		</Container>
	)
}

export default AdminServices
