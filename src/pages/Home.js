import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: 5rem 0 8rem;
  position: relative;
`;

const HeroLabel = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: 0.03em;
  
  em {
    font-style: normal;
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.15rem;
  color: ${props => props.theme.colors.textDimmed};
  max-width: 650px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  font-weight: 300;
`;

const Section = styled.section`
  padding: 6rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionLabel = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.03em;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 4rem 3rem;
  text-align: center;
  transition: background 0.4s;

  &:hover {
    background: ${props => props.theme.colors.elevated};
  }

  h3 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    letter-spacing: 0.05em;
  }

  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.7;
    font-weight: 300;
  }
`;

const Number = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 4rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
  font-weight: 700;
  opacity: 0.3;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};
  margin: 6rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 3rem 2rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.5rem;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 6rem 0;
`;

const Home = () => {
  const features = [
    { number: '01', title: 'Экологичность', text: 'Безопасные чистящие средства без токсинов и аллергенов. Забота о здоровье и окружающей среде.' },
    { number: '02', title: 'Опыт', text: 'Более десяти лет в сфере профессионального клининга. Отлаженные процессы и высочайшие стандарты.' },
    { number: '03', title: 'Надёжность', text: 'Строгий отбор персонала и полная материальная ответственность за сохранность имущества.' },
  ];

  return (
    <Container>
      <Hero>
        <HeroLabel>Premium Cleaning Services</HeroLabel>
        <HeroTitle>
          Чистота как <em>искусство</em>
        </HeroTitle>
        <HeroText>
          ClearBreath задаёт новые стандарты клининга. Мы превращаем уборку в безупречный ритуал, 
          где каждая деталь имеет значение.
        </HeroText>
        <Button as={Link} to="/calculator" size="large">
          Рассчитать стоимость <ArrowRight size={18} />
        </Button>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionLabel>Why Us</SectionLabel>
          <SectionTitle>Почему выбирают нас</SectionTitle>
        </SectionHeader>
        <FeaturesGrid>
          {features.map((f, i) => (
            <FeatureItem key={i}>
              <Number>{f.number}</Number>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </FeatureItem>
          ))}
        </FeaturesGrid>
      </Section>

      <StatsRow>
        <StatItem>
          <StatNumber>5000</StatNumber>
          <StatLabel>Клиентов</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>98%</StatNumber>
          <StatLabel>Довольны</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>12</StatNumber>
          <StatLabel>Лет опыта</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Поддержка</StatLabel>
        </StatItem>
      </StatsRow>

      <CTASection>
        <GlassCard padding="5rem">
          <SectionLabel>Get Started</SectionLabel>
          <SectionTitle style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            Готовы к идеальной чистоте?
          </SectionTitle>
          <p style={{ color: '#8B8478', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости
          </p>
          <Button as={Link} to="/contacts" size="large">
            Связаться <ArrowRight size={18} />
          </Button>
        </GlassCard>
      </CTASection>
    </Container>
  );
};

export default Home;