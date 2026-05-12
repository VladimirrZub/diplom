import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.2rem 0;
  transition: background 0.5s;
  background: ${props => props.scrolled ? 'rgba(5, 7, 10, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(30px)' : 'none'};
`;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.accent};
  
  span {
    color: ${props => props.theme.colors.text};
    font-weight: 400;
    margin-left: 5px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(5, 7, 10, 0.98);
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
  transition: color 0.3s;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.colors.accent};
    transform: rotate(45deg) translateX(-50%);
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.3s;
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  color: ${props => props.theme.colors.text};
  z-index: 101;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const Bar = styled.span`
  display: block;
  width: 28px;
  height: 1.5px;
  background: ${props => props.theme.colors.text};
  transition: all 0.3s;
  
  &:nth-child(1) {
    transform: ${props => props.open ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${props => props.open ? 0 : 1};
  }
  &:nth-child(3) {
    transform: ${props => props.open ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProfileLink = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textDimmed};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Главная' },
    { to: '/services', label: 'Услуги' },
    { to: '/calculator', label: 'Расчёт' },
    { to: '/reviews', label: 'Отзывы' },
    { to: '/contacts', label: 'Контакты' },
    { to: '/help', label: 'Помощь' },
  ];

  return (
    <HeaderWrapper scrolled={scrolled}>
      <Container>
        <Logo to="/">
          CLEAR<span>BREATH</span>
        </Logo>

        <MenuToggle onClick={() => setOpen(!open)}>
          <Bar open={open} />
          <Bar open={open} />
          <Bar open={open} />
        </MenuToggle>

        <Nav open={open}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              active={location.pathname === link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </Nav>

        <HeaderRight>
          <ProfileLink to="/profile">Кабинет</ProfileLink>
        </HeaderRight>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;