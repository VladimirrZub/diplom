import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react'
import { db } from '../firebase/config'
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	writeBatch,
} from 'firebase/firestore'

const ServicesContext = createContext()

export const useServices = () => {
	const context = useContext(ServicesContext)
	if (!context)
		throw new Error('useServices must be used within ServicesProvider')
	return context
}

const defaultServices = [
	// ====== УБОРКА - БАЗОВЫЕ ТИПЫ ======
	{
		name: 'Регулярная уборка',
		category: 'cleaning',
		type: 'base',
		subtype: 'regular',
		price: 3500,
		unit: '1-комнатная квартира',
		isBase: true,
		features: [
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
	},
	{
		name: 'Генеральная уборка',
		category: 'cleaning',
		type: 'base',
		subtype: 'general',
		price: 8000,
		unit: '1-комнатная квартира',
		isBase: true,
		features: [
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
	},
	{
		name: 'Уборка после ремонта',
		category: 'cleaning',
		type: 'base',
		subtype: 'afterRepair',
		price: 12000,
		unit: '1-комнатная квартира',
		isBase: true,
		features: [
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
	},

	// ====== УБОРКА - ДОПЫ (РЕГУЛЯРНАЯ) ======
	{
		name: 'Мытьё окон',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 1500,
		unit: 'за окно, с двух сторон',
		features: ['Мытьё стёкол', 'Мытьё рам', 'Мытьё подоконников'],
	},
	{
		name: 'Мытьё холодильника',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 800,
		unit: 'внутри и снаружи',
		features: ['Разморозка', 'Мытьё полок', 'Мытьё уплотнителей'],
	},
	{
		name: 'Чистка духовки',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 1200,
		unit: 'включая противни и решётки',
		features: ['Очистка камеры', 'Чистка противней', 'Чистка решёток'],
	},
	{
		name: 'Чистка микроволновки',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 400,
		unit: 'внутри и снаружи',
		features: ['Мытьё камеры', 'Чистка поддона', 'Протирка корпуса'],
	},
	{
		name: 'Уборка балкона',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 1000,
		unit: 'влажная уборка',
		features: ['Мытьё пола', 'Протирка окон', 'Удаление пыли'],
	},
	{
		name: 'Уборка внутри шкафов',
		category: 'cleaning',
		type: 'extra',
		subtype: 'regular',
		price: 600,
		unit: 'за шкаф',
		features: ['Протирка полок', 'Удаление пыли', 'Обработка углов'],
	},

	// ====== УБОРКА - ДОПЫ (ГЕНЕРАЛЬНАЯ) ======
	{
		name: 'Мытьё окон (сложный доступ)',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 2500,
		unit: 'за окно',
		features: ['Работа на высоте', 'Сложная конструкция', 'Спецснаряжение'],
	},
	{
		name: 'Разморозка и мытьё холодильника',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 1500,
		unit: 'полная разморозка',
		features: ['Полная разморозка', 'Мытьё отсеков', 'Сушка'],
	},
	{
		name: 'Паровая чистка духовки',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 2000,
		unit: 'глубокая очистка паром',
		features: ['Паровой удар', 'Удаление нагара', 'Дезинфекция'],
	},
	{
		name: 'Чистка кондиционера',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 1800,
		unit: 'внешняя и внутренняя',
		features: ['Чистка фильтров', 'Обработка испарителя', 'Дезинфекция'],
	},
	{
		name: 'Генеральная уборка балкона',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 2500,
		unit: 'мытьё рам и остекления',
		features: ['Мытьё рам', 'Чистка остекления', 'Уборка пола'],
	},
	{
		name: 'Уборка кухонных шкафов',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 2000,
		unit: 'все шкафы с посудой',
		features: ['Мытьё полок', 'Протирка посуды', 'Организация'],
	},
	{
		name: 'Мытьё стен',
		category: 'cleaning',
		type: 'extra',
		subtype: 'general',
		price: 3000,
		unit: 'все стены',
		features: ['Влажная уборка', 'Удаление пятен', 'Без разводов'],
	},

	// ====== УБОРКА - ДОПЫ (ПОСЛЕ РЕМОНТА) ======
	{
		name: 'Вынос крупного мусора',
		category: 'cleaning',
		type: 'extra',
		subtype: 'afterRepair',
		price: 3000,
		unit: 'до 100 кг',
		features: ['Мешки включены', 'Погрузка', 'Вынос'],
	},
	{
		name: 'Удаление следов краски',
		category: 'cleaning',
		type: 'extra',
		subtype: 'afterRepair',
		price: 5000,
		unit: 'с полов, окон, дверей',
		features: ['Спецсредства', 'Бережное удаление', 'Без повреждений'],
	},
	{
		name: 'Глубокая очистка швов',
		category: 'cleaning',
		type: 'extra',
		subtype: 'afterRepair',
		price: 4000,
		unit: 'межплиточные швы',
		features: ['Химическая очистка', 'Восстановление цвета', 'Защита'],
	},
	{
		name: 'Чистка вентиляции',
		category: 'cleaning',
		type: 'extra',
		subtype: 'afterRepair',
		price: 2500,
		unit: 'очистка каналов',
		features: ['Очистка каналов', 'Удаление пыли', 'Проверка тяги'],
	},
	{
		name: 'Полировка полов',
		category: 'cleaning',
		type: 'extra',
		subtype: 'afterRepair',
		price: 3500,
		unit: 'машинная полировка',
		features: ['Полировка', 'Защитное покрытие', 'Блеск'],
	},

	// ====== ХИМЧИСТКА - ОДЕЖДА ======
	{
		name: 'Пальто / куртка',
		category: 'drycleaning',
		type: 'clothing',
		price: 2500,
		unit: 'за изделие',
		features: [
			'Деликатная чистка',
			'Удаление пятен',
			'Восстановление пропитки',
		],
	},
	{
		name: 'Костюм',
		category: 'drycleaning',
		type: 'clothing',
		price: 1800,
		unit: 'за комплект',
		features: [
			'Чистка пиджака и брюк',
			'Сохранение формы',
			'Обработка подкладки',
		],
	},
	{
		name: 'Платье вечернее',
		category: 'drycleaning',
		type: 'clothing',
		price: 2200,
		unit: 'за изделие',
		features: ['Ручная обработка', 'Удаление пятен', 'Сохранение декора'],
	},
	{
		name: 'Блуза / рубашка',
		category: 'drycleaning',
		type: 'clothing',
		price: 700,
		unit: 'за изделие',
		features: ['Чистка воротника', 'Глажка', 'Упаковка'],
	},
	{
		name: 'Трикотаж / свитер',
		category: 'drycleaning',
		type: 'clothing',
		price: 900,
		unit: 'за изделие',
		features: ['Бережная чистка', 'Сохранение формы', 'Антистатик'],
	},
	{
		name: 'Юбка',
		category: 'drycleaning',
		type: 'clothing',
		price: 800,
		unit: 'за изделие',
		features: ['Чистка подкладки', 'Сохранение складок', 'Глажка'],
	},

	// ====== ХИМЧИСТКА - ШТОРЫ ======
	{
		name: 'Тюль (до 3 м)',
		category: 'drycleaning',
		type: 'curtains',
		price: 900,
		unit: 'за полотно',
		features: ['Деликатная стирка', 'Сушка', 'Глажка'],
	},
	{
		name: 'Портьеры (до 3 м)',
		category: 'drycleaning',
		type: 'curtains',
		price: 1800,
		unit: 'за полотно',
		features: ['Чистка по типу ткани', 'Снятие/навеска', 'От клещей'],
	},
	{
		name: 'Блэкаут шторы',
		category: 'drycleaning',
		type: 'curtains',
		price: 2200,
		unit: 'за полотно',
		features: ['Спецчистка', 'Сохранение свойств', 'Снятие/навеска'],
	},
	{
		name: 'Плед / покрывало',
		category: 'drycleaning',
		type: 'curtains',
		price: 1500,
		unit: 'за изделие',
		features: ['Глубокая чистка', 'Удаление катышков', 'Антистатик'],
	},
	{
		name: 'Декоративные подушки',
		category: 'drycleaning',
		type: 'curtains',
		price: 600,
		unit: 'за штуку',
		features: ['Чистка чехла', 'Обработка наполнителя', 'Форма'],
	},

	// ====== ХИМЧИСТКА - МЕБЕЛЬ ======
	{
		name: 'Диван 2-местный',
		category: 'drycleaning',
		type: 'furniture',
		price: 3500,
		unit: 'за изделие',
		features: ['Экстракция', 'Удаление пятен', 'Дезодорация', 'Антибактерии'],
	},
	{
		name: 'Диван 3-местный',
		category: 'drycleaning',
		type: 'furniture',
		price: 5000,
		unit: 'за изделие',
		features: ['Экстракция', 'Удаление пятен', 'Дезодорация', 'Защита'],
	},
	{
		name: 'Кресло',
		category: 'drycleaning',
		type: 'furniture',
		price: 2000,
		unit: 'за изделие',
		features: ['Чистка обивки', 'Подлокотники', 'Дезодорация'],
	},
	{
		name: 'Матрас',
		category: 'drycleaning',
		type: 'furniture',
		price: 3000,
		unit: 'за изделие',
		features: ['Глубокая чистка', 'От клещей', 'УФ-обработка', 'Дезодорация'],
	},
	{
		name: 'Стул (обивка)',
		category: 'drycleaning',
		type: 'furniture',
		price: 800,
		unit: 'за штуку',
		features: ['Чистка сиденья', 'Удаление пятен', 'Сушка'],
	},
	{
		name: 'Изголовье кровати',
		category: 'drycleaning',
		type: 'furniture',
		price: 1500,
		unit: 'за изделие',
		features: ['Чистка обивки', 'Удаление пятен', 'Антистатик'],
	},

	// ====== ХИМЧИСТКА - КОВРЫ ======
	{
		name: 'Ковёр до 6 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 1800,
		unit: 'за изделие',
		features: ['Глубокая чистка', 'Вывоз/доставка', 'Сушка', 'Антистатик'],
	},
	{
		name: 'Ковёр 6-12 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 3500,
		unit: 'за изделие',
		features: ['Глубокая чистка', 'Вывоз/доставка', 'Сушка', 'Защита'],
	},
	{
		name: 'Ковёр от 12 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 6000,
		unit: 'за изделие',
		features: ['Глубокая чистка', 'Вывоз/доставка', 'Сушка', 'Восстановление'],
	},
	{
		name: 'Шерстяной ковёр',
		category: 'drycleaning',
		type: 'carpets',
		price: 2500,
		unit: 'за м2',
		features: [
			'Деликатная чистка',
			'Сохранение цвета',
			'Ручная',
			'Кондиционер',
		],
	},
	{
		name: 'Шёлковый ковёр',
		category: 'drycleaning',
		type: 'carpets',
		price: 5000,
		unit: 'за м2',
		features: [
			'Ручная чистка',
			'pH-нейтрально',
			'Сохранение блеска',
			'Индивидуально',
		],
	},

	// ====== ХИМЧИСТКА - ОБУВЬ ======
	{
		name: 'Кожаная обувь',
		category: 'drycleaning',
		type: 'shoes',
		price: 1800,
		unit: 'за пару',
		features: [
			'Глубокая чистка',
			'Восстановление цвета',
			'Полировка',
			'Защита',
		],
	},
	{
		name: 'Замшевая обувь',
		category: 'drycleaning',
		type: 'shoes',
		price: 2200,
		unit: 'за пару',
		features: [
			'Сухая чистка',
			'Восстановление ворса',
			'Защита от влаги',
			'Пятна',
		],
	},
	{
		name: 'Кроссовки / кеды',
		category: 'drycleaning',
		type: 'shoes',
		price: 1500,
		unit: 'за пару',
		features: ['Глубокая чистка', 'Отбеливание', 'Дезодорация', 'Шнурки'],
	},
	{
		name: 'Сапоги / ботинки',
		category: 'drycleaning',
		type: 'shoes',
		price: 2500,
		unit: 'за пару',
		features: ['Полная чистка', 'Восстановление кожи', 'Защита', 'Полировка'],
	},

	// ====== ХИМЧИСТКА - СТИРКА И ГЛАЖКА ======
	{
		name: 'Стирка + глажка (до 5 кг)',
		category: 'drycleaning',
		type: 'laundry',
		price: 1500,
		unit: 'за комплект',
		features: ['Сортировка', 'Стирка', 'Сушка', 'Глажка'],
	},
	{
		name: 'Стирка + глажка (до 10 кг)',
		category: 'drycleaning',
		type: 'laundry',
		price: 2500,
		unit: 'за комплект',
		features: ['Сортировка', 'Стирка', 'Сушка', 'Глажка'],
	},
	{
		name: 'Деликатная стирка',
		category: 'drycleaning',
		type: 'laundry',
		price: 2000,
		unit: 'до 5 кг',
		features: ['Ручная стирка', 'Спецсредства', 'Сушка', 'Глажка'],
	},
	{
		name: 'Только глажка',
		category: 'drycleaning',
		type: 'laundry',
		price: 1000,
		unit: 'до 5 кг',
		features: ['Профоборудование', 'На плечиках', 'Упаковка'],
	},
	{
		name: 'Постельное бельё',
		category: 'drycleaning',
		type: 'laundry',
		price: 800,
		unit: 'за комплект',
		features: ['Стирка', 'Глажка', 'Складывание'],
	},
	{
		name: 'Полотенца / халаты',
		category: 'drycleaning',
		type: 'laundry',
		price: 600,
		unit: 'до 5 шт',
		features: ['Стирка', 'Кондиционер', 'Сушка', 'Складывание'],
	},
]

export const ServicesProvider = ({ children }) => {
	const [services, setServices] = useState([])
	const [loading, setLoading] = useState(true)
	const initialized = useRef(false)

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true
			initializeServices()
		}
	}, [])

	const initializeServices = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'services'))

			if (querySnapshot.empty) {
				const batch = writeBatch(db)
				defaultServices.forEach(service => {
					const docRef = doc(collection(db, 'services'))
					batch.set(docRef, {
						...service,
						createdAt: new Date().toISOString(),
					})
				})
				await batch.commit()
				console.log('Default services added')
			}

			await fetchServices()
		} catch (error) {
			console.error('Error:', error)
			setLoading(false)
		}
	}

	const fetchServices = async () => {
		try {
			const snapshot = await getDocs(collection(db, 'services'))
			setServices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setLoading(false)
		}
	}

	const addService = async data => {
		await addDoc(collection(db, 'services'), {
			...data,
			createdAt: new Date().toISOString(),
		})
		await fetchServices()
	}

	const updateService = async (id, data) => {
		await updateDoc(doc(db, 'services', id), {
			...data,
			updatedAt: new Date().toISOString(),
		})
		await fetchServices()
	}

	const deleteService = async id => {
		await deleteDoc(doc(db, 'services', id))
		await fetchServices()
	}

	return (
		<ServicesContext.Provider
			value={{
				services,
				loading,
				addService,
				updateService,
				deleteService,
				fetchServices,
			}}
		>
			{children}
		</ServicesContext.Provider>
	)
}
