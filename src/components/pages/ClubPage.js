import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiList, FiArrowLeft, FiUsers, FiTrendingUp, FiEdit3 } from 'react-icons/fi';

const ClubContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 20px;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  font-size: 16px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.25);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ViewToggleButton = styled.button`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  }
`;

// Grid View Components
const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyClubsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 16px;
  text-align: center;
`;

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isAlternating ? 'repeat(5, 1fr)' : 'repeat(6, 1fr)'};
  gap: 16px;
  justify-items: center;
  margin: ${props => props.isAlternating ? '0 10%' : '0'};
`;

const ClubIcon = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['slashColor', 'hasSlash', 'bgColor'].includes(prop),
})`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: ${props => props.bgColor || '#00A86B'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    bottom: -3px;
    left: -3px;
    border-radius: 50%;
    border: 3px solid ${props => props.slashColor};
    opacity: ${props => props.hasSlash ? 1 : 0};
    animation: ${props => props.hasSlash ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0.7; transform: scale(1); }
  }
`;

// List View Components
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
`;

const SortButton = styled.button`
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#2d2d2d' : 'white')};
  border: 1px solid ${props => props.active ? '#00A86B' : (props.darkMode ? '#404040' : '#e9ecef')};
  color: ${props => props.active ? 'white' : (props.darkMode ? 'white' : '#333')};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#404040' : '#f8f9fa')};
  }
`;

const ClubListItem = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ClubListIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.bgColor || '#00A86B'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const ClubInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const ClubName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 4px;
`;

const ClubCategory = styled.div`
  font-size: 14px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
`;

const ClubStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const StatItem = styled.div`
  font-size: 12px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Club Detail Page Components
const ClubDetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
`;

const ClubBanner = styled.div`
  height: 200px;
  background: ${props => props.bannerImage ? `url(${props.bannerImage})` : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

const ClubDetailHeader = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  padding: 16px;
  color: white;
  width: 100%;
  backdrop-filter: blur(10px);
`;

const ClubDetailName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ClubDetailCategory = styled.div`
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 12px;
`;

const ClubDescription = styled.div`
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
`;

const ClubDetailContent = styled.div`
  padding: 20px;
`;

const CustomizeButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  background: #00A86B;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 168, 107, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 168, 107, 0.4);
  }
`;

const CustomBlock = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlockContent = styled.div`
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;
  line-height: 1.6;
