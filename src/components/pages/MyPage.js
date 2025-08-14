import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiEdit3, FiSettings, FiShield, FiHelpCircle, FiMoreHorizontal, FiLogOut, FiTrash2 } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import ProfileSettingsPage from './ProfileSettingsPage';
import NicknameSettingsPage from './NicknameSettingsPage';
import AccountSettingsPage from './AccountSettingsPage';
import CommunityRestrictionsPage from './CommunityRestrictionsPage';
import InformationGuidePage from './InformationGuidePage';
import PrivacyConsentPage from './PrivacyConsentPage';

const MyPageContainer = styled.div`
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

const ProfileCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

const ProfileInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
  }
  
  .status {
    font-size: 14px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    font-weight: 600;
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  .label {
    font-size: 12px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .value {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const SettingsButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.2)' : 'rgba(0, 168, 107, 0.1)'};
  border: 1px solid ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  border-radius: 12px;
  color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.3)' : 'rgba(0, 168, 107, 0.2)'};
  }
`;

const NicknameCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NicknameInfo = styled.div`
  .label {
    font-size: 12px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .nickname {
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const EditButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.2)' : 'rgba(0, 168, 107, 0.1)'};
  border: 1px solid ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  border-radius: 8px;
  color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.3)' : 'rgba(0, 168, 107, 0.2)'};
  }
`;

const SettingsGroup = styled.div`
  margin-bottom: 32px;
`;

const GroupTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#e5e7eb' : '#666'};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SettingsCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  overflow: hidden;
`;

const SettingsItem = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background: transparent;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  border-bottom: ${props => props.isLast ? 'none' : `1px solid ${props.darkMode ? '#404040' : '#f0f0f0'}`};
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  }
  
  .icon {
    width: 24px;
    height: 24px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  .content {
    flex: 1;
    text-align: left;
    
    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      color: ${props => props.darkMode ? '#ffffff' : '#333'};
    }
    
    .subtitle {
      font-size: 14px;
      color: ${props => props.darkMode ? '#d1d5db' : '#666'};
    }
  }
`;

const DangerButton = styled(SettingsItem)`
  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
  
  .icon {
    color: #ef4444;
  }
  
  .content .title {
    color: #ef4444;
  }
`;

