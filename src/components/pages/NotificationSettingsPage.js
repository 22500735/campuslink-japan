import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBell, FiPlus, FiX, FiBook, FiTag, FiDollarSign } from 'react-icons/fi';

const SettingsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a202c' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  padding: 60px 20px 20px;
  color: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  position: relative;
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertCard = styled.div`
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 2px solid ${props => props.active ? '#00A86B' : (props.darkMode ? '#4a5568' : '#e9ecef')};
  transition: all 0.3s ease;
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AlertTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${props => props.darkMode ? 'white' : '#333'};
`;

const AlertToggle = styled.button`
  position: relative;
  width: 48px;
  height: 24px;
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#4a5568' : '#cbd5e0')};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const AlertDescription = styled.p`
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

const AddAlertButton = styled.button`
  width: 100%;
  padding: 16px;
  border: 2px dashed ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  color: ${props => props.darkMode ? '#e2e8f0' : '#666'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: #00A86B;
    color: #00A86B;
    background: ${props => props.darkMode ? '#2d3748' : '#f0f8f5'};
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.darkMode ? '#4a5568' : '#f8f9fa'};
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#e2e8f0' : '#333'};
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }

  &::placeholder {
    color: ${props => props.darkMode ? '#a0aec0' : '#999'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.primary ? `
    background: #00A86B;
    color: white;
    
    &:hover {
      background: #008f5a;
      transform: translateY(-1px);
    }
  ` : `
    background: ${props.darkMode ? '#4a5568' : '#f8f9fa'};
    color: ${props.darkMode ? '#e2e8f0' : '#666'};
    
    &:hover {
      background: ${props.darkMode ? '#2d3748' : '#e9ecef'};
    }
  `}
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;

const NotificationSettingsPage = ({ onBack, darkMode = false }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'category',
      category: '전공책',
      subcategory: '마케팅원론',
      title: '마케팅원론 전공책',
      description: '마케팅원론 수업 관련 전공책이 새로 등록되면 알림을 받습니다.',
      active: true
    },
    {
      id: 2,
      type: 'category',
      category: '전자기기',
      subcategory: '공학계산기',
      title: '공학계산기',
      description: '공학계산기가 새로 등록되면 알림을 받습니다.',
      active: true
    },
    {
      id: 3,
      type: 'price',
      category: '악기',
      subcategory: '기타',
      maxPrice: 100000,
      title: '기타 (10만원 이하)',
      description: '10만원 이하의 기타가 등록되면 알림을 받습니다.',
      active: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: 'category',
    category: '',
    subcategory: '',
    maxPrice: ''
  });

  const categories = {
    '책': ['전공책', '부교재', '참고서', '문제집'],
    '전자기기': ['계산기', '노트북', '태블릿', '기타'],
    '문구용품': ['필기구', '노트', '바인더', '기타'],
    '생활용품': ['가구', '생활잡화', '의류', '기타'],
    '악기': ['기타', '피아노', '관악기', '현악기'],
    '기타': ['스포츠용품', '취미용품', '기타']
  };

  const courseSubjects = [
    '마케팅원론', '경영학개론', '미시경제학', '거시경제학', '회계원리',
    '재무관리', '조직행동론', '경영전략론', '생산관리', '인사관리'
  ];

  const toggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const addAlert = () => {
    if (!newAlert.category) return;

    const alertData = {
      id: Date.now(),
      ...newAlert,
      active: true
    };

    // Generate title and description
    if (newAlert.type === 'category') {
      if (newAlert.category === '책' && newAlert.subcategory === '전공책') {
        alertData.title = `${newAlert.courseSubject} 전공책`;
        alertData.description = `${newAlert.courseSubject} 수업 관련 전공책이 새로 등록되면 알림을 받습니다.`;
      } else {
        alertData.title = newAlert.subcategory || newAlert.category;
        alertData.description = `${newAlert.subcategory || newAlert.category}가 새로 등록되면 알림을 받습니다.`;
      }
    } else if (newAlert.type === 'price') {
      alertData.title = `${newAlert.subcategory || newAlert.category} (${parseInt(newAlert.maxPrice).toLocaleString()}원 이하)`;
      alertData.description = `${parseInt(newAlert.maxPrice).toLocaleString()}원 이하의 ${newAlert.subcategory || newAlert.category}가 등록되면 알림을 받습니다.`;
    }

    setAlerts([...alerts, alertData]);
    setNewAlert({ type: 'category', category: '', subcategory: '', maxPrice: '' });
    setShowModal(false);
  };

  return (
    <SettingsContainer darkMode={darkMode}>
      <Header>
        <BackButton onClick={onBack}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>알림 설정</Title>
      </Header>

      <ContentArea>
        <Section darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiBell size={20} />
            카테고리별 알림
          </SectionTitle>
          
          {alerts.map((alert) => (
            <AlertCard key={alert.id} darkMode={darkMode} active={alert.active}>
              <AlertHeader>
                <AlertTitle darkMode={darkMode}>
                  {alert.type === 'price' ? <FiDollarSign size={16} /> : <FiTag size={16} />}
                  {alert.title}
                </AlertTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RemoveButton onClick={() => removeAlert(alert.id)}>
                    <FiX size={16} />
                  </RemoveButton>
                  <AlertToggle
                    active={alert.active}
                    onClick={() => toggleAlert(alert.id)}
                  />
                </div>
              </AlertHeader>
              <AlertDescription darkMode={darkMode}>
                {alert.description}
              </AlertDescription>
            </AlertCard>
          ))}

          <AddAlertButton darkMode={darkMode} onClick={() => setShowModal(true)}>
            <FiPlus size={16} />
            새 알림 추가
          </AddAlertButton>
        </Section>
      </ContentArea>

      {showModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <ModalContainer
            darkMode={darkMode}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader darkMode={darkMode}>
              <ModalTitle darkMode={darkMode}>新しい通知を追加</ModalTitle>
              <CloseButton darkMode={darkMode} onClick={() => setShowModal(false)}>
                <FiX size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              <FormGroup>
                <Label darkMode={darkMode}>通知タイプ</Label>
                <Select
                  darkMode={darkMode}
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value, category: '', subcategory: '', maxPrice: '' })}
                >
                  <option value="category">カテゴリ通知</option>
                  <option value="price">価格条件通知</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label darkMode={darkMode}>カテゴリ</Label>
                <Select
                  darkMode={darkMode}
                  value={newAlert.category}
                  onChange={(e) => setNewAlert({ ...newAlert, category: e.target.value, subcategory: '' })}
                >
                  <option value="">カテゴリを選択してください</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
              </FormGroup>

              {newAlert.category && (
                <FormGroup>
                  <Label darkMode={darkMode}>詳細カテゴリ</Label>
                  <Select
                    darkMode={darkMode}
                    value={newAlert.subcategory}
                    onChange={(e) => setNewAlert({ ...newAlert, subcategory: e.target.value })}
                  >
                    <option value="">詳細カテゴリを選択してください</option>
                    {categories[newAlert.category]?.map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </Select>
                </FormGroup>
              )}

              {newAlert.category === '책' && newAlert.subcategory === '전공책' && (
                <FormGroup>
                  <Label darkMode={darkMode}>
                    <FiBook size={16} style={{ marginRight: '4px' }} />
                    授業名
                  </Label>
                  <Select
                    darkMode={darkMode}
                    value={newAlert.courseSubject}
                    onChange={(e) => setNewAlert({ ...newAlert, courseSubject: e.target.value })}
                  >
                    <option value="">授業を選択してください</option>
                    {courseSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Select>
                </FormGroup>
              )}

              {newAlert.type === 'price' && (
                <FormGroup>
                  <Label darkMode={darkMode}>最大価格 (円)</Label>
                  <Input
                    darkMode={darkMode}
                    type="number"
                    placeholder="例: 100000"
                    value={newAlert.maxPrice}
                    onChange={(e) => setNewAlert({ ...newAlert, maxPrice: e.target.value })}
                  />
                </FormGroup>
              )}
            </ModalContent>

            <ButtonContainer darkMode={darkMode}>
              <Button darkMode={darkMode} onClick={() => setShowModal(false)}>
                キャンセル
              </Button>
              <Button 
                primary 
                darkMode={darkMode} 
                onClick={addAlert}
                disabled={!newAlert.category}
              >
                通知追加
              </Button>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
      )}
    </SettingsContainer>
  );
};

export default NotificationSettingsPage;
