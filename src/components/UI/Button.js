import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  background: ${props => props.variant === 'primary' 
    ? props.theme.colors.goldGradient 
    : 'transparent'};
  border: ${props => props.variant === 'outline' 
    ? `1px solid ${props.theme.colors.accent}` 
    : 'none'};
  color: ${props => props.variant === 'outline' 
    ? props.theme.colors.accent 
    : props.theme.colors.darker};
  padding: ${props => props.size === 'large' ? '1.1rem 2.5rem' : '0.85rem 2rem'};
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.size === 'large' ? '1.15rem' : '1rem'};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  clip-path: polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => (
  <StyledButton variant={variant} size={size} {...props}>{children}</StyledButton>
);

export default Button;