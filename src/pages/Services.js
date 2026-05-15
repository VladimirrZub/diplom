import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Check, ChevronDown, ChevronUp, Sparkles, Wind, Shirt, Sofa, Footprints, Minus } from 'lucide-react';
import Button from '../components/UI/Button';
import GlassCard from '../components/UI/GlassCard';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
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

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 3rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  flex: 1;
  padding: 1.4rem 2rem;
  background: ${props => props.active ? props.theme.colors.surface : 'transparent'};
  border: none;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.accent};
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.3s;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const SubTabsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SubTab = styled.button`
  padding: 0.8rem 2rem;
  background: transparent;
  border: 1px solid ${props => props.active ? props.theme.colors.borderAccent : props.theme.colors.border};
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: ${props => props.theme.colors.borderAccent};
    color: ${props => props.theme.colors.text};
  }
`;

const RoomsSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const RoomsLabel = styled.span`
  color: ${props => props.theme.colors.textDimmed};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
`;

const RoomsControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid ${props => props.theme.colors.border};
`;

const RoomBtn = styled.button`
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    background: rgba(212, 175, 55, 0.05);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const RoomValue = styled.div`
  width: 50px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  border-left: 1px solid ${props => props.theme.colors.border};
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const ServiceContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainInfo = styled.div``;

const SidePanel = styled.div`
  position: sticky;
  top: 100px;
  align-self: start;

  @media (max-width: 900px) {
    position: static;
  }
`;

const InfoBlock = styled(GlassCard)`
  margin-bottom: 1.5rem;
`;

const BlockTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.03em;
`;

const IncludedList = styled.ul`
  list-style: none;
`;

const IncludedItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0;
  color: ${props => props.theme.colors.textDimmed};
  font-weight: 300;
  
  svg {
    color: ${props => props.theme.colors.success};
    flex-shrink: 0;
  }
`;

const ShowMoreBtn = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ExtraList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ExtraItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid ${props => props.checked ? props.theme.colors.borderAccent : props.theme.colors.border};
  background: ${props => props.checked ? 'rgba(212, 175, 55, 0.05)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: ${props => props.theme.colors.borderAccent};
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ExtraName = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
`;

const ExtraDesc = styled.span`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const ExtraPrice = styled.span`
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CheckIndicator = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? props.theme.colors.accent : props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
  
  svg {
    opacity: ${props => props.checked ? 1 : 0};
    color: ${props => props.theme.colors.accent};
    width: 14px;
    height: 14px;
  }
`;

const PriceBlock = styled(GlassCard)`
  text-align: center;
`;

const PriceTitle = styled.div`
  color: ${props => props.theme.colors.textDimmed};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const PriceValue = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.5rem;
  
  small {
    font-size: 1rem;
    color: ${props => props.theme.colors.textMuted};
    display: block;
  }
`;

const PriceBreakdown = styled.div`
  text-align: left;
  padding: 1rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1.5rem;
`;

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  color: ${props => props.theme.colors.textDimmed};
  font-size: 0.85rem;
`;

const DryCleaningWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DryCleaningSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const DCCategoryBtn = styled.button`
  text-align: left;
  padding: 1rem 1.2rem;
  background: ${props => props.active ? props.theme.colors.surface : 'transparent'};
  border: 1px solid ${props => props.active ? props.theme.colors.borderAccent : props.theme.colors.border};
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textDimmed};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: ${props => props.theme.colors.borderAccent};
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 900px) {
    flex: 1;
    min-width: 140px;
    text-align: center;
  }
`;

const DryCleaningContent = styled.div``;

const DCCategoryTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const DCCategoryDesc = styled.p`
  color: ${props => props.theme.colors.textDimmed};
  margin-bottom: 2rem;
  font-weight: 300;
`;

const DryCleaningGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DryCleaningCard = styled(GlassCard)`
  transition: all 0.3s;
  
  &:hover {
    border-color: ${props => props.theme.colors.borderAccent};
    transform: translateY(-4px);
  }
`;

const DCIcon = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${props => props.theme.colors.borderAccent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.2rem;
`;

const DCName = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
`;

const DCDesc = styled.p`
  color: ${props => props.theme.colors.textDimmed};
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const DCFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.2rem;
`;

const DCFeature = styled.li`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
  padding: 0.25rem 0;
  padding-left: 1rem;
  position: relative;
  font-weight: 300;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 1px;
    background: ${props => props.theme.colors.accent};
  }
`;

const DCFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const DCPrice = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  
  small {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.textMuted};
  }