const MyPage = ({ onBack, darkMode, onLogout }) => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState('main');
  const [userData] = useState({
    name: '田中太郎',
    nickname: 'たなか',
    school: '青山学院大学',
    major: '情報テクノロジー学科',
    minor: 'データサイエンス',
    studentId: '21G1234567',
    status: 'enrolled',
    userId: 'tanaka_taro_2021'
  });

  const handleBack = () => {
    if (currentView === 'main') {
      onBack();
    } else {
      setCurrentView('main');
    }
  };

  if (currentView === 'profileSettings') {
    return <ProfileSettingsPage onBack={handleBack} darkMode={darkMode} userData={userData} />;
  }
  
  if (currentView === 'nicknameSettings') {
    return <NicknameSettingsPage onBack={handleBack} darkMode={darkMode} userData={userData} />;
  }
  
  if (currentView === 'accountSettings') {
    return <AccountSettingsPage onBack={handleBack} darkMode={darkMode} userData={userData} />;
  }
  
  if (currentView === 'communityRestrictions') {
    return <CommunityRestrictionsPage onBack={handleBack} darkMode={darkMode} />;
  }
  
  if (currentView === 'informationGuide') {
    return <InformationGuidePage onBack={handleBack} darkMode={darkMode} />;
  }
  
  if (currentView === 'privacyConsent') {
    return <PrivacyConsentPage onBack={handleBack} darkMode={darkMode} />;
  }

  return (
    <MyPageContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={handleBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('myPage')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {/* Profile Card */}
        <ProfileCard darkMode={darkMode}>
          <ProfileHeader>
            <ProfileAvatar>
              {userData.name.charAt(0)}
            </ProfileAvatar>
            <ProfileInfo darkMode={darkMode}>
              <div className="name">{userData.name}</div>
              <div className="status">
                {userData.status === 'enrolled' ? t('enrolled') : 
                 userData.status === 'onLeave' ? t('onLeave') : t('graduated')}
              </div>
            </ProfileInfo>
          </ProfileHeader>
          
          <ProfileDetails>
            <DetailItem darkMode={darkMode}>
              <div className="label">{t('school')}</div>
              <div className="value">{userData.school}</div>
            </DetailItem>
            <DetailItem darkMode={darkMode}>
              <div className="label">{t('major')}</div>
              <div className="value">{userData.major}</div>
            </DetailItem>
            <DetailItem darkMode={darkMode}>
              <div className="label">{t('minor')}</div>
              <div className="value">{userData.minor}</div>
            </DetailItem>
            <DetailItem darkMode={darkMode}>
              <div className="label">{t('studentId')}</div>
              <div className="value">{userData.studentId}</div>
            </DetailItem>
          </ProfileDetails>
          
          <SettingsButton darkMode={darkMode} onClick={() => setCurrentView('profileSettings')}>
            <FiSettings size={16} />
            {t('profileSettings')}
          </SettingsButton>
        </ProfileCard>

        {/* Nickname Card */}
        <NicknameCard darkMode={darkMode}>
          <NicknameInfo darkMode={darkMode}>
            <div className="label">{t('nickname')}</div>
            <div className="nickname">{userData.nickname}</div>
          </NicknameInfo>
          <EditButton darkMode={darkMode} onClick={() => setCurrentView('nicknameSettings')}>
            <FiEdit3 size={14} />
            {t('settings')}
          </EditButton>
        </NicknameCard>

        {/* Account Settings */}
        <SettingsGroup>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode} isLast onClick={() => setCurrentView('accountSettings')}>
              <FiUser className="icon" />
              <div className="content">
                <div className="title">{t('accountSettings')}</div>
                <div className="subtitle">ID・パスワード・メール設定</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>

        {/* Community */}
        <SettingsGroup>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode} isLast onClick={() => setCurrentView('communityRestrictions')}>
              <FiShield className="icon" />
              <div className="content">
                <div className="title">{t('communityRestrictions')}</div>
                <div className="subtitle">利用制限内容確認</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>

        {/* Information Guide */}
        <SettingsGroup>
          <GroupTitle darkMode={darkMode}>{t('informationGuide')}</GroupTitle>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode}>
              <div className="content">
                <div className="title">{t('appVersion')}</div>
                <div className="subtitle">8.1.31</div>
              </div>
            </SettingsItem>
            <SettingsItem darkMode={darkMode} isLast onClick={() => setCurrentView('informationGuide')}>
              <FiHelpCircle className="icon" />
              <div className="content">
                <div className="title">{t('contact')}</div>
                <div className="subtitle">{t('faq')}</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>

        {/* Other Settings */}
        <SettingsGroup>
          <GroupTitle darkMode={darkMode}>{t('otherSettings')}</GroupTitle>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode} onClick={() => setCurrentView('privacyConsent')}>
              <FiMoreHorizontal className="icon" />
              <div className="content">
                <div className="title">{t('privacyConsent')}</div>
                <div className="subtitle">約款・同意設定</div>
              </div>
            </SettingsItem>
            <DangerButton darkMode={darkMode}>
              <FiTrash2 className="icon" />
              <div className="content">
                <div className="title">{t('accountDeletion')}</div>
                <div className="subtitle">アカウントを完全削除</div>
              </div>
            </DangerButton>
            <SettingsItem darkMode={darkMode} isLast onClick={onLogout}>
              <FiLogOut className="icon" />
              <div className="content">
                <div className="title">{t('logout')}</div>
                <div className="subtitle">アカウントからログアウト</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>
      </ContentSection>
    </MyPageContainer>
  );
};

export default MyPage;
