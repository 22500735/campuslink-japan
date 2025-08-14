import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit3, FiCamera, FiUser } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const NicknameSettingsContainer = styled.div`
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

const SettingsCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
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

const Modal = styled.div`
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

const ModalContent = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e5e7eb'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a1a1a' : 'white'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  font-size: 16px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  &::placeholder {
    color: ${props => props.darkMode ? '#9ca3af' : '#9ca3af'};
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#22c55e' : '#059669'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CurrentNicknameCard = styled.div`
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  border: 1px solid ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  
  .label {
    font-size: 14px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
    margin-bottom: 8px;
  }
  
  .nickname {
    font-size: 24px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
`;

const NicknameSettingsPage = ({ onBack, darkMode, userData }) => {
  const { t } = useLanguage();
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [newNickname, setNewNickname] = useState(userData.nickname);

  const handleSaveNickname = () => {
    // Here you would typically save to backend
    setShowNicknameModal(false);
  };

  return (
    <NicknameSettingsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('nickname')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <CurrentNicknameCard darkMode={darkMode}>
          <div className="label">現在のニックネーム</div>
          <div className="nickname">{userData.nickname}</div>
        </CurrentNicknameCard>

        <SettingsCard darkMode={darkMode}>
          <SettingsItem darkMode={darkMode} onClick={() => setShowNicknameModal(true)}>
            <FiEdit3 className="icon" />
            <div className="content">
              <div className="title">{t('nicknameChange')}</div>
              <div className="subtitle">ニックネームを変更する</div>
            </div>
          </SettingsItem>
          
          <SettingsItem darkMode={darkMode} isLast>
            <FiCamera className="icon" />
            <div className="content">
              <div className="title">{t('profilePhotoChange')}</div>
              <div className="subtitle">プロフィール画像を変更</div>
            </div>
          </SettingsItem>
        </SettingsCard>
      </ContentSection>

      {/* Nickname Change Modal */}
      {showNicknameModal && (
        <Modal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('nicknameChange')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowNicknameModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <InputField
              darkMode={darkMode}
              placeholder="新しいニックネームを入力"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            
            <SaveButton darkMode={darkMode} onClick={handleSaveNickname}>
              {t('save')}
            </SaveButton>
          </ModalContent>
        </Modal>
      )}
    </NicknameSettingsContainer>
  );
};

export default NicknameSettingsPage;
