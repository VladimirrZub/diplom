import React from 'react';
import styled from 'styled-components';
import { ArrowRight, Plus } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  padding-top: 3rem;
`;

const Label = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 3.5rem;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 4rem 3rem;
  position: relative;
  transition: all 0.5s;
  overflow: hidden;

  &:hover {
    background: ${props => props.theme.colors.elevated};
    
    .service-number {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem;
  }
`;

const ServiceNumber = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 6rem;
  color: ${props => props.theme.colors.accent};
  opacity: 0.08;
  position: absolute;
  top: 2rem;
  right: 2rem;
  line-height: 1;
  transition: opacity 0.5s;
  pointer-events: none;
`;

const ServiceName = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  letter-spacing: 0.03em;
`;

const ServiceDesc = styled.p`
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1.8rem;
  line-height: 1.7;
  font-weight: 300;
`;

const ServicePrice = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.8rem;
  
  small {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textMuted};
    display: block;
  }
`;

const List = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const ListItem = styled.li`
  color: ${props => props.theme.colors.textDimmed};
  padding: 0.5rem 0;
  font-weight: 300;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 1px;
    background: ${props => props.theme.colors.accent};
  }
`;

const Services = () => {
  const { addToCart } = useCart();

  const services = [
    {
      id: 1,
      num: '01',
      name: 'Уборка квартир',
      desc: 'Тщательная уборка жилых помещений с особым вниманием к деталям.',
      price: 3500,
      unit: 'от 1-комнатной квартиры',
      features: ['Влажная уборка всех поверхностей', 'Чистка мягкой мебели', 'Мытьё окон и зеркал', 'Уборка кухни и санузла']
    },
    {
      id: 2,
      num: '02',
      name: 'Уборка офисов',
      desc: 'Поддержание безупречной чистоты в деловой среде.',
      price: 5000,
      unit: 'за 100 м2',
      features: ['Ежедневная уборка', 'Уход за техникой', 'Вынос мусора', 'Генеральная уборка']
    },
    {
      id: 3,
      num: '03',
      name: 'Генеральная уборка',
      desc: 'Максимально глубокая очистка каждого сантиметра пространства.',
      price: 8000,
      unit: 'от квартиры',
      features: ['Труднодоступные места', 'Химчистка мебели', 'Дезинфекция', 'После ремонта']
    },
    {
      id: 4,
      num: '04',
      name: 'Химчистка',
      desc: 'Восстановление первоначального вида мягкой мебели и ковров.',
      price: 2500,
      unit: 'за предмет',
      features: ['Диваны и кресла', 'Ковровые покрытия', 'Удаление пятен', 'Дезодорация']
    },
    {
      id: 5,
      num: '05',
      name: 'Мойка окон',
      desc: 'Кристально чистые окна с применением профессионального инвентаря.',
      price: 1500,
      unit: 'за окно',
      features: ['Мытьё стёкол и рам', 'Москитные сетки', 'Подоконники', 'Работа на высоте']
    },
    {
      id: 6,
      num: '06',
      name: 'После ремонта',
      desc: 'Идеальный порядок после строительных и ремонтных работ.',
      price: 10000,
      unit: 'от помещения',
      features: ['Строительная пыль', 'Все поверхности', 'Вынос мусора', 'Финишная уборка']
    },
  ];

  return (
    <Container>
      <Header>
        <Label>Services</Label>
        <Title>Наши услуги</Title>
      </Header>

      <Grid>
        {services.map(s => (
          <ServiceCard key={s.id}>
            <ServiceNumber className="service-number">{s.num}</ServiceNumber>
            <ServiceName>{s.name}</ServiceName>
            <ServiceDesc>{s.desc}</ServiceDesc>
            <ServicePrice>
              {s.price.toLocaleString()} P <small>{s.unit}</small>
            </ServicePrice>
            <List>
              {s.features.map((f, i) => <ListItem key={i}>{f}</ListItem>)}
            </List>
            <Button onClick={() => addToCart(s)}>
              <Plus size={18} /> В корзину
            </Button>
          </ServiceCard>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;