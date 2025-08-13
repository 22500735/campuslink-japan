import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMapPin, FiSearch, FiNavigation, FiCoffee, FiBook, FiShoppingBag, FiHome, FiTruck, FiX } from 'react-icons/fi';
import PlaceDetailPage from './PlaceDetailPage';
import RouteSearchModal from './RouteSearchModal';
import InlineRouteGuidance from './InlineRouteGuidance';

const MapContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px; /* Extra space for bottom navigation */
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d3748' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 20px;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  .title {
    font-size: 24px;
    font-weight: 700;
  }
`;

const RouteToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
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
  height: ${props => props.expanded ? '500px' : '300px'};
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
  transition: all 0.5s ease;
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
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
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
      color: ${props => props.darkMode ? '#fff' : '#333'};
      margin-bottom: 4px;
    }
    
    p {
      font-size: 12px;
      color: ${props => props.darkMode ? '#aaa' : '#666'};
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
    color: ${props => props.darkMode ? '#ccc' : '#666'};
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
padding: 8px 16px;
border: none;
border-radius: 8px;
font-size: 12px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
background: ${props => props.primary ? '#00A86B' : '#f8f9fa'};
color: ${props => props.primary ? 'white' : '#333'};

&:hover {
  background: ${props => props.primary ? '#008a5a' : '#e9ecef'};
}
`;

const RouteSearchButton = styled.button`
width: 100%;
padding: 16px;
background: ${props => props.active ? '#ff4757' : '#00A86B'};
color: white;
border: none;
border-radius: 12px;
font-size: 16px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;

&:hover {
  background: ${props => props.active ? '#ff3838' : '#008f5a'};
  transform: translateY(-2px);
}
`;

const RouteInfoSection = styled(motion.div)`
background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
border-radius: 16px;
padding: 20px;
margin-bottom: 20px;
box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const SectionTitle = styled.h3`
font-size: 18px;
font-weight: 700;
color: ${props => props.darkMode ? '#fff' : '#333'};
margin-bottom: 16px;
display: flex;
align-items: center;
gap: 8px;
`;

const TransportInfo = styled.div`
display: grid;
gap: 12px;
margin-bottom: 16px;
`;

const TransportCard = styled.div`
display: flex;
align-items: center;
gap: 12px;
padding: 12px;
background: #f8f9fa;
border-radius: 12px;

