import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar, FiFilter, FiChevronDown, FiUser, FiCalendar, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

const CourseReviewsContainer = styled.div`
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

const CourseInfo = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  margin-top: 20px;
  
  .course-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .professor {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 16px;
  }
  
  .rating-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .rating-display {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .stars {
      color: #ffc107;
      font-size: 20px;
    }
    
    .score {
      font-size: 24px;
      font-weight: 700;
    }
  }
  
  .participants {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.darkMode ? '#404040' : '#ddd'};
  border-radius: 20px;
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#2d2d2d' : 'white')};
  color: ${props => props.active ? 'white' : (props.darkMode ? '#fff' : '#333')};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#404040' : '#f5f5f5')};
  }
`;

const ReviewCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  .left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .avatar {
      width: 32px;
      height: 32px;
      background: ${props => props.darkMode ? '#404040' : '#f0f0f0'};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.darkMode ? '#aaa' : '#666'};
    }
    
    .name {
      font-weight: 600;
      color: ${props => props.darkMode ? '#fff' : '#333'};
    }
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    
    .stars {
      color: #ffc107;
    }
    
    .score {
      font-weight: 600;
      color: ${props => props.darkMode ? '#fff' : '#333'};
    }
  }
  
  .date {
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
  }
`;

const ReviewContent = styled.div`
  margin-bottom: 16px;
  
  .review-text {
    color: ${props => props.darkMode ? '#ccc' : '#666'};
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  .exam-info {
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
    border-radius: 8px;
    padding: 12px;
    
    .title {
      font-size: 12px;
      font-weight: 600;
      color: ${props => props.darkMode ? '#00A86B' : '#00A86B'};
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .details {
      display: flex;
      gap: 16px;
      
      .detail {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: ${props => props.darkMode ? '#ccc' : '#666'};
        
        .label {
          font-weight: 600;
        }
      }
    }
  }
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 16px;
  border: 2px dashed ${props => props.darkMode ? '#404040' : '#ddd'};
  border-radius: 12px;
  background: transparent;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00A86B;
    color: #00A86B;
  }
`;

const CourseReviewsPage = ({ onBack, darkMode }) => {
  const [sortBy, setSortBy] = useState('rating');
  const [showAll, setShowAll] = useState(false);

  const courseData = {
    name: '마케팅론',
    professor: '김교수',
    rating: 4.3,
    totalReviews: 127
  };

  const reviews = [
    {
      id: 1,
      user: '경영4학년',
      rating: 5.0,
      date: '2024년 12월',
      review: '정말 유익한 강의였습니다. 실무에 바로 적용할 수 있는 내용들이 많아서 취업 준비에도 도움이 되었어요. 교수님도 친절하시고 질문에 대한 답변도 자세히 해주십니다.',
      examInfo: {
        type: '객관식 + 서술형',
        difficulty: '보통',
        tips: '중간고사 60%, 기말고사 40%'
      }
    },
    {
      id: 2,
      user: '경영3학년',
      rating: 4.5,
      date: '2024년 11월',
      review: '과제가 조금 많긴 하지만 그만큼 배우는 것도 많습니다. 특히 케이스 스터디가 인상적이었어요. 팀 프로젝트를 통해 협업 능력도 기를 수 있었습니다.',
      examInfo: {
        type: '서술형 위주',
        difficulty: '어려움',
        tips: '출석 10%, 과제 30%, 시험 60%'
      }
    },
    {
      id: 3,
      user: '경영2학년',
      rating: 4.0,
      date: '2024년 10월',
      review: '전반적으로 만족스러운 강의입니다. 다만 진도가 조금 빠른 편이라 복습이 필수예요. 교재 외에도 추가 자료를 많이 제공해주셔서 좋았습니다.',
      examInfo: {
        type: '객관식',
        difficulty: '쉬움',
        tips: '교재 위주로 출제'
      }
    },
    {
      id: 4,
      user: '경영4학년',
      rating: 3.5,
      date: '2024년 9월',
      review: '내용은 좋지만 수업 방식이 조금 아쉬웠어요. 좀 더 인터랙티브한 수업이었으면 좋겠습니다.',
      examInfo: {
        type: '혼합형',
        difficulty: '보통',
        tips: '수업 내용 위주'
      }
    },
    {
      id: 5,
      user: '경영3학년',
      rating: 4.8,
      date: '2024년 8월',
      review: '최고의 강의 중 하나입니다! 교수님의 실무 경험을 바탕으로 한 설명이 정말 도움이 되었어요.',
      examInfo: {
        type: '서술형',
        difficulty: '보통',
        tips: '이론과 실무 연계 중요'
      }
    }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 5);

  const filterOptions = [
    { key: 'rating', label: '높은 평점순', icon: FiTrendingUp },
    { key: 'date', label: '최신순', icon: FiCalendar }
  ];

  return (
    <CourseReviewsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>講義評価</HeaderTitle>
        </HeaderTop>
        
        <CourseInfo>
          <div className="course-name">{courseData.name}</div>
          <div className="professor">{courseData.professor}</div>
          <div className="rating-section">
            <div className="rating-display">
              <div className="stars">
                {'★'.repeat(Math.floor(courseData.rating))}
                {courseData.rating % 1 !== 0 && '☆'}
              </div>
              <span className="score">{courseData.rating}</span>
            </div>
            <div className="participants">
              {courseData.totalReviews}名が評価
            </div>
          </div>
        </CourseInfo>
      </Header>

      <ContentSection>
        <FilterSection>
          {filterOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <FilterButton
                key={option.key}
                active={sortBy === option.key}
                darkMode={darkMode}
                onClick={() => setSortBy(option.key)}
              >
                <IconComponent size={14} />
                {option.label}
              </FilterButton>
            );
          })}
        </FilterSection>

        {displayedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            darkMode={darkMode}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ReviewHeader darkMode={darkMode}>
              <div className="left">
                <div className="user-info">
                  <div className="avatar">
                    <FiUser size={16} />
                  </div>
                  <span className="name">{review.user}</span>
                </div>
                <div className="rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(review.rating))}
                    {review.rating % 1 !== 0 && '☆'}
                  </div>
                  <span className="score">{review.rating}</span>
                </div>
              </div>
              <div className="date">{review.date}</div>
            </ReviewHeader>
            
            <ReviewContent darkMode={darkMode}>
              <div className="review-text">{review.review}</div>
              
              <div className="exam-info">
                <div className="title">시험 정보</div>
                <div className="details">
                  <div className="detail">
                    <span className="label">유형:</span>
                    <span>{review.examInfo.type}</span>
                  </div>
                  <div className="detail">
                    <span className="label">난이도:</span>
                    <span>{review.examInfo.difficulty}</span>
                  </div>
                  <div className="detail">
                    <span className="label">팁:</span>
                    <span>{review.examInfo.tips}</span>
                  </div>
                </div>
              </div>
            </ReviewContent>
          </ReviewCard>
        ))}

        {!showAll && sortedReviews.length > 5 && (
          <LoadMoreButton 
            darkMode={darkMode}
            onClick={() => setShowAll(true)}
          >
            もっと見る ({sortedReviews.length - 5}件の評価をもっと見る)
          </LoadMoreButton>
        )}
      </ContentSection>
    </CourseReviewsContainer>
  );
};

export default CourseReviewsPage;
