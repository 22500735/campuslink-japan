import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSettings, FiEye, FiEyeOff, FiMapPin, FiBook } from 'react-icons/fi';

const FriendScheduleContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme ? props.theme.primary : (props.darkMode ? '#1a1a1a' : '#f5f5f5')};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.theme ? props.theme.gradient : (props.university ? props.university.colors.gradient : (props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'))};
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

const HeaderTitle = styled.div`
  flex: 1;
  
  .friend-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .friend-info {
    font-size: 14px;
    opacity: 0.9;
  }
`;

const UniversityLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  backdrop-filter: blur(10px);
`;

const SettingsButton = styled.button`
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
  color: ${props => props.active ? (props.university ? props.university.colors.primary : '#00A86B') : 'white'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const ViewSettingsCard = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 16px;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const ViewOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  border-radius: 8px;
  
  .option-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .icon {
      color: ${props => props.university ? props.university.colors.primary : '#00A86B'};
    }
    
    .details {
      .label {
        font-weight: 600;
        color: ${props => props.darkMode ? '#fff' : '#333'};
        margin-bottom: 2px;
      }
      
      .description {
        font-size: 12px;
        color: ${props => props.darkMode ? '#aaa' : '#666'};
      }
    }
  }
`;

const ToggleSwitch = styled.div`
  width: 44px;
  height: 24px;
  background: ${props => props.isOn ? (props.university ? props.university.colors.primary : '#00A86B') : (props.darkMode ? '#555' : '#ddd')};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${props => props.isOn ? '22px' : '2px'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const TimetableContainer = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
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
    if (props.isOverlap) return '#ff6b6b';
    return props.university ? props.university.colors.primary : '#00A86B';
  }};
  color: ${props => props.hasClass ? 'white' : (props.darkMode ? '#555' : '#ccc')};
  padding: 12px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${props => props.hasClass ? '12px' : '0'};
  margin: ${props => props.hasClass ? '4px' : '0'};
  
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

const OverlapIndicator = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const FriendSchedulePage = ({ onBack, darkMode, friendData, mySchedule, theme }) => {
  const friend = friendData;
  const allDays = ['月', '火', '水', '木', '金', '土', '日'];
  const [days, setDays] = useState(['月', '火', '水', '木', '金']);
  const [selectedDay, setSelectedDay] = useState('月');
  const [showSettings, setShowSettings] = useState(false);
  const [viewSettings, setViewSettings] = useState({
    showOverlapOnly: false,
    showRoomOnly: false,
    showCourseOnly: false,
    showWeekends: false,
  });
  const timeSlots = [
    '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    if (friend && friend.schedule) {
      const initialShowWeekends = friend.schedule['토'] || friend.schedule['일'];
      setViewSettings(prev => ({ ...prev, showWeekends: !!initialShowWeekends }));
    }
  }, [friend]);

  useEffect(() => {
    setDays(viewSettings.showWeekends ? allDays.slice(0, 7) : allDays.slice(0, 5));
    if (!viewSettings.showWeekends && (selectedDay === '토' || selectedDay === '일')) {
      setSelectedDay('월');
    }
  }, [viewSettings.showWeekends, selectedDay]);

  const handleToggleViewSetting = (setting) => {
    setViewSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getDisplayedSchedule = () => {
    const friendSchedule = friend.schedule || {};
    const friendDaySchedule = friendSchedule[selectedDay] || [];
    const myFullSchedule = mySchedule || {};

    // Debug logging
    console.log('Friend schedule data:', friend.schedule);
    console.log('Selected day:', selectedDay);
    console.log('Friend day schedule:', friendDaySchedule);

    const processedSchedule = friendDaySchedule.map((friendCourse, index) => {
      if (!friendCourse) return null;

      const myCourse = myFullSchedule[selectedDay] && myFullSchedule[selectedDay][index];
      const isOverlap = myCourse && myCourse.id === friendCourse.id;

      return { ...friendCourse, isOverlap };
    });

    // Ensure we have 9 time slots even if friend schedule is shorter
    const fullSchedule = Array(9).fill(null);
    processedSchedule.forEach((course, index) => {
      if (index < 9) {
        fullSchedule[index] = course;
      }
    });

    return fullSchedule;
  };

  const displayedSchedule = getDisplayedSchedule();
  const hasOverlaps = displayedSchedule.some(slot => slot?.isOverlap);

  return (
    <FriendScheduleContainer darkMode={darkMode}>
      <Header darkMode={darkMode} university={friend.university} theme={theme}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>
            <div className="friend-name">
              {friend.university && 
                <UniversityLogo>
                  {friend.university.logo}
                </UniversityLogo>
              }
              {friend.name}
            </div>
            <div className="friend-info">
              {friend.university ? friend.university.name : friend.department}
            </div>
          </HeaderTitle>
          <SettingsButton onClick={() => setShowSettings(!showSettings)}>
            <FiSettings size={20} />
          </SettingsButton>
        </HeaderTop>

        <WeekSelector>
          {days.map((day) => (
            <DayTab
              key={day}
              active={selectedDay === day}
              university={friend.university}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </DayTab>
          ))}
        </WeekSelector>
      </Header>

      <ContentArea>
        {showSettings && (
          <ViewSettingsCard darkMode={darkMode}>
            <div className="title">時間表表示設定</div>
            <div className="options">
              <ViewOption darkMode={darkMode} university={friend.university}>
                <div className="option-info">
                  <FiEye className="icon" size={20} />
                  <div className="details">
                    <div className="label">重複する授業のみ表示</div>
                    <div className="description">私と友人の共通授業時間のみ表示</div>
                  </div>
                </div>
                <ToggleSwitch
                  isOn={viewSettings.showOverlapOnly}
                  darkMode={darkMode}
                  university={friend.university}
                  onClick={() => handleToggleViewSetting('showOverlapOnly')}
                />
              </ViewOption>
              
              <ViewOption darkMode={darkMode} university={friend.university}>
                <div className="option-info">
                  <FiMapPin className="icon" size={20} />
                  <div className="details"> 
                    <div className="label">建物名のみ表示</div>
                    <div className="description">教室情報のみ表示</div>
                  </div>
                </div>
                <ToggleSwitch
                  isOn={viewSettings.showRoomOnly}
                  darkMode={darkMode}
                  university={friend.university}
                  onClick={() => handleToggleViewSetting('showRoomOnly')}
                />
              </ViewOption>
              
              <ViewOption darkMode={darkMode} university={friend.university}>
                <div className="option-info">
                  <FiBook className="icon" size={20} />
                  <div className="details">
                    <div className="label">科目名のみ表示</div>
                    <div className="description">授業名のみ表示</div>
                  </div>
                </div>
                <ToggleSwitch
                  isOn={viewSettings.showCourseOnly}
                  darkMode={darkMode}
                  university={friend.university}
                  onClick={() => handleToggleViewSetting('showCourseOnly')}
                />
              </ViewOption>
            </div>
          </ViewSettingsCard>
        )}

        {hasOverlaps && (
          <OverlapIndicator>
            🎯 {selectedDay}曜日に重複する授業があります！
          </OverlapIndicator>
        )}

        <TimetableContainer darkMode={darkMode}>
          <TimeGrid darkMode={darkMode}>
            {timeSlots.map((time, index) => (
              <React.Fragment key={time}>
                <TimeSlot darkMode={darkMode}>{time}</TimeSlot>
                <ClassSlot
                  darkMode={darkMode}
                  hasClass={displayedSchedule[index]}
                  isOverlap={displayedSchedule[index]?.isOverlap}
                  university={friend.university}
                >
                  {displayedSchedule[index] ? (
                    <>
                      <div className="class-name">
                        {displayedSchedule[index].name}
                      </div>
                      {displayedSchedule[index].room && (
                        <div className="class-info">
                          {displayedSchedule[index].room}
                        </div>
                      )}
                      {displayedSchedule[index].professor && (
                        <div className="class-info">
                          {displayedSchedule[index].professor}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '12px' }}>
                      -
                    </div>
                  )}
                </ClassSlot>
              </React.Fragment>
            ))}
          </TimeGrid>
        </TimetableContainer>
      </ContentArea>
    </FriendScheduleContainer>
  );
};

export default FriendSchedulePage;
