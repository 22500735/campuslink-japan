import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiBookmark, FiThumbsUp, FiMessageSquare, FiEye, FiMoreHorizontal, FiX, FiEdit3, FiArrowLeft, FiSend, FiHeart } from 'react-icons/fi';
import WritePostModal from './WritePostModal';

const BoardContainer = styled.div`
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

const WriteButton = styled.button`
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

const ScrapButton = styled.button`
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
  margin-left: 12px;
  
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

const FavoriteBoardsContainer = styled.div`
  margin-bottom: 20px;
`;

const FavoriteBoardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

const CircularBoardButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isMore ? 'rgba(255, 255, 255, 0.2)' : 'white'};
  color: ${props => props.isMore ? 'white' : '#00A86B'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.isMore ? '16px' : '10px'};
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  line-height: 1.2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${props => props.isMore ? 'rgba(255, 255, 255, 0.3)' : '#f8f9fa'};
  }
`;

const AllBoardsModal = styled(motion.div)`
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

const AllBoardsContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const AllBoardsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 20px;
  text-align: center;
`;

const BoardListItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: ${props => props.darkMode ? '#2d3748' : '#e9ecef'};
    transform: translateX(4px);
  }
`;

const BoardTabs = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
  overflow-x: auto;
  gap: 4px;
`;

const BoardTab = styled.button`
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
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 12px;
  padding: 12px 16px;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
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
  margin-bottom: 16px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  p {
    color: ${props => props.darkMode ? '#ccc' : '#666'};
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .anonymous {
    background: #f8f9fa;
    color: #666;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .time {
    color: #999;
    font-size: 12px;
  }
`;

const PostBadge = styled.span`
  background: ${props => props.hot ? '#ff4757' : '#00A86B'};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const PostContent = styled.div`
  margin-bottom: 16px;
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${props => props.darkMode ? '#aaa' : '#999'};
    font-size: 14px;
  }
`;

const PostCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AnnouncementCard = styled(PostCard)`
  border-left: 4px solid #00A86B;
  background: ${props => props.darkMode ? '#2a2a2a' : '#f8f9fa'};
  
  .announcement-badge {
    background: #00A86B;
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
  }
`;

// Post Detail View Components
const PostDetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const PostDetailHeader = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 20px;
  color: white;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PostDetailContent = styled.div`
  padding: 20px;
`;

const PostDetailCard = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const PostDetailTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  line-height: 1.3;
`;

const PostDetailText = styled.div`
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#404040' : '#f8f9fa')};
  color: ${props => props.active ? 'white' : (props.darkMode ? '#fff' : '#666')};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#505050' : '#e9ecef')};
  }
`;

const CommentsSection = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
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
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentUser = styled.span`
  background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  color: ${props => props.darkMode ? '#fff' : '#666'};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const CommentTime = styled.span`
  color: ${props => props.darkMode ? '#aaa' : '#999'};
  font-size: 12px;
`;

const CommentText = styled.p`
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  font-size: 14px;
  line-height: 1.5;
  margin: 8px 0;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a1a1a' : 'white'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  font-size: 14px;
  resize: none;
  min-height: 80px;
  
  &::placeholder {
    color: ${props => props.darkMode ? '#aaa' : '#999'};
  }
  
  &:focus {
    outline: none;
    border-color: #00A86B;
  }
`;

const SendButton = styled.button`
  background: #00A86B;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #008f5a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

// Filter Modal Components (MarketplacePage style)
const FilterModal = styled(motion.div)`
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

const FilterContent = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
`;

const FilterHeader = styled.div`
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

const FilterTitle = styled.h2`
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



