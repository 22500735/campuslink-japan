import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiUsers, FiSettings, FiDownload, FiShare2 } from 'react-icons/fi';

const ScheduleContainer = styled.div`
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
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1px;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
`;

const TimeSlot = styled.div`
  background: white;
  padding: 12px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassSlot = styled.div`
  background: ${props => props.hasClass ? '#00A86B' : 'white'};
  color: ${props => props.hasClass ? 'white' : '#ccc'};
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
    background: ${props => props.hasClass ? '#008a5a' : '#f8f9fa'};
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
  background: white;
  border: 2px solid #00A86B;
  color: #00A86B;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00A86B;
    color: white;
  }
`;

const FriendsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
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
      background: #00A86B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
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
    background: #f8f9fa;
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

const SchedulePage = ({ user }) => {
  const [selectedDay, setSelectedDay] = useState('月');
  const [showFriends, setShowFriends] = useState(false);

  const days = ['月', '火', '水', '木', '金'];
  const timeSlots = ['1限\n9:00', '2限\n10:40', '3限\n13:00', '4限\n14:40', '5限\n16:20', '6限\n18:00'];

  const schedule = {
    '月': [
      { name: 'マーケティング論', room: 'A301', professor: '田中教授' },
      null,
      { name: '経営戦略論', room: 'B205', professor: '佐藤教授' },
      null,
      null,
      null
    ],
    '火': [
      null,
      { name: '統計学', room: 'C102', professor: '山田教授' },
      null,
      { name: '会計学', room: 'A201', professor: '鈴木教授' },
      null,
      null
    ],
    '水': [
      { name: '英語', room: 'D301', professor: 'Smith教授' },
      null,
      null,
      { name: 'ゼミナール', room: 'E401', professor: '高橋教授' },
      null,
      null
    ],
    '木': [
      null,
      { name: '経済学', room: 'B103', professor: '伊藤教授' },
      { name: '法学', room: 'A305', professor: '渡辺教授' },
      null,
      null,
      null
    ],
    '金': [
      null,
      null,
      { name: '情報処理', room: 'PC室1', professor: '中村教授' },
      null,
      { name: '体育', room: '体育館', professor: '小林教授' },
      null
    ]
  };

  const friends = [
    { id: 1, name: '山田太郎', department: '経営学部2年', avatar: '山' },
    { id: 2, name: '佐藤花子', department: '経済学部3年', avatar: '佐' },
    { id: 3, name: '田中次郎', department: '法学部2年', avatar: '田' }
  ];

  return (
    <ScheduleContainer>
      <Header>
        <HeaderContent>
          <Title>時間表</Title>
          <HeaderActions>
            <HeaderButton onClick={() => setShowFriends(!showFriends)}>
              <FiUsers size={20} />
            </HeaderButton>
            <HeaderButton>
              <FiSettings size={20} />
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
          <ActionButton>
            <FiPlus size={16} />
            科目追加
          </ActionButton>
          <ActionButton>
            <FiShare2 size={16} />
            共有
          </ActionButton>
        </ActionButtons>

        <TimetableContainer>
          <TimeGrid>
            {timeSlots.map((time, index) => (
              <React.Fragment key={time}>
                <TimeSlot>{time}</TimeSlot>
                <ClassSlot
                  hasClass={schedule[selectedDay][index]}
                  onClick={() => {
                    if (schedule[selectedDay][index]) {
                      // Edit class
                    } else {
                      // Add class
                    }
                  }}
                >
                  {schedule[selectedDay][index] ? (
                    <>
                      <div className="class-name">
                        {schedule[selectedDay][index].name}
                      </div>
                      <div className="class-info">
                        {schedule[selectedDay][index].room} | {schedule[selectedDay][index].professor}
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
            <FriendsSection>
              <SectionTitle>
                <FiUsers />
                友達の時間表
              </SectionTitle>
              {friends.map((friend) => (
                <FriendItem key={friend.id}>
                  <div className="friend-info">
                    <div className="avatar">{friend.avatar}</div>
                    <div className="details">
                      <h4>{friend.name}</h4>
                      <p>{friend.department}</p>
                    </div>
                  </div>
                  <button className="view-button">時間表を見る</button>
                </FriendItem>
              ))}
            </FriendsSection>
          </motion.div>
        )}
      </ContentArea>
    </ScheduleContainer>
  );
};

export default SchedulePage;
