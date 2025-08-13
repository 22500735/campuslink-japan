import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiTrendingUp, FiStar, FiBriefcase, FiCalendar, FiBell, FiSettings, FiLogOut, FiTruck, FiBook, FiHome as FiHomeIcon, FiBookmark, FiMessageCircle, FiHeart, FiExternalLink } from 'react-icons/fi';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px; /* Extra space for bottom navigation */
  color: ${props => props.darkMode ? '#fff' : '#333'};
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 30px;
  color: white;
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .avatar {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }
  
  .info {
    h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    p {
      font-size: 14px;
      opacity: 0.9;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const HeaderButton = styled.button`
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

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 20px;
`;

const QuickActionItem = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 16px;
  padding: 16px 8px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  
  .icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .label {
    font-size: 12px;
    font-weight: 600;
  }
`;

const ContentSection = styled.div`
  padding: 20px;
  padding-bottom: 40px; /* Additional bottom padding */
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Card = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const PostCard = styled(Card)`
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
  
  .left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .board {
    background: #00A86B;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .author {
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .time {
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
  }
  
  .actions {
    display: flex;
    gap: 8px;
  }
`;

const PostContent = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  p {
    color: ${props => props.darkMode ? '#ccc' : '#666'};
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
  }
`;

const ScrapButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${props => props.isScraped ? '#00A86B' : 'rgba(0, 168, 107, 0.1)'};
  color: ${props => props.isScraped ? 'white' : '#00A86B'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isScraped ? '#008f5a' : 'rgba(0, 168, 107, 0.2)'};
  }
`;

const ReviewCard = styled(Card)`
  .course {
    font-weight: 600;
    color: #00A86B;
    margin-bottom: 8px;
  }
  
  .professor {
    color: #666;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
    
    .stars {
      color: #ffc107;
    }
    
    .score {
      font-weight: 600;
      color: #333;
    }
  }
  
  .review {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const HomePage = ({ user, onLogout, onNavigateToSettings, onNavigateToNotifications, onNavigateToScrap, onNavigateToBoard, onNavigateToCourseReviews, onNavigateToExtracurricular, darkMode }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrapedPosts, setScrapedPosts] = useState(new Set());

  const quickActions = [
    { icon: FiCalendar, label: '時間割', action: () => {} },
    { icon: FiBell, label: '通知', action: () => onNavigateToNotifications && onNavigateToNotifications() },
    { icon: FiBookmark, label: 'スクラップ', action: () => onNavigateToScrap && onNavigateToScrap() },
    { icon: FiTruck, label: '中古取引', action: () => {} },
    { icon: FiBook, label: '講義評価', action: () => {} }
  ];

  const popularPosts = [
    {
      id: 1,
      board: '自由掲示板',
      title: '青山キャンパス周辺のおすすめグルメ！',
      content: '青山キャンパス近くで一人でも入りやすいお店はありますか？コスパの良いところを教えてください。',
      author: '匿名',
      time: '5分前',
      likes: 12,
      comments: 8
    },
    {
      id: 2,
      board: '学科掲示板',
      title: '情報テクノロジー学科の専攻選択について',
      content: '3年次に上がる際の専攻選択で、AIコースとソフトウェアコースのどちらが良いでしょうか？',
      author: 'IT21',
      time: '1時間前',
      likes: 24,
      comments: 15
    },
    {
      id: 3,
      board: '就職掲示板',
      title: '大手企業インターン合格体験記',
      content: '昨年ソニーのインターンに合格した経験をシェアしたいと思います。準備過程と面接のコツをお教えします。',
      author: '就活生A',
      time: '3時間前',
      likes: 45,
      comments: 22
    }
  ];

  const handleScrapPost = (postId, e) => {
    e.stopPropagation();
    setScrapedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const recentReviews = [
    {
      id: 1,
      course: 'データ構造とアルゴリズム',
      professor: '田中教授',
      rating: 4.5,
      review: '課題は多いですが、本当に役立つ授業です。教授が丁寧に説明してくださいます。'
    },
    {
      id: 2,
      course: 'Webプログラミング',
      professor: '佐藤教授',
      rating: 4.0,
      review: '実習中心の授業で面白いです。プロジェクトを通じて実際のWebサイトを作ることができます。'
    },
    {
      id: 3,
      course: '経営学原論',
      professor: '山田教授',
      rating: 3.5,
      review: '理論中心の授業です。試験は難しいですが、経営の基礎をしっかり固めることができます。'
    }
  ];

  return (
    <HomeContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <UserInfo>
          <UserProfile>
            <div className="avatar">
              <FiUser size={24} />
            </div>
            <div className="info">
              <h3>{user?.name || '学生'}</h3>
              <p>青山学院大学</p>
            </div>
          </UserProfile>
          <HeaderActions>
            <HeaderButton onClick={onNavigateToNotifications}>
              <FiBell size={20} />
            </HeaderButton>
            <HeaderButton onClick={onNavigateToSettings}>
              <FiSettings size={20} />
            </HeaderButton>
          </HeaderActions>
        </UserInfo>

        <QuickActions>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <QuickActionItem key={index} onClick={action.action}>
                <div className="icon">
                  <IconComponent />
                </div>
                <div className="label">{action.label}</div>
              </QuickActionItem>
            );
          })}
        </QuickActions>
      </Header>

      <ContentSection>
        <SectionTitle darkMode={darkMode}>
          <FiTrendingUp />
          リアルタイム人気投稿
        </SectionTitle>
        {popularPosts.map((post) => (
          <PostCard
            key={post.id}
            darkMode={darkMode}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigateToBoard && onNavigateToBoard(post.board, post.id)}
          >
            <PostHeader darkMode={darkMode}>
              <div className="left">
                <span className="board">{post.board}</span>
                <div className="author">
                  <FiUser size={12} />
                  {post.author}
                </div>
              </div>
              <div className="time">{post.time}</div>
              <div className="actions">
                <ScrapButton 
                  onClick={(e) => handleScrapPost(post.id, e)}
                  isScraped={scrapedPosts.has(post.id)}
                  darkMode={darkMode}
                >
                  <FiBookmark size={14} />
                </ScrapButton>
              </div>
            </PostHeader>
            <PostContent darkMode={darkMode}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </PostContent>
            <PostStats darkMode={darkMode}>
              <div className="stat">
                <FiHeart size={12} />
                <span>{post.likes}</span>
              </div>
              <div className="stat">
                <FiMessageCircle size={12} />
                <span>{post.comments}</span>
              </div>
            </PostStats>
          </PostCard>
        ))}

        <SectionTitle darkMode={darkMode}>
          <FiStar />
          最新講義評価
        </SectionTitle>
        {recentReviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            darkMode={darkMode}
            onClick={() => onNavigateToCourseReviews && onNavigateToCourseReviews(review.course, review.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="course">{review.course}</div>
            <div className="professor">{review.professor}</div>
            <div className="rating">
              <div className="stars">
                {'★'.repeat(Math.floor(review.rating))}
                {review.rating % 1 !== 0 && '☆'}
              </div>
              <span className="score">{review.rating}</span>
            </div>
            <div className="review">{review.review}</div>
          </ReviewCard>
        ))}

        <SectionTitle darkMode={darkMode}>
          <FiBriefcase />
          課外活動・就職情報
        </SectionTitle>
        <Card 
          darkMode={darkMode}
          onClick={() => onNavigateToExtracurricular && onNavigateToExtracurricular('就職情報', 1)}
          style={{ cursor: 'pointer' }}
        >
          <h4 style={{ marginBottom: '12px', color: darkMode ? '#fff' : '#333' }}>🏢 大手IT企業新卒採用説明会</h4>
          <p style={{ color: darkMode ? '#ccc' : '#666', fontSize: '14px', lineHeight: '1.5' }}>
            日時: 2025年3月15日 14:00-16:00<br/>
            場所: 青山キャンパス 17号館<br/>
            対象: 全学年（特に3年生推奨）
          </p>
        </Card>

        <Card 
          darkMode={darkMode}
          onClick={() => onNavigateToExtracurricular && onNavigateToExtracurricular('課外活動', 2)}
          style={{ cursor: 'pointer' }}
        >
          <h4 style={{ marginBottom: '12px', color: darkMode ? '#fff' : '#333' }}>📚 学習支援ボランティア募集</h4>
          <p style={{ color: darkMode ? '#ccc' : '#666', fontSize: '14px', lineHeight: '1.5' }}>
            地域の小中学生を対象とした学習支援ボランティアを募集します。<br/>
            教育に関心のある方のご参加をお待ちしています。
          </p>
        </Card>
      </ContentSection>
    </HomeContainer>
  );
};

export default HomePage;
