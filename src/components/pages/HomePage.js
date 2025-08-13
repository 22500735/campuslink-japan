import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiTrendingUp, FiStar, FiBriefcase, FiCalendar, FiBell, FiSettings, FiLogOut, FiTruck, FiBook, FiHome as FiHomeIcon } from 'react-icons/fi';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px; /* Extra space for bottom navigation */
`;

const Header = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
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
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
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
  justify-content: between;
  margin-bottom: 12px;
  
  .board {
    background: #00A86B;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .time {
    color: #666;
    font-size: 12px;
    margin-left: auto;
  }
`;

const PostContent = styled.div`
  h4 {
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
  border-top: 1px solid #f0f0f0;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 12px;
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

const HomePage = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const quickActions = [
    { icon: FiHomeIcon, label: '学校ホーム', action: () => {} },
    { icon: FiTruck, label: 'シャトルバス', action: () => {} },
    { icon: FiBell, label: '学事公知', action: () => {} },
    { icon: FiCalendar, label: '学事日程', action: () => {} },
    { icon: FiBook, label: '図書館', action: () => {} }
  ];

  const popularPosts = [
    {
      id: 1,
      board: '自由掲示板',
      title: '青学の学食でおすすめのメニューは？',
      content: '新入生です。学食がたくさんあってどこで何を食べればいいかわからないです。おすすめを教えてください！',
      time: '2分前',
      likes: 15,
      comments: 8
    },
    {
      id: 2,
      board: '情報掲示板',
      title: '経営学部の履修登録について',
      content: '経営学部2年です。来学期の履修登録で迷っています。マーケティング論と経営戦略論、どちらがおすすめですか？',
      time: '15分前',
      likes: 23,
      comments: 12
    },
    {
      id: 3,
      board: '就職掲示板',
      title: 'IT企業のインターン情報',
      content: '夏季インターンの募集が始まりましたね。IT企業を志望している方、一緒に情報交換しませんか？',
      time: '1時間前',
      likes: 31,
      comments: 19
    }
  ];

  const recentReviews = [
    {
      id: 1,
      course: 'マーケティング論',
      professor: '田中教授',
      rating: 4.5,
      review: '実践的な内容で就活にも役立ちます。課題は多めですが、やりがいがあります。'
    },
    {
      id: 2,
      course: '経営戦略論',
      professor: '佐藤教授',
      rating: 4.0,
      review: 'ケーススタディが中心で面白いです。グループワークが多いので積極的な参加が必要。'
    }
  ];

  return (
    <HomeContainer>
      <Header>
        <UserInfo>
          <UserProfile>
            <div className="avatar">
              <FiUser size={24} />
            </div>
            <div className="info">
              <h3>{user.name}さん</h3>
              <p>{user.university}</p>
            </div>
          </UserProfile>
          <HeaderActions>
            <HeaderButton>
              <FiBell size={20} />
            </HeaderButton>
            <HeaderButton onClick={onLogout}>
              <FiLogOut size={20} />
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
        <SectionTitle>
          <FiTrendingUp />
          リアルタイム人気投稿
        </SectionTitle>
        {popularPosts.map((post) => (
          <PostCard
            key={post.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <PostHeader>
              <span className="board">{post.board}</span>
              <span className="time">{post.time}</span>
            </PostHeader>
            <PostContent>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </PostContent>
            <PostStats>
              <div className="stat">
                <span>👍</span>
                <span>{post.likes}</span>
              </div>
              <div className="stat">
                <span>💬</span>
                <span>{post.comments}</span>
              </div>
            </PostStats>
          </PostCard>
        ))}

        <SectionTitle>
          <FiStar />
          最近の講義評価
        </SectionTitle>
        {recentReviews.map((review) => (
          <ReviewCard key={review.id}>
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

        <SectionTitle>
          <FiBriefcase />
          課外活動・採用情報
        </SectionTitle>
        <Card>
          <h4 style={{ marginBottom: '12px', color: '#333' }}>🏢 大手IT企業 新卒採用説明会</h4>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            日時: 2025年3月15日 14:00-16:00<br/>
            場所: 青山キャンパス 17号館<br/>
            対象: 全学年（特に3年生推奨）
          </p>
        </Card>

        <Card>
          <h4 style={{ marginBottom: '12px', color: '#333' }}>📚 学習支援ボランティア募集</h4>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            地域の小中学生への学習支援ボランティアを募集しています。<br/>
            教育に興味のある方、ぜひご参加ください。
          </p>
        </Card>
      </ContentSection>
    </HomeContainer>
  );
};

export default HomePage;
