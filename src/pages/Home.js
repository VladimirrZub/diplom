import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react'
import Button from '../components/UI/Button'

const Container = styled.div`
	max-width: 100%;
	overflow-x: hidden;
	position: relative;
`

const HeroSection = styled.section`
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	padding: 6rem 0;

	@media (max-width: 480px) {
		min-height: 90vh;
		padding: 5rem 0;
	}
`

const HeroContent = styled.div`
	position: relative;
	z-index: 10;
	text-align: center;
	padding: 0 1.5rem;
	max-width: 1000px;
	width: 100%;
	will-change: transform, opacity;
`

const HeroEyebrow = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.75rem;
	letter-spacing: 0.35em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 2.5rem;
	will-change: transform, opacity;

	&::before,
	&::after {
		content: '';
		display: inline-block;
		width: 40px;
		height: 1px;
		background: ${props => props.theme.colors.accent};
		vertical-align: middle;
		margin: 0 1.2rem;
		opacity: 0.5;

		@media (max-width: 480px) {
			width: 20px;
			margin: 0 0.8rem;
		}
	}
`

const HeroTitle = styled.h1`
	font-family: ${props => props.theme.fonts.primary};
	font-size: clamp(2.2rem, 7vw, 6.5rem);
	font-weight: 700;
	line-height: 1.05;
	margin-bottom: 1.5rem;
	letter-spacing: 0.02em;
	will-change: transform, opacity;

	.accent {
		color: ${props => props.theme.colors.accent};
		position: relative;
		display: inline-block;
	}

	.accent::after {
		content: '';
		position: absolute;
		bottom: 5px;
		left: 0;
		width: 100%;
		height: 2px;
		background: ${props => props.theme.colors.accent};
		opacity: 0.4;
	}

	@media (max-width: 480px) {
		font-size: 2rem;
	}
`

const HeroSubtitle = styled.p`
	font-size: clamp(0.95rem, 1.5vw, 1.1rem);
	color: ${props => props.theme.colors.textDimmed};
	max-width: 600px;
	margin: 0 auto 3rem;
	line-height: 1.8;
	font-weight: 300;
	padding: 0 0.5rem;
	will-change: transform, opacity;
`

const HeroButtons = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
	will-change: transform, opacity;

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: center;
		gap: 0.8rem;
	}
`

const ScrollIndicator = styled.div`
	position: absolute;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.8rem;
	z-index: 10;
	will-change: opacity;

	@media (max-width: 480px) {
		bottom: 1rem;
	}
`

const ScrollLine = styled.div`
	width: 1px;
	height: 50px;
	background: linear-gradient(
		to bottom,
		${props => props.theme.colors.accent},
		transparent
	);

	@media (max-width: 480px) {
		height: 30px;
	}
`

const ScrollText = styled.span`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.7rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.textMuted};
`

const Section = styled.section`
	padding: 5rem 1.5rem;

	@media (min-width: 768px) {
		padding: 8rem 2rem;
	}
`

const SectionInner = styled.div`
	max-width: 1400px;
	margin: 0 auto;
`

const SectionLabel = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 0.7rem;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
	margin-bottom: 1.5rem;

	@media (min-width: 768px) {
		font-size: 0.75rem;
		margin-bottom: 1.8rem;
	}
`

const SectionTitle = styled.h2`
	font-family: ${props => props.theme.fonts.primary};
	font-size: clamp(1.8rem, 5vw, 3.8rem);
	font-weight: 700;
	margin-bottom: 1rem;
	letter-spacing: 0.03em;
	line-height: 1.15;

	.accent {
		color: ${props => props.theme.colors.accent};
		font-style: italic;
	}
`

const SectionDesc = styled.p`
	color: ${props => props.theme.colors.textDimmed};
	font-size: 0.95rem;
	line-height: 1.8;
	font-weight: 300;
	max-width: 600px;
	margin-bottom: 3rem;

	@media (min-width: 768px) {
		font-size: 1.05rem;
		margin-bottom: 4rem;
	}
`

const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}
`

const FeatureCard = styled.div`
	background: ${props => props.theme.colors.surface};
	border: 1px solid ${props => props.theme.colors.border};
	padding: 2rem 1.5rem;
	transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: ${props => props.theme.colors.goldGradient};
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.5s;
	}

	&:hover {
		transform: translateY(-8px);
		border-color: ${props => props.theme.colors.borderAccent};
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);

		&::before {
			transform: scaleX(1);
		}
	}

	@media (min-width: 768px) {
		padding: 3.5rem 2.5rem;
	}
`

