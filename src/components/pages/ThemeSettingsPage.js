import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSettings, FiType, FiImage, FiCheck, FiUsers } from 'react-icons/fi';

const ThemeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.theme ? props.theme.primary : (props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)')};
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
  background: rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.3);
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

const ThemeSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ThemeCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 2px solid ${props => props.selected ? props.theme.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
  }
`;

const ThemePreview = styled.div`
  height: 60px;
  border-radius: 8px;
  background: ${props => props.theme.gradient};
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    opacity: ${props => props.selected ? 1 : 0};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ThemeName = styled.div`
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 4px;
`;

const ThemeDescription = styled.div`
  font-size: 12px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
`;

const UniversitySection = styled.div`
  margin-bottom: 32px;
`;

const UniversityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const UniversityCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 2px solid ${props => props.selected ? props.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
  }
`;

const UniversityLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;
`;

const UniversityName = styled.div`
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 4px;
`;

const UniversityDescription = styled.div`
  font-size: 12px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
`;

const FontSection = styled.div`
  margin-bottom: 32px;
`;

const FontGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const FontCard = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 2px solid ${props => props.selected ? '#00A86B' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  }
`;

const FontPreview = styled.div`
  font-family: ${props => props.fontFamily};
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 8px;
`;

const FontName = styled.div`
  font-size: 12px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid ${props => props.darkMode ? '#555' : '#ccc'};
  background: ${props => props.selected ? '#00A86B' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
`;

const WeekendSection = styled.div`
  margin-bottom: 32px;
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 28px;
  background-color: ${props => props.isOn ? '#00A86B' : (props.darkMode ? '#444' : '#ccc')};
  border-radius: 14px;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isOn ? 'flex-end' : 'flex-start'};
`;

const ToggleKnob = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
`;

const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
`;

const SettingsLabel = styled.span`
  font-weight: 500;
  color: ${props => props.darkMode ? '#fff' : '#333'};
`;

const ApplyButton = styled.button`
  width: 100%;
  background: #00A86B;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #008f5a;
  }
