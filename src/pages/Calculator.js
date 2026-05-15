import React, { useState } from 'react'
import styled from 'styled-components'
import { ArrowRight, Plus, Check, Minus } from 'lucide-react'
import GlassCard from '../components/UI/GlassCard'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { useCart } from '../context/CartContext'

const Container = styled.div`
	max-width: 1300px;
	margin: 0 auto;
	padding: 1rem 1rem;

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
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
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

const CalcLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1.5rem;

	@media (min-width: 900px) {
		grid-template-columns: 1fr 380px;
		gap: 2rem;
	}
`

const MainPanel = styled.div``

const SidePanel = styled.div`
	@media (min-width: 900px) {
		position: sticky;
		top: 100px;
	}
`

const OptionsBlock = styled(GlassCard)`
	margin-top: 1.5rem;
`

const BlockTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
	margin-bottom: 1.2rem;
	letter-spacing: 0.04em;

	@media (min-width: 768px) {
		font-size: 1.3rem;
		margin-bottom: 1.5rem;
	}
`

const RoomsRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	flex-wrap: wrap;

	@media (min-width: 768px) {
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
`

const RoomsLabel = styled.span`
	color: ${props => props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	min-width: 140px;

	@media (min-width: 768px) {
		font-size: 1rem;
		min-width: 160px;
	}
`

const RoomsControl = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid ${props => props.theme.colors.border};
`

const RoomBtn = styled.button`
	width: 40px;
	height: 40px;
	background: transparent;
	border: none;
	color: ${props => props.theme.colors.text};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		color: ${props => props.theme.colors.accent};
		background: rgba(212, 175, 55, 0.05);
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
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
	color: ${props => props.theme.colors.accent};
	border-left: 1px solid ${props => props.theme.colors.border};
	border-right: 1px solid ${props => props.theme.colors.border};

	@media (min-width: 768px) {
		width: 50px;
		height: 44px;
		font-size: 1.2rem;
	}
`

const ExtrasList = styled.div`
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
		${props =>
			props.checked
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	background: ${props =>
		props.checked ? 'rgba(212, 175, 55, 0.05)' : 'transparent'};
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
	}

	@media (min-width: 768px) {
		padding: 1rem;
	}
`

const ExtraInfo = styled.div`
	flex: 1;
`

const ExtraName = styled.div`
	color: ${props => props.theme.colors.text};
	font-size: 0.85rem;

	@media (min-width: 768px) {
		font-size: 0.95rem;
	}
`

const ExtraDesc = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.75rem;
	margin-top: 0.2rem;

	@media (min-width: 768px) {
		font-size: 0.8rem;
	}
`

const ExtraPrice = styled.div`
	color: ${props => props.theme.colors.accent};
	font-family: ${props => props.theme.fonts.primary};
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
		${props =>
			props.checked ? props.theme.colors.accent : props.theme.colors.border};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: all 0.3s;

	svg {
		opacity: ${props => (props.checked ? 1 : 0)};
		color: ${props => props.theme.colors.accent};
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

const PriceCard = styled(GlassCard)`
	text-align: center;
`

const PriceLabel = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-family: ${props => props.theme.fonts.primary};
`

const PriceValue = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2.5rem;
	font-weight: 700;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.5rem;

	@media (min-width: 768px) {
		font-size: 3.5rem;
	}
`

const PriceUnit = styled.div`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.85rem;
	margin-bottom: 1.5rem;
`

const PriceBreakdown = styled.div`
	text-align: left;
	padding: 1rem 0;
	border-top: 1px solid ${props => props.theme.colors.border};
	border-bottom: 1px solid ${props => props.theme.colors.border};
	margin-bottom: 1.5rem;
`

const BreakdownRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.3rem 0;
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.8rem;

	@media (min-width: 768px) {
		font-size: 0.85rem;
		padding: 0.4rem 0;
	}

	&.total {
		color: ${props => props.theme.colors.text};
		font-weight: 500;
		font-size: 0.9rem;
		padding-top: 0.5rem;
		border-top: 1px solid ${props => props.theme.colors.border};
		margin-top: 0.3rem;

		@media (min-width: 768px) {
			font-size: 0.95rem;
			padding-top: 0.6rem;
			margin-top: 0.4rem;
		}
	}
`