const FeatureIcon = styled.div`
	width: 50px;
	height: 50px;
	border: 1px solid ${props => props.theme.colors.borderAccent};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1.5rem;
	color: ${props => props.theme.colors.accent};
	transition: all 0.5s;

	${FeatureCard}:hover & {
		background: ${props => props.theme.colors.accent};
		color: ${props => props.theme.colors.darker};
		border-color: ${props => props.theme.colors.accent};
	}

	@media (min-width: 768px) {
		width: 60px;
		height: 60px;
		margin-bottom: 2rem;
	}
`

const FeatureTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.3rem;
	margin-bottom: 0.8rem;
	letter-spacing: 0.03em;

	@media (min-width: 768px) {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
`

const FeatureText = styled.p`
	color: ${props => props.theme.colors.textMuted};
	line-height: 1.7;
	font-weight: 300;
	font-size: 0.9rem;

	@media (min-width: 768px) {
		font-size: 0.95rem;
	}
`

const ProcessSection = styled.section`
	padding: 5rem 1.5rem;
	background: ${props => props.theme.colors.surface};

	@media (min-width: 768px) {
		padding: 8rem 2rem;
	}
`

const ProcessGrid = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
	gap: 2.5rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
	}
`

const ProcessStep = styled.div`
	position: relative;

	&:not(:last-child)::after {
		@media (min-width: 768px) {
			content: '';
			position: absolute;
			top: 35px;
			right: -1.5rem;
			width: 3rem;
			height: 1px;
			background: ${props => props.theme.colors.borderAccent};
		}
	}
`

const StepNumber = styled.div`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 3.5rem;
	font-weight: 700;
	color: ${props => props.theme.colors.accent};
	opacity: 0.12;
	line-height: 1;
	margin-bottom: -0.5rem;

	@media (min-width: 768px) {
		font-size: 5rem;
		margin-bottom: -1rem;
	}
`

const StepTitle = styled.h3`
	font-family: ${props => props.theme.fonts.primary};
	font-size: 1.2rem;
	margin-bottom: 0.8rem;
	letter-spacing: 0.03em;

	@media (min-width: 768px) {
		font-size: 1.4rem;
		margin-bottom: 1rem;
	}
`

const StepText = styled.p`
	color: ${props => props.theme.colors.textMuted};
	line-height: 1.7;
	font-weight: 300;
`

const CTASection = styled.section`
	padding: 5rem 1.5rem;
	text-align: center;
	position: relative;

	@media (min-width: 768px) {
		padding: 8rem 2rem;
	}
`

const CTAInner = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 3rem 1.5rem;
	background: ${props => props.theme.colors.surface};
	border: 1px solid ${props => props.theme.colors.borderAccent};
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 15px;
		right: 15px;
		height: 1px;
		background: ${props => props.theme.colors.goldGradient};

		@media (min-width: 768px) {
			left: 20px;
			right: 20px;
		}
	}

	@media (min-width: 768px) {
		padding: 6rem 3rem;
	}
`

const CTATitle = styled.h2`
	font-family: ${props => props.theme.fonts.primary};
	font-size: clamp(1.6rem, 4vw, 3.2rem);
	font-weight: 700;
	margin-bottom: 1rem;

	.accent {
		color: ${props => props.theme.colors.accent};
	}
`

const CTAText = styled.p`
	color: ${props => props.theme.colors.textDimmed};
	margin-bottom: 2rem;
	font-weight: 300;
	line-height: 1.8;
	font-size: 0.9rem;

	@media (min-width: 768px) {
		margin-bottom: 3rem;
		font-size: 1rem;
	}
