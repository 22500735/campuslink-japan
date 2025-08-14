import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShield, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const CommunityRestrictionsContainer = styled.div`
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

const EmptyStateCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(0, 168, 107, 0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  .icon {
    width: 40px;
    height: 40px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  line-height: 1.5;
  margin: 0;
`;

const RestrictionCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  overflow: hidden;
`;

const RestrictionHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon {
    width: 24px;
    height: 24px;
    color: #ef4444;
  }
  
  .content {
    flex: 1;
    
    .title {
      font-size: 18px;
      font-weight: 700;
      color: ${props => props.darkMode ? '#fff' : '#333'};
      margin-bottom: 4px;
    }
    
    .date {
      font-size: 14px;
      color: ${props => props.darkMode ? '#9ca3af' : '#666'};
    }
  }
`;

const RestrictionDetails = styled.div`
  padding: 20px;
  
  .reason {
    font-size: 16px;
    color: ${props => props.darkMode ? '#d1d5db' : '#333'};
    margin-bottom: 12px;
    line-height: 1.5;
  }
  
  .duration {
    font-size: 14px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
    background: ${props => props.darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'};
    padding: 8px 12px;
    border-radius: 8px;
    display: inline-block;
  }
`;

const CommunityRestrictionsPage = ({ onBack, darkMode }) => {
  const { t } = useLanguage();
  
  // Mock data - in real app this would come from API
  const restrictions = [];
  
  // Example of what restrictions might look like:
  // const restrictions = [
  //   {
  //     id: 1,
  //     type: 'コメント制限',
  //     reason: '부적절한 언어 사용으로 인한 제재',
  //     startDate: '2024-01-15',
  //     endDate: '2024-01-22',
  //     duration: '7일간'
  //   }
  // ];

  return (
    <CommunityRestrictionsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('communityRestrictions')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {restrictions.length === 0 ? (
          <EmptyStateCard darkMode={darkMode}>
            <EmptyIcon darkMode={darkMode}>
              <FiShield className="icon" />
            </EmptyIcon>
            <EmptyTitle darkMode={darkMode}>
              {t('noRestrictions')}
            </EmptyTitle>
            <EmptyDescription darkMode={darkMode}>
              コミュニティ이용에 제한이 없습니다.<br />
              건전한 커뮤니티 문화를 위해 계속 노력해주세요.
            </EmptyDescription>
          </EmptyStateCard>
        ) : (
          restrictions.map(restriction => (
            <RestrictionCard key={restriction.id} darkMode={darkMode}>
              <RestrictionHeader darkMode={darkMode}>
                <FiAlertCircle className="icon" />
                <div className="content">
                  <div className="title">{restriction.type}</div>
                  <div className="date">{restriction.startDate} ~ {restriction.endDate}</div>
                </div>
              </RestrictionHeader>
              <RestrictionDetails darkMode={darkMode}>
                <div className="reason">{restriction.reason}</div>
                <div className="duration">제재 기간: {restriction.duration}</div>
              </RestrictionDetails>
            </RestrictionCard>
          ))
        )}
      </ContentSection>
    </CommunityRestrictionsContainer>
  );
};

export default CommunityRestrictionsPage;
