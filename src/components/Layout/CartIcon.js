import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

const CartButton = styled(Link)`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 99;
  width: 64px;
  height: 64px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.borderAccent};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  transition: all 0.4s;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);

  &:hover {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
    transform: rotate(45deg) scale(1.05);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 52px;
    height: 52px;
  }
`;

const Content = styled.span`
  display: block;
  transform: rotate(-45deg);
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  font-size: 1.2rem;
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: -12px;
  right: -18px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.darker};
  width: 22px;
  height: 22px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: 600;
`;

const CartIcon = () => {
  const { items, itemCount } = useCart();
  if (items.length === 0) return null;

  return (
    <CartButton to="/cart">
      <Content>
        CART
        <Badge>{itemCount}</Badge>
      </Content>
    </CartButton>
  );
};

export default CartIcon;