`;

const ThemeSettingsPage = ({ onBack, darkMode, currentTheme, onThemeChange, initialShowWeekends = false, friends = [] }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme?.id || 'default');
  const [selectedFont, setSelectedFont] = useState('pretendard');
  const [showWeekends, setShowWeekends] = useState(initialShowWeekends);

  const friendUniversities = friends
    .map(friend => friend.university)
    .filter((uni, index, self) => uni && self.findIndex(u => u.id === uni.id) === index);

  const themes = [
    {
      id: 'default',
      name: '기본 테마',
      description: '청산대학교 기본 색상',
      primary: '#00A86B',
      gradient: 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'
    },
    {
      id: 'blue',
      name: '블루 테마',
      description: '차분한 파란색',
      primary: '#3742fa',
      gradient: 'linear-gradient(135deg, #3742fa 0%, #5352ed 100%)'
    },
    {
      id: 'purple',
      name: '퍼플 테마',
      description: '우아한 보라색',
      primary: '#8c7ae6',
      gradient: 'linear-gradient(135deg, #8c7ae6 0%, #9c88ff 100%)'
    },
    {
      id: 'orange',
      name: '오렌지 테마',
      description: '활기찬 주황색',
      primary: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%)'
    }
  ];

  const universities = [
    {
      id: 'yonsei',
      name: '延世大学',
      description: '延世大学ブルー',
      logo: '延',
      colors: {
        primary: '#003876',
        gradient: 'linear-gradient(135deg, #003876 0%, #0066cc 100%)'
      }
    },
    {
      id: 'korea',
      name: '高麗大學', 
      description: '高麗大学赤色',
      logo: '高',
      colors: {
        primary: '#8B0000',
        gradient: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)'
      }
    },
    {
      id: 'snu',
      name: '首爾大學',
      description: '首爾大学緑色',
      logo: '首',
      colors: {
        primary: '#003d82',
        gradient: 'linear-gradient(135deg, #003d82 0%, #0066cc 100%)'
      }
    },
    {
      id: 'kaist',
      name: 'KAIST',
      description: 'KAISTブルー',
      logo: 'K',
      colors: {
        primary: '#004098',
        gradient: 'linear-gradient(135deg, #004098 0%, #0066ff 100%)'
      }
    }
  ];

  const fonts = [
    { id: 'system', name: 'システムフォント', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    { id: 'noto', name: 'Noto Sans', family: '"Noto Sans KR", sans-serif' },
    { id: 'malgun', name: '맑은 고딕', family: '"Malgun Gothic", sans-serif' },
    { id: 'nanumgothic', name: '나눔고딕', family: '"Nanum Gothic", sans-serif' }
  ];

  const handleApplyTheme = () => {
    const theme = themes.find(t => t.id === selectedTheme) || 
                 universities.find(u => u.id === selectedTheme);
    
    if (theme) {
      onThemeChange({
        ...theme,
        font: fonts.find(f => f.id === selectedFont),
        showWeekends
      });
    }
    onBack();
  };

  return (
    <ThemeContainer darkMode={darkMode}>
      <Header darkMode={darkMode} theme={themes.find(t => t.id === selectedTheme) || universities.find(u => u.id === selectedTheme)?.colors}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>テーマ設定</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <ThemeSection>
          <SectionTitle darkMode={darkMode}>
            <FiSettings />
            基本テーマ
          </SectionTitle>
          <ThemeGrid>
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                darkMode={darkMode}
                selected={selectedTheme === theme.id}
                theme={theme}
                onClick={() => setSelectedTheme(theme.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ThemePreview theme={theme} selected={selectedTheme === theme.id}>
                  {selectedTheme === theme.id && (
                    <FiCheck 
                      size={12} 
                      style={{ 
                        position: 'absolute', 
                        top: '8px', 
                        right: '8px', 
                        color: theme.primary 
                      }} 
                    />
                  )}
                </ThemePreview>
                <ThemeName darkMode={darkMode}>{theme.name}</ThemeName>
                <ThemeDescription darkMode={darkMode}>{theme.description}</ThemeDescription>
              </ThemeCard>
            ))}
          </ThemeGrid>
        </ThemeSection>

        <UniversitySection>
          <SectionTitle darkMode={darkMode}>
            <FiImage />
            大学テーマ
          </SectionTitle>
          <UniversityGrid>
            {universities.map((university) => (
              <UniversityCard
                key={university.id}
                darkMode={darkMode}
                selected={selectedTheme === university.id}
                colors={university.colors}
                onClick={() => setSelectedTheme(university.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <UniversityLogo colors={university.colors}>
                  {university.logo}
                </UniversityLogo>
                <UniversityName darkMode={darkMode}>{university.name}</UniversityName>
                <UniversityDescription darkMode={darkMode}>
                  {university.description}
                </UniversityDescription>
                {selectedTheme === university.id && (
                  <FiCheck 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      top: '16px', 
                      right: '16px', 
                      color: university.colors.primary 
                    }} 
                  />
                )}
              </UniversityCard>
            ))}
          </UniversityGrid>
        </UniversitySection>

        {friendUniversities.length > 0 && (
          <UniversitySection>
            <SectionTitle darkMode={darkMode}>
              <FiUsers />
              友達の大学テーマ
            </SectionTitle>
            <UniversityGrid>
              {friendUniversities.map((university) => (
                <UniversityCard
                  key={university.id}
                  darkMode={darkMode}
                  selected={selectedTheme === university.id}
                  colors={university.colors}
                  onClick={() => setSelectedTheme(university.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UniversityLogo colors={university.colors}>
                    {university.logo}
                  </UniversityLogo>
                  <UniversityName darkMode={darkMode}>{university.name}</UniversityName>
                  <UniversityDescription darkMode={darkMode}>
                    {university.description}
                  </UniversityDescription>
                  {selectedTheme === university.id && (
                    <FiCheck 
                      size={16} 
                      style={{ 
                        position: 'absolute', 
                        top: '16px', 
                        right: '16px', 
                        color: university.colors.primary 
                      }} 
                    />
                  )}
                </UniversityCard>
              ))}
            </UniversityGrid>
          </UniversitySection>
        )}

        <WeekendSection>
          <SectionTitle darkMode={darkMode}>
            <FiSettings />
            表示設定
          </SectionTitle>
          <SettingsRow darkMode={darkMode}>
            <SettingsLabel darkMode={darkMode}>土・日表示</SettingsLabel>
            <ToggleSwitch isOn={showWeekends} onClick={() => setShowWeekends(!showWeekends)} darkMode={darkMode}>
              <ToggleKnob layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} />
            </ToggleSwitch>
          </SettingsRow>
        </WeekendSection>

        <FontSection>
          <SectionTitle darkMode={darkMode}>
            <FiType />
            フォント設定
          </SectionTitle>
          <FontGrid>
            {fonts.map((font) => (
              <FontCard
                key={font.id}
                darkMode={darkMode}
                selected={selectedFont === font.id}
                onClick={() => setSelectedFont(font.id)}
              >
                <FontPreview fontFamily={font.family} darkMode={darkMode}>
                  가나다
                </FontPreview>
                <FontName darkMode={darkMode}>{font.name}</FontName>
              </FontCard>
            ))}
          </FontGrid>
        </FontSection>

        <ApplyButton onClick={handleApplyTheme}>
          テーマ適用
        </ApplyButton>
      </ContentSection>
    </ThemeContainer>
  );
};

export default ThemeSettingsPage;
