import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
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
  margin-bottom: 4rem;
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
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.3rem;
`;

const ItemPrice = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.4rem;
  color: ${props => props.theme.colors.accent};
  margin-top: 0.3rem;
`;

const QtyGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.borderAccent};
  color: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.darker};
  }
`;

const QtyValue = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  min-width: 30px;
  text-align: center;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.error};
  }
`;

const Total = styled.div`
  text-align: right;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.borderAccent};
`;

const TotalPrice = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const Empty = styled.div`
  text-align: center;
  padding: 6rem 0;
  color: ${props => props.theme.colors.textMuted};
`;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Container>
        <Header><Label>Cart</Label><Title>Корзина</Title></Header>
        <Empty>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', marginBottom: '1rem' }}>Пусто</h2>
          <p style={{ marginBottom: '2rem' }}>Добавьте услуги из каталога</p>
          <Button as={Link} to="/services">Перейти к услугам <ArrowRight size={18} /></Button>
        </Empty>
      </Container>
    );
  }

  return (
    <Container>
      <Header><Label>Cart</Label><Title>Корзина</Title></Header>

      <GlassCard padding="0">
        {items.map(item => (
          <Item key={item.id}>
            <ItemInfo>
              <ItemName>{item.title}</ItemName>
              {item.details && <p style={{ color: '#5C5850', fontSize: '0.85rem', marginTop: '0.3rem' }}>{item.details}</p>}
              <ItemPrice>{item.price.toLocaleString()} P /шт</ItemPrice>
            </ItemInfo>
            <QtyGroup>
              <QtyBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></QtyBtn>
              <QtyValue>{item.quantity}</QtyValue>
              <QtyBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></QtyBtn>
            </QtyGroup>
            <RemoveBtn onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></RemoveBtn>
          </Item>
        ))}
      </GlassCard>

      <Total>
        <TotalPrice>Итого: {totalPrice.toLocaleString()} P</TotalPrice>
        <Button size="large">Оформить заказ <ArrowRight size={18} /></Button>
        <Button variant="outline" onClick={clearCart} style={{ marginLeft: '1rem' }}>Очистить</Button>
      </Total>
    </Container>
  );
};

export default Cart;