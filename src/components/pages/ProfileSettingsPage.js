import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiCamera, FiSearch, FiCheck, FiAward, FiBook, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const ProfileSettingsContainer = styled.div`
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

const SearchInput = styled.input`
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

const DepartmentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const DepartmentItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: ${props => props.selected ? 
    (props.darkMode ? 'rgba(0, 168, 107, 0.2)' : 'rgba(0, 168, 107, 0.1)') : 
    'transparent'
  };
  color: ${props => props.darkMode ? '#fff' : '#333'};
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SelectedDepartments = styled.div`
  margin-bottom: 16px;
`;

const SelectedTag = styled.span`
  display: inline-block;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.2)' : 'rgba(0, 168, 107, 0.1)'};
  color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin: 4px 8px 4px 0;
  border: 1px solid ${props => props.darkMode ? '#4ade80' : '#00A86B'};
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

const InfoText = styled.p`
  font-size: 14px;
  color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const RecordItem = styled.div`
  padding: 16px;
  border-bottom: ${props => props.isLast ? 'none' : `1px solid ${props.darkMode ? '#404040' : '#f0f0f0'}`};
  
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    margin-bottom: 4px;
  }
  
  .date {
    font-size: 14px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  }
`;

const ProfileSettingsPage = ({ onBack, darkMode, userData }) => {
  const { t } = useLanguage();
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showAcademicRecords, setShowAcademicRecords] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState(['情報テクノロジー学科', 'データサイエンス']);
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    '情報テクノロジー学科',
    'データサイエンス',
    '経営学科',
    '国際政治経済学科',
    '英米文学科',
    '心理学科',
    '社会情報学科',
    '法学科',
    '経済学科',
    '理工学部',
    '文学部',
    '教育人間科学部'
  ];

  const filteredDepartments = departments.filter(dept => 
    dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDepartmentToggle = (dept) => {
    if (selectedDepartments.includes(dept)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
    } else if (selectedDepartments.length < 3) {
      setSelectedDepartments([...selectedDepartments, dept]);
    }
  };

  const academicRecords = [
    { title: t('enrollmentVerificationSuccess'), date: '2024年3月15日' },
    { title: '学科変更申請承認', date: '2023年9月10日' },
    { title: '在学証明書発行', date: '2023年4月20日' }
  ];

  return (
    <ProfileSettingsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('profileSettings')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <SettingsCard darkMode={darkMode}>
          <SettingsItem darkMode={darkMode}>
            <FiAward className="icon" />
            <div className="content">
              <div className="title">{t('graduateTransition')}</div>
              <div className="subtitle">卒業生ステータスに変更</div>
            </div>
          </SettingsItem>
          
          <SettingsItem darkMode={darkMode} onClick={() => setShowDepartmentModal(true)}>
            <FiBook className="icon" />
            <div className="content">
              <div className="title">{t('departmentSettings')}</div>
              <div className="subtitle">現在: {selectedDepartments.join(', ')}</div>
            </div>
          </SettingsItem>
          
          <SettingsItem darkMode={darkMode}>
            <FiCamera className="icon" />
            <div className="content">
              <div className="title">{t('profilePhotoChange')}</div>
              <div className="subtitle">プロフィール画像を変更</div>
            </div>
          </SettingsItem>
          
          <SettingsItem darkMode={darkMode} isLast onClick={() => setShowAcademicRecords(true)}>
            <FiCalendar className="icon" />
            <div className="content">
              <div className="title">{t('academicRecords')}</div>
              <div className="subtitle">学籍処理履歴を確認</div>
            </div>
          </SettingsItem>
        </SettingsCard>
      </ContentSection>

      {/* Department Settings Modal */}
      {showDepartmentModal && (
        <Modal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('departmentSettings')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowDepartmentModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <InfoText darkMode={darkMode}>
              {t('departmentSettingsDesc')}
            </InfoText>
            
            <SearchInput
              darkMode={darkMode}
              placeholder={t('searchDepartment')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <SelectedDepartments>
              {selectedDepartments.map(dept => (
                <SelectedTag key={dept} darkMode={darkMode}>
                  {dept}
                </SelectedTag>
              ))}
            </SelectedDepartments>
            
            <DepartmentList>
              {filteredDepartments.map(dept => (
                <DepartmentItem
                  key={dept}
                  darkMode={darkMode}
                  selected={selectedDepartments.includes(dept)}
                  disabled={!selectedDepartments.includes(dept) && selectedDepartments.length >= 3}
                  onClick={() => handleDepartmentToggle(dept)}
                >
                  {dept}
                  {selectedDepartments.includes(dept) && <FiCheck size={16} />}
                </DepartmentItem>
              ))}
            </DepartmentList>
            
            <SaveButton darkMode={darkMode} onClick={() => setShowDepartmentModal(false)}>
              {t('save')}
            </SaveButton>
          </ModalContent>
        </Modal>
      )}

      {/* Academic Records Modal */}
      {showAcademicRecords && (
        <Modal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('academicRecords')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowAcademicRecords(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            {academicRecords.map((record, index) => (
              <RecordItem 
                key={index} 
                darkMode={darkMode} 
                isLast={index === academicRecords.length - 1}
              >
                <div className="title">{record.title}</div>
                <div className="date">{record.date}</div>
              </RecordItem>
            ))}
          </ModalContent>
        </Modal>
      )}
    </ProfileSettingsContainer>
  );
};

export default ProfileSettingsPage;
