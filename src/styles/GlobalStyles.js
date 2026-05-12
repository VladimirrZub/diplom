import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.secondary};
    background: ${props => props.theme.colors.darker};
    color: ${props => props.theme.colors.text};
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: rgba(212, 175, 55, 0.3);
    color: #fff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.darker};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: ${props => props.theme.colors.accent};
    
    .line {
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, ${props => props.theme.colors.accent}, transparent);
    }
    
    .diamond {
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      border: 1px solid ${props => props.theme.colors.accent};
    }
  }
`;

export default GlobalStyles;