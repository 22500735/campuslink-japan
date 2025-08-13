import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiHeart, FiMessageCircle, FiFilter, FiBookOpen, FiTag, FiUser, FiClock, FiBell, FiSettings, FiX, FiPhone, FiMail, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SellProductPage from './SellProductPage';
import NotificationSettingsPage from './NotificationSettingsPage';

const MarketplaceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px; /* Extra space for bottom navigation */
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SellButton = styled.button`
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

const NotificationButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  border: 2px solid white;
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

const FilterToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 8px;
  padding: 8px 12px;
  color: ${props => props.darkMode ? '#fff' : '#666'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #00A86B;
    color: #00A86B;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const ProductCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.15'});
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${props => props.bg || 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 48px;
  position: relative;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${props => props.sold ? '#dc3545' : '#00A86B'};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.liked ? '#ff4757' : '#666'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #00A86B;
  margin-bottom: 8px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const ProductSellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProductStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const WarningCard = styled.div`
  background: ${props => props.darkMode ? 'linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)' : 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#ffeaa7'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  
  .warning-title {
    font-weight: 600;
    color: ${props => props.darkMode ? '#ffd700' : '#856404'};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .warning-text {
    font-size: 14px;
    color: ${props => props.darkMode ? '#ddd' : '#856404'};
    line-height: 1.5;
  }
`;

const PriceChangeNotification = styled(motion.div)`
  position: fixed;
  top: 80px;
  right: 20px;
  background: #00A86B;
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 14px;
  font-weight: 600;
  max-width: 300px;
`;

// Filter Modal Components
const FilterModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 0;
`;

const FilterModalContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
`;

const FilterModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  position: sticky;
  top: 0;
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  z-index: 10;
`;

const FilterModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.darkMode ? '#4a5568' : '#f8f9fa'};
  }
`;

const FilterSection = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#f0f0f0'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const FilterSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 16px;
`;

const RangeSlider = styled.div`
  margin: 20px 0;
`;

const SliderContainer = styled.div`
  position: relative;
  height: 6px;
  background: ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 3px;
  margin: 20px 0;
`;

const SliderTrack = styled.div`
  position: absolute;
  height: 6px;
  background: #00A86B;
  border-radius: 3px;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
`;

const SliderThumb = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #00A86B;
  border-radius: 50%;
  top: -7px;
  left: ${props => props.left}%;
  transform: translateX(-50%);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px 120px 24px; /* Added bottom padding to avoid navigation bar */
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
`;

const FilterActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #00A86B;
    color: white;
    
    &:hover {
      background: #008f5a;
    }
  ` : `
    background: ${props.darkMode ? '#4a5568' : 'white'};
    color: ${props.darkMode ? 'white' : '#666'};
    border: 1px solid ${props.darkMode ? '#4a5568' : '#e9ecef'};
    
    &:hover {
      background: ${props.darkMode ? '#5a6578' : '#f0f0f0'};
    }
  `}
`;

// Product Detail Modal Components
const ProductDetailOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ProductDetailContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ProductDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  position: sticky;
  top: 0;
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  z-index: 10;
`;

const ImageGallery = styled.div`
  position: relative;
  height: 300px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  color: ${props => props.darkMode ? '#4a5568' : '#ccc'};
`;

const GalleryNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 12px;' : 'right: 12px;'}
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const ImageIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const ProductDetailContent = styled.div`
  padding: 24px;
`;

const ProductDetailTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 8px;
`;

const ProductDetailPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #00A86B;
  margin-bottom: 16px;
`;

const ProductDetailDescription = styled.p`
  color: ${props => props.darkMode ? '#e2e8f0' : '#666'};
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const SellerSection = styled.div`
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const DetailSellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .name {
    font-weight: 600;
    color: ${props => props.darkMode ? 'white' : '#333'};
  }
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #00A86B;
    color: white;
    
    &:hover {
      background: #008f5a;
    }
  ` : `
    background: ${props.darkMode ? '#4a5568' : 'white'};
    color: ${props.darkMode ? 'white' : '#666'};
    border: 1px solid ${props.darkMode ? '#4a5568' : '#e9ecef'};
    
    &:hover {
      background: ${props.darkMode ? '#5a6578' : '#f0f0f0'};
    }
  `}
`;

