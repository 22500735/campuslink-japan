import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiHeart, FiMessageCircle, FiBookmark, FiShare2, FiMoreHorizontal, FiClock } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const PostDetailContainer = styled.div`
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

const PostCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.darkMode ? '#404040' : '#e9ecef'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
  
  .info {
    .author {
      font-weight: 600;
      color: ${props => props.darkMode ? '#fff' : '#333'};
      margin-bottom: 2px;
    }
    
    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: ${props => props.darkMode ? '#aaa' : '#666'};
    }
  }
`;

const PostTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  line-height: 1.4;
`;

const PostContent = styled.div`
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? (props.darkMode ? '#00A86B' : '#00A86B') : 'transparent'};
  color: ${props => props.active ? 'white' : (props.darkMode ? '#aaa' : '#666')};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#404040' : '#f8f9fa')};
  }
`;

const CommentsSection = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const CommentsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 20px;
`;

const CommentItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.darkMode ? '#404040' : '#e9ecef'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
  
  .author {
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
  
  .time {
    font-size: 12px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    margin-left: auto;
  }
`;

const CommentContent = styled.div`
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  font-size: 14px;
  line-height: 1.5;
  margin-left: 44px;
`;

const PostDetailPage = ({ onBack, darkMode, postId, boardName }) => {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock post data - in real app, this would be fetched based on postId
  const post = {
    id: postId || 1,
    title: "2025년 상반기 IT 인턴십 정보 공유",
    content: `안녕하세요! 2025년 상반기 IT 인턴십 관련 정보를 공유드립니다.

네이버, 카카오, 라인 등 주요 IT 기업들의 인턴십 모집이 시작되었습니다.

주요 일정:
- 지원 마감: 3월 20일
- 서류 발표: 3월 25일  
- 면접: 4월 1일~5일
- 최종 발표: 4월 10일

준비해야 할 서류:
1. 이력서
2. 자기소개서
3. 포트폴리오 (개발직 지원자)
4. 성적증명서

많은 분들께 도움이 되었으면 좋겠습니다. 질문 있으시면 댓글로 남겨주세요!`,
    author: "김준호",
    board: boardName || "취업정보",
    time: "2시간 전",
    likes: 24,
    comments: 8,
    views: 156
  };

  const comments = [
    {
      id: 1,
      author: "이민지",
      content: "정말 유용한 정보 감사합니다! 네이버 인턴십 지원해보려고 하는데 포트폴리오는 어떤 형식으로 준비하면 좋을까요?",
      time: "1시간 전"
    },
    {
      id: 2,
      author: "박서준",
      content: "작년에 카카오 인턴십 했었는데 정말 좋은 경험이었어요. 면접에서는 기술적인 질문보다 인성 면접 비중이 높았습니다.",
      time: "45분 전"
    },
    {
      id: 3,
      author: "최유진",
      content: "라인 인턴십도 추천드려요! 업무 환경이 정말 좋고 멘토링 시스템도 잘 되어있어서 많이 배울 수 있었습니다.",
      time: "30분 전"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <PostDetailContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{post.board}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        <PostCard darkMode={darkMode}>
          <PostHeader>
            <AuthorInfo darkMode={darkMode}>
              <div className="avatar">
                <FiUser size={20} />
              </div>
              <div className="info">
                <div className="author">{post.author}</div>
                <div className="meta">
                  <span>{post.board}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                  <span>•</span>
                  <span>조회 {post.views}</span>
                </div>
              </div>
            </AuthorInfo>
          </PostHeader>

          <PostTitle darkMode={darkMode}>{post.title}</PostTitle>
          <PostContent darkMode={darkMode}>{post.content}</PostContent>

          <PostActions darkMode={darkMode}>
            <ActionButton 
              active={isLiked} 
              darkMode={darkMode}
              onClick={handleLike}
            >
              <FiHeart size={16} />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </ActionButton>
            
            <ActionButton darkMode={darkMode}>
              <FiMessageCircle size={16} />
              <span>{post.comments}</span>
            </ActionButton>
            
            <ActionButton 
              active={isBookmarked} 
              darkMode={darkMode}
              onClick={handleBookmark}
            >
              <FiBookmark size={16} />
            </ActionButton>
            
            <ActionButton darkMode={darkMode}>
              <FiShare2 size={16} />
            </ActionButton>
          </PostActions>
        </PostCard>

        <CommentsSection darkMode={darkMode}>
          <CommentsTitle darkMode={darkMode}>댓글 {comments.length}</CommentsTitle>
          
          {comments.map((comment) => (
            <CommentItem key={comment.id} darkMode={darkMode}>
              <CommentHeader darkMode={darkMode}>
                <div className="avatar">
                  <FiUser size={16} />
                </div>
                <span className="author">{comment.author}</span>
                <span className="time">{comment.time}</span>
              </CommentHeader>
              <CommentContent darkMode={darkMode}>
                {comment.content}
              </CommentContent>
            </CommentItem>
          ))}
        </CommentsSection>
      </ContentSection>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
