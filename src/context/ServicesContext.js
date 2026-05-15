import React, { createContext, useContext, useState, useEffect } from 'react'
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
	// ====== УБОРКА - РЕГУЛЯРНАЯ ======
	{
		name: 'Мытьё окон',
		category: 'cleaning',
		type: 'regular',
		price: 1500,
		unit: 'за окно, с двух сторон',
		features: ['Мытьё стёкол', 'Мытьё рам', 'Мытьё подоконников'],
	},
	{
		name: 'Мытьё холодильника',
		category: 'cleaning',
		type: 'regular',
		price: 800,
		unit: 'внутри и снаружи',
		features: ['Разморозка', 'Мытьё полок', 'Мытьё уплотнителей'],
	},
	{
		name: 'Чистка духовки',
		category: 'cleaning',
		type: 'regular',
		price: 1200,
		unit: 'включая противни и решётки',
		features: [
			'Очистка внутренней камеры',
			'Чистка противней',
			'Чистка решёток',
		],
	},
	{
		name: 'Чистка микроволновки',
		category: 'cleaning',
		type: 'regular',
		price: 400,
		unit: 'внутри и снаружи',
		features: ['Мытьё внутренней камеры', 'Чистка поддона', 'Протирка корпуса'],
	},
	{
		name: 'Уборка балкона',
		category: 'cleaning',
		type: 'regular',
		price: 1000,
		unit: 'влажная уборка, протирка окон',
		features: ['Мытьё пола', 'Протирка окон', 'Удаление пыли'],
	},
	{
		name: 'Уборка внутри шкафов',
		category: 'cleaning',
		type: 'regular',
		price: 600,
		unit: 'за шкаф, без вещей',
		features: ['Протирка полок', 'Удаление пыли', 'Обработка углов'],
	},

	// ====== УБОРКА - ГЕНЕРАЛЬНАЯ ======
	{
		name: 'Мытьё окон (сложный доступ)',
		category: 'cleaning',
		type: 'general',
		price: 2500,
		unit: 'за окно, высота, сложная конструкция',
		features: ['Работа на высоте', 'Сложная конструкция', 'Спецснаряжение'],
	},
	{
		name: 'Разморозка и мытьё холодильника',
		category: 'cleaning',
		type: 'general',
		price: 1500,
		unit: 'полная разморозка и очистка',
		features: ['Полная разморозка', 'Мытьё всех отсеков', 'Сушка'],
	},
	{
		name: 'Паровая чистка духовки',
		category: 'cleaning',
		type: 'general',
		price: 2000,
		unit: 'глубокая очистка паром',
		features: ['Паровой удар', 'Удаление нагара', 'Дезинфекция'],
	},
	{
		name: 'Чистка кондиционера',
		category: 'cleaning',
		type: 'general',
		price: 1800,
		unit: 'внешняя и внутренняя очистка',
		features: ['Чистка фильтров', 'Обработка испарителя', 'Дезинфекция'],
	},
	{
		name: 'Генеральная уборка балкона',
		category: 'cleaning',
		type: 'general',
		price: 2500,
		unit: 'включая мытьё рам и остекления',
		features: ['Мытьё рам', 'Чистка остекления', 'Уборка пола'],
	},
	{
		name: 'Уборка кухонных шкафов',
		category: 'cleaning',
		type: 'general',
		price: 2000,
		unit: 'все шкафы, включая посуду',
		features: ['Мытьё полок', 'Протирка посуды', 'Организация'],
	},
	{
		name: 'Мытьё стен',
		category: 'cleaning',
		type: 'general',
		price: 3000,
		unit: 'все стены, без обоев под покраску',
		features: ['Влажная уборка', 'Удаление пятен', 'Без разводов'],
	},

	// ====== УБОРКА - ПОСЛЕ РЕМОНТА ======
	{
		name: 'Вынос крупного мусора',
		category: 'cleaning',
		type: 'afterRepair',
		price: 3000,
		unit: 'до 100 кг, мешки включены',
		features: ['Мешки включены', 'Погрузка', 'Вынос'],
	},
	{
		name: 'Удаление следов краски',
		category: 'cleaning',
		type: 'afterRepair',
		price: 5000,
		unit: 'с полов, окон, дверей',
		features: ['Спецсредства', 'Бережное удаление', 'Без повреждений'],
	},
	{
		name: 'Глубокая очистка швов',
		category: 'cleaning',
		type: 'afterRepair',
		price: 4000,
		unit: 'химическая очистка межплиточных швов',
		features: ['Химическая очистка', 'Восстановление цвета', 'Защита'],
	},
	{
		name: 'Чистка вентиляции',
		category: 'cleaning',
		type: 'afterRepair',
		price: 2500,
		unit: 'профессиональная очистка каналов',
		features: ['Очистка каналов', 'Удаление пыли', 'Проверка тяги'],
	},
	{
		name: 'Полировка полов',
		category: 'cleaning',
		type: 'afterRepair',
		price: 3500,
		unit: 'машинная полировка твёрдых покрытий',
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
			'Восстановление водоотталкивающей пропитки',
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
		features: [
			'Ручная обработка деликатных тканей',
			'Удаление сложных пятен',
			'Сохранение декора',
		],
	},
	{
		name: 'Блуза / рубашка',
		category: 'drycleaning',
		type: 'clothing',
		price: 700,
		unit: 'за изделие',
		features: ['Чистка воротника и манжет', 'Глажка', 'Упаковка на плечиках'],
	},
	{
		name: 'Трикотаж / свитер',
		category: 'drycleaning',
		type: 'clothing',
		price: 900,
		unit: 'за изделие',
		features: [
			'Бережная чистка',
			'Сохранение формы',
			'Антистатическая обработка',
		],
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
		features: ['Деликатная стирка', 'Сушка в расправленном виде', 'Глажка'],
	},
	{
		name: 'Портьеры (до 3 м)',
		category: 'drycleaning',
		type: 'curtains',
		price: 1800,
		unit: 'за полотно',
		features: [
			'Чистка с учётом типа ткани',
			'Снятие и навеска',
			'Обработка от пылевых клещей',
		],
	},
	{
		name: 'Блэкаут шторы',
		category: 'drycleaning',
		type: 'curtains',
		price: 2200,
		unit: 'за полотно',
		features: [
			'Специальная чистка',
			'Сохранение светонепроницаемости',
			'Снятие и навеска',
		],
	},
	{
		name: 'Плед / покрывало',
		category: 'drycleaning',
		type: 'curtains',
		price: 1500,
		unit: 'за изделие',
		features: [
			'Глубокая чистка',
			'Удаление катышков',
			'Антистатическая обработка',
		],
	},
	{
		name: 'Декоративные подушки',
		category: 'drycleaning',
		type: 'curtains',
		price: 600,
		unit: 'за штуку',
		features: ['Чистка чехла', 'Обработка наполнителя', 'Восстановление формы'],
	},

	// ====== ХИМЧИСТКА - МЕБЕЛЬ ======
	{
		name: 'Диван 2-местный',
		category: 'drycleaning',
		type: 'furniture',
		price: 3500,
		unit: 'за изделие',
		features: [
			'Глубокая экстракция',
			'Удаление пятен',
			'Дезодорация',
			'Антибактериальная обработка',
		],
	},
	{
		name: 'Диван 3-местный',
		category: 'drycleaning',
		type: 'furniture',
		price: 5000,
		unit: 'за изделие',
		features: [
			'Глубокая экстракция',
			'Удаление пятен',
			'Дезодорация',
			'Защитное покрытие',
		],
	},
	{
		name: 'Кресло',
		category: 'drycleaning',
		type: 'furniture',
		price: 2000,
		unit: 'за изделие',
		features: ['Чистка обивки', 'Обработка подлокотников', 'Дезодорация'],
	},
	{
		name: 'Матрас',
		category: 'drycleaning',
		type: 'furniture',
		price: 3000,
		unit: 'за изделие',
		features: [
			'Глубокая чистка',
			'Удаление пылевых клещей',
			'УФ-обработка',
			'Дезодорация',
		],
	},
	{
		name: 'Стул (обивка)',
		category: 'drycleaning',
		type: 'furniture',
		price: 800,
		unit: 'за штуку',
		features: ['Чистка сиденья и спинки', 'Удаление пятен', 'Быстрая сушка'],
	},
	{
		name: 'Изголовье кровати',
		category: 'drycleaning',
		type: 'furniture',
		price: 1500,
		unit: 'за изделие',
		features: ['Чистка обивки', 'Удаление пятен', 'Антистатическая обработка'],
	},

	// ====== ХИМЧИСТКА - КОВРЫ ======
	{
		name: 'Ковёр до 6 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 1800,
		unit: 'за изделие',
		features: [
			'Глубокая чистка',
			'Вывоз и доставка',
			'Сушка в цеху',
			'Антистатическая обработка',
		],
	},
	{
		name: 'Ковёр 6-12 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 3500,
		unit: 'за изделие',
		features: [
			'Глубокая чистка',
			'Вывоз и доставка',
			'Сушка в цеху',
			'Защитная пропитка',
		],
	},
	{
		name: 'Ковёр от 12 м2',
		category: 'drycleaning',
		type: 'carpets',
		price: 6000,
		unit: 'за изделие',
		features: [
			'Глубокая чистка',
			'Вывоз и доставка',
			'Сушка в цеху',
			'Полное восстановление ворса',
		],
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
			'Ручная обработка',
			'Кондиционирование ворса',
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
			'pH-нейтральные средства',
			'Сохранение блеска',
			'Индивидуальный подход',
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
			'Защитная пропитка',
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
			'Удаление пятен',
		],
	},
	{
		name: 'Кроссовки / кеды',
		category: 'drycleaning',
		type: 'shoes',
		price: 1500,
		unit: 'за пару',
		features: [
			'Глубокая чистка',
			'Отбеливание подошвы',
			'Дезодорация',
			'Чистка шнурков',
		],
	},
	{
		name: 'Сапоги / ботинки',
		category: 'drycleaning',
		type: 'shoes',
		price: 2500,
		unit: 'за пару',
		features: [
			'Полная чистка',
			'Восстановление кожи',
			'Защитная пропитка',
			'Полировка',
		],
	},

	// ====== ХИМЧИСТКА - СТИРКА И ГЛАЖКА ======
	{
		name: 'Стирка + глажка (до 5 кг)',
		category: 'drycleaning',
		type: 'laundry',
		price: 1500,
		unit: 'за комплект',
		features: [
			'Сортировка по цвету и ткани',
			'Правильный режим стирки',
			'Сушка',
			'Глажка и упаковка',
		],
	},
	{
		name: 'Стирка + глажка (до 10 кг)',
		category: 'drycleaning',
		type: 'laundry',
		price: 2500,
		unit: 'за комплект',
		features: [
			'Сортировка по цвету и ткани',
			'Правильный режим стирки',
			'Сушка',
			'Глажка и упаковка',
		],
	},
	{
		name: 'Деликатная стирка',
		category: 'drycleaning',
		type: 'laundry',
		price: 2000,
		unit: 'до 5 кг',
		features: [
			'Ручная стирка деликатных тканей',
			'Специальные средства',
			'Сушка в расправленном виде',
			'Бережная глажка',
		],
	},
	{
		name: 'Только глажка',
		category: 'drycleaning',
		type: 'laundry',
		price: 1000,
		unit: 'до 5 кг',
		features: [
			'Глажка на профессиональном оборудовании',
			'Складные вещи или на плечиках',
			'Упаковка',
		],
	},
	{
		name: 'Постельное бельё',
		category: 'drycleaning',
		type: 'laundry',
		price: 800,
		unit: 'за комплект',
		features: [
			'Стирка при высокой температуре',
			'Глажка',
			'Аккуратное складывание',
		],
	},
	{
		name: 'Полотенца / халаты',
		category: 'drycleaning',
		type: 'laundry',
		price: 600,
		unit: 'до 5 шт',
		features: ['Стирка с кондиционером', 'Сушка', 'Пушистое складывание'],
	},
]

