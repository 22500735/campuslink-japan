import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiCheck, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const SchoolSelectionContainer = styled.div`
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

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e5e7eb'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  font-size: 16px;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  &::placeholder {
    color: ${props => props.darkMode ? '#9ca3af' : '#9ca3af'};
  }
`;

const SchoolCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.selected ? 
    (props.darkMode ? '#4ade80' : '#00A86B') : 
    (props.darkMode ? '#404040' : '#f0f0f0')
  };
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    transform: translateY(-2px);
  }
`;

const SchoolItem = styled.div`
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
    
    .name {
      font-size: 18px;
      font-weight: 700;
      color: ${props => props.darkMode ? '#ffffff' : '#333'};
      margin-bottom: 4px;
    }
    
    .location {
      font-size: 14px;
      color: ${props => props.darkMode ? '#d1d5db' : '#666'};
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .departments {
      font-size: 12px;
      color: ${props => props.darkMode ? '#9ca3af' : '#999'};
      margin-top: 8px;
    }
  }
  
  .check {
    width: 24px;
    height: 24px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    opacity: ${props => props.selected ? 1 : 0};
    transition: all 0.3s ease;
  }
`;

const DepartmentSelectionModal = styled.div`
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
  margin-top: 16px;
  
  &:hover {
    background: ${props => props.darkMode ? '#22c55e' : '#059669'};
  }
`;

const SchoolSelectionPage = ({ onBack, darkMode, onSchoolSelect }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const schools = [
    {
      id: 'aoyama',
      name: '青山学院大学',
      location: '東京都渋谷区',
      departments: ['情報テクノロジー学科', 'データサイエンス', '経営学科', '国際政治経済学科', '英米文学科', '心理学科']
    },
    {
      id: 'waseda',
      name: '早稲田大学',
      location: '東京都新宿区',
      departments: ['政治経済学部', '法学部', '商学部', '社会科学部', '理工学部', '文学部']
    },
    {
      id: 'keio',
      name: '慶應義塾大学',
      location: '東京都港区',
      departments: ['経済学部', '法学部', '文学部', '商学部', '医学部', '理工学部']
    },
    {
      id: 'todai',
      name: '東京大学',
      location: '東京都文京区',
      departments: ['法学部', '医学部', '工学部', '文学部', '理学部', '経済学部']
    },
    {
      id: 'rikkyo',
      name: '立教大学',
      location: '東京都豊島区',
      departments: ['経営学部', '社会学部', '文学部', '法学部', '理学部', '観光学部']
    }
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setShowDepartmentModal(true);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleSave = () => {
    if (selectedSchool && selectedDepartment) {
      onSchoolSelect({
        school: selectedSchool,
        department: selectedDepartment
      });
      setShowDepartmentModal(false);
    }
  };

  return (
    <SchoolSelectionContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('selectSchool')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <SearchInput
          darkMode={darkMode}
          placeholder={t('searchSchool')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredSchools.map(school => (
          <SchoolCard
            key={school.id}
            darkMode={darkMode}
            selected={selectedSchool?.id === school.id}
            onClick={() => handleSchoolSelect(school)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SchoolItem darkMode={darkMode} selected={selectedSchool?.id === school.id}>
              <FiMapPin className="icon" />
              <div className="content">
                <div className="name">{school.name}</div>
                <div className="location">
                  <FiMapPin size={12} />
                  {school.location}
                </div>
                <div className="departments">
                  {school.departments.length}개 학부/학과
                </div>
              </div>
              <FiCheck className="check" />
            </SchoolItem>
          </SchoolCard>
        ))}
      </ContentSection>

      {/* Department Selection Modal */}
      {showDepartmentModal && selectedSchool && (
        <DepartmentSelectionModal>
          <ModalContent darkMode={darkMode}>
            <ModalHeader darkMode={darkMode}>
              <h3>{t('selectDepartment')}</h3>
              <CloseButton darkMode={darkMode} onClick={() => setShowDepartmentModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <SearchInput
              darkMode={darkMode}
              placeholder={t('searchDepartmentName')}
              style={{ marginBottom: '16px' }}
            />
            
            {selectedSchool.departments.map(department => (
              <DepartmentItem
                key={department}
                darkMode={darkMode}
                selected={selectedDepartment === department}
                onClick={() => handleDepartmentSelect(department)}
              >
                {department}
                {selectedDepartment === department && <FiCheck size={16} />}
              </DepartmentItem>
            ))}
            
            <SaveButton darkMode={darkMode} onClick={handleSave}>
              {t('save')}
            </SaveButton>
          </ModalContent>
        </DepartmentSelectionModal>
      )}
    </SchoolSelectionContainer>
  );
};

export default SchoolSelectionPage;
