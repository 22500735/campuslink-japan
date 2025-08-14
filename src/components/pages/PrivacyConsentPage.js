import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiToggleLeft, FiToggleRight, FiFileText, FiShield } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const PrivacyConsentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 30px;
  color: white;
  position: relative;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.5)' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const ConsentCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  overflow: hidden;
`;

const ConsentItem = styled.div`
  padding: 20px;
  border-bottom: ${props => props.isLast ? 'none' : `1px solid ${props.darkMode ? '#404040' : '#f0f0f0'}`};
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon {
    width: 24px;
    height: 24px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  .content {
    flex: 1;
    
    .title {
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.darkMode ? '#ffffff' : '#333'};
      margin-bottom: 4px;
    }
    
    .description {
      font-size: 14px;
      color: ${props => props.darkMode ? '#d1d5db' : '#666'};
      line-height: 1.4;
    }
  }
  
  .toggle {
    cursor: pointer;
    color: ${props => props.enabled ? 
      (props.darkMode ? '#4ade80' : '#00A86B') : 
      (props.darkMode ? '#6b7280' : '#9ca3af')
    };
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const InfoText = styled.p`
  font-size: 14px;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 16px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  border-radius: 12px;
  border: 1px solid ${props => props.darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(0, 168, 107, 0.1)'};
`;

const PrivacyConsentPage = ({ onBack, darkMode }) => {
  const { t } = useLanguage();
  const [consents, setConsents] = useState({
    advertising: true,
    personalInfo: true,
    analytics: false,
    marketing: false,
    thirdParty: false
  });

  const toggleConsent = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const consentItems = [
    {
      id: 'advertising',
      icon: FiFileText,
      title: t('advertisingConsent'),
      description: '맞춤형 광고 및 마케팅 정보 수신에 동의합니다.',
      required: false
    },
    {
      id: 'personalInfo',
      icon: FiShield,
      title: t('personalInfoConsent'),
      description: '서비스 이용을 위한 개인정보 수집 및 이용에 동의합니다.',
      required: true
    },
    {
      id: 'analytics',
      icon: FiFileText,
      title: '서비스 분석 동의',
      description: '서비스 개선을 위한 이용 패턴 분석에 동의합니다.',
      required: false
    },
    {
      id: 'marketing',
      icon: FiFileText,
      title: '마케팅 활용 동의',
      description: '이벤트, 혜택 정보 등 마케팅 목적의 정보 수신에 동의합니다.',
      required: false
    },
    {
      id: 'thirdParty',
      icon: FiShield,
      title: '제3자 정보 제공 동의',
      description: '파트너사 서비스 제공을 위한 정보 제공에 동의합니다.',
      required: false
    }
  ];

  return (
    <PrivacyConsentContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('privacyConsent')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <InfoText darkMode={darkMode}>
          처음 로그인 시 동의한 약관들을 여기서 관리할 수 있습니다. 
          필수 항목은 서비스 이용을 위해 반드시 동의가 필요하며, 
          선택 항목은 언제든지 변경할 수 있습니다.
        </InfoText>

        <ConsentCard darkMode={darkMode}>
          {consentItems.map((item, index) => (
            <ConsentItem 
              key={item.id} 
              darkMode={darkMode} 
              isLast={index === consentItems.length - 1}
              enabled={consents[item.id]}
            >
              <item.icon className="icon" />
              <div className="content">
                <div className="title">
                  {item.title}
                  {item.required && (
                    <span style={{ 
                      color: '#ef4444', 
                      fontSize: '12px', 
                      marginLeft: '8px' 
                    }}>
                      (필수)
                    </span>
                  )}
                </div>
                <div className="description">{item.description}</div>
              </div>
              {!item.required && (
                <div 
                  className="toggle"
                  onClick={() => toggleConsent(item.id)}
                >
                  {consents[item.id] ? 
                    <FiToggleRight size={32} /> : 
                    <FiToggleLeft size={32} />
                  }
                </div>
              )}
              {item.required && (
                <div className="toggle" style={{ color: '#4ade80' }}>
                  <FiToggleRight size={32} />
                </div>
              )}
            </ConsentItem>
          ))}
        </ConsentCard>
      </ContentSection>
    </PrivacyConsentContainer>
  );
};

export default PrivacyConsentPage;
