import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiShare2, FiUsers, FiSettings, FiDownload, FiSliders, FiEye } from 'react-icons/fi';
import CourseAddModal from './CourseAddModal';
import ShareOptionsModal from './ShareOptionsModal';
import ThemeSettingsPage from './ThemeSettingsPage';
import FriendSchedulePage from './FriendSchedulePage';
import CourseDetailPage from './CourseDetailPage';

const ScheduleContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px; /* Extra space for bottom navigation */
  color: ${props => props.darkMode ? '#fff' : '#333'};
`;

const Header = styled.div`
  background: ${props => props.theme && props.theme.gradient ? props.theme.gradient : (props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)')};
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
  gap: 8px;
`;

const HeaderButton = styled.button`
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

const WeekSelector = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
`;

const DayTab = styled.button`
  flex: 1;
  padding: 8px 4px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#00A86B' : 'white'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
`;

const ContentArea = styled.div`
  padding: 20px;
  padding-bottom: 40px; /* Additional bottom padding */
`;

const TimetableContainer = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1px;
  background: ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  border-radius: 12px;
  overflow: hidden;
`;

const TimeSlot = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  padding: 12px 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassSlot = styled.div`
  background: ${props => {
    if (!props.hasClass) return props.darkMode ? '#2d2d2d' : 'white';
    return props.theme ? props.theme.primary : '#00A86B';
  }};
  color: ${props => props.hasClass ? 'white' : (props.darkMode ? '#555' : '#ccc')};
  padding: 12px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: ${props => props.hasClass ? '12px' : '0'};
  margin: ${props => props.hasClass ? '4px' : '0'};
  
  &:hover {
    background: ${props => {
      if (!props.hasClass) return props.darkMode ? '#404040' : '#f8f9fa';
      const primaryColor = props.theme ? props.theme.primary : '#00A86B';
      return primaryColor === '#00A86B' ? '#008a5a' : primaryColor;
    }};
  }
  
  .class-name {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .class-info {
    font-size: 11px;
    opacity: 0.9;
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 16px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 2px solid ${props => props.theme ? props.theme.primary : '#00A86B'};
  color: ${props => props.theme ? props.theme.primary : '#00A86B'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #00A86B !important;
    border-color: #00A86B !important;
    color: #ffffff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 168, 107, 0.3);
  }
  
  &:hover svg {
    color: #ffffff !important;
  }
  
  &:hover span {
    color: #ffffff !important;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FriendsSection = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FriendCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
  }
`;

const UniversityLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || '#ccc'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FriendName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
`;

const FriendId = styled.p`
  font-size: 14px;
  color: ${props => props.darkMode ? '#ccc' : '#666'};
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .friend-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #00A86B;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
    }
    
    .details {
      h4 {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 2px;
      }
      
      p {
        font-size: 12px;
        color: #666;
      }
    }
  }
  
  .view-button {
    background: white;
    border: 1px solid #e9ecef;
    color: #00A86B;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background: #00A86B;
      color: white;
    }
  }
`;

const ViewSettingsModal = styled(motion.div)`
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

