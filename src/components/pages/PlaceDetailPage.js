import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiStar, FiClock, FiPhone, FiGlobe, FiNavigation, FiHeart, FiShare2, FiCamera } from 'react-icons/fi';

const DetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a202c' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  padding: 60px 20px 20px;
  color: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PlaceImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.color || '#00A86B'};
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  position: relative;
  overflow: hidden;
`;

const PlaceInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .category {
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 12px;
  }

  .rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
  
  &:has(> :nth-child(3)) {
    grid-template-columns: 1fr;
    
    > :nth-child(3) {
      grid-column: 1;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #00A86B;
    color: white;
    
    &:hover {
      background: #008f5a;
      transform: translateY(-2px);
    }
  ` : `
    background: ${props.darkMode ? '#2d3748' : 'white'};
    color: ${props.darkMode ? 'white' : '#333'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}
`;

const InfoSection = styled.div`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};

  &:last-child {
    border-bottom: none;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: ${props => props.darkMode ? '#4a5568' : '#f8f9fa'};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00A86B;
  }

  .content {
    flex: 1;

    .label {
      font-size: 14px;
      color: ${props => props.darkMode ? '#a0aec0' : '#666'};
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.darkMode ? 'white' : '#333'};
    }
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background: ${props => props.darkMode ? '#4a5568' : '#f8f9fa'};
  color: ${props => props.darkMode ? '#e2e8f0' : '#666'};
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
`;

const ReviewSection = styled.div`
  margin-top: 8px;
`;

const ReviewCard = styled.div`
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;

  .reviewer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .name {
      font-weight: 600;
      color: ${props => props.darkMode ? 'white' : '#333'};
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ffd700;
    }
  }

  .comment {
    color: ${props => props.darkMode ? '#e2e8f0' : '#666'};
    font-size: 14px;
    line-height: 1.5;
  }
`;

const PlaceDetailPage = ({ place, onBack, darkMode = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!place) return null;

  if (!place) return null;

  const placeDetails = {
    address: '서울특별시 마포구 와우산로 94',
    phone: '02-320-1114',
    website: 'https://www.hongik.ac.kr',
    hours: '평일 09:00-18:00, 주말 휴무',
    description: place.description || '홍익대학교 캠퍼스 내 주요 시설입니다.',
    amenities: place.tags || ['Wi-Fi', '주차장', '접근성'],
    reviews: [
      {
        id: 1,
        reviewer: '익명',
        rating: 5,
        comment: '시설이 깨끗하고 이용하기 편리합니다. 직원분들도 친절하세요.'
      },
      {
        id: 2,
        reviewer: '학생A',
        rating: 4,
        comment: '위치가 좋고 접근성이 뛰어납니다. 다만 피크 시간에는 조금 붐빕니다.'
      },
      {
        id: 3,
        reviewer: '졸업생',
        rating: 5,
        comment: '학창시절 자주 이용했던 곳입니다. 추억이 많은 장소네요.'
      }
    ]
  };

  return (
    <DetailContainer darkMode={darkMode}>
      <Header>
        {onBack && (
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
        )}

        <PlaceImage color={place.color}>
          <FiMapPin size={48} />
        </PlaceImage>

        <PlaceInfo>
          <h1>{place.name}</h1>
          <div className="category">{place.category}</div>
          <div className="rating">
            <FiStar fill="#ffd700" color="#ffd700" />
            <span>{place.rating}</span>
            <span>({placeDetails.reviews.length}개 리뷰)</span>
          </div>
        </PlaceInfo>
      </Header>

      <ContentArea>
        <ActionButtons>
          <ActionButton primary>
            <FiNavigation size={16} />
            길찾기
          </ActionButton>
          <ActionButton darkMode={darkMode} onClick={() => setIsFavorite(!isFavorite)}>
            <FiHeart size={16} fill={isFavorite ? '#ff4757' : 'none'} color={isFavorite ? '#ff4757' : 'currentColor'} />
            {isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
          </ActionButton>
          <ActionButton darkMode={darkMode} onClick={onBack}>
            <FiMapPin size={16} />
            지도로 돌아가기
          </ActionButton>
        </ActionButtons>

        <InfoSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiMapPin size={20} />
            기본 정보
          </SectionTitle>
          
          <InfoItem darkMode={darkMode}>
            <div className="icon">
              <FiMapPin size={16} />
            </div>
            <div className="content">
              <div className="label">주소</div>
              <div className="value">{placeDetails.address}</div>
            </div>
          </InfoItem>

          <InfoItem darkMode={darkMode}>
            <div className="icon">
              <FiPhone size={16} />
            </div>
            <div className="content">
              <div className="label">전화번호</div>
              <div className="value">{placeDetails.phone}</div>
            </div>
          </InfoItem>

          <InfoItem darkMode={darkMode}>
            <div className="icon">
              <FiClock size={16} />
            </div>
            <div className="content">
              <div className="label">운영시간</div>
              <div className="value">{placeDetails.hours}</div>
            </div>
          </InfoItem>

          <InfoItem darkMode={darkMode}>
            <div className="icon">
              <FiGlobe size={16} />
            </div>
            <div className="content">
              <div className="label">웹사이트</div>
              <div className="value">{placeDetails.website}</div>
            </div>
          </InfoItem>
        </InfoSection>

        <InfoSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiCamera size={20} />
            시설 정보
          </SectionTitle>
          <p style={{ 
            color: darkMode ? '#e2e8f0' : '#666', 
            marginBottom: '16px', 
            lineHeight: '1.6' 
          }}>
            {placeDetails.description}
          </p>
          <TagList>
            {placeDetails.amenities.map((amenity, index) => (
              <Tag key={index} darkMode={darkMode}>#{amenity}</Tag>
            ))}
          </TagList>
        </InfoSection>

        <InfoSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiStar size={20} />
            리뷰 ({placeDetails.reviews.length})
          </SectionTitle>
          <ReviewSection>
            {placeDetails.reviews.map((review) => (
              <ReviewCard key={review.id} darkMode={darkMode}>
                <div className="reviewer">
                  <span className="name">{review.reviewer}</span>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={14} 
                        fill={i < review.rating ? '#ffd700' : 'none'}
                        color={i < review.rating ? '#ffd700' : '#ddd'}
                      />
                    ))}
                  </div>
                </div>
                <p className="comment">{review.comment}</p>
              </ReviewCard>
            ))}
          </ReviewSection>
        </InfoSection>
      </ContentArea>
    </DetailContainer>
  );
};

export default PlaceDetailPage;
