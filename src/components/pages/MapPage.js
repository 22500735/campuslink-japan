import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMapPin, FiSearch, FiNavigation, FiCoffee, FiBook, FiShoppingBag, FiHome, FiTruck } from 'react-icons/fi';

const MapContainer = styled.div`
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
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

const CategoryTabs = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
  overflow-x: auto;
  gap: 4px;
`;

const CategoryTab = styled.button`
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
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 40px; /* Additional bottom padding */
`;

const MapView = styled.div`
  background: white;
  border-radius: 16px;
  height: 300px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: 
    radial-gradient(circle at 25% 25%, #00A86B 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, #20B2AA 2px, transparent 2px),
    radial-gradient(circle at 50% 50%, #00A86B 1px, transparent 1px);
  background-size: 50px 50px, 60px 60px, 30px 30px;
  background-color: #f8f9fa;
`;

const MapPlaceholder = styled.div`
  text-align: center;
  color: #666;
  
  .icon {
    font-size: 48px;
    color: #00A86B;
    margin-bottom: 12px;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const LocationList = styled.div`
  display: grid;
  gap: 12px;
`;

const LocationCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .icon {
    width: 40px;
    height: 40px;
    background: ${props => props.color || '#00A86B'};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .details {
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }
    
    p {
      font-size: 12px;
      color: #666;
    }
  }
`;

const LocationBadge = styled.span`
  background: ${props => props.color || '#00A86B'};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const LocationDescription = styled.div`
  margin-bottom: 12px;
  
  p {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const LocationTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  background: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const LocationActions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: ${props => props.primary ? '#00A86B' : '#f8f9fa'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#008a5a' : '#e9ecef'};
  }
`;

const MapPage = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('全て');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '全て', label: '全て', icon: FiMapPin },
    { id: '学習', label: '学習', icon: FiBook },
    { id: '食堂', label: '食堂', icon: FiCoffee },
    { id: '便利施設', label: '便利施設', icon: FiShoppingBag },
    { id: '寄宿舎', label: '寄宿舎', icon: FiHome },
    { id: '交通', label: '交通', icon: FiTruck }
  ];

  const locations = [
    {
      id: 1,
      name: '17号館 (経営学部)',
      category: '学習',
      description: '経営学部専用建物。講義室、セミナー室、学生ラウンジ完備',
      tags: ['Wi-Fi', 'プリンター', 'カフェ', '静か'],
      distance: '徒歩3分',
      rating: 4.5,
      color: '#00A86B'
    },
    {
      id: 2,
      name: '青山学生食堂',
      category: '食堂',
      description: '様々な和食、日本料理、洋食メニュー。学生割引適用',
      tags: ['安い', '美味しい', '幅広い', '学生割引'],
      distance: '徒歩5分',
      rating: 4.2,
      color: '#ff6b6b'
    },
    {
      id: 3,
      name: '中央図書館',
      category: '学習',
      description: '24時間閲覧室、グループスタディルーム、デジタル資料室',
      tags: ['24時間', '静か', 'Wi-Fi', 'スタディルーム'],
      distance: '徒歩7分',
      rating: 4.7,
      color: '#4ecdc4'
    },
    {
      id: 4,
      name: 'コンビニ (セブンイレブン)',
      category: '便利施設',
      description: 'キャンパス内コンビニ。生活用品、お菓子、飲み物販売',
      tags: ['24時間', 'ATM', '宅配', '安い'],
      distance: '徒歩2分',
      rating: 4.0,
      color: '#45b7d1'
    },
    {
      id: 5,
      name: '青山寄宿舎',
      category: '寄宿舎',
      description: '新築寄宿舎。1人部屋、2人部屋選択可能',
      tags: ['きれい', 'セキュリティ', 'Wi-Fi', '洗濯室'],
      distance: '徒歩10分',
      rating: 4.3,
      color: '#96ceb4'
    },
    {
      id: 6,
      name: '正門バス停',
      category: '交通',
      description: '市内バス、コミュニティバス、シャトルバス停留所',
      tags: ['交通便利', 'リアルタイム情報', '地下鉄接続'],
      distance: '徒歩1分',
      rating: 4.1,
      color: '#feca57'
    }
  ];

  const filteredLocations = locations.filter(location => 
    (activeCategory === '全て' || location.category === activeCategory) &&
    (searchQuery === '' || location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     location.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MapContainer>
      <Header>
        <Title>キャンパスマップ</Title>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="場所検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <CategoryTabs>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <CategoryTab
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                <IconComponent size={16} />
                {category.label}
              </CategoryTab>
            );
          })}
        </CategoryTabs>
      </Header>

      <ContentArea>
        <MapView>
          <MapPlaceholder>
            <div className="icon">
              <FiMapPin />
            </div>
            <h3>青山学院大学キャンパス</h3>
            <p>インタラクティブマップ (開発予定)</p>
          </MapPlaceholder>
        </MapView>

        <LocationList>
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <LocationHeader>
                <LocationInfo color={location.color}>
                  <div className="icon">
                    <FiMapPin size={20} />
                  </div>
                  <div className="details">
                    <h4>{location.name}</h4>
                    <p>{location.distance} • ⭐ {location.rating}</p>
                  </div>
                </LocationInfo>
                <LocationBadge color={location.color}>
                  {location.category}
                </LocationBadge>
              </LocationHeader>

              <LocationDescription>
                <p>{location.description}</p>
              </LocationDescription>

              <LocationTags>
                {location.tags.map((tag, index) => (
                  <Tag key={index}>#{tag}</Tag>
                ))}
              </LocationTags>

              <LocationActions>
                <ActionButton primary>
                  <FiNavigation size={12} style={{ marginRight: '4px' }} />
                  ルート検索
                </ActionButton>
                <ActionButton>
                  <FiMapPin size={12} style={{ marginRight: '4px' }} />
                  詳細情報
                </ActionButton>
              </LocationActions>
            </LocationCard>
          ))}
        </LocationList>
      </ContentArea>
    </MapContainer>
  );
};

export default MapPage;
