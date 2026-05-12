import React from 'react';
import styled from 'styled-components';

const InputGroup = styled.div`
  margin-bottom: 1.8rem;
`;

const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: ${props => props.theme.colors.textDimmed};
  margin-bottom: 0.6rem;
  text-transform: uppercase;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.9rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.4s;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.9rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.4s;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.9rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
  }
  
  option {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
  }
`;

const Input = ({ label, textarea, select, options, ...props }) => {
  return (
    <InputGroup>
      {label && <Label>{label}</Label>}
      {textarea ? (
        <StyledTextarea {...props} />
      ) : select ? (
        <StyledSelect {...props}>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </StyledSelect>
      ) : (
        <StyledInput {...props} />
      )}
    </InputGroup>
  );
};

export default Input;