`;

const ClubPage = ({ darkMode, onBack, language = 'ja' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'followers', 'members'
  const [selectedClub, setSelectedClub] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customBlocks, setCustomBlocks] = useState([]);

  // Sample club data
  const [clubs] = useState([
    {
      id: 1,
      name: '프로그래밍 동아리',
      category: '학술',
      icon: '💻',
      bgColor: '#4285f4',
      followers: 245,
      members: 32,
      description: 'IT 기술과 프로그래밍을 배우고 실습하는 동아리입니다.',
      isJoined: true
    },
    {
      id: 2,
      name: '사진 동아리',
      category: '예술',
      icon: '📷',
      bgColor: '#ff6b6b',
      followers: 189,
      members: 28,
      description: '사진 촬영 기법과 편집을 배우는 동아리입니다.',
      isJoined: true
    },
    {
      id: 3,
      name: '밴드 동아리',
      category: '음악',
      icon: '🎸',
      bgColor: '#9c27b0',
      followers: 312,
      members: 45,
      description: '다양한 장르의 음악을 연주하는 밴드 동아리입니다.',
      isJoined: false
    },
    {
      id: 4,
      name: '댄스 동아리',
      category: '공연',
      icon: '💃',
      bgColor: '#ff9800',
      followers: 278,
      members: 38,
      description: 'K-POP부터 힙합까지 다양한 댄스를 배우는 동아리입니다.',
      isJoined: true
    },
    {
      id: 5,
      name: '독서 동아리',
      category: '문화',
      icon: '📚',
      bgColor: '#795548',
      followers: 156,
      members: 22,
      description: '좋은 책을 함께 읽고 토론하는 독서 동아리입니다.',
      isJoined: false
    },
    {
      id: 6,
      name: '요리 동아리',
      category: '생활',
      icon: '👨‍🍳',
      bgColor: '#4caf50',
      followers: 203,
      members: 35,
      description: '다양한 요리를 배우고 함께 만드는 동아리입니다.',
      isJoined: true
    },
    {
      id: 7,
      name: '영화 동아리',
      category: '문화',
      icon: '🎬',
      bgColor: '#607d8b',
      followers: 167,
      members: 29,
      description: '영화 감상과 제작을 함께하는 동아리입니다.',
      isJoined: false
    },
    {
      id: 8,
      name: '축구 동아리',
      category: '체육',
      icon: '⚽',
      bgColor: '#2196f3',
      followers: 289,
      members: 42,
      description: '축구를 사랑하는 사람들이 모인 동아리입니다.',
      isJoined: true
    },
    {
      id: 9,
      name: '봉사 동아리',
      category: '사회',
      icon: '🤝',
      bgColor: '#e91e63',
      followers: 134,
      members: 26,
      description: '지역사회를 위한 봉사활동을 하는 동아리입니다.',
      isJoined: false
    },
    {
      id: 10,
      name: '게임 동아리',
      category: '취미',
      icon: '🎮',
      bgColor: '#673ab7',
      followers: 198,
      members: 31,
      description: '다양한 게임을 즐기고 대회에 참가하는 동아리입니다.',
      isJoined: true
    }
  ]);

  const myClubs = clubs.filter(club => club.isJoined);

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClubs = [...filteredClubs].sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return b.followers - a.followers;
      case 'members':
        return b.members - a.members;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleClubClick = (club) => {
    setSelectedClub(club);
  };

  const handleBackToClubs = () => {
    setSelectedClub(null);
    setIsCustomizing(false);
  };

  const addCustomBlock = () => {
    const newBlock = {
      id: Date.now(),
      content: '새로운 블록 내용을 입력하세요...'
    };
    setCustomBlocks([...customBlocks, newBlock]);
  };

  const editBlock = (blockId, newContent) => {
    setCustomBlocks(customBlocks.map(block =>
      block.id === blockId ? { ...block, content: newContent } : block
    ));
  };

  const deleteBlock = (blockId) => {
    setCustomBlocks(customBlocks.filter(block => block.id !== blockId));
  };

  const renderGridView = () => {
    const topClubsByFollowers = [...clubs].sort((a, b) => b.followers - a.followers).slice(0, 6);
    const topClubsByMembers = [...clubs].sort((a, b) => b.members - a.members).slice(0, 6);

    return (
      <GridContainer>
        {/* My Clubs Section */}
        <MyClubsSection>
          <SectionTitle darkMode={darkMode}>내가 속한 동아리</SectionTitle>
          <ClubGrid>
            {myClubs.map((club, index) => (
              <ClubIcon
                key={club.id}
                bgColor={club.bgColor}
                hasSlash={topClubsByFollowers.slice(0, 6).some(topClub => topClub.id === club.id)}
                slashColor="#ff4444"
                onClick={() => handleClubClick(club)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {club.icon}
              </ClubIcon>
            ))}
          </ClubGrid>
        </MyClubsSection>

        {/* Top Followers Section */}
        <MyClubsSection>
          <SectionTitle darkMode={darkMode}>팔로워 수 상위 동아리</SectionTitle>
          <ClubGrid>
            {topClubsByFollowers.map((club, index) => (
              <ClubIcon
                key={club.id}
                bgColor={club.bgColor}
                hasSlash={true}
                slashColor="#4444ff"
                onClick={() => handleClubClick(club)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {club.icon}
              </ClubIcon>
            ))}
          </ClubGrid>
        </MyClubsSection>

        {/* Alternating Grid for All Clubs */}
        {Array.from({ length: Math.ceil(sortedClubs.length / 11) }, (_, rowIndex) => {
          const startIndex = rowIndex * 11;
          const rowClubs = sortedClubs.slice(startIndex, startIndex + 11);
          const firstRowClubs = rowClubs.slice(0, 6);
          const secondRowClubs = rowClubs.slice(6, 11);

          return (
            <div key={rowIndex}>
              {firstRowClubs.length > 0 && (
                <ClubGrid isAlternating={false}>
                  {firstRowClubs.map((club) => (
                    <ClubIcon
                      key={club.id}
                      bgColor={club.bgColor}
                      onClick={() => handleClubClick(club)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {club.icon}
                    </ClubIcon>
                  ))}
                </ClubGrid>
              )}
              {secondRowClubs.length > 0 && (
                <ClubGrid isAlternating={true} style={{ marginTop: '16px' }}>
                  {secondRowClubs.map((club) => (
                    <ClubIcon
                      key={club.id}
                      bgColor={club.bgColor}
                      onClick={() => handleClubClick(club)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {club.icon}
                    </ClubIcon>
                  ))}
                </ClubGrid>
              )}
            </div>
          );
        })}
      </GridContainer>
    );
  };

  const renderListView = () => (
    <ListContainer>
      <SortButtons>
        <SortButton
          active={sortBy === 'name'}
          darkMode={darkMode}
          onClick={() => setSortBy('name')}
        >
          가나순
        </SortButton>
        <SortButton
          active={sortBy === 'followers'}
          darkMode={darkMode}
          onClick={() => setSortBy('followers')}
        >
          <FiTrendingUp size={14} />
          팔로워 수
        </SortButton>
        <SortButton
          active={sortBy === 'members'}
          darkMode={darkMode}
          onClick={() => setSortBy('members')}
        >
          <FiUsers size={14} />
          클럽 회원 수
        </SortButton>
      </SortButtons>

      {sortedClubs.map((club) => (
        <ClubListItem
          key={club.id}
          darkMode={darkMode}
          onClick={() => handleClubClick(club)}
        >
          <ClubListIcon bgColor={club.bgColor}>
            {club.icon}
          </ClubListIcon>
          <ClubInfo>
            <ClubName darkMode={darkMode}>{club.name}</ClubName>
            <ClubCategory darkMode={darkMode}>{club.category}</ClubCategory>
          </ClubInfo>
          <ClubStats>
            <StatItem darkMode={darkMode}>
              <FiTrendingUp size={12} />
              {club.followers}
            </StatItem>
            <StatItem darkMode={darkMode}>
              <FiUsers size={12} />
              {club.members}
            </StatItem>
          </ClubStats>
        </ClubListItem>
      ))}
    </ListContainer>
  );

  const renderClubDetail = () => (
    <ClubDetailContainer darkMode={darkMode}>
      <ClubBanner bannerImage={selectedClub.bannerImage}>
        <ClubDetailHeader>
          <ClubDetailName>{selectedClub.name}</ClubDetailName>
          <ClubDetailCategory>{selectedClub.category}</ClubDetailCategory>
          <ClubDescription>{selectedClub.description}</ClubDescription>
        </ClubDetailHeader>
      </ClubBanner>

      <ClubDetailContent>
        <AnimatePresence>
          {customBlocks.map((block) => (
            <CustomBlock
              key={block.id}
              darkMode={darkMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => {
                if (isCustomizing) {
                  const newContent = prompt('블록 내용을 입력하세요:', block.content);
                  if (newContent !== null) {
                    editBlock(block.id, newContent);
                  }
                }
              }}
            >
              <BlockContent darkMode={darkMode}>
                {block.content}
              </BlockContent>
              {isCustomizing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              )}
            </CustomBlock>
          ))}
        </AnimatePresence>

        {isCustomizing && (
          <CustomBlock
            darkMode={darkMode}
            onClick={addCustomBlock}
            style={{
              border: `2px dashed ${darkMode ? '#404040' : '#ccc'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px'
            }}
          >
            <BlockContent darkMode={darkMode}>
              + 새 블록 추가
            </BlockContent>
          </CustomBlock>
        )}
      </ClubDetailContent>

      <CustomizeButton onClick={() => setIsCustomizing(!isCustomizing)}>
        <FiEdit3 size={20} />
      </CustomizeButton>
    </ClubDetailContainer>
  );

  if (selectedClub) {
    return (
      <>
        <Header darkMode={darkMode}>
          <HeaderContent>
            <BackButton onClick={handleBackToClubs}>
              <FiArrowLeft size={20} />
            </BackButton>
            <Title>{selectedClub.name}</Title>
            <div style={{ width: '44px' }} />
          </HeaderContent>
        </Header>
        {renderClubDetail()}
      </>
    );
  }

  return (
    <ClubContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderContent>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <Title>부활동, 동아리</Title>
          <div style={{ width: '44px' }} />
        </HeaderContent>
        
        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="동아리 이름으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <ContentArea>
        <ViewToggleContainer>
          <ViewToggleButton
            darkMode={darkMode}
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <FiList size={16} />
            {viewMode === 'grid' ? '목록형' : '격자형'}
          </ViewToggleButton>
        </ViewToggleContainer>

        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </ContentArea>
    </ClubContainer>
  );
};

export default ClubPage;
