import React, { useState } from 'react'
import styled from 'styled-components'
import {
	Plus,
	Check,
	ChevronDown,
	ChevronUp,
	Sparkles,
	Wind,
	Shirt,
	Sofa,
	Footprints,
	Minus,
	Loader,
} from 'lucide-react'
import Button from '../components/UI/Button'
import GlassCard from '../components/UI/GlassCard'
import { useCart } from '../context/CartContext'
import { useServices } from '../context/ServicesContext'

const Container = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 1rem;
	@media (min-width: 768px) {
		padding: 2rem 3rem;
	}
`

const Header = styled.div`
	text-align: center;
	margin-bottom: 3rem;
	padding-top: 2rem;
	@media (min-width: 768px) {
		margin-bottom: 4rem;
		padding-top: 3rem;
	}
`

const Label = styled.div`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${p => p.theme.colors.accent};
	margin-bottom: 1.5rem;
	margin-top: 2.5rem;
`

const Title = styled.h1`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 2.5rem;
	font-weight: 700;
	@media (min-width: 768px) {
		font-size: 3.5rem;
	}
`

const TabsWrapper = styled.div`
	display: flex;
	margin-bottom: 2rem;
	border: 1px solid ${p => p.theme.colors.border};
`

const Tab = styled.button`
	flex: 1;
	padding: 1rem;
	background: ${p => (p.active ? p.theme.colors.surface : 'transparent')};
	border: none;
	color: ${p => (p.active ? p.theme.colors.accent : p.theme.colors.textDimmed)};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.95rem;
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
		background: ${p => p.theme.colors.accent};
		opacity: ${p => (p.active ? 1 : 0)};
		transition: opacity 0.3s;
	}
	&:hover {
		color: ${p => p.theme.colors.text};
	}
	@media (min-width: 768px) {
		padding: 1.4rem 2rem;
		font-size: 1.1rem;
	}
`

const SubTabsWrapper = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	flex-wrap: wrap;
	@media (min-width: 768px) {
		gap: 1rem;
		margin-bottom: 2rem;
	}
`

const SubTab = styled.button`
	padding: 0.6rem 1rem;
	background: transparent;
	border: 1px solid
		${p => (p.active ? p.theme.colors.borderAccent : p.theme.colors.border)};
	color: ${p => (p.active ? p.theme.colors.accent : p.theme.colors.textDimmed)};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.85rem;
	letter-spacing: 0.05em;
	cursor: pointer;
	transition: all 0.3s;
	white-space: nowrap;
	&:hover {
		border-color: ${p => p.theme.colors.borderAccent};
		color: ${p => p.theme.colors.text};
	}
	@media (min-width: 768px) {
		padding: 0.8rem 2rem;
		font-size: 0.95rem;
	}
`

const RoomsSelector = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	flex-wrap: wrap;
	@media (min-width: 768px) {
		margin-bottom: 2rem;
	}
`

const RoomsLabel = styled.span`
	color: ${p => p.theme.colors.textDimmed};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.9rem;
`

const RoomsControl = styled.div`
	display: flex;
	border: 1px solid ${p => p.theme.colors.border};
`

const RoomBtn = styled.button`
	width: 40px;
	height: 40px;
	background: transparent;
	border: none;
	color: ${p => p.theme.colors.text};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:hover {
		color: ${p => p.theme.colors.accent};
	}
	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
	@media (min-width: 768px) {
		width: 44px;
		height: 44px;
	}
`

const RoomValue = styled.div`
	width: 45px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.1rem;
	color: ${p => p.theme.colors.accent};
	border-left: 1px solid ${p => p.theme.colors.border};
	border-right: 1px solid ${p => p.theme.colors.border};
	@media (min-width: 768px) {
		width: 50px;
		height: 44px;
		font-size: 1.2rem;
	}
`

const ServiceContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;
	@media (min-width: 900px) {
		grid-template-columns: 1fr 380px;
		gap: 2rem;
	}
`

