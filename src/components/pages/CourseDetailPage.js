import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiStar, FiBook, FiShoppingBag, FiMapPin, FiClock, FiUser, FiCalendar, FiMessageCircle } from 'react-icons/fi';

const CourseDetailContainer = styled.div`
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
  
  .course-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 16px;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    opacity: 0.9;
    
    .icon {
      color: white;
    }
  }
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const ActionButton = styled.button`
  padding: 16px;
  background: ${props => props.variant === 'primary' ? '#00A86B' : (props.darkMode ? '#2d2d2d' : 'white')};
  color: ${props => props.variant === 'primary' ? 'white' : (props.darkMode ? '#fff' : '#00A86B')};
  border: ${props => props.variant === 'primary' ? 'none' : `2px solid #00A86B`};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#008f5a' : '#00A86B'};
    color: white;
  }
`;

const InfoCard = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  
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
      color: ${props => props.darkMode ? '#fff' : '#333'};
    }
  }
  
  .participants {
    font-size: 14px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
`;

const ReviewPreview = styled.div`
  .review-item {
    padding: 12px 0;
    border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
    
    &:last-child {
      border-bottom: none;
    }
    
    .review-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      
      .rating {
        color: #ffc107;
        font-size: 14px;
      }
      
      .author {
        font-size: 12px;
        color: ${props => props.darkMode ? '#aaa' : '#666'};
      }
    }
    
    .review-text {
      font-size: 14px;
      color: ${props => props.darkMode ? '#ccc' : '#666'};
      line-height: 1.5;
    }
  }
`;

const ViewMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px dashed ${props => props.darkMode ? '#404040' : '#ddd'};
  border-radius: 8px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00A86B;
    color: #00A86B;
  }
`;

const TextbookSection = styled.div`
  .textbook-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
    border-radius: 12px;
    margin-bottom: 12px;
    
    .book-info {
      flex: 1;
      
      .title {
        font-weight: 600;
        color: ${props => props.darkMode ? '#fff' : '#333'};
        margin-bottom: 4px;
      }
      
      .author {
        font-size: 14px;
        color: ${props => props.darkMode ? '#aaa' : '#666'};
        margin-bottom: 4px;
      }
      
      .price {
        font-size: 14px;
        color: #00A86B;
        font-weight: 600;
      }
    }
    
    .book-cover {
      width: 60px;
      height: 80px;
      background: ${props => props.darkMode ? '#555' : '#ddd'};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.darkMode ? '#aaa' : '#666'};
    }
  }
`;

const CourseDetailPage = ({ onBack, darkMode, courseData, onNavigateToMarketplace, onNavigateToCourseReviews }) => {
  const course = courseData || {
    name: 'マーケティング理論',
    professor: '田中教授',
    room: 'B201',
    time: '水曜日 13:00-15:00',
    credits: 3,
    department: '経済学部',
    rating: 4.3,
    totalReviews: 127,
    textbooks: [
      {
        id: 1,
        title: '現代マーケティング理論',
        author: '田中理論',
        price: '25,000円',
        usedPrice: '15,000円'
      },
      {
        id: 2,
        title: 'マーケティング理論と実務',
        author: '田中理論',
        price: '30,000円',
        usedPrice: '18,000円'
      }
    ]
  };

  const recentReviews = [
    {
      id: 1,
      author: '経済4年生',
      rating: 5.0,
      text: '非常に有益な授業でした。実務にすぐに適用できる内容が多く、非常に有益です...'
    },
    {
      id: 2,
      author: '経済3年生',
      rating: 4.5,
      text: '課題が少し多くですが、それだけ多くのことを学ぶことができます...'
    },
    {
      id: 3,
      author: '経済2年生',
      rating: 4.0,
      text: '全体的に満足しています。ただし、進度が少し早い傾向があります...'
    }
  ];

  const handleBuyTextbook = (textbook) => {
    // Navigate to marketplace with textbook search
    if (onNavigateToMarketplace && textbook) {
      onNavigateToMarketplace(textbook.title);
    } else if (onNavigateToMarketplace) {
      // If no specific textbook, search for course name
      onNavigateToMarketplace(course.name);
    }
  };

  return (
    <CourseDetailContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>授業詳細情報</HeaderTitle>
        </HeaderTop>
        
        <CourseInfo>
          <div className="course-name">{course.name}</div>
          <div className="course-details">
            <div className="detail-item">
              <FiUser className="icon" size={16} />
              {course.professor}
            </div>
            <div className="detail-item">
              <FiMapPin className="icon" size={16} />
              {course.room}
            </div>
            <div className="detail-item">
              <FiClock className="icon" size={16} />
              {course.time}
            </div>
            <div className="detail-item">
              <FiBook className="icon" size={16} />
              {course.credits}単位
            </div>
          </div>
        </CourseInfo>
      </Header>

      <ContentSection>
        <ActionButtons>
          <ActionButton 
            variant="primary"
            onClick={() => onNavigateToCourseReviews(course, null, true)}
          >
            <FiStar size={16} />
            講義評価を見る
          </ActionButton>
          <ActionButton darkMode={darkMode}>
            <FiMessageCircle size={16} />
            授業掲示板
          </ActionButton>
        </ActionButtons>

        <InfoCard darkMode={darkMode}>
          <CardTitle darkMode={darkMode}>
            <FiStar />
            講義評価
          </CardTitle>
          
          <RatingSection darkMode={darkMode}>
            <div className="rating-display">
              <div className="stars">
                {'★'.repeat(Math.floor(course.rating))}
                {course.rating % 1 !== 0 && '☆'}
              </div>
              <span className="score">{course.rating}</span>
            </div>
            <div className="participants">
              {course.totalReviews || 42} 人が評価しました
            </div>
          </RatingSection>

          <ReviewPreview darkMode={darkMode}>
            {(recentReviews || []).map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="rating">
                    {'★'.repeat(Math.floor(review.rating))}
                  </div>
                  <span className="author">{review.author}</span>
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            ))}
          </ReviewPreview>

          <ViewMoreButton 
            darkMode={darkMode}
            onClick={() => onNavigateToCourseReviews(course, null, true)}  
          >
            全ての評価を見る ({course.totalReviews || 42}件)
          </ViewMoreButton>
        </InfoCard>

        <InfoCard darkMode={darkMode}>
          <CardTitle darkMode={darkMode}>
            <FiBook />
            教材情報
          </CardTitle>
          
          <TextbookSection darkMode={darkMode}>
            {(course.textbooks || []).map((textbook) => (
              <div key={textbook.id} className="textbook-item">
                <div className="book-cover">
                  <FiBook size={24} />
                </div>
                <div className="book-info">
                  <div className="title">{textbook.title}</div>
                  <div className="author">{textbook.author}</div>
                  <div className="price">
                    正価格: {textbook.price} | 中古価格: {textbook.usedPrice}
                  </div>
                </div>
              </div>
            ))}
          </TextbookSection>

          <ActionButton 
            variant="primary"
            onClick={() => handleBuyTextbook(course.textbooks && course.textbooks[0] ? course.textbooks[0] : null)}
            style={{ marginTop: '16px' }}
          >
            <FiShoppingBag size={16} />
            中古教材購入
          </ActionButton>
        </InfoCard>
      </ContentSection>
    </CourseDetailContainer>
  );
};

export default CourseDetailPage;