`

const Home = () => {
	const eyebrowRef = useRef(null)
	const titleRef = useRef(null)
	const subtitleRef = useRef(null)
	const buttonsRef = useRef(null)
	const scrollRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.pageYOffset

			if (eyebrowRef.current) {
				eyebrowRef.current.style.transform = `translateY(${scrolled * 0.08}px)`
				eyebrowRef.current.style.opacity = Math.max(0, 1 - scrolled * 0.001)
			}
			if (titleRef.current) {
				titleRef.current.style.transform = `translateY(${scrolled * 0.1}px)`
				titleRef.current.style.opacity = Math.max(0, 1 - scrolled * 0.0012)
			}
			if (subtitleRef.current) {
				subtitleRef.current.style.transform = `translateY(${scrolled * 0.14}px)`
				subtitleRef.current.style.opacity = Math.max(0, 1 - scrolled * 0.0018)
			}
			if (buttonsRef.current) {
				buttonsRef.current.style.transform = `translateY(${scrolled * 0.16}px)`
				buttonsRef.current.style.opacity = Math.max(0, 1 - scrolled * 0.001)
			}
			if (scrollRef.current) {
				scrollRef.current.style.opacity = Math.max(0, 1 - scrolled * 0.003)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const features = [
		{
			icon: Sparkles,
			title: 'Экологичность',
			text: 'Безопасные чистящие средства без токсинов и аллергенов. Забота о здоровье и окружающей среде на каждом этапе.',
		},
		{
			icon: Shield,
			title: 'Надёжность',
			text: 'Строгий отбор персонала и полная материальная ответственность. Ваше имущество под надёжной защитой.',
		},
		{
			icon: Clock,
			title: 'Пунктуальность',
			text: 'Прибываем точно в назначенное время. Ценим ваше расписание и укладываемся в оговоренные сроки.',
		},
	]

	return (
		<Container>
			<HeroSection>
				<HeroContent>
					<HeroEyebrow ref={eyebrowRef}>Premium Cleaning Services</HeroEyebrow>
					<HeroTitle ref={titleRef}>
						Чистота как <span className='accent'>искусство</span>
					</HeroTitle>
					<HeroSubtitle ref={subtitleRef}>
						ClearBreath задаёт новые стандарты клининга. Мы превращаем уборку в
						безупречный ритуал, где каждая деталь имеет значение.
					</HeroSubtitle>
					<HeroButtons ref={buttonsRef}>
						<Button as={Link} to='/calculator' size='large'>
							Рассчитать стоимость
						</Button>
						<Button as={Link} to='/services' variant='outline' size='large'>
							Все услуги
						</Button>
					</HeroButtons>
				</HeroContent>

				<ScrollIndicator ref={scrollRef}>
					<ScrollText>Листайте вниз</ScrollText>
					<ScrollLine />
				</ScrollIndicator>
			</HeroSection>

			<Section>
				<SectionInner>
					<SectionLabel>Why Choose Us</SectionLabel>
					<SectionTitle>
						Почему выбирают <span className='accent'>нас</span>
					</SectionTitle>
					<SectionDesc>
						Мы создаём пространство, в котором приятно находиться. Каждый
						элемент нашей работы продуман до мелочей.
					</SectionDesc>

					<FeaturesGrid>
						{features.map((f, i) => (
							<FeatureCard key={i}>
								<FeatureIcon>
									<f.icon size={24} />
								</FeatureIcon>
								<FeatureTitle>{f.title}</FeatureTitle>
								<FeatureText>{f.text}</FeatureText>
							</FeatureCard>
						))}
					</FeaturesGrid>
				</SectionInner>
			</Section>

			<ProcessSection>
				<SectionInner>
					<SectionLabel>How It Works</SectionLabel>
					<SectionTitle>
						Как мы <span className='accent'>работаем</span>
					</SectionTitle>
					<SectionDesc>
						Простой и прозрачный процесс от заявки до идеального результата
					</SectionDesc>

					<ProcessGrid>
						<ProcessStep>
							<StepNumber>01</StepNumber>
							<StepTitle>Заявка и расчёт</StepTitle>
							<StepText>
								Оставляете заявку на сайте или через калькулятор. Мы
								рассчитываем стоимость и согласовываем удобное время.
							</StepText>
						</ProcessStep>
						<ProcessStep>
							<StepNumber>02</StepNumber>
							<StepTitle>Выезд бригады</StepTitle>
							<StepText>
								Наши специалисты прибывают точно в срок с полным набором
								профессионального оборудования и экологичных средств.
							</StepText>
						</ProcessStep>
						<ProcessStep>
							<StepNumber>03</StepNumber>
							<StepTitle>Идеальный результат</StepTitle>
							<StepText>
								Вы принимаете работу и наслаждаетесь безупречной чистотой.
								Гарантия качества 24 часа после уборки.
							</StepText>
						</ProcessStep>
					</ProcessGrid>
				</SectionInner>
			</ProcessSection>

			<CTASection>
				<CTAInner>
					<SectionLabel>Get Started Today</SectionLabel>
					<CTATitle>
						Готовы к <span className='accent'>идеальной</span> чистоте?
					</CTATitle>
					<CTAText>
						Свяжитесь с нами для бесплатной консультации и точного расчёта
						стоимости услуг
					</CTAText>
					<Button as={Link} to='/contacts' size='large'>
						Связаться с нами
					</Button>
				</CTAInner>
			</CTASection>
		</Container>
	)
}

export default Home