.icon {
  width: 40px;
  height: 40px;
  background: ${props => props.color || '#00A86B'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.info {
  flex: 1;

  .name {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
  }

  .detail {
    font-size: 12px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
}

.status {
  font-size: 12px;
  color: #00A86B;
  font-weight: 600;
}
`;

const MapPage = ({ darkMode = false }) => {
  const [showRouteSearch, setShowRouteSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentView, setCurrentView] = useState('map');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showInlineGuidance, setShowInlineGuidance] = useState(false);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: '全て', icon: FiHome },
    { id: 'cafe', name: 'カフェ', icon: FiCoffee },
    { id: 'library', name: '図書館', icon: FiBook },
    { id: 'store', name: 'コンビニ', icon: FiShoppingBag },
    { id: 'transport', name: '交通', icon: FiTruck }
  ];

  const locations = [
    {
      id: 1,
      name: '青山学院大学図書館',
      category: '図書館',
      distance: '徒歩3分',
      rating: 4.8,
      description: '24時間開放している中央図書館です。個人学習室とグループ学習室を予約できます。',
      tags: ['24時間', '学習室', 'WiFi'],
      color: '#4ECDC4'
    },
    {
      id: 2,
      name: '学生会館カフェ',
      category: 'カフェ',
      distance: '徒歩2分',
      rating: 4.5,
      description: '学生がよく利用するカフェです。リーズナブルな価格で美味しいコーヒーと軽食を提供しています。',
      tags: ['安い', 'WiFi', 'コンセント'],
      color: '#FF6B6B'
    },
    {
      id: 3,
      name: 'セブンイレブン青山店',
      category: 'コンビニ',
      distance: '徒歩1分',
      rating: 4.2,
      description: 'キャンパス内で最も近いコンビニです。生活用品やお菓子を購入できます。',
      tags: ['24時間', '宅配', 'ATM'],
      color: '#45B7D1'
    },
    {
      id: 4,
      name: '表参道駅',
      category: '交通',
      distance: '徒歩5分',
      rating: 4.6,
      description: '銀座線、半蔵門線、千代田線が利用できる駅です。渋谷や新宿へのアクセスが便利です。',
      tags: ['地下鉄', '乗り換え', 'アクセス良好'],
      color: '#96CEB4'
    },
    {
      id: 5,
      name: 'スターバックス青山店',
      category: 'カフェ',
      distance: '徒歩4分',
      rating: 4.3,
      description: '広いスペースと多様なドリンクを提供するスターバックスです。勉強に最適な環境です。',
      tags: ['勉強', 'WiFi', '広い'],
      color: '#FF6B6B'
    }
  ];

  const filteredLocations = locations.filter(location => 
    (activeCategory === 'all' || location.category === activeCategory) &&
    (searchQuery === '' || location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     location.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowRouteSearch(true);
  };

  const handleStartGuidance = (route) => {
    // Add detailed steps to the route for guidance
    const routeWithSteps = {
      ...route,
      detailedSteps: [
        {
          action: '青山学院大学正門から出発',
          description: '青山学院大学正門から出発して、和泉通りを進みます。'
        },
        {
          action: '地下鉄銀座線 表参道駅へ移動',
          description: '徒歩5分、地下鉄銀座線 表参道駅へ移動します。'
        },
        {
          action: '地下鉄銀座線に乗車',
          description: '渋谷方面の地下鉄銀座線に乗車し、3駅進みます。'
        },
        {
          action: '新宿三丁目駅で下車',
          description: '新宿三丁目駅で下車し、改札を出ます。'
        },
        {
          action: '目的地到着',
          description: '新宿三丁目駅から徒歩2分、目的地に到着します。'
        }
      ]
    };
    setSelectedRoute(routeWithSteps);
    setShowRouteSearch(false);
    setShowInlineGuidance(true);
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setCurrentView('placeDetail');
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setSelectedRoute(null);
    setSelectedPlace(null);
  };

  const handleCloseGuidance = () => {
    setShowInlineGuidance(false);
    setSelectedRoute(null);
  };



  const toggleRouteMode = () => {
    setIsRouteMode(!isRouteMode);
  };

  const transportInfo = [
    {
      name: '銀座線',
      detail: '表参道駅方面',
      status: '正常運行',
      color: '#00A86B',
      icon: FiTruck
    },
    {
      name: 'バス都01系統',
      detail: '渋谷駅方面',
      status: '5分後到着',
      color: '#FF6B6B',
      icon: FiTruck
    },
    {
      name: 'キャンパスバス',
      detail: 'キャンパス循環',
      status: '運行中',
      color: '#45B7D1',
      icon: FiTruck
    }
  ];

  if (currentView === 'placeDetail' && selectedPlace) {
    return (
      <PlaceDetailPage 
        place={selectedPlace}
        onBack={handleBackToMap}
        darkMode={darkMode}
      />
    );
  }



  return (
    <MapContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <div className="title">マップ</div>
          <RouteToggle onClick={toggleRouteMode} active={isRouteMode}>
            <FiNavigation size={16} />
            {isRouteMode ? 'ルート検索を閉じる' : 'ルート検索'}
          </RouteToggle>
        </HeaderTop>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="場所や建物名を検索してください..."
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
        <RouteSearchButton 
          active={isRouteMode}
          onClick={toggleRouteMode}
        >
          {isRouteMode ? <FiX size={16} /> : <FiNavigation size={16} />}
          {isRouteMode ? 'ルート検索を閉じる' : 'ルート検索'}
        </RouteSearchButton>

        <MapView expanded={isRouteMode}>
          <MapPlaceholder>
            <div className="icon">
              <FiMapPin />
            </div>
            <h3>青山学院大学キャンパス</h3>
            <p>インタラクティブマップ {isRouteMode && '(拡張モード)'}</p>
          </MapPlaceholder>
        </MapView>

        {showInlineGuidance && selectedRoute && (
          <InlineRouteGuidance 
            route={selectedRoute}
            onClose={handleCloseGuidance}
            darkMode={darkMode}
          />
        )}

        {isRouteMode && !showInlineGuidance && (
          <RouteInfoSection
            darkMode={darkMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <SectionTitle darkMode={darkMode}>
              <FiTruck size={20} />
              交通情報
            </SectionTitle>
            <TransportInfo>
              {transportInfo.map((transport, index) => (
                <TransportCard key={index} color={transport.color}>
                  <div className="icon">
                    <transport.icon size={20} />
                  </div>
                  <div className="info">
                    <div className="name">{transport.name}</div>
                    <div className="detail">{transport.detail}</div>
                  </div>
                  <div className="status">{transport.status}</div>
                </TransportCard>
              ))}
            </TransportInfo>
          </RouteInfoSection>
        )}

        {!isRouteMode && (
          <LocationList>
            {filteredLocations.map((location) => (
              <LocationCard
                key={location.id}
                darkMode={darkMode}
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

                <LocationDescription darkMode={darkMode}>
                  <p>{location.description}</p>
                </LocationDescription>

                <LocationTags>
                  {location.tags.map((tag, index) => (
                    <Tag key={index}>#{tag}</Tag>
                  ))}
                </LocationTags>

                <LocationActions>
                  <ActionButton primary onClick={() => handleLocationSelect(location)}>
                    <FiNavigation size={12} style={{ marginRight: '4px' }} />
                    ルート案内
                  </ActionButton>
                  <ActionButton onClick={() => handlePlaceClick(location)}>
                    <FiMapPin size={12} style={{ marginRight: '4px' }} />
                    詳細情報
                  </ActionButton>
                </LocationActions>
              </LocationCard>
            ))}
          </LocationList>
        )}
      </ContentArea>

      <RouteSearchModal 
        isOpen={showRouteSearch}
        onClose={() => setShowRouteSearch(false)}
        destination={selectedLocation?.name || ''}
        darkMode={darkMode}
        onStartGuidance={handleStartGuidance}
      />
    </MapContainer>
  );
};

export default MapPage;