`;

const DCQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text};
    min-width: 20px;
    text-align: center;
  }
`;

const Services = () => {
  const { addToCart } = useCart();
  const [mainTab, setMainTab] = useState('cleaning');
  const [cleaningSubTab, setCleaningSubTab] = useState('regular');
  const [rooms, setRooms] = useState(1);
  const [extras, setExtras] = useState([]);
  const [showAllIncluded, setShowAllIncluded] = useState(false);
  const [dcCategory, setDcCategory] = useState('clothing');
  const [dcQuantities, setDcQuantities] = useState({});

  const cleaningTypes = {
    regular: {
      name: 'Регулярная',
      pricePerRoom: 3500,
      unit: 'комнатная квартира',
      included: [
        'Влажная уборка полов и плинтусов',
        'Протирка всех доступных поверхностей от пыли',
        'Уборка кухни (плита, мойка, столешницы)',
        'Чистка санузла (ванна, унитаз, раковина)',
        'Вынос мусора',
        'Мытьё зеркал и стеклянных поверхностей',
        'Чистка розеток и выключателей',
        'Протирка дверей и дверных ручек',
        'Уборка под кроватями и за мебелью',
      ],
      extras: [
        { id: 'windows', name: 'Мытьё окон', price: 1500, desc: 'за окно, с двух сторон' },
        { id: 'fridge', name: 'Мытьё холодильника', price: 800, desc: 'внутри и снаружи' },
        { id: 'oven', name: 'Чистка духовки', price: 1200, desc: 'включая противни и решётки' },
        { id: 'microwave', name: 'Чистка микроволновки', price: 400, desc: 'внутри и снаружи' },
        { id: 'balcony', name: 'Уборка балкона', price: 1000, desc: 'влажная уборка, протирка окон' },
        { id: 'wardrobe', name: 'Уборка внутри шкафов', price: 600, desc: 'за шкаф, без вещей' },
      ]
    },
    general: {
      name: 'Генеральная',
      pricePerRoom: 8000,
      unit: 'комнатная квартира',
      included: [
        'Всё из регулярной уборки',
        'Мытьё окон с двух сторон',
        'Чистка вытяжки и кухонной техники',
        'Уборка внутри всех шкафов и ящиков',
        'Влажная чистка радиаторов отопления',
        'Удаление накипи с сантехники',
        'Чистка межплиточных швов',
        'Мытьё осветительных приборов',
        'Чистка плинтусов и карнизов',
        'Влажная чистка матраса',
        'Дезинфекция санузла',
        'Полировка зеркал и хромированных поверхностей',
      ],
      extras: [
        { id: 'windows_hard', name: 'Мытьё окон (сложный доступ)', price: 2500, desc: 'за окно, высота, сложная конструкция' },
        { id: 'fridge_defrost', name: 'Разморозка и мытьё холодильника', price: 1500, desc: 'полная разморозка и очистка' },
        { id: 'oven_steam', name: 'Паровая чистка духовки', price: 2000, desc: 'глубокая очистка паром' },
        { id: 'ac', name: 'Чистка кондиционера', price: 1800, desc: 'внешняя и внутренняя очистка' },
        { id: 'balcony_deep', name: 'Генеральная уборка балкона', price: 2500, desc: 'включая мытьё рам и остекления' },
        { id: 'kitchen_cabinets', name: 'Уборка кухонных шкафов', price: 2000, desc: 'все шкафы, включая посуду' },
        { id: 'walls', name: 'Мытьё стен', price: 3000, desc: 'все стены, без обоев под покраску' },
      ]
    },
    afterRepair: {
      name: 'После ремонта',
      pricePerRoom: 12000,
      unit: 'комнатная квартира',
      included: [
        'Удаление строительной пыли со всех поверхностей',
        'Влажная уборка полов (3 цикла до идеальной чистоты)',
        'Очистка оконных рам и стёкол от следов ремонта',
        'Уборка осветительных приборов',
        'Очистка розеток и выключателей',
        'Вынос строительного мусора (до 20 кг)',
        'Финальная полировка всех поверхностей',
        'Очистка радиаторов от строительной пыли',
        'Мытьё дверей и дверных коробок',
      ],
      extras: [
        { id: 'heavy_trash', name: 'Вынос крупного мусора', price: 3000, desc: 'до 100 кг, мешки включены' },
        { id: 'paint_removal', name: 'Удаление следов краски', price: 5000, desc: 'с полов, окон, дверей' },
        { id: 'grout_cleaning', name: 'Глубокая очистка швов', price: 4000, desc: 'химическая очистка межплиточных швов' },
        { id: 'ventilation', name: 'Чистка вентиляции', price: 2500, desc: 'профессиональная очистка каналов' },
        { id: 'polishing', name: 'Полировка полов', price: 3500, desc: 'машинная полировка твёрдых покрытий' },
      ]
    }
  };

  const dryCleaningCategories = {
    clothing: {
      name: 'Одежда',
      icon: Shirt,
      desc: 'Профессиональная химчистка одежды из любых тканей. Бережное удаление пятен, запахов, восстановление цвета и формы.',
      items: [
        { id: 'dc_coat', name: 'Пальто / куртка', price: 2500, unit: 'за изделие', features: ['Деликатная чистка', 'Удаление пятен', 'Восстановление водоотталкивающей пропитки'] },
        { id: 'dc_suit', name: 'Костюм', price: 1800, unit: 'за комплект', features: ['Чистка пиджака и брюк', 'Сохранение формы', 'Обработка подкладки'] },
        { id: 'dc_dress', name: 'Платье вечернее', price: 2200, unit: 'за изделие', features: ['Ручная обработка деликатных тканей', 'Удаление сложных пятен', 'Сохранение декора'] },
        { id: 'dc_blouse', name: 'Блуза / рубашка', price: 700, unit: 'за изделие', features: ['Чистка воротника и манжет', 'Глажка', 'Упаковка на плечиках'] },
        { id: 'dc_knit', name: 'Трикотаж / свитер', price: 900, unit: 'за изделие', features: ['Бережная чистка', 'Сохранение формы', 'Антистатическая обработка'] },
        { id: 'dc_skirt', name: 'Юбка', price: 800, unit: 'за изделие', features: ['Чистка подкладки', 'Сохранение складок', 'Глажка'] },
      ]
    },
    curtains: {
      name: 'Шторы и текстиль',
      icon: Wind,
      desc: 'Чистка штор, гардин, тюля и домашнего текстиля. Снятие, чистка и навеска включены в стоимость.',
      items: [
        { id: 'dc_curtains_light', name: 'Тюль (до 3 м)', price: 900, unit: 'за полотно', features: ['Деликатная стирка', 'Сушка в расправленном виде', 'Глажка'] },
        { id: 'dc_curtains_heavy', name: 'Портьеры (до 3 м)', price: 1800, unit: 'за полотно', features: ['Чистка с учётом типа ткани', 'Снятие и навеска', 'Обработка от пылевых клещей'] },
        { id: 'dc_curtains_blackout', name: 'Блэкаут шторы', price: 2200, unit: 'за полотно', features: ['Специальная чистка', 'Сохранение светонепроницаемости', 'Снятие и навеска'] },
        { id: 'dc_blanket', name: 'Плед / покрывало', price: 1500, unit: 'за изделие', features: ['Глубокая чистка', 'Удаление катышков', 'Антистатическая обработка'] },
        { id: 'dc_pillows', name: 'Декоративные подушки', price: 600, unit: 'за штуку', features: ['Чистка чехла', 'Обработка наполнителя', 'Восстановление формы'] },
      ]
    },
    furniture: {
      name: 'Мебель',
      icon: Sofa,
      desc: 'Глубокая чистка мягкой и корпусной мебели. Удаление сложных пятен, запахов, аллергенов и бактерий.',
      items: [
        { id: 'dc_sofa_2', name: 'Диван 2-местный', price: 3500, unit: 'за изделие', features: ['Глубокая экстракция', 'Удаление пятен', 'Дезодорация', 'Антибактериальная обработка'] },
        { id: 'dc_sofa_3', name: 'Диван 3-местный', price: 5000, unit: 'за изделие', features: ['Глубокая экстракция', 'Удаление пятен', 'Дезодорация', 'Защитное покрытие'] },
        { id: 'dc_armchair', name: 'Кресло', price: 2000, unit: 'за изделие', features: ['Чистка обивки', 'Обработка подлокотников', 'Дезодорация'] },
        { id: 'dc_mattress', name: 'Матрас', price: 3000, unit: 'за изделие', features: ['Глубокая чистка', 'Удаление пылевых клещей', 'УФ-обработка', 'Дезодорация'] },
        { id: 'dc_chair', name: 'Стул (обивка)', price: 800, unit: 'за штуку', features: ['Чистка сиденья и спинки', 'Удаление пятен', 'Быстрая сушка'] },
        { id: 'dc_headboard', name: 'Изголовье кровати', price: 1500, unit: 'за изделие', features: ['Чистка обивки', 'Удаление пятен', 'Антистатическая обработка'] },
      ]
    },
    carpets: {
      name: 'Ковры',
      icon: Sparkles,
      desc: 'Профессиональная чистка ковров и ковровых покрытий. Выезд, вывоз, чистка в цеху, доставка обратно.',
      items: [
        { id: 'dc_carpet_small', name: 'Ковёр до 6 м2', price: 1800, unit: 'за изделие', features: ['Глубокая чистка', 'Вывоз и доставка', 'Сушка в цеху', 'Антистатическая обработка'] },
        { id: 'dc_carpet_medium', name: 'Ковёр 6-12 м2', price: 3500, unit: 'за изделие', features: ['Глубокая чистка', 'Вывоз и доставка', 'Сушка в цеху', 'Защитная пропитка'] },
        { id: 'dc_carpet_large', name: 'Ковёр от 12 м2', price: 6000, unit: 'за изделие', features: ['Глубокая чистка', 'Вывоз и доставка', 'Сушка в цеху', 'Полное восстановление ворса'] },
        { id: 'dc_carpet_wool', name: 'Шерстяной ковёр', price: 2500, unit: 'за м2', features: ['Деликатная чистка', 'Сохранение цвета', 'Ручная обработка', 'Кондиционирование ворса'] },
        { id: 'dc_carpet_silk', name: 'Шёлковый ковёр', price: 5000, unit: 'за м2', features: ['Ручная чистка', 'pH-нейтральные средства', 'Сохранение блеска', 'Индивидуальный подход'] },
      ]
    },
    shoes: {
      name: 'Обувь',
      icon: Footprints,
      desc: 'Восстановление и глубокая чистка обуви из любых материалов. Возвращаем первоначальный вид.',
      items: [
        { id: 'dc_shoes_leather', name: 'Кожаная обувь', price: 1800, unit: 'за пару', features: ['Глубокая чистка', 'Восстановление цвета', 'Полировка', 'Защитная пропитка'] },
        { id: 'dc_shoes_suede', name: 'Замшевая обувь', price: 2200, unit: 'за пару', features: ['Сухая чистка', 'Восстановление ворса', 'Защита от влаги', 'Удаление пятен'] },
        { id: 'dc_shoes_sneakers', name: 'Кроссовки / кеды', price: 1500, unit: 'за пару', features: ['Глубокая чистка', 'Отбеливание подошвы', 'Дезодорация', 'Чистка шнурков'] },
        { id: 'dc_shoes_boots', name: 'Сапоги / ботинки', price: 2500, unit: 'за пару', features: ['Полная чистка', 'Восстановление кожи', 'Защитная пропитка', 'Полировка'] },
      ]
    },
    laundry: {
      name: 'Стирка и глажка',
      icon: Shirt,
      desc: 'Полный цикл: сортировка, стирка с правильным режимом, сушка, глажка. Складные вещи или на плечиках.',
      items: [
        { id: 'dc_laundry_5', name: 'Стирка + глажка (до 5 кг)', price: 1500, unit: 'за комплект', features: ['Сортировка по цвету и ткани', 'Правильный режим стирки', 'Сушка', 'Глажка и упаковка'] },
        { id: 'dc_laundry_10', name: 'Стирка + глажка (до 10 кг)', price: 2500, unit: 'за комплект', features: ['Сортировка по цвету и ткани', 'Правильный режим стирки', 'Сушка', 'Глажка и упаковка'] },
        { id: 'dc_laundry_delicate', name: 'Деликатная стирка', price: 2000, unit: 'до 5 кг', features: ['Ручная стирка деликатных тканей', 'Специальные средства', 'Сушка в расправленном виде', 'Бережная глажка'] },
        { id: 'dc_ironing_only', name: 'Только глажка', price: 1000, unit: 'до 5 кг', features: ['Глажка на профессиональном оборудовании', 'Складные вещи или на плечиках', 'Упаковка'] },
        { id: 'dc_bed_linen', name: 'Постельное бельё', price: 800, unit: 'за комплект', features: ['Стирка при высокой температуре', 'Глажка', 'Аккуратное складывание'] },
        { id: 'dc_towels', name: 'Полотенца / халаты', price: 600, unit: 'до 5 шт', features: ['Стирка с кондиционером', 'Сушка', 'Пушистое складывание'] },
      ]
    },
  };

  const currentCleaning = cleaningTypes[cleaningSubTab];
  const basePrice = currentCleaning.pricePerRoom * rooms;
  const extrasTotal = extras.reduce((sum, id) => {
    const item = currentCleaning.extras.find(e => e.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalPrice = basePrice + extrasTotal;

  const handleAddCleaning = () => {
    const service = {
      id: Date.now(),
      title: `Уборка: ${currentCleaning.name} (${rooms}-комнатная)`,
      price: totalPrice,
      quantity: 1,
      details: `Тип: ${currentCleaning.name} | Комнат: ${rooms} | Дополнительно: ${extras.length > 0 ? extras.map(id => currentCleaning.extras.find(e => e.id === id)?.name).join(', ') : 'нет'}`
    };
    addToCart(service);
    setExtras([]);
  };

  const handleAddDryCleaning = (item) => {
    const qty = dcQuantities[item.id] || 1;
    addToCart({
      id: Date.now() + Math.random(),
      title: `Химчистка: ${item.name}`,
      price: item.price * qty,
      quantity: 1,
      details: `${item.name} | Количество: ${qty} | ${item.unit}`
    });
    setDcQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const updateDcQuantity = (id, delta) => {
    setDcQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const visibleIncluded = showAllIncluded 
    ? currentCleaning.included 
    : currentCleaning.included.slice(0, 6);

  const currentDC = dryCleaningCategories[dcCategory];

  return (
    <Container>
      <Header>
        <Label>Services</Label>
        <Title>Наши услуги</Title>
      </Header>

      <TabsWrapper>
        <Tab active={mainTab === 'cleaning'} onClick={() => setMainTab('cleaning')}>
          Уборка
        </Tab>
        <Tab active={mainTab === 'drycleaning'} onClick={() => setMainTab('drycleaning')}>
          Химчистка
        </Tab>
      </TabsWrapper>

      {mainTab === 'cleaning' && (
        <>
          <SubTabsWrapper>
            {Object.entries(cleaningTypes).map(([key, val]) => (
              <SubTab
                key={key}
                active={cleaningSubTab === key}
                onClick={() => { setCleaningSubTab(key); setExtras([]); setShowAllIncluded(false); }}
              >
                {val.name}
              </SubTab>
            ))}
          </SubTabsWrapper>

          <RoomsSelector>
            <RoomsLabel>Количество комнат:</RoomsLabel>
            <RoomsControl>
              <RoomBtn onClick={() => setRooms(Math.max(1, rooms - 1))} disabled={rooms <= 1}>
                <Minus size={18} />
              </RoomBtn>
              <RoomValue>{rooms}</RoomValue>
              <RoomBtn onClick={() => setRooms(Math.min(6, rooms + 1))} disabled={rooms >= 6}>
                <Plus size={18} />
              </RoomBtn>
            </RoomsControl>
          </RoomsSelector>

          <ServiceContent>
            <MainInfo>
              <InfoBlock>
                <BlockTitle>Что входит</BlockTitle>
                <IncludedList>
                  {visibleIncluded.map((item, i) => (
                    <IncludedItem key={i}>
                      <Check size={16} />
                      {item}
                    </IncludedItem>
                  ))}
                </IncludedList>
                {currentCleaning.included.length > 6 && (
                  <ShowMoreBtn onClick={() => setShowAllIncluded(!showAllIncluded)}>
                    {showAllIncluded ? (
                      <>Свернуть <ChevronUp size={16} /></>
                    ) : (
                      <>Подробнее <ChevronDown size={16} /></>
                    )}
                  </ShowMoreBtn>
                )}
              </InfoBlock>

              <InfoBlock>
                <BlockTitle>Дополнительные услуги</BlockTitle>
                <ExtraList>
                  {currentCleaning.extras.map(extra => (
                    <ExtraItem key={extra.id} checked={extras.includes(extra.id)}>
                      <ExtraInfo>
                        <ExtraName>{extra.name}</ExtraName>
                        <ExtraDesc>{extra.desc}</ExtraDesc>
                      </ExtraInfo>
                      <ExtraPrice>
                        +{extra.price.toLocaleString()} P
                      </ExtraPrice>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={extras.includes(extra.id)}
                        onChange={() => {
                          setExtras(prev => 
                            prev.includes(extra.id) ? prev.filter(e => e !== extra.id) : [...prev, extra.id]
                          );
                        }}
                      />
                      <CheckIndicator checked={extras.includes(extra.id)}>
                        <Check size={14} />
                      </CheckIndicator>
                    </ExtraItem>
                  ))}
                </ExtraList>
              </InfoBlock>
            </MainInfo>

            <SidePanel>
              <PriceBlock>
                <PriceTitle>Стоимость</PriceTitle>
                <PriceValue>
                  {totalPrice.toLocaleString()} P
                  <small>{rooms}-{currentCleaning.unit}</small>
                </PriceValue>
                <PriceBreakdown>
                  <BreakdownRow>
                    <span>Базовая цена ({rooms} комн.)</span>
                    <span>{basePrice.toLocaleString()} P</span>
                  </BreakdownRow>
                  {extrasTotal > 0 && (
                    <BreakdownRow>
                      <span>Дополнительно</span>
                      <span>{extrasTotal.toLocaleString()} P</span>
                    </BreakdownRow>
                  )}
                </PriceBreakdown>
                <Button onClick={handleAddCleaning} style={{ width: '100%', justifyContent: 'center' }}>
                  <Plus size={18} /> В корзину
                </Button>
              </PriceBlock>
            </SidePanel>
          </ServiceContent>
        </>
      )}

      {mainTab === 'drycleaning' && (
        <DryCleaningWrapper>
          <DryCleaningSidebar>
            {Object.entries(dryCleaningCategories).map(([key, val]) => (
              <DCCategoryBtn
                key={key}
                active={dcCategory === key}
                onClick={() => setDcCategory(key)}
              >
                <val.icon size={18} style={{ marginRight: '0.8rem', verticalAlign: 'middle' }} />
                {val.name}
              </DCCategoryBtn>
            ))}
          </DryCleaningSidebar>

          <DryCleaningContent>
            <DCCategoryTitle>{currentDC.name}</DCCategoryTitle>
            <DCCategoryDesc>{currentDC.desc}</DCCategoryDesc>

            <DryCleaningGrid>
              {currentDC.items.map(item => (
                <DryCleaningCard key={item.id}>
                  <DCIcon>
                    <currentDC.icon size={24} />
                  </DCIcon>
                  <DCName>{item.name}</DCName>
                  <DCDesc>{item.unit}</DCDesc>
                  <DCFeatures>
                    {item.features.map((f, i) => (
                      <DCFeature key={i}>{f}</DCFeature>
                    ))}
                  </DCFeatures>
                  <DCFooter>
                    <DCPrice>
                      {item.price.toLocaleString()} P <small>/ {item.unit.split(' ').pop()}</small>
                    </DCPrice>
                    <DCQuantity>
                      <RoomBtn onClick={() => updateDcQuantity(item.id, -1)} disabled={(dcQuantities[item.id] || 1) <= 1}>
                        <Minus size={14} />
                      </RoomBtn>
                      <span>{dcQuantities[item.id] || 1}</span>
                      <RoomBtn onClick={() => updateDcQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </RoomBtn>
                    </DCQuantity>
                  </DCFooter>
                  <Button 
                    onClick={() => handleAddDryCleaning(item)} 
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    variant="outline"
                  >
                    <Plus size={18} /> В корзину
                  </Button>
                </DryCleaningCard>
              ))}
            </DryCleaningGrid>
          </DryCleaningContent>
        </DryCleaningWrapper>
      )}
    </Container>
  );
};

export default Services;