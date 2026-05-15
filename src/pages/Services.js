import React, { useState, useEffect } from 'react'
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
	margin-bottom: 1.5rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2.5rem;
	font-weight: 700;

	@media (min-width: 768px) {
		font-size: 3.5rem;
	}
`

const TabsWrapper = styled.div`
	display: flex;
	margin-bottom: 2rem;
	border: 1px solid ${props => props.theme.colors.border};
`

const Tab = styled.button`
	flex: 1;
	padding: 1rem;
	background: ${props =>
		props.active ? props.theme.colors.surface : 'transparent'};
	border: none;
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
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
		background: ${props => props.theme.colors.accent};
		opacity: ${props => (props.active ? 1 : 0)};
		transition: opacity 0.3s;
	}

	&:hover {
		color: ${props => props.theme.colors.text};
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
		${props =>
			props.active
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.85rem;
	letter-spacing: 0.05em;
	cursor: pointer;
	transition: all 0.3s;
	white-space: nowrap;

	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
		color: ${props => props.theme.colors.text};
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
	color: ${props => props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;

	@media (min-width: 768px) {
		font-size: 1rem;
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
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	margin-bottom: 1.2rem;
	letter-spacing: 0.03em;

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
	color: ${props => props.theme.colors.textDimmed};
	font-weight: 300;
	font-size: 0.9rem;

	@media (min-width: 768px) {
		padding: 0.7rem 0;
		font-size: 1rem;
	}

	svg {
		color: ${props => props.theme.colors.success};
		flex-shrink: 0;
	}
`

const ShowMoreBtn = styled.button`
	background: none;
	border: none;
	color: ${props => props.theme.colors.accent};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.9rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.8rem;
	padding: 0;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	@media (min-width: 768px) {
		font-size: 0.95rem;
		margin-top: 1rem;
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
	display: flex;
	flex-direction: column;
	flex: 1;
`

const ExtraName = styled.span`
	color: ${props => props.theme.colors.text};
	font-size: 0.85rem;

	@media (min-width: 768px) {
		font-size: 0.95rem;
	}
`

const ExtraDesc = styled.span`
	color: ${props => props.theme.colors.textMuted};
	font-size: 0.75rem;
	margin-top: 0.2rem;

	@media (min-width: 768px) {
		font-size: 0.8rem;
	}
`

const ExtraPrice = styled.span`
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

const PriceBlock = styled(GlassCard)`
	text-align: center;
`

const PriceTitle = styled.div`
	color: ${props => props.theme.colors.textDimmed};
	margin-bottom: 0.5rem;
	font-size: 0.85rem;
`

const PriceValue = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 2rem;
	font-weight: 700;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 0.5rem;

	small {
		font-size: 0.85rem;
		color: ${props => props.theme.colors.textMuted};
		display: block;
	}

	@media (min-width: 768px) {
		font-size: 2.5rem;
	}
`

const PriceBreakdown = styled.div`
	text-align: left;
	padding: 1rem 0;
	border-top: 1px solid ${props => props.theme.colors.border};
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
	flex-direction: row;
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
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.5rem;
	margin-bottom: 0.5rem;

	@media (min-width: 768px) {
		font-size: 2rem;
	}
`

const DCCategoryDesc = styled.p`
	color: ${props => props.theme.colors.textDimmed};
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
	transition: all 0.3s;
	display: flex;
	flex-direction: column;
	height: 100%;

	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
		transform: translateY(-4px);
	}
`

const DCIcon = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid ${props => props.theme.colors.borderAccent};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 1rem;
	flex-shrink: 0;

	@media (min-width: 768px) {
		width: 50px;
		height: 50px;
		margin-bottom: 1.2rem;
	}
`

const DCName = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.1rem;
	margin-bottom: 0.5rem;

	@media (min-width: 768px) {
		font-size: 1.3rem;
	}
`

const DCDesc = styled.p`
	color: ${props => props.theme.colors.textDimmed};
	font-weight: 300;
	line-height: 1.6;
	margin-bottom: 0.8rem;
	font-size: 0.85rem;

	@media (min-width: 768px) {
		font-size: 0.95rem;
	}
`

const DCFeatures = styled.ul`
	list-style: none;
	margin-bottom: 0;
	flex: 1;
`

const DCFeature = styled.li`
	color: ${props => props.theme.colors.textMuted};
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
		background: ${props => props.theme.colors.accent};
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
	border-top: 1px solid ${props => props.theme.colors.border};
	flex-wrap: wrap;
	gap: 0.5rem;
`

const DCPrice = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${props => props.theme.colors.accent};
	font-weight: 600;

	small {
		font-size: 0.8rem;
		color: ${props => props.theme.colors.textMuted};
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
		font-family: ${props => props.theme.fonts.primary};
		font-size: 1rem;
		color: ${props => props.theme.colors.text};
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
	background: ${props =>
		props.active ? props.theme.colors.surface : 'transparent'};
	border: 1px solid
		${props =>
			props.active
				? props.theme.colors.borderAccent
				: props.theme.colors.border};
	color: ${props =>
		props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.85rem;
	letter-spacing: 0.04em;
	cursor: pointer;
	transition: all 0.3s;
	flex: 1;
	min-width: 130px;
	white-space: nowrap;

	&:hover {
		border-color: ${props => props.theme.colors.borderAccent};
		color: ${props => props.theme.colors.text};
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
	color: ${props => props.theme.colors.accent};
	gap: 1rem;
	font-family: ${props => props.theme.fonts.primary};
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
	clothing:
		'Профессиональная химчистка одежды из любых тканей. Бережное удаление пятен, запахов, восстановление цвета и формы.',
	curtains:
		'Чистка штор, гардин, тюля и домашнего текстиля. Снятие, чистка и навеска включены в стоимость.',
	furniture:
		'Глубокая чистка мягкой и корпусной мебели. Удаление сложных пятен, запахов, аллергенов и бактерий.',
	carpets:
		'Профессиональная чистка ковров и ковровых покрытий. Выезд, вывоз, чистка в цеху, доставка обратно.',
	shoes:
		'Восстановление и глубокая чистка обуви из любых материалов. Возвращаем первоначальный вид.',
	laundry:
		'Полный цикл: сортировка, стирка с правильным режимом, сушка, глажка. Складные вещи или на плечиках.',
}

const Services = () => {
	const { addToCart } = useCart()
	const { services: firebaseServices, loading: servicesLoading } = useServices()

	const [mainTab, setMainTab] = useState('cleaning')
	const [cleaningSubTab, setCleaningSubTab] = useState('regular')
	const [rooms, setRooms] = useState(1)
	const [extras, setExtras] = useState([])
	const [showAllIncluded, setShowAllIncluded] = useState(false)
	const [dcCategory, setDcCategory] = useState('clothing')
	const [dcQuantities, setDcQuantities] = useState({})

	// Хардкод-услуги для уборки (основные типы)
	const cleaningTypes = {
		regular: {
			name: 'Регулярная',
			pricePerRoom: 3500,
			unit: 'комнатная квартира',
			included: [
				'Влажная уборка полов и плинтусов',
				'Протирка всех доступных поверхностей от пыли',
				'Уборка кухни (плита, мойка, столешницы)',
				'Чистка санузла (ванна, унитаз, раковина)',
				'Вынос мусора',
				'Мытьё зеркал и стеклянных поверхностей',
				'Чистка розеток и выключателей',
				'Протирка дверей и дверных ручек',
				'Уборка под кроватями и за мебелью',
			],
			extras: [
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
					id: 'microwave',
					name: 'Чистка микроволновки',
					price: 400,
					desc: 'внутри и снаружи',
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
			],
		},
		general: {
			name: 'Генеральная',
			pricePerRoom: 8000,
			unit: 'комнатная квартира',
			included: [
				'Всё из регулярной уборки',
				'Мытьё окон с двух сторон',
				'Чистка вытяжки и кухонной техники',
				'Уборка внутри всех шкафов и ящиков',
				'Влажная чистка радиаторов отопления',
				'Удаление накипи с сантехники',
				'Чистка межплиточных швов',
				'Мытьё осветительных приборов',
				'Чистка плинтусов и карнизов',
				'Влажная чистка матраса',
				'Дезинфекция санузла',
				'Полировка зеркал и хромированных поверхностей',
			],
			extras: [
				{
					id: 'windows_hard',
					name: 'Мытьё окон (сложный доступ)',
					price: 2500,
					desc: 'за окно, высота, сложная конструкция',
				},
				{
					id: 'fridge_defrost',
					name: 'Разморозка и мытьё холодильника',
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
					desc: 'внешняя и внутренняя очистка',
				},
				{
					id: 'balcony_deep',
					name: 'Генеральная уборка балкона',
					price: 2500,
					desc: 'включая мытьё рам и остекления',
				},
				{
					id: 'kitchen_cabinets',
					name: 'Уборка кухонных шкафов',
					price: 2000,
					desc: 'все шкафы, включая посуду',
				},
				{
					id: 'walls',
					name: 'Мытьё стен',
					price: 3000,
					desc: 'все стены, без обоев под покраску',
				},
			],
		},
		afterRepair: {
			name: 'После ремонта',
			pricePerRoom: 12000,
			unit: 'комнатная квартира',
			included: [
				'Удаление строительной пыли со всех поверхностей',
				'Влажная уборка полов (3 цикла до идеальной чистоты)',
				'Очистка оконных рам и стёкол от следов ремонта',
				'Уборка осветительных приборов',
				'Очистка розеток и выключателей',
				'Вынос строительного мусора (до 20 кг)',
				'Финальная полировка всех поверхностей',
				'Очистка радиаторов от строительной пыли',
				'Мытьё дверей и дверных коробок',
			],
			extras: [
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
					name: 'Глубокая очистка швов',
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
					desc: 'машинная полировка твёрдых покрытий',
				},
			],
		},
	}

	// Собираем дополнительные услуги из Firebase (только для уборки)
	const getCleaningExtrasFromFirebase = type => {
		if (servicesLoading) return cleaningTypes[type]?.extras || []

		const firebaseExtras = firebaseServices
			.filter(s => s.category === 'cleaning' && s.type === type)
			.map(s => ({
				id: s.id,
				name: s.name,
				price: s.price,
				desc: s.unit || '',
			}))

		// Объединяем хардкод и Firebase
		const hardcodedExtras = cleaningTypes[type]?.extras || []
		const hardcodedNames = new Set(hardcodedExtras.map(e => e.name))
		const uniqueFirebaseExtras = firebaseExtras.filter(
			e => !hardcodedNames.has(e.name),
		)

		return [...hardcodedExtras, ...uniqueFirebaseExtras]
	}

	// Собираем химчистку из Firebase
	const getDryCleaningFromFirebase = () => {
		const dcServices = firebaseServices.filter(
			s => s.category === 'drycleaning',
		)

		// Все возможные категории химчистки
		const allCategories = {
			clothing: {
				name: 'Одежда',
				icon: Shirt,
				desc: 'Профессиональная химчистка одежды из любых тканей. Бережное удаление пятен, запахов, восстановление цвета и формы.',
			},
			curtains: {
				name: 'Шторы и текстиль',
				icon: Wind,
				desc: 'Чистка штор, гардин, тюля и домашнего текстиля. Снятие, чистка и навеска включены в стоимость.',
			},
			furniture: {
				name: 'Мебель',
				icon: Sofa,
				desc: 'Глубокая чистка мягкой и корпусной мебели. Удаление сложных пятен, запахов, аллергенов и бактерий.',
			},
			carpets: {
				name: 'Ковры',
				icon: Sparkles,
				desc: 'Профессиональная чистка ковров и ковровых покрытий. Выезд, вывоз, чистка в цеху, доставка обратно.',
			},
			shoes: {
				name: 'Обувь',
				icon: Footprints,
				desc: 'Восстановление и глубокая чистка обуви из любых материалов. Возвращаем первоначальный вид.',
			},
			laundry: {
				name: 'Стирка и глажка',
				icon: Shirt,
				desc: 'Полный цикл: сортировка, стирка с правильным режимом, сушка, глажка. Складные вещи или на плечиках.',
			},
		}

		const grouped = {}

		// Сначала создаём все категории (даже пустые)
		Object.entries(allCategories).forEach(([key, val]) => {
			grouped[key] = {
				...val,
				items: [],
			}
		})

		// Заполняем услугами из Firebase
		dcServices.forEach(service => {
			const category = service.type || 'clothing'
			if (grouped[category]) {
				grouped[category].items.push({
					id: service.id,
					name: service.name,
					price: service.price,
					unit: service.unit || 'за изделие',
					features: service.features || [],
				})
			}
		})

		return grouped
	}

	const getCategoryName = key => {
		const names = {
			clothing: 'Одежда',
			curtains: 'Шторы и текстиль',
			furniture: 'Мебель',
			carpets: 'Ковры',
			shoes: 'Обувь',
			laundry: 'Стирка и глажка',
		}
		return names[key] || key
	}

	const firebaseDryCleaning = getDryCleaningFromFirebase()

	const currentCleaning = cleaningTypes[cleaningSubTab]
	const currentExtras = getCleaningExtrasFromFirebase(cleaningSubTab)
	const basePrice = currentCleaning.pricePerRoom * rooms
	const extrasTotal = extras.reduce((sum, id) => {
		const item = currentExtras.find(e => e.id === id)
		return sum + (item ? item.price : 0)
	}, 0)
	const totalPrice = basePrice + extrasTotal

	const handleAddCleaning = () => {
		const service = {
			id: Date.now(),
			title: `Уборка: ${currentCleaning.name} (${rooms}-комнатная)`,
			price: totalPrice,
			quantity: 1,
			details: `Тип: ${currentCleaning.name} | Комнат: ${rooms} | Дополнительно: ${extras.length > 0 ? extras.map(id => currentExtras.find(e => e.id === id)?.name).join(', ') : 'нет'}`,
		}
		addToCart(service)
		setExtras([])
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

	const visibleIncluded = showAllIncluded
		? currentCleaning.included
		: currentCleaning.included.slice(0, 6)

	const dcCategories =
		Object.keys(firebaseDryCleaning).length > 0
			? Object.entries(firebaseDryCleaning)
			: []

	const currentDC = firebaseDryCleaning[dcCategory] || {
		name: getCategoryName(dcCategory),
		icon: categoryIcons[dcCategory] || Sparkles,
		desc: categoryDescriptions[dcCategory] || '',
		items: [],
	}

	if (servicesLoading) {
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
						{Object.entries(cleaningTypes).map(([key, val]) => (
							<SubTab
								key={key}
								active={cleaningSubTab === key}
								onClick={() => {
									setCleaningSubTab(key)
									setExtras([])
									setShowAllIncluded(false)
								}}
							>
								{val.name}
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
									{visibleIncluded.map((item, i) => (
										<IncludedItem key={i}>
											<Check size={16} />
											{item}
										</IncludedItem>
									))}
								</IncludedList>
								{currentCleaning.included.length > 6 && (
									<ShowMoreBtn
										onClick={() => setShowAllIncluded(!showAllIncluded)}
									>
										{showAllIncluded ? (
											<>
												Свернуть <ChevronUp size={16} />
											</>
										) : (
											<>
												Подробнее <ChevronDown size={16} />
											</>
										)}
									</ShowMoreBtn>
								)}
							</InfoBlock>

							<InfoBlock>
								<BlockTitle>Дополнительные услуги</BlockTitle>
								<ExtraList>
									{currentExtras.map(extra => (
										<ExtraItem
											key={extra.id}
											checked={extras.includes(extra.id)}
										>
											<ExtraInfo>
												<ExtraName>{extra.name}</ExtraName>
												{extra.desc && <ExtraDesc>{extra.desc}</ExtraDesc>}
											</ExtraInfo>
											<ExtraPrice>+{extra.price.toLocaleString()} P</ExtraPrice>
											<HiddenCheckbox
												type='checkbox'
												checked={extras.includes(extra.id)}
												onChange={() => {
													setExtras(prev =>
														prev.includes(extra.id)
															? prev.filter(e => e !== extra.id)
															: [...prev, extra.id],
													)
												}}
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
									<small>
										{rooms}-{currentCleaning.unit}
									</small>
								</PriceValue>
								<PriceBreakdown>
									<BreakdownRow>
										<span>Базовая цена ({rooms} комн.)</span>
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
						{dcCategories.map(([key, val]) => (
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
						{dcCategories.length === 0 && (
							<p style={{ color: '#8B8478', padding: '1rem' }}>Нет категорий</p>
						)}
					</DryCleaningSidebar>

					<DryCleaningContent>
						<DCCategoryTitle>{currentDC.name}</DCCategoryTitle>
						<DCCategoryDesc>{currentDC.desc}</DCCategoryDesc>

						<DryCleaningGrid>
							{currentDC.items.length > 0 ? (
								currentDC.items.map(item => (
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
											<DCPrice>
												{item.price.toLocaleString()} P{' '}
												<small>/ {item.unit.split(' ').pop()}</small>
											</DCPrice>
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
								))
							) : (
								<p
									style={{
										color: '#8B8478',
										gridColumn: '1 / -1',
										textAlign: 'center',
										padding: '3rem',
									}}
								>
									Нет услуг в этой категории
								</p>
							)}
						</DryCleaningGrid>
					</DryCleaningContent>
				</DryCleaningWrapper>
			)}
		</Container>
	)
}

export default Services
