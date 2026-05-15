import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
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
  padding: 0.875rem ${props => props.$withIcon ? '3rem' : '0'} 0.875rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.$hasError ? 'rgba(200, 75, 75, 0.5)' : 'rgba(212, 175, 55, 0.15)'};
  color: #E8E3D9;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.4s;
  font-family: ${props => props.theme.fonts.secondary};
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
    font-family: ${props => props.theme.fonts.secondary};
  }
  
  &:focus {
    border-color: rgba(212, 175, 55, 0.5);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const FieldError = styled.span`
  color: #C84B4B;
  font-size: 0.78rem;
  display: block;
  margin-top: 0.3rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  onIconClick,
  inputMode,
  ...props 
}) => {
  return (
    <FormGroup>
      {label && <FormLabel>{label}</FormLabel>}
      <InputWrapper>
        <StyledInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          $hasError={!!error}
          $withIcon={!!Icon}
          inputMode={inputMode}
          {...props}
        />
        {Icon && (
          <IconButton type="button" onClick={onIconClick}>
            <Icon size={18} />
          </IconButton>
        )}
      </InputWrapper>
      {error && <FieldError>{error}</FieldError>}
    </FormGroup>
  );
};

export default FormField;