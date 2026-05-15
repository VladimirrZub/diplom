import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import FormField from '../components/UI/FormField';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 1100px;
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

const AuthForm = styled(GlassCard)`
  max-width: 460px;
  margin: 4rem auto;
  padding: 3rem;
`;

const FormTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const ErrorMsg = styled.div`
  padding: 1rem;
  border: 1px solid rgba(200, 75, 75, 0.3);
  color: #C84B4B;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SwitchText = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textDimmed};
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: ${props => props.theme.colors.accent};
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});

    const errors = {};
    if (!form.email) {
      errors.email = 'Введите email';
    } else if (!validateEmail(form.email)) {
      errors.email = 'Некорректный формат email';
    }
    if (!form.password) {
      errors.password = 'Введите пароль';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    login({
      name: form.email.split('@')[0],
      email: form.email,
      phone: '+7 999 000 00 00',
      address: 'Не указан'
    });
    navigate('/profile');
  };

  return (
    <Container>
      <Header>
        <Label>Account</Label>
        <Title>Вход</Title>
      </Header>

      <AuthForm>
        <FormTitle>Войти в аккаунт</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="example@mail.ru"
            error={fieldErrors.email}
          />
          
          <FormField
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Введите пароль"
            error={fieldErrors.password}
            icon={showPassword ? EyeOff : Eye}
            onIconClick={() => setShowPassword(!showPassword)}
          />

          <Button type="submit" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}>
            Войти
          </Button>
        </form>
        
        <SwitchText>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </SwitchText>
      </AuthForm>
    </Container>
  );
};

export default Login;