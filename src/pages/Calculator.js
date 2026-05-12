import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight, Plus } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const ResultBlock = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 3rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.borderAccent};
`;

const ResultPrice = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  margin: 1.5rem 0;

  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const ResultNote = styled.p`
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Calculator = () => {
  const { addToCart } = useCart();
  const [type, setType] = useState('apartment');
  const [area, setArea] = useState(50);
  const [rooms, setRooms] = useState(2);
  const [freq, setFreq] = useState('once');
  const [price, setPrice] = useState(null);

  const calc = () => {
    let base = 0;
    const rates = { apartment: 70, office: 50, general: 100, afterRepair: 150, windows: 200, dryCleaning: 300 };
    const mult = { once: 1, weekly: 0.7, monthly: 0.85 };

    if (type === 'apartment') base = rooms * 2000;
    else if (type === 'windows') base = rooms * 1500;
    else base = area * (rates[type] || 70);

    base *= mult[freq];
    setPrice(Math.round(base));
  };

  const addService = () => {
    const names = {
      apartment: 'Уборка квартиры', office: 'Уборка офиса', general: 'Генеральная уборка',
      afterRepair: 'После ремонта', windows: 'Мойка окон', dryCleaning: 'Химчистка'
    };
    addToCart({
      id: Date.now(),
      title: names[type],
      price,
      quantity: 1,
      details: `Площадь: ${area} м2, Комнат: ${rooms}, Периодичность: ${freq === 'once' ? 'Разово' : freq === 'weekly' ? 'Еженедельно' : 'Ежемесячно'}`
    });
  };

  return (
    <Container>
      <Header>
        <Label>Calculator</Label>
        <Title>Расчёт стоимости</Title>
      </Header>

      <GlassCard padding="3rem">
        <Input label="Тип услуги" select value={type} onChange={e => { setType(e.target.value); setPrice(null); }}
          options={[
            { value: 'apartment', label: 'Уборка квартиры' },
            { value: 'office', label: 'Уборка офиса' },
            { value: 'general', label: 'Генеральная уборка' },
            { value: 'afterRepair', label: 'После ремонта' },
            { value: 'windows', label: 'Мойка окон' },
            { value: 'dryCleaning', label: 'Химчистка' },
          ]} />
        <Input label="Площадь (м2)" type="number" value={area} onChange={e => { setArea(Number(e.target.value)); setPrice(null); }} min="10" max="10000" />
        {(type === 'apartment' || type === 'windows') && (
          <Input label="Количество комнат" type="number" value={rooms} onChange={e => { setRooms(Number(e.target.value)); setPrice(null); }} min="1" max="10" />
        )}
        <Input label="Периодичность" select value={freq} onChange={e => { setFreq(e.target.value); setPrice(null); }}
          options={[
            { value: 'once', label: 'Разово' },
            { value: 'weekly', label: 'Еженедельно (скидка 30%)' },
            { value: 'monthly', label: 'Ежемесячно (скидка 15%)' },
          ]} />
        <Button onClick={calc} style={{ width: '100%', justifyContent: 'center' }}>
          Рассчитать <ArrowRight size={18} />
        </Button>
      </GlassCard>

      {price && (
        <ResultBlock>
          <Label>Estimated Price</Label>
          <ResultPrice>{price.toLocaleString()} P</ResultPrice>
          <ResultNote>Окончательная стоимость уточняется после осмотра</ResultNote>
          <Button onClick={addService}>
            <Plus size={18} /> В корзину
          </Button>
        </ResultBlock>
      )}
    </Container>
  );
};

export default Calculator;