import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiHeart, FiUsers, FiCalendar, FiMapPin, FiBookmark, FiBookOpen, FiMusic, FiCamera, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const ClubsContainer = styled.div`
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

const SearchSection = styled.div`
  padding: 20px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  margin: -10px 20px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTab = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? 
    (props.darkMode ? '#4ade80' : '#00A86B') : 
    (props.darkMode ? '#404040' : '#e5e7eb')
  };
  border-radius: 20px;
  background: ${props => props.active ? 
    (props.darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(0, 168, 107, 0.1)') : 
    'transparent'
  };
  color: ${props => props.active ? 
    (props.darkMode ? '#4ade80' : '#00A86B') : 
    (props.darkMode ? '#9ca3af' : '#666')
  };
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
`;

const ContentSection = styled.div`
  padding: 0 20px;
`;

const ClubCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  overflow: hidden;
`;

const ClubHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const ClubIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
`;

const ClubInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
  }
  
  .category {
    font-size: 14px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .description {
    font-size: 14px;
    color: ${props => props.darkMode ? '#d1d5db' : '#666'};
    line-height: 1.4;
  }
`;

const ClubActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${props => props.active ? 
    (props.darkMode ? '#4ade80' : '#00A86B') : 
    (props.darkMode ? '#404040' : '#e5e7eb')
  };
  border-radius: 8px;
  background: ${props => props.active ? 
    (props.darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(0, 168, 107, 0.1)') : 
    'transparent'
  };
  color: ${props => props.active ? 
    (props.darkMode ? '#4ade80' : '#00A86B') : 
    (props.darkMode ? '#9ca3af' : '#666')
  };
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
`;

const ClubDetails = styled.div`
  padding: 0 20px 20px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  margin-top: 16px;
  padding-top: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${props => props.darkMode ? '#d1d5db' : '#666'};
  
  .icon {
    width: 16px;
    height: 16px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
`;

const ClubsAndSocietiesPage = ({ onBack, darkMode }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [interestedClubs, setInterestedClubs] = useState(new Set(['1', '3']));
  const [scrappedClubs, setScrappedClubs] = useState(new Set(['1', '2']));

  const categories = [
    { id: 'all', name: '全て', icon: FiUsers },
    { id: 'academic', name: '学術', icon: FiBookOpen },
    { id: 'cultural', name: '文化', icon: FiMusic },
    { id: 'sports', name: 'スポーツ', icon: FiTrendingUp },
    { id: 'hobby', name: '趣味', icon: FiCamera }
  ];

  const clubs = [
    {
      id: '1',
      name: 'プログラミング研究会',
      category: 'academic',
      categoryName: '学術',
      description: 'プログラミング技術の向上と最新技術の研究を行う学会です。',
      members: 45,
      meetingTime: '毎週水曜日 18:00-20:00',
      location: '情報棟 301号室',
      icon: '💻'
    },
    {
      id: '2',
      name: '写真部',
      category: 'cultural',
      categoryName: '文化',
      description: '写真撮影技術の向上と作品展示を行う部活動です。',
      members: 32,
      meetingTime: '毎週金曜日 17:00-19:00',
      location: '美術棟 201号室',
      icon: '📸'
    },
    {
      id: '3',
      name: 'データサイエンス学会',
      category: 'academic',
      categoryName: '学術',
      description: 'データ分析とAI技術の研究・実践を行う学術団体です。',
      members: 28,
      meetingTime: '毎週火曜日 19:00-21:00',
      location: '研究棟 B105号室',
      icon: '📊'
    },
    {
      id: '4',
      name: 'テニス部',
      category: 'sports',
      categoryName: 'スポーツ',
      description: '테니스 실력 향상과 대회 참가를 목표로 하는 동아리입니다.',
      members: 67,
      meetingTime: '毎週月・木曜日 16:00-18:00',
      location: 'テニスコート',
      icon: '🎾'
    },
    {
      id: '5',
      name: '音楽サークル',
      category: 'cultural',
      categoryName: '文化',
      description: '다양한 장르의 음악 연주와 공연을 하는 동아리입니다.',
      members: 41,
      meetingTime: '毎週土曜日 14:00-17:00',
      location: '음악실',
      icon: '🎵'
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || club.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleInterest = (clubId) => {
    const newInterested = new Set(interestedClubs);
    if (newInterested.has(clubId)) {
      newInterested.delete(clubId);
    } else {
      newInterested.add(clubId);
    }
    setInterestedClubs(newInterested);
  };

  const toggleScrap = (clubId) => {
    const newScrapped = new Set(scrappedClubs);
    if (newScrapped.has(clubId)) {
      newScrapped.delete(clubId);
    } else {
      newScrapped.add(clubId);
    }
    setScrappedClubs(newScrapped);
  };

  return (
    <ClubsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('clubsAndSocieties')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <SearchSection darkMode={darkMode}>
        <SearchInput
          darkMode={darkMode}
          placeholder="学会・동아리 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <CategoryTabs>
          {categories.map(category => (
            <CategoryTab
              key={category.id}
              darkMode={darkMode}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>
      </SearchSection>

      <ContentSection>
        {filteredClubs.map(club => (
          <ClubCard key={club.id} darkMode={darkMode}>
            <ClubHeader>
              <ClubIcon>
                {club.icon}
              </ClubIcon>
              <ClubInfo darkMode={darkMode}>
                <div className="name">{club.name}</div>
                <div className="category">{club.categoryName}</div>
                <div className="description">{club.description}</div>
              </ClubInfo>
              <ClubActions>
                <ActionButton
                  darkMode={darkMode}
                  active={interestedClubs.has(club.id)}
                  onClick={() => toggleInterest(club.id)}
                >
                  <FiHeart size={14} />
                  관심
                </ActionButton>
                <ActionButton
                  darkMode={darkMode}
                  active={scrappedClubs.has(club.id)}
                  onClick={() => toggleScrap(club.id)}
                >
                  <FiBookmark size={14} />
                  스크랩
                </ActionButton>
              </ClubActions>
            </ClubHeader>
            
            <ClubDetails darkMode={darkMode}>
              <DetailRow darkMode={darkMode}>
                <FiUsers className="icon" />
                회원 {club.members}명
              </DetailRow>
              <DetailRow darkMode={darkMode}>
                <FiCalendar className="icon" />
                {club.meetingTime}
              </DetailRow>
              <DetailRow darkMode={darkMode}>
                <FiMapPin className="icon" />
                {club.location}
              </DetailRow>
            </ClubDetails>
          </ClubCard>
        ))}
      </ContentSection>
    </ClubsContainer>
  );
};

export default ClubsAndSocietiesPage;