const MarketplacePage = ({ user, darkMode = false }) => {
  const [currentView, setCurrentView] = useState('marketplace');
  const [activeCategory, setActiveCategory] = useState('全て');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState(new Set());
  const [priceChangeNotification, setPriceChangeNotification] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    conditionRange: [1, 5]
  });

  const categories = [
    { id: 'all', name: '全て' },
    { id: 'books', name: '教科書' },
    { id: 'electronics', name: '電子機器' },
    { id: 'stationery', name: '文房具' },
    { id: 'furniture', name: '家具・生活用品' },
    { id: 'clothing', name: '衣類・靴' },
    { id: 'instruments', name: '楽器' },
    { id: 'other', name: 'その他' }
  ];

  const toggleLike = (productId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
        // 관심 상품 등록 시 가격 변동 알림 설정
        const product = products.find(p => p.id === productId);
        if (product) {
          setPriceChangeNotification(`${product.title}의 가격 변동 알림이 설정되었습니다.`);
          setTimeout(() => setPriceChangeNotification(''), 3000);
        }
      }
      return newSet;
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowProductDetail(true);
  };

  const handleContactSeller = (method) => {
    if (method === 'chat') {
      alert('채팅 기능은 준비 중입니다.');
    } else if (method === 'phone') {
      alert('전화 연결 기능은 준비 중입니다.');
    }
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      conditionRange: [1, 5]
    });
  };

  const products = [
    {
      id: 1,
      title: 'iPhone 13 Pro 128GB',
      price: '￥85,000',
      image: '📱',
      seller: '田中学生',
      time: '2時間前',
      likes: 12,
      views: 45,
      category: 'electronics',
      condition: 4,
      description: '使用期間1年未満のiPhone 13 Proです。傷やスクラッチなしできれいに使用していました。箱、充電器、イヤホンすべて付属しています。',
      sold: false
    },
    {
      id: 2,
      title: 'データ構造とアルゴリズム 教科書',
      price: '￥2,500',
      image: '📚',
      seller: '佐藤学生',
      time: '5時間前',
      likes: 8,
      views: 23,
      category: 'books',
      condition: 3,
      description: '情報テクノロジー学科の専攻科目で使用した教科書です。書き込みはありますが、全体的にきれい状態です。',
      sold: false
    },
    {
      id: 3,
      title: 'ノートPCスタンド',
      price: '￥1,500',
      image: '💻',
      seller: '山田学生',
      time: '1日前',
      likes: 5,
      views: 18,
      category: 'furniture',
      condition: 4,
      description: '高さ調節可能なノートPCスタンドです。使用感がほとんどなく、新品同様です。',
      sold: true
    },
    {
      id: 4,
      title: 'ナイキ エアマックス 27.0cm',
      price: '￥12,000',
      image: '👟',
      seller: '高橋学生',
      time: '2日前',
      likes: 15,
      views: 67,
      category: 'clothing',
      condition: 3,
      description: 'サイズ27.0cmのナイキ エアマックスです。着用回数10回未満でほぼ新品です。',
      sold: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === '全て' || product.category === categories.find(cat => cat.name === activeCategory)?.id;
    const searchMatch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (currentView === 'sell') {
    return (
      <SellProductPage 
        onBack={() => setCurrentView('marketplace')}
        darkMode={darkMode}
      />
    );
  }

  if (currentView === 'notifications') {
    return (
      <NotificationSettingsPage 
        onBack={() => setCurrentView('marketplace')}
        darkMode={darkMode}
      />
    );
  }

  return (
    <MarketplaceContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderContent>
          <Title>中古取引</Title>
          <HeaderActions>
            <NotificationButton onClick={() => setCurrentView('notifications')}>
              <FiBell size={16} />
              {likedItems.size > 0 && <NotificationBadge />}
            </NotificationButton>
            <SellButton onClick={() => setCurrentView('sell')}>
              <FiPlus size={16} />
              出品する
            </SellButton>
          </HeaderActions>
        </HeaderContent>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="商品名、カテゴリで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>
      </Header>

      <ContentArea>
        <WarningCard darkMode={darkMode}>
          <div className="warning-title">
            <span>⚠️</span>
            安全取引ガイド
          </div>
          <div className="warning-text">
            • 大学関連の本や学習用品のみ取引可能です<br/>
            • 直接取引を推奨し、キャンパス内安全な場所でお会いください<br/>
            • 詐欺被害防止のため、前払いは絶対にしないでください<br/>
            • ❤️ お気に入り商品登録時価格変動通知を受け取ることができます<br/>
            •出品者は商品の説明を正確に記載する必要があります
          </div>
        </WarningCard>

        <FilterBar>
          <FilterToggleButton darkMode={darkMode} onClick={() => setShowFilterModal(true)}>
            <FiFilter size={16} />
            フィルター
          </FilterToggleButton>
          <span style={{ fontSize: '14px', color: darkMode ? '#aaa' : '#666' }}>
            合計 {filteredProducts.length}個の商品
          </span>
        </FilterBar>

        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              darkMode={darkMode}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProductClick(product)}
            >
              <ProductImage>
                <span style={{ fontSize: '64px' }}>{product.image}</span>
                {product.sold && <ProductBadge sold>販売完了</ProductBadge>}
                {!product.sold && <ProductBadge>販売中</ProductBadge>}
                <LikeButton
                  liked={likedItems.has(product.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                >
                  <FiHeart size={16} fill={likedItems.has(product.id) ? 'currentColor' : 'none'} />
                </LikeButton>
              </ProductImage>

              <ProductInfo>
                <ProductTitle darkMode={darkMode}>{product.title}</ProductTitle>
                <ProductPrice>
                  {product.price}
                  {product.originalPrice && (
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#999', 
                      textDecoration: 'line-through',
                      marginLeft: '8px',
                      fontWeight: 'normal'
                    }}>
                      {product.originalPrice}
                    </span>
                  )}
                </ProductPrice>
                <ProductDescription darkMode={darkMode}>{product.description}</ProductDescription>

                <ProductMeta>
                  <ProductSellerInfo>
                    <FiUser size={12} />
                    <span>{product.seller}</span>
                  </ProductSellerInfo>
                  <ProductStats>
                    <div className="stat">
                      <FiHeart size={12} />
                      <span>{product.likes}</span>
                    </div>
                    <div className="stat">
                      <FiMessageCircle size={12} />
                      <span>{product.chats}</span>
                    </div>
                    <div className="stat">
                      <FiClock size={12} />
                      <span>{product.time}</span>
                    </div>
                  </ProductStats>
                </ProductMeta>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </ContentArea>

      {priceChangeNotification && (
        <PriceChangeNotification
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          {priceChangeNotification}
        </PriceChangeNotification>
        )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFilterModal(false)}
        >
          <FilterModalContainer
            darkMode={darkMode}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
          <FilterModalHeader darkMode={darkMode}>
            <FilterModalTitle darkMode={darkMode}>フィルター設定</FilterModalTitle>
            <CloseButton darkMode={darkMode} onClick={() => setShowFilterModal(false)}>
              <FiX size={20} />
            </CloseButton>
          </FilterModalHeader>

          <FilterSection darkMode={darkMode}>
            <FilterSectionTitle darkMode={darkMode}>価格範囲</FilterSectionTitle>
            <RangeSlider>
              <SliderContainer darkMode={darkMode}>
                <SliderTrack 
                  left={(filters.priceRange[0] / 100000) * 100}
                  width={((filters.priceRange[1] - filters.priceRange[0]) / 100000) * 100}
                />
                <SliderThumb left={(filters.priceRange[0] / 100000) * 100} />
                <SliderThumb left={(filters.priceRange[1] / 100000) * 100} />
              </SliderContainer>
              <RangeValues darkMode={darkMode}>
                <span>¥{filters.priceRange[0].toLocaleString()}</span>
                <span>¥{filters.priceRange[1].toLocaleString()}</span>
              </RangeValues>
            </RangeSlider>
          </FilterSection>

          <FilterSection darkMode={darkMode}>
            <FilterSectionTitle darkMode={darkMode}>商品状態</FilterSectionTitle>
            <RangeSlider>
              <SliderContainer darkMode={darkMode}>
                <SliderTrack 
                  left={((filters.conditionRange[0] - 1) / 4) * 100}
                  width={((filters.conditionRange[1] - filters.conditionRange[0]) / 4) * 100}
                />
                <SliderThumb left={((filters.conditionRange[0] - 1) / 4) * 100} />
                <SliderThumb left={((filters.conditionRange[1] - 1) / 4) * 100} />
              </SliderContainer>
              <RangeValues darkMode={darkMode}>
                <span>状態 {filters.conditionRange[0]}</span>
                <span>状態 {filters.conditionRange[1]}</span>
              </RangeValues>
            </RangeSlider>
          </FilterSection>

          <FilterButtons darkMode={darkMode}>
            <FilterActionButton darkMode={darkMode} onClick={resetFilters}>
              リセット
            </FilterActionButton>
            <FilterActionButton primary darkMode={darkMode} onClick={applyFilters}>
              適用
            </FilterActionButton>
          </FilterButtons>
        </FilterModalContainer>
      </FilterModalOverlay>
    )}

    {/* Product Detail Modal */}
    {showProductDetail && selectedProduct && (
      <ProductDetailOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowProductDetail(false)}
      >
        <ProductDetailContainer
          darkMode={darkMode}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ProductDetailHeader darkMode={darkMode}>
            <FilterModalTitle darkMode={darkMode}>상품 상세</FilterModalTitle>
            <CloseButton darkMode={darkMode} onClick={() => setShowProductDetail(false)}>
              <FiX size={20} />
            </CloseButton>
          </ProductDetailHeader>

          <ImageGallery darkMode={darkMode}>
            <GalleryImage darkMode={darkMode}>
              {selectedProduct.image}
            </GalleryImage>
            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <>
                <GalleryNav direction="left" onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}>
                  <FiChevronLeft size={20} />
                </GalleryNav>
                <GalleryNav direction="right" onClick={() => setCurrentImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}>
                  <FiChevronRight size={20} />
                </GalleryNav>
                <ImageIndicators>
                  {selectedProduct.images.map((_, index) => (
                    <ImageIndicator 
                      key={index} 
                      active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </ImageIndicators>
              </>
            )}
          </ImageGallery>

          <ProductDetailContent>
            <ProductDetailTitle darkMode={darkMode}>
              {selectedProduct.title}
            </ProductDetailTitle>
            <ProductDetailPrice>
              {selectedProduct.price}
            </ProductDetailPrice>
            <ProductDetailDescription darkMode={darkMode}>
              {selectedProduct.description}
            </ProductDetailDescription>

            <SellerSection darkMode={darkMode}>
              <SellerHeader>
                <DetailSellerInfo darkMode={darkMode}>
                  <FiUser size={16} />
                  <span className="name">{selectedProduct.seller}</span>
                </DetailSellerInfo>
                <ContactButtons>
                  <ContactButton primary onClick={() => handleContactSeller('chat')}>
                    <FiMessageCircle size={14} />
                    チャットする
                  </ContactButton>
                  <ContactButton darkMode={darkMode} onClick={() => handleContactSeller('phone')}>
                    <FiPhone size={14} />
                    連絡する
                  </ContactButton>
                </ContactButtons>
              </SellerHeader>
            </SellerSection>
          </ProductDetailContent>
        </ProductDetailContainer>
      </ProductDetailOverlay>
    )}
    </MarketplaceContainer>
  );
};

export default MarketplacePage;
