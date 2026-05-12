import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import CartIcon from './CartIcon';
import { useCart } from '../../context/CartContext';

const Main = styled.main`
  min-height: 100vh;
  padding-top: 90px;
`;

const GridLines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
  background-image: 
    linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
`;

const Layout = ({ children }) => {
  const { isVisible } = useCart();

  return (
    <>
      <GridLines />
      <Header />
      <Main>{children}</Main>
      {isVisible && <CartIcon />}
      <Footer />
    </>
  );
};

export default Layout;