const Calculator = () => {
	const { addToCart } = useCart()
	const [type, setType] = useState('apartment')
	const [area, setArea] = useState(50)
	const [rooms, setRooms] = useState(2)
	const [freq, setFreq] = useState('once')
	const [extras, setExtras] = useState([])

	const cleaningExtras = {
		apartment: [
			{
				id: 'windows',
				name: 'Мытьё окон',
				price: 1500,
				desc: 'за окно, с двух сторон',
			},
			{
				id: 'fridge',
				name: 'Мытьё холодильника',
				price: 800,
				desc: 'внутри и снаружи',
			},
			{
				id: 'oven',
				name: 'Чистка духовки',
				price: 1200,
				desc: 'включая противни и решётки',
			},
			{
				id: 'balcony',
				name: 'Уборка балкона',
				price: 1000,
				desc: 'влажная уборка, протирка окон',
			},
			{
				id: 'wardrobe',
				name: 'Уборка внутри шкафов',
				price: 600,
				desc: 'за шкаф, без вещей',
			},
			{ id: 'dishes', name: 'Мытьё посуды', price: 500, desc: '' },
		],
		office: [
			{
				id: 'windows_office',
				name: 'Мытьё окон',
				price: 2000,
				desc: 'за окно',
			},
			{
				id: 'tech',
				name: 'Чистка оргтехники',
				price: 1500,
				desc: 'до 5 устройств',
			},
			{
				id: 'kitchen_office',
				name: 'Уборка кухонной зоны',
				price: 2500,
				desc: 'включая технику',
			},
		],
		general: [
			{
				id: 'windows_hard',
				name: 'Мытьё окон (сложный доступ)',
				price: 2500,
				desc: 'высота, сложная конструкция',
			},
			{
				id: 'fridge_defrost',
				name: 'Разморозка холодильника',
				price: 1500,
				desc: 'полная разморозка и очистка',
			},
			{
				id: 'oven_steam',
				name: 'Паровая чистка духовки',
				price: 2000,
				desc: 'глубокая очистка паром',
			},
			{
				id: 'ac',
				name: 'Чистка кондиционера',
				price: 1800,
				desc: 'внешняя и внутренняя',
			},
			{
				id: 'kitchen_cabinets',
				name: 'Уборка кухонных шкафов',
				price: 2000,
				desc: 'все шкафы с посудой',
			},
		],
		afterRepair: [
			{
				id: 'heavy_trash',
				name: 'Вынос крупного мусора',
				price: 3000,
				desc: 'до 100 кг, мешки включены',
			},
			{
				id: 'paint_removal',
				name: 'Удаление следов краски',
				price: 5000,
				desc: 'с полов, окон, дверей',
			},
			{
				id: 'grout_cleaning',
				name: 'Очистка швов',
				price: 4000,
				desc: 'химическая очистка межплиточных швов',
			},
			{
				id: 'ventilation',
				name: 'Чистка вентиляции',
				price: 2500,
				desc: 'профессиональная очистка каналов',
			},
			{
				id: 'polishing',
				name: 'Полировка полов',
				price: 3500,
				desc: 'машинная полировка покрытий',
			},
		],
		windows: [],
		dryCleaning: [],
	}

	const currentExtras = cleaningExtras[type] || []

	const calculatePrice = () => {
		let base = 0
		const rates = {
			apartment: 70,
			office: 50,
			general: 100,
			afterRepair: 150,
			windows: 200,
			dryCleaning: 300,
		}
		const mult = { once: 1, weekly: 0.7, monthly: 0.85 }

		if (type === 'apartment') base = rooms * 2000
		else if (type === 'windows') base = rooms * 1500
		else if (type === 'dryCleaning') base = 0
		else base = area * (rates[type] || 70)

		base *= mult[freq]
		return Math.round(base)
	}

	const basePrice = calculatePrice()
	const extrasTotal = extras.reduce((sum, id) => {
		const item = currentExtras.find(e => e.id === id)
		return sum + (item ? item.price : 0)
	}, 0)
	const totalPrice = basePrice + extrasTotal

	const serviceNames = {
		apartment: 'Уборка квартиры',
		office: 'Уборка офиса',
		general: 'Генеральная уборка',
		afterRepair: 'После ремонта',
		windows: 'Мойка окон',
		dryCleaning: 'Химчистка',
	}

	const handleAddToCart = () => {
		addToCart({
			id: Date.now(),
			title: serviceNames[type],
			price: totalPrice,
			quantity: 1,
			details: `Площадь: ${area} м2 | Комнат: ${rooms} | ${freq === 'once' ? 'Разово' : freq === 'weekly' ? 'Еженедельно' : 'Ежемесячно'} | Допы: ${extras.length > 0 ? extras.map(id => currentExtras.find(e => e.id === id)?.name).join(', ') : 'нет'}`,
		})
		setExtras([])
	}

	const toggleExtra = id => {
		setExtras(prev =>
			prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id],
		)
	}

	const showRooms = type === 'apartment' || type === 'windows'
	const showArea =
		type !== 'apartment' && type !== 'windows' && type !== 'dryCleaning'

	return (
		<Container>
			<Header>
				<Label>Calculator</Label>
				<Title>Расчёт стоимости</Title>
			</Header>

			<CalcLayout>
				<MainPanel>
					<GlassCard padding='1.5rem'>
						<Input
							label='Тип услуги'
							select
							value={type}
							onChange={e => {
								setType(e.target.value)
								setExtras([])
							}}
							options={[
								{ value: 'apartment', label: 'Уборка квартиры' },
								{ value: 'office', label: 'Уборка офиса' },
								{ value: 'general', label: 'Генеральная уборка' },
								{ value: 'afterRepair', label: 'После ремонта' },
								{ value: 'windows', label: 'Мойка окон' },
								{ value: 'dryCleaning', label: 'Химчистка' },
							]}
						/>

						{showArea && (
							<Input
								label='Площадь (м2)'
								type='number'
								value={area}
								onChange={e => setArea(Number(e.target.value))}
								min='10'
								max='10000'
							/>
						)}

						{showRooms && (
							<RoomsRow>
								<RoomsLabel>Количество комнат</RoomsLabel>
								<RoomsControl>
									<RoomBtn
										onClick={() => setRooms(Math.max(1, rooms - 1))}
										disabled={rooms <= 1}
									>
										<Minus size={18} />
									</RoomBtn>
									<RoomValue>{rooms}</RoomValue>
									<RoomBtn
										onClick={() => setRooms(Math.min(10, rooms + 1))}
										disabled={rooms >= 10}
									>
										<Plus size={18} />
									</RoomBtn>
								</RoomsControl>
							</RoomsRow>
						)}

						<Input
							label='Периодичность'
							select
							value={freq}
							onChange={e => setFreq(e.target.value)}
							options={[
								{ value: 'once', label: 'Разово' },
								{ value: 'weekly', label: 'Еженедельно (скидка 30%)' },
								{ value: 'monthly', label: 'Ежемесячно (скидка 15%)' },
							]}
						/>
					</GlassCard>

					{currentExtras.length > 0 && (
						<OptionsBlock>
							<BlockTitle>Дополнительные услуги</BlockTitle>
							<ExtrasList>
								{currentExtras.map(extra => (
									<ExtraItem key={extra.id} checked={extras.includes(extra.id)}>
										<ExtraInfo>
											<ExtraName>{extra.name}</ExtraName>
											{extra.desc && <ExtraDesc>{extra.desc}</ExtraDesc>}
										</ExtraInfo>
										<ExtraPrice>+{extra.price.toLocaleString()} P</ExtraPrice>
										<HiddenCheckbox
											type='checkbox'
											checked={extras.includes(extra.id)}
											onChange={() => toggleExtra(extra.id)}
										/>
										<CheckIndicator checked={extras.includes(extra.id)}>
											<Check size={14} />
										</CheckIndicator>
									</ExtraItem>
								))}
							</ExtrasList>
						</OptionsBlock>
					)}
				</MainPanel>

				<SidePanel>
					<PriceCard>
						<PriceLabel>Стоимость</PriceLabel>
						<PriceValue>{totalPrice.toLocaleString()} P</PriceValue>
						<PriceUnit>
							{type === 'apartment' && `${rooms}-комнатная квартира`}
							{type === 'office' && `${area} м2`}
							{type === 'general' && `${area} м2`}
							{type === 'afterRepair' && `${area} м2`}
							{type === 'windows' && `${rooms} окон`}
							{type === 'dryCleaning' && 'от 1 изделия'}
						</PriceUnit>

						<PriceBreakdown>
							<BreakdownRow>
								<span>Базовая стоимость</span>
								<span>{basePrice.toLocaleString()} P</span>
							</BreakdownRow>
							{freq !== 'once' && (
								<BreakdownRow>
									<span>Скидка за периодичность</span>
									<span style={{ color: '#5B9A68' }}>
										-
										{Math.round(
											basePrice / (freq === 'weekly' ? 0.7 : 0.85) - basePrice,
										).toLocaleString()}{' '}
										P
									</span>
								</BreakdownRow>
							)}
							{extrasTotal > 0 && (
								<BreakdownRow>
									<span>Дополнительные услуги</span>
									<span>{extrasTotal.toLocaleString()} P</span>
								</BreakdownRow>
							)}
							<BreakdownRow className='total'>
								<span>Итого</span>
								<span>{totalPrice.toLocaleString()} P</span>
							</BreakdownRow>
						</PriceBreakdown>

						<Button
							onClick={handleAddToCart}
							style={{ width: '100%', justifyContent: 'center' }}
						>
							<Plus size={18} /> В корзину
						</Button>
						<p
							style={{
								color: '#5C5850',
								fontSize: '0.8rem',
								marginTop: '1rem',
							}}
						>
							Окончательная стоимость уточняется после осмотра
						</p>
					</PriceCard>
				</SidePanel>
			</CalcLayout>
		</Container>
	)
}

export default Calculator
