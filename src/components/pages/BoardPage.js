import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiMessageSquare, FiThumbsUp, FiEye, FiFilter } from 'react-icons/fi';

const BoardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px; /* Extra space for bottom navigation */
`;

const Header = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
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

const WriteButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
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

const BoardTabs = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
  overflow-x: auto;
  gap: 4px;
`;

const BoardTab = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#00A86B' : 'white'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 40px; /* Additional bottom padding */
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 8px 12px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #00A86B;
    color: #00A86B;
  }
`;

const PostCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .anonymous {
    background: #f8f9fa;
    color: #666;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .time {
    color: #999;
    font-size: 12px;
  }
`;

const PostBadge = styled.span`
  background: ${props => props.hot ? '#ff4757' : '#00A86B'};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const PostContent = styled.div`
  margin-bottom: 16px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  p {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 12px;
    
    &.liked {
      color: #00A86B;
    }
  }
`;

const AnnouncementCard = styled(PostCard)`
  border: 2px solid #00A86B;
  background: linear-gradient(135deg, rgba(0, 168, 107, 0.05) 0%, rgba(32, 178, 170, 0.05) 100%);
  
  .announcement-badge {
    background: #00A86B;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
  }
`;

const BoardPage = ({ user }) => {
  const [activeBoard, setActiveBoard] = useState('自由掲示板');
  const [searchQuery, setSearchQuery] = useState('');

  const boards = [
    '自由掲示板',
    '情報掲示板', 
    '就職掲示板',
    '講義評価',
    'サークル',
    '学科掲示板'
  ];

  const posts = [
    {
      id: 1,
      title: '青山学院大学の学食おすすめメニュー',
      content: '新入生ですが、学食がたくさんあって何を食べればいいかわかりません。美味しいメニューを教えてください！特にコスパの良いメニューがあれば...',
      time: '2分前',
      likes: 15,
      comments: 8,
      views: 124,
      isHot: true,
      board: '自由掲示板',
    },
    {
      id: 2,
      title: '経営学部必修科目履修順序について',
      content: '経営学部2年ですが、来学期の履修登録をどうすればいいか悩んでいます。先輩方のアドバイスをお願いします。',
      time: '15分前',
      likes: 23,
      comments: 12,
      views: 89,
      isHot: false,
      board: '情報掲示板'
    },
    {
      id: 3,
      title: 'IT大手企業インターン合格体験記',
      content: '昨年応募したIT大手企業のインターンに合格したので体験談をシェアします。準備過程や面接のコツで気になることがあればコメントで...',
      time: '2時間前',
      likes: 45,
      comments: 28,
      views: 312,
      isHot: true,
      board: '就職掲示板'
    },
    {
      id: 4,
      title: 'マーケティング論講義評価',
      content: '田中教授のマーケティング論を受講しましたが、本当に良かったです。実務経験が豊富で実際の事例をたくさん教えてくださいます。',
      time: '3時間前',
      likes: 18,
      comments: 6,
      views: 156,
      isHot: false,
      board: '講義評価'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: '2025年春学期履修登録日程のお知らせ',
      content: '履修登録期間: 2025年2月10日 ~ 2月14日\n新入生オリエンテーション: 2025年3月2日\n開講日: 2025年3月4日',
      time: '1日前'
    }
  ];

  const filteredPosts = posts.filter(post => 
    (activeBoard === '全て' || post.board === activeBoard) &&
    (searchQuery === '' || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <BoardContainer>
      <Header>
        <HeaderContent>
          <Title>掲示板</Title>
          <WriteButton>
            <FiPlus size={16} />
            投稿
          </WriteButton>
        </HeaderContent>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="投稿検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <BoardTabs>
          {boards.map((board) => (
            <BoardTab
              key={board}
              active={activeBoard === board}
              onClick={() => setActiveBoard(board)}
            >
              {board}
            </BoardTab>
          ))}
        </BoardTabs>
      </Header>

      <ContentArea>
        <FilterBar>
          <FilterButton>
            <FiFilter size={16} />
            필터
          </FilterButton>
          <span style={{ fontSize: '14px', color: '#666' }}>
            총 {filteredPosts.length}개의 게시글
          </span>
        </FilterBar>

        {/* Announcements */}
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id}>
            <div className="announcement-badge">공지사항</div>
            <PostContent>
              <h3>{announcement.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{announcement.content}</p>
            </PostContent>
            <PostStats>
              <div className="stat">
                <span>📌</span>
                <span>중요</span>
              </div>
              <div className="stat">
                <span>{announcement.time}</span>
              </div>
            </PostStats>
          </AnnouncementCard>
        ))}

        {/* Regular Posts */}
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <PostHeader>
              <PostInfo>
                <span className="anonymous">匿名</span>
                <span className="time">{post.time}</span>
              </PostInfo>
              {post.isHot && <PostBadge hot>HOT</PostBadge>}
            </PostHeader>
            
            <PostContent>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </PostContent>
            
            <PostStats>
              <div className="stat">
                <FiThumbsUp size={14} />
                <span>{post.likes}</span>
              </div>
              <div className="stat">
                <FiMessageSquare size={14} />
                <span>{post.comments}</span>
              </div>
              <div className="stat">
                <FiEye size={14} />
                <span>{post.views}</span>
              </div>
            </PostStats>
          </PostCard>
        ))}
      </ContentArea>
    </BoardContainer>
  );
};

export default BoardPage;
