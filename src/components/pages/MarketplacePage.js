import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiHeart, FiMessageCircle, FiFilter, FiBookOpen, FiTag, FiUser, FiClock } from 'react-icons/fi';

const MarketplaceContainer = styled.div`
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

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 8px 12px;
  color: #666;
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
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
  color: #333;
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
  color: #666;
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

const SellerInfo = styled.div`
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
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
  border: 2px solid #ffc107;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  
  .warning-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #f57c00;
    margin-bottom: 8px;
  }
  
  .warning-text {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
`;

const MarketplacePage = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('全て');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState(new Set());

  const categories = ['全て', '教材', '専門書籍', '語学書籍', 'その他書籍', '文具用品'];

  const products = [
    {
      id: 1,
      title: 'マーケティング論 教科書 (田中教授)',
      price: '¥2,500',
      originalPrice: '¥4,800',
      description: '2024年購入。アンダーラインほとんどなく状態良好です。経営学部必須教材。',
      category: '教材',
      seller: '経営学部3年',
      time: '2時間前',
      likes: 5,
      chats: 3,
      image: '📚',
      sold: false
    },
    {
      id: 2,
      title: 'TOEIC 공식문제집 Vol.8',
      price: '¥1,800',
      originalPrice: '¥3,300',
      description: '一度だけ解きました。解答用紙未使用。TOEIC準備される方におすすめ！',
      category: '語学書籍',
      seller: '英文学部2年',
      time: '5時間前',
      likes: 8,
      chats: 6,
      image: '📖',
      sold: false
    },
    {
      id: 3,
      title: '경영전략론 케이스스터디',
      price: '¥3,200',
      originalPrice: '¥5,500',
      description: '佐藤教授の授業教材。重要部分に蛍光ペン表示あり。成績A+を取った教材です。',
      category: '専門書籍',
      seller: '経営学部4年',
      time: '1日前',
      likes: 12,
      chats: 9,
      image: '📊',
      sold: false
    },
    {
      id: 4,
      title: '통계학 입문 (완전판)',
      price: '¥2,000',
      originalPrice: '¥4,200',
      description: 'ほぼ新品レベル。付箋が数枚貼ってありますがきれいです。',
      category: '専門書籍',
      seller: '数学科3年',
      time: '2日前',
      likes: 6,
      chats: 4,
      image: '📈',
      sold: true
    },
    {
      id: 5,
      title: '법학개론 최신판 2024',
      price: '¥3,800',
      originalPrice: '¥6,800',
      description: '法学部1年必須教材。最新改訂版です。状態とても良好。',
      category: '専門書籍',
      seller: '法学部2年',
      time: '3日前',
      likes: 4,
      chats: 2,
      image: '⚖️',
      sold: false
    },
    {
      id: 6,
      title: '고급 계산기 (공학용)',
      price: '¥1,500',
      originalPrice: '¥3,800',
      description: 'CASIO fx-991EX。数学、統計授業に必須。ほとんど使用していないので販売します。',
      category: '文具用品',
      seller: '工学部1年',
      time: '4日前',
      likes: 7,
      chats: 5,
      image: '🔢',
      sold: false
    }
  ];

  const filteredProducts = products.filter(product => 
    (activeCategory === '全て' || product.category === activeCategory) &&
    (searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleLike = (productId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(productId)) {
      newLikedItems.delete(productId);
    } else {
      newLikedItems.add(productId);
    }
    setLikedItems(newLikedItems);
  };

  return (
    <MarketplaceContainer>
      <Header>
        <HeaderContent>
          <Title>중고마켓</Title>
          <SellButton>
            <FiPlus size={16} />
            販売する
          </SellButton>
        </HeaderContent>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="教材、書籍検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>
      </Header>

      <ContentArea>
        <WarningCard>
          <div className="warning-title">
            <span>⚠️</span>
            安全取引案内
          </div>
          <div className="warning-text">
            • 大学書籍と学習関連用品のみ取引可能です<br/>
            • 直接取引を推奨し、キャンパス内の安全な場所でお会いください<br/>
            • 詐欺被害防止のため前払いは絶対にしないでください
          </div>
        </WarningCard>

        <FilterBar>
          <FilterButton>
            <FiFilter size={16} />
            フィルター
          </FilterButton>
          <span style={{ fontSize: '14px', color: '#666' }}>
            合計 {filteredProducts.length}個の商品
          </span>
        </FilterBar>

        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
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
                <ProductTitle>{product.title}</ProductTitle>
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
                <ProductDescription>{product.description}</ProductDescription>

                <ProductMeta>
                  <SellerInfo>
                    <FiUser size={12} />
                    <span>{product.seller}</span>
                  </SellerInfo>
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
    </MarketplaceContainer>
  );
};

export default MarketplacePage;
