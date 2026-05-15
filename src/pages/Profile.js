import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User, History, MessageSquare, LogOut, Edit2, Save, Star } from 'lucide-react';
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SideBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.active ? props.theme.colors.surface : 'transparent'};
  border: 1px solid ${props => props.active ? props.theme.colors.borderAccent : 'transparent'};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textMuted};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.text};
    border-color: ${props => props.theme.colors.border};
  }
  
  svg {
    color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textMuted};
  }
`;

const Content = styled.div``;

const Section = styled(GlassCard)`
  padding: 3rem;
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.8rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HistoryItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem 0;
  
  &:last-child { border: none; }
`;

const HistTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const HistTitle = styled.h4`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
`;

const HistDate = styled.span`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
`;

const HistPrice = styled.div`
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
`;

const StatusBadge = styled.span`
  font-size: 0.8rem;
  padding: 0.2rem 1rem;
  border: 1px solid ${props => {
    if (props.s === 'completed') return '#5B9A68';
    if (props.s === 'processing') return '#D4AF37';
    return '#C84B4B';
  }};
  color: ${props => {
    if (props.s === 'completed') return '#5B9A68';
    if (props.s === 'processing') return '#D4AF37';
    return '#C84B4B';
  }};
`;

const Profile = () => {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [edit, setEdit] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [history] = useState([
    { id: 1, title: 'Генеральная уборка', date: '15.03.2025', price: 8500, status: 'completed' },
    { id: 2, title: 'Химчистка дивана', date: '10.03.2025', price: 3200, status: 'completed' },
    { id: 3, title: 'Уборка офиса', date: '05.03.2025', price: 5000, status: 'cancelled' },
    { id: 4, title: 'Мойка окон', date: '01.04.2025', price: 4500, status: 'processing' },
  ]);

  const [myReviews] = useState([
    { id: 1, date: '15.03.2025', rating: 5, text: 'Безупречная работа!' },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <Container>
      <Header>
        <Label>Account</Label>
        <Title>Личный кабинет</Title>
      </Header>
      
      <Layout>
        <Sidebar>
          <SideBtn active={tab === 'profile'} onClick={() => setTab('profile')}>
            <User size={18} /> Профиль
          </SideBtn>
          <SideBtn active={tab === 'history'} onClick={() => setTab('history')}>
            <History size={18} /> История услуг
          </SideBtn>
          <SideBtn active={tab === 'reviews'} onClick={() => setTab('reviews')}>
            <MessageSquare size={18} /> Мои отзывы
          </SideBtn>
          <SideBtn onClick={handleLogout}>
            <LogOut size={18} /> Выйти
          </SideBtn>
        </Sidebar>

        <Content>
          {tab === 'profile' && (
            <Section>
              <SectionTitle>
                Личные данные
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => { if (edit) updateUser(user); setEdit(!edit); }}
                >
                  {edit ? <Save size={16} /> : <Edit2 size={16} />}
                  {edit ? 'Сохранить' : 'Редактировать'}
                </Button>
              </SectionTitle>
              <FormGrid>
                <FormField label="ФИО" value={user.name} onChange={e => updateUser({ ...user, name: e.target.value })} disabled={!edit} />
                <FormField label="Телефон" value={user.phone} onChange={e => updateUser({ ...user, phone: e.target.value })} disabled={!edit} />
                <FormField label="Email" type="email" value={user.email} onChange={e => updateUser({ ...user, email: e.target.value })} disabled={!edit} />
                <FormField label="Адрес" value={user.address} onChange={e => updateUser({ ...user, address: e.target.value })} disabled={!edit} />
              </FormGrid>
            </Section>
          )}

          {tab === 'history' && (
            <Section>
              <SectionTitle>История услуг</SectionTitle>
              {history.map(h => (
                <HistoryItem key={h.id}>
                  <HistTop>
                    <HistTitle>{h.title}</HistTitle>
                    <HistDate>{h.date}</HistDate>
                  </HistTop>
                  <HistPrice>{h.price.toLocaleString()} P</HistPrice>
                  <StatusBadge s={h.status}>
                    {h.status === 'completed' ? 'Выполнено' : h.status === 'processing' ? 'В процессе' : 'Отменено'}
                  </StatusBadge>
                </HistoryItem>
              ))}
            </Section>
          )}

          {tab === 'reviews' && (
            <Section>
              <SectionTitle>Мои отзывы</SectionTitle>
              {myReviews.map(r => (
                <div key={r.id} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)', padding: '1.5rem 0' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < r.rating ? '#D4AF37' : 'none'} color={i < r.rating ? '#D4AF37' : '#5C5850'} />
                    ))}
                  </div>
                  <p style={{ color: '#8B8478' }}>{r.text}</p>
                  <span style={{ color: '#5C5850', fontSize: '0.8rem' }}>{r.date}</span>
                </div>
              ))}
            </Section>
          )}
        </Content>
      </Layout>
    </Container>
  );
};

export default Profile;