const MainInfo = styled.div``

const SidePanel = styled.div`
	@media (min-width: 900px) {
		position: sticky;
		top: 100px;
		align-self: start;
	}
`

const InfoBlock = styled(GlassCard)`
	margin-bottom: 1.5rem;
`

const BlockTitle = styled.h3`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.2rem;
	margin-bottom: 1.2rem;
	@media (min-width: 768px) {
		font-size: 1.4rem;
		margin-bottom: 1.5rem;
	}
`

const IncludedList = styled.ul`
	list-style: none;
`

const IncludedItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.6rem;
	padding: 0.5rem 0;
	color: ${p => p.theme.colors.textDimmed};
	font-weight: 300;
	font-size: 0.9rem;
	@media (min-width: 768px) {
		padding: 0.7rem 0;
		font-size: 1rem;
	}
	svg {
		color: ${p => p.theme.colors.success};
		flex-shrink: 0;
	}
`

const ShowMoreBtn = styled.button`
	background: none;
	border: none;
	color: ${p => p.theme.colors.accent};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.9rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.8rem;
	padding: 0;
	&:hover {
		opacity: 0.7;
	}
`

const ExtraList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	@media (min-width: 768px) {
		gap: 0.8rem;
	}
`

const ExtraItem = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.8rem;
	border: 1px solid
		${p => (p.checked ? p.theme.colors.borderAccent : p.theme.colors.border)};
	background: ${p => (p.checked ? 'rgba(212,175,55,0.05)' : 'transparent')};
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		border-color: ${p => p.theme.colors.borderAccent};
	}
	@media (min-width: 768px) {
		padding: 1rem;
	}
`

const ExtraInfo = styled.div`
	flex: 1;
`

const ExtraName = styled.span`
	color: ${p => p.theme.colors.text};
	font-size: 0.85rem;
	@media (min-width: 768px) {
		font-size: 0.95rem;
	}
`

const ExtraDesc = styled.span`
	color: ${p => p.theme.colors.textMuted};
	font-size: 0.75rem;
	margin-top: 0.2rem;
	@media (min-width: 768px) {
		font-size: 0.8rem;
	}
`

const ExtraPrice = styled.span`
	color: ${p => p.theme.colors.accent};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.95rem;
	font-weight: 600;
	margin-right: 0.8rem;
	white-space: nowrap;
	@media (min-width: 768px) {
		font-size: 1.1rem;
		margin-right: 1rem;
	}
`

const HiddenCheckbox = styled.input`
	display: none;
`

const CheckIndicator = styled.div`
	width: 18px;
	height: 18px;
	border: 2px solid
		${p => (p.checked ? p.theme.colors.accent : p.theme.colors.border)};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	svg {
		opacity: ${p => (p.checked ? 1 : 0)};
		color: ${p => p.theme.colors.accent};
		width: 12px;
		height: 12px;
	}
	@media (min-width: 768px) {
		width: 20px;
		height: 20px;
		svg {
			width: 14px;
			height: 14px;
		}
	}
`

const PriceBlock = styled(GlassCard)`
	text-align: center;
`

const PriceTitle = styled.div`
	color: ${p => p.theme.colors.textDimmed};
	margin-bottom: 0.5rem;
	font-size: 0.85rem;
`

const PriceValue = styled.div`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 2rem;
	font-weight: 700;
	color: ${p => p.theme.colors.accent};
	margin-bottom: 0.5rem;
	small {
		font-size: 0.85rem;
		color: ${p => p.theme.colors.textMuted};
		display: block;
	}
	@media (min-width: 768px) {
		font-size: 2.5rem;
	}
`

const PriceBreakdown = styled.div`
	text-align: left;
	padding: 1rem 0;
	border-top: 1px solid ${p => p.theme.colors.border};
	margin-bottom: 1.5rem;
`

const BreakdownRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.3rem 0;
	color: ${p => p.theme.colors.textDimmed};
	font-size: 0.8rem;
	@media (min-width: 768px) {
		font-size: 0.85rem;
	}
`

const DryCleaningWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;
	@media (min-width: 900px) {
		grid-template-columns: 280px 1fr;
		gap: 2rem;
	}
`

const DryCleaningSidebar = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
	@media (min-width: 900px) {
		flex-direction: column;
		position: sticky;
		top: 120px;
		align-self: start;
		gap: 0.5rem;
	}
`

const DryCleaningContent = styled.div``

const DCCategoryTitle = styled.h2`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
	@media (min-width: 768px) {
		font-size: 2rem;
	}
`

const DCCategoryDesc = styled.p`
	color: ${p => p.theme.colors.textDimmed};
	margin-bottom: 1.5rem;
	font-weight: 300;
	font-size: 0.9rem;
	@media (min-width: 768px) {
		margin-bottom: 2rem;
		font-size: 1rem;
	}
`

const DryCleaningGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	@media (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
`

const DryCleaningCard = styled(GlassCard)`
	display: flex;
	flex-direction: column;
	height: 100%;
	&:hover {
		border-color: ${p => p.theme.colors.borderAccent};
		transform: translateY(-4px);
	}
`

const DCIcon = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid ${p => p.theme.colors.borderAccent};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${p => p.theme.colors.accent};
	margin-bottom: 1rem;
	flex-shrink: 0;
	@media (min-width: 768px) {
		width: 50px;
		height: 50px;
		margin-bottom: 1.2rem;
	}
`

const DCName = styled.h3`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
	@media (min-width: 768px) {
		font-size: 1.3rem;
	}
`

const DCDesc = styled.p`
	color: ${p => p.theme.colors.textDimmed};
	font-weight: 300;
	line-height: 1.6;
	margin-bottom: 0.8rem;
	font-size: 0.85rem;
`

const DCFeatures = styled.ul`
	list-style: none;
	margin-bottom: 0;
	flex: 1;
`

const DCFeature = styled.li`
	color: ${p => p.theme.colors.textMuted};
	font-size: 0.8rem;
	padding: 0.2rem 0;
	padding-left: 0.8rem;
	position: relative;
	font-weight: 300;
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 4px;
		height: 1px;
		background: ${p => p.theme.colors.accent};
	}
	@media (min-width: 768px) {
		font-size: 0.85rem;
		padding: 0.25rem 0;
		padding-left: 1rem;
	}
`

const DCFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid ${p => p.theme.colors.border};
	flex-wrap: wrap;
	gap: 0.5rem;
`

const DCPrice = styled.div`
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${p => p.theme.colors.accent};
	font-weight: 600;
	small {
		font-size: 0.8rem;
		color: ${p => p.theme.colors.textMuted};
	}
	@media (min-width: 768px) {
		font-size: 1.5rem;
	}
`

const DCQuantity = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
	span {
		font-family: ${p => p.theme.fonts.primary};
		font-size: 1rem;
		color: ${p => p.theme.colors.text};
		min-width: 18px;
		text-align: center;
	}
	@media (min-width: 768px) {
		gap: 0.5rem;
		span {
			font-size: 1.1rem;
			min-width: 20px;
		}
	}
`

const DCCategoryBtn = styled.button`
	text-align: left;
	padding: 0.7rem 1rem;
	background: ${p => (p.active ? p.theme.colors.surface : 'transparent')};
	border: 1px solid
		${p => (p.active ? p.theme.colors.borderAccent : p.theme.colors.border)};
	color: ${p => (p.active ? p.theme.colors.accent : p.theme.colors.textDimmed)};
	font-family: ${p => p.theme.fonts.primary};
	font-size: 0.85rem;
	letter-spacing: 0.04em;
	cursor: pointer;
	transition: all 0.3s;
	flex: 1;
	min-width: 130px;
	white-space: nowrap;
	&:hover {
		border-color: ${p => p.theme.colors.borderAccent};
		color: ${p => p.theme.colors.text};
	}
	@media (min-width: 900px) {
		flex: none;
		padding: 1rem 1.2rem;
		font-size: 1rem;
	}
`

const LoadingOverlay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rem;
	color: ${p => p.theme.colors.accent};
	gap: 1rem;
	font-family: ${p => p.theme.fonts.primary};
	font-size: 1.2rem;
`

const categoryIcons = {
	clothing: Shirt,
	curtains: Wind,
	furniture: Sofa,
	carpets: Sparkles,
	shoes: Footprints,
	laundry: Shirt,
}

const categoryDescriptions = {
	clothing: 'Профессиональная химчистка одежды из любых тканей.',
	curtains: 'Чистка штор, гардин, тюля и домашнего текстиля.',
	furniture: 'Глубокая чистка мягкой и корпусной мебели.',
	carpets: 'Профессиональная чистка ковров и ковровых покрытий.',
	shoes: 'Восстановление и глубокая чистка обуви.',
	laundry: 'Полный цикл: стирка, сушка, глажка.',
}

const subtypeLabels = {
	regular: 'Регулярная',
	general: 'Генеральная',
	afterRepair: 'После ремонта',
}

const Services = () => {
	const { addToCart } = useCart()
	const { services, loading } = useServices()

	const [mainTab, setMainTab] = useState('cleaning')
	const [cleaningSubTab, setCleaningSubTab] = useState('regular')
	const [rooms, setRooms] = useState(1)
	const [extras, setExtras] = useState([])
	const [showAllIncluded, setShowAllIncluded] = useState(false)
	const [dcCategory, setDcCategory] = useState('clothing')
	const [dcQuantities, setDcQuantities] = useState({})

	// Базовые услуги уборки из Firebase
	const baseServices = services.filter(
		s => s.category === 'cleaning' && s.type === 'base',
	)
	const currentBase = baseServices.find(s => s.subtype === cleaningSubTab) || {
		name: subtypeLabels[cleaningSubTab],
		price: 3500,
		unit: '1-комнатная квартира',
		features: [],
	}

	// Дополнительные услуги для выбранного типа уборки
	const extraServices = services.filter(
		s =>
			s.category === 'cleaning' &&
			s.type === 'extra' &&
			s.subtype === cleaningSubTab,
	)

	const basePrice = currentBase.price * rooms
	const extrasTotal = extras.reduce((sum, id) => {
		const item = extraServices.find(e => e.id === id)
		return sum + (item ? item.price : 0)
	}, 0)
	const totalPrice = basePrice + extrasTotal

	const handleAddCleaning = () => {
		addToCart({
			id: Date.now(),
			title: `Уборка: ${currentBase.name} (${rooms}-комнатная)`,
			price: totalPrice,
			quantity: 1,
			details: `Тип: ${currentBase.name} | Комнат: ${rooms} | Допы: ${extras.length > 0 ? extras.map(id => extraServices.find(e => e.id === id)?.name).join(', ') : 'нет'}`,
		})
		setExtras([])
	}

	// Химчистка из Firebase
	const dcServices = services.filter(s => s.category === 'drycleaning')

	const allDcCategories = {
		clothing: {
			name: 'Одежда',
			icon: Shirt,
			desc: categoryDescriptions.clothing,
		},
		curtains: {
			name: 'Шторы и текстиль',
			icon: Wind,
			desc: categoryDescriptions.curtains,
		},
		furniture: {
			name: 'Мебель',
			icon: Sofa,
			desc: categoryDescriptions.furniture,
		},
		carpets: {
			name: 'Ковры',
			icon: Sparkles,
			desc: categoryDescriptions.carpets,
		},
		shoes: {
			name: 'Обувь',
			icon: Footprints,
			desc: categoryDescriptions.shoes,
		},
		laundry: {
			name: 'Стирка и глажка',
			icon: Shirt,
			desc: categoryDescriptions.laundry,
		},
	}

	const groupedDC = {}
	Object.entries(allDcCategories).forEach(([key, val]) => {
		groupedDC[key] = { ...val, items: [] }
	})
	dcServices.forEach(s => {
		const cat = s.type || 'clothing'
		if (groupedDC[cat]) {
			groupedDC[cat].items.push({
				id: s.id,
				name: s.name,
				price: s.price,
				unit: s.unit || 'за изделие',
				features: s.features || [],
			})
		}
	})

	const currentDC = groupedDC[dcCategory] || {
		name: '',
		icon: Sparkles,
		desc: '',
		items: [],
	}

	const handleAddDryCleaning = item => {
		const qty = dcQuantities[item.id] || 1
		addToCart({
			id: Date.now() + Math.random(),
			title: `Химчистка: ${item.name}`,
			price: item.price * qty,
			quantity: 1,
			details: `${item.name} | Количество: ${qty} | ${item.unit}`,
		})
		setDcQuantities(prev => ({ ...prev, [item.id]: 1 }))
	}

	const updateDcQuantity = (id, delta) => {
		setDcQuantities(prev => ({
			...prev,
			[id]: Math.max(1, (prev[id] || 1) + delta),
		}))
	}

	const visibleFeatures = showAllIncluded
		? currentBase.features
		: currentBase.features.slice(0, 6)

	if (loading) {
		return (
			<Container>
				<Header>
					<Label>Services</Label>
					<Title>Наши услуги</Title>
				</Header>
				<LoadingOverlay>
					<Loader size={24} /> Загрузка услуг...
				</LoadingOverlay>
			</Container>
		)
	}

	return (
		<Container>
			<Header>
				<Label>Services</Label>
				<Title>Наши услуги</Title>
			</Header>

			<TabsWrapper>
				<Tab
					active={mainTab === 'cleaning'}
					onClick={() => setMainTab('cleaning')}
				>
					Уборка
				</Tab>
				<Tab
					active={mainTab === 'drycleaning'}
					onClick={() => setMainTab('drycleaning')}
				>
					Химчистка
				</Tab>
			</TabsWrapper>

			{mainTab === 'cleaning' && (
				<>
					<SubTabsWrapper>
						{baseServices.map(s => (
							<SubTab
								key={s.id}
								active={cleaningSubTab === s.subtype}
								onClick={() => {
									setCleaningSubTab(s.subtype)
									setExtras([])
									setShowAllIncluded(false)
								}}
							>
								{s.name}
							</SubTab>
						))}
					</SubTabsWrapper>

					<RoomsSelector>
						<RoomsLabel>Количество комнат:</RoomsLabel>
						<RoomsControl>
							<RoomBtn
								onClick={() => setRooms(Math.max(1, rooms - 1))}
								disabled={rooms <= 1}
							>
								<Minus size={18} />
							</RoomBtn>
							<RoomValue>{rooms}</RoomValue>
							<RoomBtn
								onClick={() => setRooms(Math.min(6, rooms + 1))}
								disabled={rooms >= 6}
							>
								<Plus size={18} />
							</RoomBtn>
						</RoomsControl>
					</RoomsSelector>

					<ServiceContent>
						<MainInfo>
							<InfoBlock>
								<BlockTitle>Что входит</BlockTitle>
								<IncludedList>
									{visibleFeatures.map((item, i) => (
										<IncludedItem key={i}>
											<Check size={16} />
											{item}
										</IncludedItem>
									))}
								</IncludedList>
								{currentBase.features.length > 6 && (
									<ShowMoreBtn
										onClick={() => setShowAllIncluded(!showAllIncluded)}
									>
										{showAllIncluded ? (
											<>
												<ChevronUp size={16} /> Свернуть
											</>
										) : (
											<>
												<ChevronDown size={16} /> Подробнее
											</>
										)}
									</ShowMoreBtn>
								)}
							</InfoBlock>

							<InfoBlock>
								<BlockTitle>Дополнительные услуги</BlockTitle>
								<ExtraList>
									{extraServices.map(extra => (
										<ExtraItem
											key={extra.id}
											checked={extras.includes(extra.id)}
										>
											<ExtraInfo>
												<ExtraName>{extra.name}</ExtraName>
												{extra.unit && <ExtraDesc>{extra.unit}</ExtraDesc>}
											</ExtraInfo>
											<ExtraPrice>+{extra.price.toLocaleString()} P</ExtraPrice>
											<HiddenCheckbox
												type='checkbox'
												checked={extras.includes(extra.id)}
												onChange={() =>
													setExtras(prev =>
														prev.includes(extra.id)
															? prev.filter(e => e !== extra.id)
															: [...prev, extra.id],
													)
												}
											/>
											<CheckIndicator checked={extras.includes(extra.id)}>
												<Check size={14} />
											</CheckIndicator>
										</ExtraItem>
									))}
								</ExtraList>
							</InfoBlock>
						</MainInfo>

						<SidePanel>
							<PriceBlock>
								<PriceTitle>Стоимость</PriceTitle>
								<PriceValue>
									{totalPrice.toLocaleString()} P
									<small>{rooms}-комнатная</small>
								</PriceValue>
								<PriceBreakdown>
									<BreakdownRow>
										<span>Базовая ({rooms} комн.)</span>
										<span>{basePrice.toLocaleString()} P</span>
									</BreakdownRow>
									{extrasTotal > 0 && (
										<BreakdownRow>
											<span>Дополнительно</span>
											<span>{extrasTotal.toLocaleString()} P</span>
										</BreakdownRow>
									)}
								</PriceBreakdown>
								<Button
									onClick={handleAddCleaning}
									style={{ width: '100%', justifyContent: 'center' }}
								>
									<Plus size={18} /> В корзину
								</Button>
							</PriceBlock>
						</SidePanel>
					</ServiceContent>
				</>
			)}

			{mainTab === 'drycleaning' && (
				<DryCleaningWrapper>
					<DryCleaningSidebar>
						{Object.entries(groupedDC).map(([key, val]) => (
							<DCCategoryBtn
								key={key}
								active={dcCategory === key}
								onClick={() => setDcCategory(key)}
							>
								<val.icon
									size={16}
									style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}
								/>
								{val.name}
							</DCCategoryBtn>
						))}
					</DryCleaningSidebar>

					<DryCleaningContent>
						<DCCategoryTitle>{currentDC.name}</DCCategoryTitle>
						<DCCategoryDesc>{currentDC.desc}</DCCategoryDesc>
						<DryCleaningGrid>
							{currentDC.items.map(item => (
								<DryCleaningCard key={item.id}>
									<DCIcon>
										<currentDC.icon size={24} />
									</DCIcon>
									<DCName>{item.name}</DCName>
									<DCDesc>{item.unit}</DCDesc>
									<DCFeatures>
										{item.features.map((f, i) => (
											<DCFeature key={i}>{f}</DCFeature>
										))}
									</DCFeatures>
									<DCFooter>
										<DCPrice>{item.price.toLocaleString()} P</DCPrice>
										<DCQuantity>
											<RoomBtn
												onClick={() => updateDcQuantity(item.id, -1)}
												disabled={(dcQuantities[item.id] || 1) <= 1}
											>
												<Minus size={14} />
											</RoomBtn>
											<span>{dcQuantities[item.id] || 1}</span>
											<RoomBtn onClick={() => updateDcQuantity(item.id, 1)}>
												<Plus size={14} />
											</RoomBtn>
										</DCQuantity>
									</DCFooter>
									<Button
										onClick={() => handleAddDryCleaning(item)}
										style={{
											width: '100%',
											justifyContent: 'center',
											marginTop: '0.8rem',
										}}
										variant='outline'
									>
										<Plus size={18} /> В корзину
									</Button>
								</DryCleaningCard>
							))}
						</DryCleaningGrid>
					</DryCleaningContent>
				</DryCleaningWrapper>
			)}
		</Container>
	)
}

export default Services
