import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHome, FiCalendar, FiMessageSquare, FiMap, FiShoppingBag, FiUser } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

// Import page components
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import BoardPage from './pages/BoardPage';
import MapPage from './pages/MapPage';
import MarketplacePage from './pages/MarketplacePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import ScrapPage from './pages/ScrapPage';
import CourseReviewsPage from './pages/CourseReviewsPage';
import ExtracurricularPage from './pages/ExtracurricularPage';
import MyPage from './pages/MyPage';
import ClubPage from './pages/ClubPage';
import SchoolSelectionPage from './pages/SchoolSelectionPage';
import InformationGuidePage from './pages/InformationGuidePage';
import PostDetailPage from './pages/PostDetailPage';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
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
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
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
  const [darkMode, setDarkMode] = useState(false);
  const [boardInfo, setBoardInfo] = useState(null);
  const [courseReviewInfo, setCourseReviewInfo] = useState(null);
  const [navigationStack, setNavigationStack] = useState(['home']);
  const [scheduleContext, setScheduleContext] = useState(null);
  const [postDetail, setPostDetail] = useState(null);
  const { t } = useLanguage();

  const navigationItems = [
    { id: 'home', label: t('home'), icon: FiHome },
    { id: 'schedule', label: t('schedule'), icon: FiCalendar },
    { id: 'board', label: t('board'), icon: FiMessageSquare },
    { id: 'map', label: t('map'), icon: FiMap },
    { id: 'marketplace', label: t('marketplace'), icon: FiShoppingBag },
    { id: 'mypage', label: t('myPage'), icon: FiUser }
  ];

  const handleNavigateToSettings = () => {
    setCurrentPage('settings');
  };

  const handleNavigateToNotifications = () => {
    setCurrentPage('notifications');
  };

  const handleNavigateToScrap = () => {
    setCurrentPage('scrap');
  };

  const handleNavigateToMyPage = () => {
    setCurrentPage('mypage');
  };

  const handleNavigateToClubs = () => {
    setCurrentPage('clubs');
  };

  const handleNavigateToSchoolSelection = () => {
    setCurrentPage('schoolSelection');
  };

  const handleNavigateToCourseReviews = (course, reviewId) => {
    if (reviewId) {
      // Navigate to individual review detail
      setNavigationStack(prev => [...prev, 'postDetail']);
      setCurrentPage('postDetail');
      setPostDetail({ postId: reviewId, boardName: '강의평가', course });
    } else {
      // Navigate to course reviews list
      setNavigationStack(prev => [...prev, 'courseReviews']);
      setCurrentPage('courseReviews');
      setCourseReviewInfo({ course, reviewId });
    }
  };

  const handleNavigateToExtracurricular = (category, postId) => {
    if (postId) {
      // Navigate to individual post detail
      setNavigationStack(prev => [...prev, 'postDetail']);
      setCurrentPage('postDetail');
      setPostDetail({ postId, boardName: category === '就職情報' ? '취업정보' : '과외활동' });
    } else {
      // Navigate to board list
      setCurrentPage('board');
      setBoardInfo({ boardName: category === '就職情報' ? '就職掲示板' : '課外活動掲示板', postId });
    }
  };

  const handleNavigateToBoard = (boardName, postId) => {
    if (postId) {
      // Navigate to individual post detail
      setNavigationStack(prev => [...prev, 'postDetail']);
      setCurrentPage('postDetail');
      setPostDetail({ postId, boardName });
    } else {
      // Navigate to board list
      setCurrentPage('board');
      setBoardInfo({ boardName, postId });
    }
  };

  const handleNavigateToSchedule = () => {
    setCurrentPage('schedule');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleBackToPrevious = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop(); // Remove current page
      const previousPage = newStack[newStack.length - 1];
      setNavigationStack(newStack);
      
      // If going back to schedule and we have schedule context, restore it
      if (previousPage === 'schedule' && scheduleContext) {
        setCurrentPage('schedule');
      } else {
        setCurrentPage(previousPage);
        // Clear schedule context when not going back to schedule
        if (previousPage !== 'schedule') {
          setScheduleContext(null);
        }
      }
    } else {
      setCurrentPage('home');
      setScheduleContext(null);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            user={user} 
            onLogout={onLogout}
            onNavigateToSettings={handleNavigateToSettings}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToScrap={handleNavigateToScrap}
            onNavigateToBoard={handleNavigateToBoard}
            onNavigateToCourseReviews={handleNavigateToCourseReviews}
            onNavigateToExtracurricular={handleNavigateToExtracurricular}
            darkMode={darkMode}
          />
        );
      case 'schedule':
        return (
          <SchedulePage 
            user={user} 
            darkMode={darkMode}
            courseReviewInfo={courseReviewInfo}
            onNavigateToMarketplace={(searchTerm) => {
              setCurrentPage('marketplace');
              // Pass search term to marketplace if needed
            }}
            onNavigateToCourseReviews={(course, reviewId, fromCourseDetail) => {
              if (fromCourseDetail) {
                setScheduleContext({ view: 'courseDetail', course });
                // Ensure navigation stack has schedule as base, then add courseReviews
                setNavigationStack(['home', 'schedule', 'courseReviews']);
              } else {
                setNavigationStack(prev => [...prev, 'courseReviews']);
              }
              setCurrentPage('courseReviews');
              setCourseReviewInfo({ course, reviewId });
            }}
            scheduleContext={scheduleContext}
            onClearScheduleContext={() => setScheduleContext(null)}
          />
        );
      case 'board':
        return <BoardPage user={user} darkMode={darkMode} boardInfo={boardInfo} onNavigateToClubs={handleNavigateToClubs} />;
      case 'map':
        return <MapPage user={user} darkMode={darkMode} />;
      case 'marketplace':
        return <MarketplacePage user={user} darkMode={darkMode} />;
      case 'settings':
        return (
          <SettingsPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={onLogout}
            onNavigateToMyPage={handleNavigateToMyPage}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToInformationGuide={() => setCurrentPage('informationGuide')}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
          />
        );
      case 'scrap':
        return (
          <ScrapPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
          />
        );
      case 'courseReviews':
        return (
          <CourseReviewsPage 
            onBack={handleBackToPrevious}
            darkMode={darkMode}
          />
        );
      case 'extracurricular':
        return (
          <ExtracurricularPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
          />
        );
      case 'mypage':
        return (
          <MyPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
            onLogout={onLogout}
          />
        );
      case 'clubs':
        return (
          <ClubPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
          />
        );
      case 'schoolSelection':
        return (
          <SchoolSelectionPage 
            onBack={handleBackToHome}
            darkMode={darkMode}
            onSchoolSelect={(selection) => {
              console.log('School selected:', selection);
              setCurrentPage('home');
            }}
          />
        );
      case 'informationGuide':
        return (
          <InformationGuidePage 
            onBack={handleBackToPrevious}
            darkMode={darkMode}
          />
        );
      case 'postDetail':
        return (
          <PostDetailPage 
            onBack={handleBackToPrevious}
            darkMode={darkMode}
            postId={postDetail?.postId}
            boardName={postDetail?.boardName}
            course={postDetail?.course}
          />
        );
      default:
        return (
          <HomePage 
            user={user} 
            onLogout={onLogout}
            onNavigateToSettings={handleNavigateToSettings}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToScrap={handleNavigateToScrap}
            onNavigateToBoard={handleNavigateToBoard}
            onNavigateToCourseReviews={handleNavigateToCourseReviews}
            onNavigateToExtracurricular={handleNavigateToExtracurricular}
            onNavigateToMyPage={handleNavigateToMyPage}
            onNavigateToClubs={handleNavigateToClubs}
            onNavigateToSchoolSelection={handleNavigateToSchoolSelection}
            darkMode={darkMode}
          />
        );
    }
  };

  const showBottomNav = !['settings', 'notifications', 'scrap', 'courseReviews', 'extracurricular', 'mypage', 'clubs', 'schoolSelection', 'informationGuide', 'postDetail'].includes(currentPage);

  return (
    <AppContainer darkMode={darkMode}>
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

      {showBottomNav && (
        <BottomNavigation darkMode={darkMode}>
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
      )}
    </AppContainer>
  );
};

export default MainApp;
