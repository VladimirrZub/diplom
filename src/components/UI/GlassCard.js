import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.padding || '2.5rem'};
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: ${props => props.theme.colors.goldGradient};
    opacity: 0;
    transition: opacity 0.5s;
  }
  
  &:hover::before {
    opacity: 0.6;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.borderAccent};
    transform: translateY(-4px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: ${props => props.mobilePadding || '1.8rem'};
  }
`;

const GlassCard = ({ children, padding, mobilePadding }) => (
  <Card padding={padding} mobilePadding={mobilePadding}>{children}</Card>
);

export default GlassCard;