export const ServicesProvider = ({ children }) => {
	const [services, setServices] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		initializeServices()
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
				console.log('Default services added to Firebase')
			}

			await fetchServices()
		} catch (error) {
			console.error('Error initializing services:', error)
			setLoading(false)
		}
	}

	const fetchServices = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'services'))
			const servicesData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}))
			console.log('Fetched services:', servicesData.length)
			setServices(servicesData)
		} catch (error) {
			console.error('Error fetching services:', error)
		} finally {
			setLoading(false)
		}
	}

	const addService = async serviceData => {
		try {
			await addDoc(collection(db, 'services'), {
				...serviceData,
				createdAt: new Date().toISOString(),
			})
			await fetchServices()
		} catch (error) {
			console.error('Error adding service:', error)
			throw error
		}
	}

	const updateService = async (id, serviceData) => {
		try {
			const serviceRef = doc(db, 'services', id)
			await updateDoc(serviceRef, {
				...serviceData,
				updatedAt: new Date().toISOString(),
			})
			await fetchServices()
		} catch (error) {
			console.error('Error updating service:', error)
			throw error
		}
	}

	const deleteService = async id => {
		try {
			await deleteDoc(doc(db, 'services', id))
			await fetchServices()
		} catch (error) {
			console.error('Error deleting service:', error)
			throw error
		}
	}

	const getServicesByCategory = category =>
		services.filter(s => s.category === category)
	const getServicesByType = (category, type) =>
		services.filter(s => s.category === category && s.type === type)

	return (
		<ServicesContext.Provider
			value={{
				services,
				loading,
				addService,
				updateService,
				deleteService,
				fetchServices,
				getServicesByCategory,
				getServicesByType,
			}}
		>
			{children}
		</ServicesContext.Provider>
	)
}
