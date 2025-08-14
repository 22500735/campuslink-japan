import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const AccountSettingsContainer = styled.div`
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

const InfoItem = styled.div`
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
    
    .label {
      font-size: 14px;
      color: ${props => props.darkMode ? '#9ca3af' : '#666'};
      margin-bottom: 4px;
    }
    
    .value {
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.darkMode ? '#ffffff' : '#333'};
    }
  }
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
  max-height: 80vh;
  overflow-y: auto;
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

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: ${props => props.hasIcon ? '48px' : '16px'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e5e7eb'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a1a1a' : 'white'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  &::placeholder {
    color: ${props => props.darkMode ? '#9ca3af' : '#9ca3af'};
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const RequirementsText = styled.p`
  font-size: 12px;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  margin-top: 8px;
  line-height: 1.4;
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

const AccountSettingsPage = ({ onBack, darkMode, userData }) => {
  const { t } = useLanguage();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [newEmail, setNewEmail] = useState('');

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSavePassword = () => {
    // Here you would typically validate and save to backend
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveEmail = () => {
    // Here you would typically save to backend
    setShowEmailModal(false);
    setNewEmail('');
  };

  return (
    <AccountSettingsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('accountSettings')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {/* User ID Display */}
        <SettingsCard darkMode={darkMode}>
          <InfoItem darkMode={darkMode} isLast>
            <FiUser className="icon" />
            <div className="content">
              <div className="label">{t('userId')}</div>
              <div className="value">{userData.userId}</div>
            </div>
          </InfoItem>
        </SettingsCard>

        {/* Password & Email Settings */}
        <SettingsCard darkMode={darkMode}>
          <SettingsItem darkMode={darkMode} onClick={() => setShowPasswordModal(true)}>
            <FiLock className="icon" />
            <div className="content">
              <div className="title">{t('passwordChange')}</div>
              <div className="subtitle">パスワードを変更する</div>
            </div>
          </SettingsItem>
          
          <SettingsItem darkMode={darkMode} isLast onClick={() => setShowEmailModal(true)}>
            <FiMail className="icon" />
            <div className="content">
              <div className="title">{t('emailChange')}</div>
              <div className="subtitle">メールアドレスを変更する</div>
            </div>
          </SettingsItem>
        </SettingsCard>
      </ContentSection>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <Modal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('passwordChange')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowPasswordModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label darkMode={darkMode}>{t('currentPassword')}</Label>
              <InputWrapper>
                <InputField
                  darkMode={darkMode}
                  type={showPasswords.current ? 'text' : 'password'}
                  placeholder="現在のパスワードを入力"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  hasIcon
                />
                <TogglePasswordButton
                  darkMode={darkMode}
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </TogglePasswordButton>
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <Label darkMode={darkMode}>{t('newPassword')}</Label>
              <InputWrapper>
                <InputField
                  darkMode={darkMode}
                  type={showPasswords.new ? 'text' : 'password'}
                  placeholder="新しいパスワードを入力"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  hasIcon
                />
                <TogglePasswordButton
                  darkMode={darkMode}
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </TogglePasswordButton>
              </InputWrapper>
              <RequirementsText darkMode={darkMode}>
                {t('passwordRequirements')}
              </RequirementsText>
            </FormGroup>
            
            <FormGroup>
              <Label darkMode={darkMode}>{t('confirmNewPassword')}</Label>
              <InputWrapper>
                <InputField
                  darkMode={darkMode}
                  type={showPasswords.confirm ? 'text' : 'password'}
                  placeholder="新しいパスワードを再入力"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  hasIcon
                />
                <TogglePasswordButton
                  darkMode={darkMode}
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </TogglePasswordButton>
              </InputWrapper>
            </FormGroup>
            
            <SaveButton darkMode={darkMode} onClick={handleSavePassword}>
              {t('save')}
            </SaveButton>
          </ModalContent>
        </Modal>
      )}

      {/* Email Change Modal */}
      {showEmailModal && (
        <Modal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('emailChange')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowEmailModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label darkMode={darkMode}>新しいメールアドレス</Label>
              <InputField
                darkMode={darkMode}
                type="email"
                placeholder="新しいメールアドレスを入力"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </FormGroup>
            
            <SaveButton darkMode={darkMode} onClick={handleSaveEmail}>
              {t('save')}
            </SaveButton>
          </ModalContent>
        </Modal>
      )}
    </AccountSettingsContainer>
  );
};

export default AccountSettingsPage;
