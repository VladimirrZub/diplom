import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const Container = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem 3rem;
	@media (max-width: 768px) {
		padding: 1.5rem;
	}
`

const Header = styled.div`
	text-align: center;
	margin-bottom: 5rem;
	padding-top: 3rem;
`

const Label = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.8rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 1.5rem;
	margin-top: 2.5rem;
`

const Title = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 3.5rem;
	font-weight: 700;
	color: ${props => props.theme.colors.text};
	@media (max-width: 480px) {
		font-size: 2.2rem;
	}
`

const SearchBar = styled.div`
	position: relative;
	max-width: 500px;
	margin: 0 auto 4rem;
	svg {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		color: ${props => props.theme.colors.textMuted};
	}
	input {
		width: 100%;
		padding: 1rem 0 1rem 2.5rem;
		background: transparent;
		border: none;
		border-bottom: 1px solid ${props => props.theme.colors.border};
		color: ${props => props.theme.colors.text};
		font-size: 1rem;
		outline: none;
		font-family: ${props => props.theme.fonts.secondary};
		&:focus {
			border-color: ${props => props.theme.colors.borderAccent};
		}
		&::placeholder {
			color: ${props => props.theme.colors.textMuted};
		}
	}
`

const FAQList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1px;
	background: ${props => props.theme.colors.border};
`

const FAQItem = styled.div`
	background: ${props => props.theme.colors.darker};
	padding: 2rem;
	cursor: pointer;
	transition: background 0.3s;
	&:hover {
		background: ${props => props.theme.colors.surface};
	}
`

const Question = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	color: ${props => props.theme.colors.text};
	letter-spacing: 0.03em;
	svg {
		color: ${props => props.theme.colors.accent};
		flex-shrink: 0;
	}
`

const Answer = styled.div`
	margin-top: 1.5rem;
	padding-top: 1.5rem;
	border-top: 1px solid ${props => props.theme.colors.border};
	color: ${props => props.theme.colors.textDimmed};
	line-height: 1.8;
	font-weight: 300;
`

const Help = () => {
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(null)

	const faq = [
		{
			id: 1,
			q: 'Как заказать услугу?',
			a: 'Выберите услугу в каталоге, добавьте в корзину или воспользуйтесь калькулятором. После оформления менеджер свяжется для уточнения.',
		},
		{
			id: 2,
			q: 'Какие способы оплаты?',
			a: 'Наличные, банковские карты (Visa, MasterCard, МИР), безналичный расчёт. Оплата после выполнения.',
		},
		{
			id: 3,
			q: 'Нужно ли присутствие?',
			a: 'Не обязательно. Сотрудники проверены и несут материальную ответственность.',
		},
		{
			id: 4,
			q: 'Какие средства используете?',
			a: 'Профессиональные экологичные сертифицированные средства, безопасные для здоровья.',
		},
		{
			id: 5,
			q: 'Можно ли отменить заказ?',
			a: 'Да, не позднее чем за 24 часа. При отмене менее чем за 24 часа — штраф 20%.',
		},
		{
			id: 6,
			q: 'Есть ли скидки?',
			a: 'Скидка 10% на первый заказ, скидки при регулярном обслуживании, сезонные акции.',
		},
		{
			id: 7,
			q: 'Как быстро можно заказать?',
			a: 'Обычно на следующий день. В срочных случаях — в день заказа при наличии бригад.',
		},
		{
			id: 8,
			q: 'Есть ли гарантия?',
			a: 'Гарантия 24 часа. Если что-то не устроит — бесплатно устраним недостатки.',
		},
	]

	const filtered = faq.filter(
		i =>
			i.q.toLowerCase().includes(search.toLowerCase()) ||
			i.a.toLowerCase().includes(search.toLowerCase()),
	)

	return (
		<Container>
			<Header>
				<Label>Help Center</Label>
				<Title>Центр помощи</Title>
			</Header>

			<SearchBar>
				<Search size={20} />
				<input
					placeholder='Поиск по вопросам...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</SearchBar>

			<FAQList>
				{filtered.map(item => (
					<FAQItem
						key={item.id}
						onClick={() => setOpen(open === item.id ? null : item.id)}
					>
						<Question>
							{item.q}
							{open === item.id ? (
								<ChevronUp size={20} />
							) : (
								<ChevronDown size={20} />
							)}
						</Question>
						{open === item.id && <Answer>{item.a}</Answer>}
					</FAQItem>
				))}
			</FAQList>
		</Container>
	)
}

export default Help