// Filter Modal Components (MarketplacePage style)
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

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterOptionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? '#00A86B' : (props.darkMode ? '#4a5568' : '#e9ecef')};
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#1a202c' : 'white')};
  color: ${props => props.active ? 'white' : (props.darkMode ? 'white' : '#333')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #00A86B;
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#2d3748' : '#f8f9fa')};
  }
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
  box-shadow: 0 2px 8px rgba(0, 168, 107, 0.3);
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  margin-top: 8px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  position: sticky;
  bottom: 0;
  border-top: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const FilterActionButton = styled.button`
  flex: 1;
  padding: 14px 20px;
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
    background: ${props.darkMode ? '#404040' : '#f8f9fa'};
    color: ${props.darkMode ? '#fff' : '#666'};
    border: 1px solid ${props.darkMode ? '#4a5568' : '#e9ecef'};
    
    &:hover {
      background: ${props.darkMode ? '#505050' : '#e9ecef'};
    }
  `}
`;

// Scrap Page Components
const ScrapPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const ScrapHeader = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 20px;
  color: white;
`;

const ScrapTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const EmptyScrapMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .message {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const BoardPage = ({ user, darkMode = false }) => {
  const [activeBoard, setActiveBoard] = useState('全体掲示板');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showAllBoardsModal, setShowAllBoardsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showScrapPage, setShowScrapPage] = useState(false);
  const [showFavoriteEditModal, setShowFavoriteEditModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'latest',
    likesRange: [0, 100]
  });
  const [scrapedPosts, setScrapedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [newComment, setNewComment] = useState('');

  const boards = ['学生会掲示板', 'サークル掲示板', 'スタディ掲示板', '情報掲示板', '質問掲示板', '資料共有', '講義評価', '試験情報', '恋愛掲示板', 'スポーツ掲示板', 'グルメ掲示板', '旅行掲示板'];
  
  const [favoriteBoards, setFavoriteBoards] = useState([
    { name: '自由掲示板', shortName: '自由' },
    { name: '学科掲示板', shortName: '学科' },
    { name: '就職掲示板', shortName: '就職' },
    { name: '中古取引', shortName: '中古' },
    { name: '課外活動', shortName: '課外' }
  ]);
  
  const allBoards = [
    '全体掲示板', '自由掲示板', '学科掲示板', '就職掲示板', '中古取引', '課外活動',
    '学生会掲示板', 'サークル掲示板', 'スタディ掲示板', '情報掲示板', '質問掲示板', '資料共有',
    '講義評価', '試験情報', '恋愛掲示板', 'スポーツ掲示板', 'グルメ掲示板', '旅行掲示板'
  ];

  const posts = [
    {
      id: 1,
      title: '新入生オリエンテーションのご案内',
      content: '2024年新入生オリエンテーションが3月2日から3日まで実施されます。詳細は大学ホームページをご参照ください。',
      author: '学生課',
      time: '1時間前',
      likes: 24,
      comments: 8,
      views: 156,
      board: '学生会掲示板',
      isNotice: true
    },
    {
      id: 2,
      title: '青山キャンパス図書館利用案内',
      content: '図書館の利用時間が変更されました。平日 09:00-22:00、土日祖日 10:00-18:00で運営します。',
      author: '図書館',
      time: '3時間前',
      likes: 12,
      comments: 3,
      views: 89,
      board: '情報掲示板',
      isNotice: true
    },
    {
      id: 3,
      title: '情報テクノロジー学科の専攻選択について',
      content: '3年次に上がる際の専攻選択で、AIコースとソフトウェアコースのどちらが良いでしょうか？先輩方のアドバイスをお願いします。',
      author: 'IT21',
      time: '5時間前',
      likes: 18,
      comments: 12,
      views: 234,
      board: '学科掲示板',
      isNotice: false
    },
    {
      id: 4,
      title: '大手企業インターン合格体験記',
      content: '昨年ソニーのインターンに合格した経験をシェアしたいと思います。準備過程と面接のコツをお教えします。質問がありましたらコメントでお願いします！',
      author: '就活生A',
      time: '1日前',
      likes: 45,
      comments: 22,
      views: 567,
      board: '就職掲示板',
      isNotice: false
    },
    {
      id: 5,
      title: 'スタディグループ募集 - アルゴリズム問題解決',
      content: 'コーディングテスト対策のためのアルゴリズムスタディグループを募集します。週3回のミーティングで、オンラインで実施します。興味のある方はご連絡ください！',
      author: 'コーダー',
      time: '2日前',
      likes: 31,
      comments: 15,
      views: 298,
      board: 'スタディ掲示板',
      isNotice: false
    }
  ];

  const announcements = [
    {
      id: 1,
      title: '2025年春学期履修登録日程のお知らせ',
      content: '履修登録期間: 2025年2月10日 ~ 2月14日\n新入生オリエンテーション: 2025年3月2日\n開講日: 2025年3月4日',
      time: '1日前'
    }
  ];

  const sampleComments = [
    {
      id: 1,
      postId: 1,
      user: '匿名1',
      text: '本当に役立つ情報ですね！ありがとう。',
      time: '1時間前',
      likes: 3
    },
    {
      id: 2,
      postId: 1,
      user: '匿名2',
      text: '本当に役立つ情報ですね！ありがとう。',
      time: '30分前',
      likes: 1
    }
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToBoard = () => {
    setSelectedPost(null);
  };

  const handleLikePost = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleScrapPost = (post) => {
    setScrapedPosts(prev => {
      const isAlreadyScrapped = prev.some(p => p.id === post.id);
      if (isAlreadyScrapped) {
        return prev.filter(p => p.id !== post.id);
      } else {
        return [...prev, post];
      }
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  const handleApplyFilter = () => {
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setFilters({
      category: 'all',
      sortBy: 'latest',
      likesRange: [0, 100]
    });
  };

  const handleFavoriteBoardChange = (index, newBoard) => {
    const updatedFavorites = [...favoriteBoards];
    const boardInfo = allBoards.find(board => board === newBoard);
    if (boardInfo) {
      updatedFavorites[index] = {
        name: newBoard,
        shortName: newBoard.length > 3 ? newBoard.substring(0, 2) : newBoard.replace('掲示板', '')
      };
      setFavoriteBoards(updatedFavorites);
    }
  };

  const handleToggleScrap = (postId) => {
    setScrapedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // 필터링 로직
  const filteredPosts = posts.filter(post => {
    // 게시판 필터
    const matchesBoard = activeBoard === '全体掲示板' || post.board === activeBoard;
    
    // 검색어 필터
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 카테고리 필터
    const matchesCategory = filters.category === 'all' || 
      (filters.category === 'notice' && post.isNotice) ||
      (filters.category === 'hot' && post.likes > 30) ||
      (filters.category === 'recent' && post.time.includes('時間') || post.time.includes('分'));
    
    // 좋아요 수 범위 필터
    const matchesLikes = post.likes >= filters.likesRange[0] && post.likes <= filters.likesRange[1];
    
    return matchesBoard && matchesSearch && matchesCategory && matchesLikes;
  }).sort((a, b) => {
    // 정렬 로직
    switch (filters.sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'comments':
        return b.comments - a.comments;
      case 'views':
        return b.views - a.views;
      case 'latest':
      default:
        return 0; // 기본 순서 유지
    }
  });

  // Render Post Detail View
  if (selectedPost) {
    return (
      <PostDetailContainer darkMode={darkMode}>
        <PostDetailHeader darkMode={darkMode}>
          <BackButton onClick={handleBackToBoard}>
            <FiArrowLeft size={20} />
          </BackButton>
          <Title>投稿詳細</Title>
        </PostDetailHeader>
        
        <PostDetailContent>
          <PostDetailCard darkMode={darkMode}>
            <PostDetailTitle darkMode={darkMode}>{selectedPost.title}</PostDetailTitle>
            <PostInfo>
              <span className="anonymous">匿名</span>
              <span className="time">{selectedPost.time}</span>
            </PostInfo>
            <PostDetailText darkMode={darkMode}>{selectedPost.content}</PostDetailText>
            
            <PostActions darkMode={darkMode}>
              <ActionButton 
                darkMode={darkMode}
                active={likedPosts.includes(selectedPost.id)}
                onClick={() => handleLikePost(selectedPost.id)}
              >
                <FiHeart size={16} />
                好き ({selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)})
              </ActionButton>
              
              <ActionButton 
                darkMode={darkMode}
                active={scrapedPosts.some(p => p.id === selectedPost.id)}
                onClick={() => handleScrapPost(selectedPost)}
              >
                <FiBookmark size={16} />
                스크랩
              </ActionButton>
            </PostActions>
          </PostDetailCard>
          
          <CommentsSection darkMode={darkMode}>
            <h3 style={{ marginBottom: '20px', color: darkMode ? '#fff' : '#333' }}>
              コメント ({sampleComments.filter(c => c.postId === selectedPost.id).length})
            </h3>
            
            {sampleComments
              .filter(comment => comment.postId === selectedPost.id)
              .map(comment => (
                <CommentItem key={comment.id} darkMode={darkMode}>
                  <CommentHeader>
                    <CommentUser darkMode={darkMode}>{comment.user}</CommentUser>
                    <CommentTime darkMode={darkMode}>{comment.time}</CommentTime>
                  </CommentHeader>
                  <CommentText darkMode={darkMode}>{comment.text}</CommentText>
                  <CommentActions>
                    <ActionButton darkMode={darkMode} style={{ padding: '4px 8px', fontSize: '12px' }}>
                      <FiThumbsUp size={12} />
                      {comment.likes}
                    </ActionButton>
                  </CommentActions>
                </CommentItem>
              ))}
            
            <CommentInput>
              <CommentTextarea
                darkMode={darkMode}
                placeholder="コメントを入力してください..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <SendButton onClick={handleAddComment} disabled={!newComment.trim()}>
                <FiSend size={16} />
              </SendButton>
            </CommentInput>
          </CommentsSection>
        </PostDetailContent>
      </PostDetailContainer>
    );
  }

  // Render Scrap Page
  if (showScrapPage) {
    return (
      <ScrapPageContainer darkMode={darkMode}>
        <ScrapHeader darkMode={darkMode}>
          <BackButton onClick={() => setShowScrapPage(false)}>
            <FiArrowLeft size={20} />
          </BackButton>
          <ScrapTitle>スクラップした投稿</ScrapTitle>
        </ScrapHeader>
        
        <ContentArea>
          {scrapedPosts.length === 0 ? (
            <EmptyScrapMessage darkMode={darkMode}>
              <div className="icon">📌</div>
              <div className="message">
                まだスクラップした投稿はありません。<br />
                好きな投稿をスクラップしてみてください！
              </div>
            </EmptyScrapMessage>
          ) : (
            scrapedPosts.map((post) => (
              <PostCard
                key={post.id}
                darkMode={darkMode}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePostClick(post)}
                style={{ cursor: 'pointer' }}
              >
                <PostHeader>
                  <PostInfo>
                    <span className="anonymous">匿名</span>
                    <span className="time">{post.time}</span>
                  </PostInfo>
                  {post.isHot && <PostBadge hot>HOT</PostBadge>}
                </PostHeader>
                
                <PostContent darkMode={darkMode}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </PostContent>
                
                <PostStats darkMode={darkMode}>
                  <div className="stat">
                    <FiThumbsUp size={14} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat">
                    <FiMessageSquare size={14} />
                    <span>{post.comments}</span>
                  </div>
                  <div className="stat">
                    <FiEye size={14} />
                    <span>{post.views}</span>
                  </div>
                </PostStats>
              </PostCard>
            ))
          )}
        </ContentArea>
      </ScrapPageContainer>
    );
  }

  return (
    <BoardContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderContent>
          <Title>{activeBoard || '掲示板'}</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WriteButton onClick={() => setShowWriteModal(true)}>
              <FiPlus size={16} />
              投稿する
            </WriteButton>
            <ScrapButton onClick={() => setShowScrapPage(true)}>
              <FiBookmark size={16} />
              スクラップ
            </ScrapButton>
            <ScrapButton onClick={() => setShowFavoriteEditModal(true)}>
              <FiEdit3 size={16} />
              編集
            </ScrapButton>
          </div>
        </HeaderContent>

        <SearchContainer>
          <SearchIcon>
            <FiSearch size={20} />
          </SearchIcon>
          <SearchInput
            placeholder="投稿を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FavoriteBoardsContainer>
          <FavoriteBoardsGrid>
            {favoriteBoards.map((board, index) => (
              <CircularBoardButton
                key={board.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveBoard(board.name)}
                title={board.name}
              >
                {board.shortName}
              </CircularBoardButton>
            ))}
            <CircularBoardButton
              isMore
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllBoardsModal(true)}
              title="全ての掲示板を表示"
            >
              <FiMoreHorizontal size={20} />
            </CircularBoardButton>
          </FavoriteBoardsGrid>
        </FavoriteBoardsContainer>

        <BoardTabs>
          {boards.map((board) => (
            <BoardTab
              key={board}
              active={activeBoard === board}
              onClick={() => setActiveBoard(board)}
            >
              {board}
            </BoardTab>
          ))}
        </BoardTabs>
      </Header>

      <ContentArea>
        <FilterBar>
          <FilterButton darkMode={darkMode} onClick={() => setShowFilterModal(true)}>
            <FiFilter size={16} />
            フィルター
          </FilterButton>
          <span style={{ fontSize: '14px', color: darkMode ? '#aaa' : '#666' }}>
            合計 {filteredPosts.length}件の投稿
          </span>
        </FilterBar>

        {/* Announcements */}
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} darkMode={darkMode}>
            <div className="announcement-badge">お知らせ</div>
            <PostContent darkMode={darkMode}>
              <h3>{announcement.title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{announcement.content}</p>
            </PostContent>
            <PostStats darkMode={darkMode}>
              <div className="stat">
                <span>📌</span>
                <span>重要</span>
              </div>
              <div className="stat">
                <span>{announcement.time}</span>
              </div>
            </PostStats>
          </AnnouncementCard>
        ))}

        {/* Regular Posts */}
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            darkMode={darkMode}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePostClick(post)}
            style={{ cursor: 'pointer' }}
          >
            <PostHeader>
              <PostInfo>
                <span className="anonymous"> 匿名</span>
                <span className="time">{post.time}</span>
              </PostInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleScrap(post.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: scrapedPosts.includes(post.id) ? '#00A86B' : (darkMode ? '#aaa' : '#666'),
                    transition: 'all 0.2s ease'
                  }}
                >
                  <FiBookmark size={16} fill={scrapedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                </button>
                {post.isHot && <PostBadge hot>HOT</PostBadge>}
              </div>
            </PostHeader>
            
            <PostContent darkMode={darkMode}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </PostContent>
            
            <PostStats darkMode={darkMode}>
              <div className="stat">
                <FiThumbsUp size={14} />
                <span>{post.likes}</span>
              </div>
              <div className="stat">
                <FiMessageSquare size={14} />
                <span>{post.comments}</span>
              </div>
              <div className="stat">
                <FiEye size={14} />
                <span>{post.views}</span>
              </div>
            </PostStats>
          </PostCard>
        ))}
      </ContentArea>

      <WritePostModal 
        isOpen={showWriteModal}
        onClose={() => setShowWriteModal(false)}
        darkMode={darkMode}
      />

      <AnimatePresence>
        {showAllBoardsModal && (
          <AllBoardsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllBoardsModal(false)}
          >
            <AllBoardsContainer
              darkMode={darkMode}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AllBoardsTitle darkMode={darkMode}>すべての掲示板</AllBoardsTitle>
              {allBoards.map((board) => (
                <BoardListItem
                  key={board}
                  darkMode={darkMode}
                  onClick={() => {
                    setActiveBoard(board);
                    setShowAllBoardsModal(false);
                  }}
                >
                  {board}
                </BoardListItem>
              ))}
            </AllBoardsContainer>
          </AllBoardsModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
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
                <FilterModalTitle darkMode={darkMode}>フィルター</FilterModalTitle>
                <CloseButton darkMode={darkMode} onClick={() => setShowFilterModal(false)}>
                  <FiX size={20} />
                </CloseButton>
              </FilterModalHeader>

              <FilterSection darkMode={darkMode}>
                <FilterSectionTitle darkMode={darkMode}>カテゴリ</FilterSectionTitle>
                <FilterOptions>
                  <FilterOptionButton
                    active={filters.category === 'all'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  >
                    全て
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.category === 'notice'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, category: 'notice' }))}
                  >
                    お知らせ
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.category === 'hot'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, category: 'hot' }))}
                  >
                    人気
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.category === 'recent'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, category: 'recent' }))}
                  >
                    最新
                  </FilterOptionButton>
                </FilterOptions>
              </FilterSection>

              <FilterSection darkMode={darkMode}>
                <FilterSectionTitle darkMode={darkMode}>並び順</FilterSectionTitle>
                <FilterOptions>
                  <FilterOptionButton
                    active={filters.sortBy === 'latest'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: 'latest' }))}
                  >
                    最新順
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.sortBy === 'popular'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: 'popular' }))}
                  >
                    人気順
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.sortBy === 'comments'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: 'comments' }))}
                  >
                    コメント順
                  </FilterOptionButton>
                  <FilterOptionButton
                    active={filters.sortBy === 'views'}
                    darkMode={darkMode}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: 'views' }))}
                  >
                    閲覧順
                  </FilterOptionButton>
                </FilterOptions>
              </FilterSection>

              <FilterSection darkMode={darkMode}>
                <FilterSectionTitle darkMode={darkMode}>いいね数範囲</FilterSectionTitle>
                <RangeSlider>
                  <SliderContainer darkMode={darkMode}>
                    <SliderTrack 
                      left={(filters.likesRange[0] / 100) * 100}
                      width={((filters.likesRange[1] - filters.likesRange[0]) / 100) * 100}
                    />
                    <SliderThumb left={(filters.likesRange[0] / 100) * 100} />
                    <SliderThumb left={(filters.likesRange[1] / 100) * 100} />
                  </SliderContainer>
                  <RangeValues darkMode={darkMode}>
                    <span>{filters.likesRange[0]}いいね</span>
                    <span>{filters.likesRange[1]}いいね</span>
                  </RangeValues>
                </RangeSlider>
              </FilterSection>

              <FilterButtons darkMode={darkMode}>
                <FilterActionButton darkMode={darkMode} onClick={handleResetFilter}>
                  リセット
                </FilterActionButton>
                <FilterActionButton primary darkMode={darkMode} onClick={handleApplyFilter}>
                  適用
                </FilterActionButton>
              </FilterButtons>
            </FilterModalContainer>
          </FilterModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFavoriteEditModal && (
          <AllBoardsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFavoriteEditModal(false)}
          >
            <AllBoardsContainer
              darkMode={darkMode}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AllBoardsTitle darkMode={darkMode}>お気に入り編集</AllBoardsTitle>
              <p style={{ 
                color: darkMode ? '#aaa' : '#666', 
                fontSize: '14px', 
                marginBottom: '20px', 
                textAlign: 'center' 
              }}>
                お好みの掲示板を選択してお気に入りを変更できます
              </p>
              {favoriteBoards.map((favorite, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '4px', 
                    color: darkMode ? '#fff' : '#333',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    お気に入り {index + 1}
                  </label>
                  <select
                    value={favorite.name}
                    onChange={(e) => handleFavoriteBoardChange(index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e9ecef'}`,
                      background: darkMode ? '#1a202c' : 'white',
                      color: darkMode ? 'white' : '#333',
                      fontSize: '14px'
                    }}
                  >
                    {allBoards.map((board) => (
                      <option key={board} value={board}>
                        {board}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={() => setShowFavoriteEditModal(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '20px',
                  background: '#00A86B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                完了
              </button>
            </AllBoardsContainer>
          </AllBoardsModal>
        )}
      </AnimatePresence>
    </BoardContainer>
  );
};

export default BoardPage;
