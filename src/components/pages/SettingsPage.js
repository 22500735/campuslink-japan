import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiMoon, FiSun, FiMoreHorizontal, FiBell, FiLock, FiHelpCircle, FiLogOut } from 'react-icons/fi';

const SettingsContainer = styled.div`
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

const ToggleSwitch = styled.div`
  width: 52px;
  height: 28px;
  background: ${props => props.isOn ? (props.darkMode ? '#4ade80' : '#00A86B') : (props.darkMode ? '#374151' : '#ddd')};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    width: 24px;
    height: 24px;
    background: ${props => props.darkMode ? '#ffffff' : 'white'};
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${props => props.isOn ? '26px' : '2px'};
    transition: all 0.3s ease;
    box-shadow: ${props => props.darkMode ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
  }
`;

const DarkModeItem = styled.div`
  width: 100%;
  padding: 20px;
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
      margin-bottom: 4px;
      color: ${props => props.darkMode ? '#ffffff' : '#333'};
    }
    
    .subtitle {
      font-size: 14px;
      color: ${props => props.darkMode ? '#d1d5db' : '#666'};
    }
  }
`;

const SettingsPage = ({ onBack, darkMode, setDarkMode, onLogout }) => {
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SettingsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>設定</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <SettingsGroup>
          <GroupTitle darkMode={darkMode}>アカウント</GroupTitle>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode} isLast>
              <FiUser className="icon" />
              <div className="content">
                <div className="title">プロフィール設定</div>
                <div className="subtitle">個人情報と学科情報の管理</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>

        <SettingsGroup>
          <GroupTitle darkMode={darkMode}>アプリ設定</GroupTitle>
          <SettingsCard darkMode={darkMode}>
            <DarkModeItem darkMode={darkMode}>
              {darkMode ? <FiMoon className="icon" /> : <FiSun className="icon" />}
              <div className="content">
                <div className="title">ダークモード</div>
                <div className="subtitle">ダークテーマに切り替え</div>
              </div>
              <ToggleSwitch 
                isOn={darkMode} 
                darkMode={darkMode}
                onClick={handleToggleDarkMode}
              />
            </DarkModeItem>
          </SettingsCard>
          
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode}>
              <FiBell className="icon" />
              <div className="content">
                <div className="title">通知設定</div>
                <div className="subtitle">プッシュ通知とメール設定</div>
              </div>
            </SettingsItem>
            <SettingsItem darkMode={darkMode} isLast>
              <FiLock className="icon" />
              <div className="content">
                <div className="title">プライバシー保護</div>
                <div className="subtitle">データとプライバシー設定</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>

        <SettingsGroup>
          <GroupTitle darkMode={darkMode}>その他</GroupTitle>
          <SettingsCard darkMode={darkMode}>
            <SettingsItem darkMode={darkMode}>
              <FiHelpCircle className="icon" />
              <div className="content">
                <div className="title">ヘルプとサポート</div>
                <div className="subtitle">FAQ とお問い合わせ</div>
              </div>
            </SettingsItem>
            <SettingsItem darkMode={darkMode} isLast onClick={onLogout}>
              <FiLogOut className="icon" />
              <div className="content">
                <div className="title">ログアウト</div>
                <div className="subtitle">アカウントからログアウト</div>
              </div>
            </SettingsItem>
          </SettingsCard>
        </SettingsGroup>
      </ContentSection>
    </SettingsContainer>
  );
};

export default SettingsPage;
