import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${props => props.theme.colors.darker};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 5rem 0 0;
  margin-top: 6rem;
`;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  padding-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 400;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1.5rem;
  line-height: 1.8;
  max-width: 350px;
`;

const ColumnTitle = styled.h4`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.8rem;
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const Bottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 0;
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
  letter-spacing: 0.05em;
`;

const Footer = () => (
  <FooterWrapper>
    <Container>
      <Grid>
        <div>
          <Brand>
            CLEAR<span>BREATH</span>
          </Brand>
          <Description>
            Премиальный клининг для тех, кто ценит безупречную чистоту и внимание к деталям.
          </Description>
        </div>
        <div>
          <ColumnTitle>Навигация</ColumnTitle>
          <FooterLink to="/services">Услуги</FooterLink>
          <FooterLink to="/calculator">Расчёт</FooterLink>
          <FooterLink to="/reviews">Отзывы</FooterLink>
        </div>
        <div>
          <ColumnTitle>Компания</ColumnTitle>
          <FooterLink to="/contacts">Контакты</FooterLink>
          <FooterLink to="/help">Помощь</FooterLink>
          <FooterLink to="/profile">Кабинет</FooterLink>
        </div>
        <div>
          <ColumnTitle>Связь</ColumnTitle>
          <FooterLink to="/contacts">+7 999 123-45-67</FooterLink>
          <FooterLink to="/contacts">info@clearbreath.ru</FooterLink>
          <FooterLink to="/contacts">Москва, Чистая 15</FooterLink>
        </div>
      </Grid>
    </Container>
    <Bottom>
      <Container>
        CLEARBREATH 2025. ALL RIGHTS RESERVED.
      </Container>
    </Bottom>
  </FooterWrapper>
);

export default Footer;