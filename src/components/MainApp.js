import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHome, FiCalendar, FiMessageSquare, FiMap, FiShoppingBag } from 'react-icons/fi';

// Import page components
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import BoardPage from './pages/BoardPage';
import MapPage from './pages/MapPage';
import MarketplacePage from './pages/MarketplacePage';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; /* Space for bottom navigation */
`;

const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: white;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: ${props => props.active ? '#00A86B' : '#6c757d'};
  
  &:hover {
    background: rgba(0, 168, 107, 0.1);
  }
  
  .icon {
    font-size: 24px;
    margin-bottom: 2px;
  }
  
  .label {
    font-size: 12px;
    font-weight: 600;
  }
`;

const PageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const MainApp = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'ホーム', icon: FiHome },
    { id: 'schedule', label: 'スケジュール', icon: FiCalendar },
    { id: 'board', label: '掲示板', icon: FiMessageSquare },
    { id: 'map', label: 'マップ', icon: FiMap },
    { id: 'marketplace', label: '中古市場', icon: FiShoppingBag }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage user={user} onLogout={onLogout} />;
      case 'schedule':
        return <SchedulePage user={user} />;
      case 'board':
        return <BoardPage user={user} />;
      case 'map':
        return <MapPage user={user} />;
      case 'marketplace':
        return <MarketplacePage user={user} />;
      default:
        return <HomePage user={user} onLogout={onLogout} />;
    }
  };

  return (
    <AppContainer>
      <ContentArea>
        <PageContainer
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentPage()}
        </PageContainer>
      </ContentArea>

      <BottomNavigation>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavItem
              key={item.id}
              active={currentPage === item.id}
              onClick={() => setCurrentPage(item.id)}
            >
              <div className="icon">
                <IconComponent />
              </div>
              <div className="label">{item.label}</div>
            </NavItem>
          );
        })}
      </BottomNavigation>
    </AppContainer>
  );
};

export default MainApp;