const ViewSettingsContent = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ViewSettingsTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 20px;
  text-align: center;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  
  &:last-child {
    border-bottom: none;
  }
  
  .setting-label {
    font-size: 16px;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 26px;
  background: ${props => props.active ? '#00A86B' : '#ddd'};
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.active ? '27px' : '3px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const SchedulePage = ({ user, darkMode, onNavigateToMarketplace, onNavigateToCourseReviews, scheduleContext, onClearScheduleContext }) => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [showFriendSchedule, setShowFriendSchedule] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [currentView, setCurrentView] = useState('schedule'); // 'schedule', 'theme', 'friends', 'courseDetail'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [selectedDay, setSelectedDay] = useState('月');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [viewSettings, setViewSettings] = useState({
    showProfessor: true,
    showRoom: true,
    showTime: true
  });
  const [showWeekends, setShowWeekends] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({
    id: 'default',
    name: 'デフォルトテーマ',
    primary: '#00A86B',
    gradient: 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'
  });

  const days = showWeekends ? ['月', '火', '水', '木', '金', '土', '日'] : ['月', '火', '水', '木', '金'];
  const timeSlots = [
    '9:00-10:30', '11:00-12:30', '13:30-15:00', '15:30-17:00', '17:30-19:00'
  ];

  const schedule = {
    '月': [
      { id: 1, name: 'データ構造とアルゴリズム', professor: '田中教授', room: '理工学部棟 301', time: '9:00-10:30', color: '#00A86B', capacity: 40, enrolled: 35 },
      null,
      { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205', time: '13:30-15:00', color: '#FF6B6B', capacity: 30, enrolled: 28 },
      null,
      null
    ],
    '火': [
      { id: 3, name: 'オペレーティングシステム', professor: '山田教授', room: '理工学部棟 401', time: '9:00-10:30', color: '#4ECDC4', capacity: 35, enrolled: 32 },
      null,
      null,
      { id: 4, name: 'ソフトウェア工学', professor: '鈴木教授', room: '理工学部棟 302', time: '15:30-17:00', color: '#45B7D1', capacity: 45, enrolled: 41 },
      null
    ],
    '水': [
      null,
      { id: 5, name: 'データベース', professor: '高橋教授', room: '理工学部棟 203', time: '11:00-12:30', color: '#96CEB4', capacity: 40, enrolled: 37 },
      null,
      null,
      { id: 6, name: 'ネットワークプログラミング', professor: '伊藤教授', room: '理工学部棟 405', time: '17:30-19:00', color: '#FFEAA7', capacity: 25, enrolled: 23 }
    ],
    '木': [
      null,
      { id: 1, name: 'データ構造とアルゴリズム', professor: '田中教授', room: '理工学部棟 301', time: '11:00-12:30', color: '#00A86B', capacity: 40, enrolled: 35 },
      { id: 7, name: '人工知能', professor: '渡辺教授', room: '理工学部棟 501', time: '13:30-15:00', color: '#DDA0DD', capacity: 50, enrolled: 45 },
      null,
      null
    ],
    '금': [
      null,
      null,
      null,
      { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205', time: '15:30-17:00', color: '#FF6B6B', capacity: 30, enrolled: 28 },
      { id: 8, name: 'キャップストーンデザイン', professor: '中村教授', room: '理工学部棟 601', time: '17:30-19:00', color: '#FFB347', capacity: 20, enrolled: 18 }
    ]
  };

  const friends = [
    { 
      id: 1, 
      name: '田中太郎', 
      department: '情報テクノロジー学科 3年', 
      avatar: '👨‍💻',
      university: {
        name: '青山学院大学',
        logo: 'A',
        colors: { primary: '#00A86B', gradient: 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)' }
      },
      schedule: {
        '月': [
          null,
          { id: 1, name: 'データ構造とアルゴリズム', professor: '田中教授', room: '理工学部棟 301' },
          null,
          null,
          { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205' },
          null,
          null,
          null,
          null
        ],
        '火': [
          { id: 3, name: 'オペレーティングシステム', professor: '山田教授', room: '理工学部棟 401' },
          null,
          null,
          null,
          null,
          { id: 4, name: 'ソフトウェア工学', professor: '鈴木教授', room: '理工学部棟 302' },
          null,
          null,
          null
        ],
        '水': [
          null,
          null,
          { id: 5, name: 'データベース', professor: '高橋教授', room: '理工学部棟 203' },
          null,
          null,
          null,
          { id: 6, name: 'ネットワークプログラミング', professor: '伊藤教授', room: '理工学部棟 405' },
          null,
          null
        ],
        '木': [
          null,
          { id: 1, name: 'データ構造とアルゴリズム', professor: '田中教授', room: '理工学部棟 301' },
          null,
          null,
          { id: 7, name: '人工知能', professor: '渡辺教授', room: '理工学部棟 501' },
          null,
          null,
          null,
          null
        ],
        '金': [
          null,
          null,
          null,
          null,
          null,
          { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205' },
          null,
          null,
          { id: 8, name: 'キャップストーンデザイン', professor: '中村教授', room: '理工学部棟 601' }
        ]
      }
    },
    { 
      id: 2, 
      name: '佐藤花子', 
      department: '社会情報学科 2年', 
      avatar: '👩‍💼',
      university: {
        name: '青山学院大学',
        logo: 'A',
        colors: { primary: '#00A86B', gradient: 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)' }
      },
      schedule: {
        '月': [
          null,
          { id: 9, name: '社会情報学概論', professor: '林教授', room: '社会情報学部棟 201' },
          null,
          null,
          { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205' },
          null,
          null,
          null,
          null
        ],
        '火': [
          null,
          null,
          { id: 10, name: 'メディア論', professor: '森教授', room: '社会情報学部棟 301' },
          null,
          null,
          null,
          { id: 11, name: '統計学', professor: '井上教授', room: '社会情報学部棟 401' },
          null,
          null
        ],
        '水': [
          null,
          null,
          { id: 5, name: 'データベース', professor: '高橋教授', room: '理工学部棟 203' },
          null,
          { id: 12, name: '情報社会学', professor: '小林教授', room: '社会情報学部棟 501' },
          null,
          null,
          null,
          null
        ],
        '木': [
          null,
          null,
          null,
          null,
          { id: 13, name: 'プログラミング基礎', professor: '加藤教授', room: '社会情報学部棟 101' },
          null,
          null,
          null,
          null
        ],
        '金': [
          null,
          null,
          null,
          null,
          null,
          { id: 2, name: 'Webプログラミング', professor: '佐藤教授', room: '理工学部棟 205' },
          null,
          null,
          null
        ]
      }
    },
    { 
      id: 3, 
      name: '山田次郎', 
      department: 'ソフトウェア学科 4年', 
      avatar: '👨‍🎓',
      university: {
        name: '青山学院大学',
        logo: 'A',
        colors: { primary: '#00A86B', gradient: 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)' }
      },
      schedule: {
        '月': [
          null,
          { id: 1, name: 'データ構造とアルゴリズム', professor: '田中教授', room: '理工学部棟 301' },
          null,
          null,
          null,
          null,
          { id: 14, name: 'ソフトウェア設計', professor: '松本教授', room: '理工学部棟 601' },
          null,
          null
        ],
        '火': [
          null,
          null,
          { id: 15, name: 'コンピュータグラフィックス', professor: '橋本教授', room: '理工学部棟 701' },
          null,
          null,
          { id: 4, name: 'ソフトウェア工学', professor: '鈴木教授', room: '理工学部棟 302' },
          null,
          null,
          null
        ],
        '水': [
          null,
          null,
          null,
          null,
          { id: 16, name: '卒業研究', professor: '研究指導教員', room: '研究室' },
          null,
          null,
          null,
          null
        ],
        '木': [
          null,
          null,
          null,
          null,
          { id: 7, name: '人工知能', professor: '渡辺教授', room: '理工学部棟 501' },
          null,
          null,
          null,
          null
        ],
        '金': [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          { id: 8, name: 'キャップストーンデザイン', professor: '中村教授', room: '理工学部棟 601' }
        ]
      }
    }
  ];

  const handleAddCourses = (courses) => {
    // Add courses to schedule logic here
    console.log('Adding courses:', courses);
  };

  const handleShare = (shareData) => {
    // Handle sharing logic here
    console.log('Sharing:', shareData);
  };

  const handleViewFriendSchedule = (friend) => {
    setSelectedFriend(friend);
    setCurrentView('friendSchedule');
  };

  const handleViewCourseDetail = (course) => {
    if (course && course.name) {
      setSelectedCourse(course);
      setCurrentView('courseDetail');
    }
  };

  const handleThemeChange = (themeSettings) => {
    setCurrentTheme(themeSettings);
    if (typeof themeSettings.showWeekends === 'boolean') {
      setShowWeekends(themeSettings.showWeekends);
    }
    setCurrentView('schedule');
  };

  const handleSettingsClick = () => {
    setShowViewSettings(true);
  };

  const handleBackToSchedule = () => {
    setCurrentView('schedule');
    setSelectedFriend(null);
    setSelectedCourse(null);
  };

  const handleToggleViewSetting = (setting) => {
    setViewSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle schedule context restoration when coming back from course reviews
  useEffect(() => {
    if (scheduleContext && scheduleContext.view === 'courseDetail' && scheduleContext.course) {
      setCurrentView('courseDetail');
      setSelectedCourse(scheduleContext.course);
      // Clear the context after restoring
      if (onClearScheduleContext) {
        onClearScheduleContext();
      }
    }
  }, [scheduleContext, onClearScheduleContext]);

  if (currentView === 'themeSettings') {
    return (
      <ThemeSettingsPage 
        onBack={() => setCurrentView('schedule')} 
        darkMode={darkMode}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        initialShowWeekends={showWeekends}
        friends={friends}
      />
    );
  }

  if (currentView === 'friendSchedule' && selectedFriend) {
    return (
      <FriendSchedulePage 
        friendData={selectedFriend}
        onBack={handleBackToSchedule}
        darkMode={darkMode}
        mySchedule={schedule}
        theme={currentTheme}
      />
    );
  }

  if (currentView === 'courseDetail' && selectedCourse) {
    return (
      <CourseDetailPage
        onBack={handleBackToSchedule}
        darkMode={darkMode}
        courseData={selectedCourse}
        onNavigateToMarketplace={onNavigateToMarketplace}
        onNavigateToCourseReviews={(course, reviewId) => onNavigateToCourseReviews(course, reviewId, true)}
      />
    );
  }

  return (
    <ScheduleContainer darkMode={darkMode}>
      <Header darkMode={darkMode} theme={currentTheme}>
        <HeaderContent>
          <Title>{user.name}さんの時刻表</Title>
          <HeaderActions>
            <HeaderButton onClick={() => setShowFriends(!showFriends)}>
              <FiUsers />
            </HeaderButton>
            <HeaderButton onClick={() => setCurrentView('themeSettings')}>
              <FiSliders size={20} />
            </HeaderButton>
            <HeaderButton onClick={handleSettingsClick}>
              <FiSettings />
            </HeaderButton>
          </HeaderActions>
        </HeaderContent>

        <WeekSelector>
          {days.map((day) => (
            <DayTab
              key={day}
              active={selectedDay === day}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </DayTab>
          ))}
        </WeekSelector>
      </Header>

      <ContentArea>
        <ActionButtons>
          <ActionButton darkMode={darkMode} onClick={() => {
            setSelectedTimeSlot(null);
            setShowCourseModal(true);
          }}>
            <FiPlus size={16} />
            <span>授業追加</span>
          </ActionButton>
          <ActionButton onClick={() => setShowShareModal(true)}>
            <FiShare2 />
            <span>共有</span>
          </ActionButton>
        </ActionButtons>

        <TimetableContainer darkMode={darkMode}>
          <TimeGrid darkMode={darkMode}>
            {timeSlots.map((time, index) => (
              <React.Fragment key={time}>
                <TimeSlot darkMode={darkMode}>{time}</TimeSlot>
                <ClassSlot
                  darkMode={darkMode}
                  theme={currentTheme}
                  hasClass={schedule[selectedDay] && schedule[selectedDay][index]}
                  onClick={() => {
                    if (schedule[selectedDay] && schedule[selectedDay][index]) {
                      handleViewCourseDetail(schedule[selectedDay][index]);
                    } else {
                      setSelectedTimeSlot(time);
                      setShowCourseModal(true);
                    }
                  }}
                >
                  {schedule[selectedDay] && schedule[selectedDay][index] ? (
                    <>
                      <div className="class-name">
                        {schedule[selectedDay][index].name}
                      </div>
                      <div className="class-info">
                        {viewSettings.showRoom && schedule[selectedDay][index].room && `${schedule[selectedDay][index].room}`}
                        {viewSettings.showRoom && viewSettings.showProfessor && schedule[selectedDay][index].room && schedule[selectedDay][index].professor && ' | '}
                        {viewSettings.showProfessor && schedule[selectedDay][index].professor && `${schedule[selectedDay][index].professor}`}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '12px' }}>
                      +
                    </div>
                  )}
                </ClassSlot>
              </React.Fragment>
            ))}
          </TimeGrid>
        </TimetableContainer>

        {showFriends && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FriendsSection darkMode={darkMode}>
              <SectionTitle darkMode={darkMode}>
                <FiUsers />
                友達の時間割
              </SectionTitle>
              {friends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  darkMode={darkMode}
                  onClick={() => handleViewFriendSchedule(friend)}
                >
                  {friend.university && (
                    <UniversityLogo color={friend.university.colors.primary}>
                      {friend.university.logo}
                    </UniversityLogo>
                  )}
                  <FriendInfo>
                    <FriendName darkMode={darkMode}>{friend.name}</FriendName>
                    <FriendId darkMode={darkMode}>{friend.university ? friend.university.name : `@${friend.id}`}</FriendId>
                  </FriendInfo>
                </FriendCard>
              ))}
            </FriendsSection>
          </motion.div>
        )}
        
        <CourseAddModal
          isOpen={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          darkMode={darkMode}
          onAddCourses={handleAddCourses}
          selectedTimeSlot={selectedTimeSlot}
        />
        
        <ShareOptionsModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          darkMode={darkMode}
          onShare={handleShare}
        />

        {showViewSettings && (
          <ViewSettingsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowViewSettings(false)}
          >
            <ViewSettingsContent
              darkMode={darkMode}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ViewSettingsTitle darkMode={darkMode}>時間割表示設定</ViewSettingsTitle>
              
              <SettingItem darkMode={darkMode}>
                <span className="setting-label">教授名表示</span>
                <ToggleSwitch 
                  active={viewSettings.showProfessor}
                  onClick={() => handleToggleViewSetting('showProfessor')}
                />
              </SettingItem>
              
              <SettingItem darkMode={darkMode}>
                <span className="setting-label">教室表示</span>
                <ToggleSwitch 
                  active={viewSettings.showRoom}
                  onClick={() => handleToggleViewSetting('showRoom')}
                />
              </SettingItem>
              
              <SettingItem darkMode={darkMode}>
                <span className="setting-label">時間表示</span>
                <ToggleSwitch 
                  active={viewSettings.showTime}
                  onClick={() => handleToggleViewSetting('showTime')}
                />
              </SettingItem>
            </ViewSettingsContent>
          </ViewSettingsModal>
        )}
      </ContentArea>
    </ScheduleContainer>
  );
};

export default SchedulePage;
