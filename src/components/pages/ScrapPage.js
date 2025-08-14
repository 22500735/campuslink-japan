import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBookmark, FiTrash2, FiMessageCircle, FiHeart, FiClock, FiUser } from 'react-icons/fi';

const ScrapContainer = styled.div`
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

const ScrapCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
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
  
  .actions {
    display: flex;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'delete' ? '#ff4757' : 'rgba(0, 168, 107, 0.1)'};
  color: ${props => props.variant === 'delete' ? 'white' : '#00A86B'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.variant === 'delete' ? '#ff3742' : 'rgba(0, 168, 107, 0.2)'};
  }
`;

const PostContent = styled.div`
  margin-bottom: 16px;
  
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .preview {
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
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  
  .stats {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
  }
  
  .scrap-date {
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.darkMode ? '#666' : '#999'};
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ScrapPage = ({ onBack, darkMode }) => {
  const [scrapedPosts, setScrapedPosts] = useState([
    {
      id: 1,
      board: '自由掲示板',
      author: '匿名',
      title: '就職準備のスタディを募集します',
      preview: '一緒に就職準備するスタディメンバーを募集します。週2回の集まり予定で、서류 첨삭과 면접 연습을 함께 진행할 예정입니다.',
      likes: 24,
      comments: 8,
      scrapDate: '2日 前'
    },
    {
      id: 2,
      board: '情報掲示板',
      author: 'コンピュータ工学4年生',
      title: 'ナバ 인턴シップの後感とアドバイスを共有します',
      preview: '先年ナバ夏期インターンシップを経験した後感を詳しく共有します。 지원過程から実際の業務まで詳しく共有します。',
      likes: 156,
      comments: 32,
      scrapDate: '1周 前'
    },
    {
      id: 3,
      board: '学科掲示板',
      title: '経営学科の専攻選択ガイド',
      author: '経営学科助教授',
      preview: '経営学科3年生の専攻選択ガイドです。各専攻の特徴と進路方向をまとめました。',
      likes: 89,
      comments: 15,
      scrapDate: '2週 前'
    }
  ]);

  const handleDeleteScrap = (postId, e) => {
    e.stopPropagation();
    setScrapedPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <ScrapContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>スクラップした投稿</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {scrapedPosts.length > 0 ? (
          scrapedPosts.map((post) => (
            <ScrapCard
              key={post.id}
              darkMode={darkMode}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <PostHeader darkMode={darkMode}>
                <div className="left">
                  <span className="board">{post.board}</span>
                  <div className="author">
                    <FiUser size={12} />
                    {post.author}
                  </div>
                </div>
                <div className="actions">
                  <ActionButton>
                    <FiBookmark size={14} />
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    onClick={(e) => handleDeleteScrap(post.id, e)}
                  >
                    <FiTrash2 size={14} />
                  </ActionButton>
                </div>
              </PostHeader>
              
              <PostContent darkMode={darkMode}>
                <div className="title">{post.title}</div>
                <div className="preview">{post.preview}</div>
              </PostContent>
              
              <PostStats darkMode={darkMode}>
                <div className="stats">
                  <div className="stat">
                    <FiHeart size={12} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat">
                    <FiMessageCircle size={12} />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <div className="scrap-date">
                  <FiClock size={12} />
                  {post.scrapDate} スクラップ
                </div>
              </PostStats>
            </ScrapCard>
          ))
        ) : (
          <EmptyState darkMode={darkMode}>
            <FiBookmark className="icon" />
            <div className="title">スクラップした投稿がありません</div>
            <div className="subtitle">
              視興の投稿をスクラップしてみてください。<br/>
              あとで簡単に再び見つけることができます。
            </div>
          </EmptyState>
        )}
      </ContentSection>
    </ScrapContainer>
  );
};

export default ScrapPage;
