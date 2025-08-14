import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBell, FiBriefcase, FiShoppingBag, FiCalendar, FiMessageCircle, FiClock, FiTrash2, FiX } from 'react-icons/fi';

const NotificationsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
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

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.delete-all {
    background: ${props => props.darkMode ? '#dc3545' : '#dc3545'};
    color: white;
    
    &:hover {
      background: #c82333;
      transform: translateY(-1px);
    }
  }
  
  &.clear-read {
    background: ${props => props.darkMode ? '#6c757d' : '#6c757d'};
    color: white;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${props => props.darkMode ? '#dc3545' : '#dc3545'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }
`;

const NotificationCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  border-left: 4px solid ${props => props.priority === 'high' ? '#ff4757' : props.priority === 'medium' ? '#ffa502' : '#00A86B'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
    
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  
  .icon {
    width: 24px;
    height: 24px;
    color: ${props => props.type === 'job' ? '#3742fa' : props.type === 'marketplace' ? '#2ed573' : props.type === 'community' ? '#ff6b6b' : '#00A86B'};
  }
  
  .type {
    background: ${props => props.type === 'job' ? '#3742fa' : props.type === 'marketplace' ? '#2ed573' : props.type === 'community' ? '#ff6b6b' : '#00A86B'};
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .time {
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    font-size: 12px;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const NotificationContent = styled.div`
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .message {
    color: ${props => props.darkMode ? '#ccc' : '#666'};
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 12px;
  }
  
  .deadline {
    background: ${props => props.urgent ? '#ff4757' : '#ffa502'};
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.darkMode ? '#666' : '#999'};
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const NotificationsPage = ({ onBack, darkMode }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job',
      title: 'ITインターンシップ応募締切間近',
      message: '関心登録された"ネイバー2025夏期インターンシップ"応募締切まであと3日です。',
      time: '2時間前',
      priority: 'high',
      deadline: '2025年3月20日締切',
      urgent: true
    },
    {
      id: 2,
      type: 'marketplace',
      title: 'お気に入り商品価格変動',
      message: 'スクラップした"経営学原論教材"の価格が15,000円に値下げされました。',
      time: '5時間前',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'community',
      title: '新しいコメント通知',
      message: '"就活準備スタディ募集" 投稿に新しいコメントが付きました。',
      time: '1日前',
      priority: 'low'
    },
    {
      id: 4,
      type: 'job',
      title: '採用説明会日程案内',
      message: '関心企業"サムスン電子"採用説明会が来週火曜日に予定されています。',
      time: '2日前',
      priority: 'medium',
      deadline: '2025年3月25日14:00',
      urgent: false
    },
    {
      id: 5,
      type: 'marketplace',
      title: '新しい商品登録',
      message: 'カテゴリー "コンピュータ工学教科書"に新しい商品が登録されました。',
      time: '3日前',
      priority: 'low'
    }
  ]);

  const handleDeleteNotification = (notificationId, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const handleDeleteAll = () => {
    if (window.confirm('모든 알림을 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  const handleClearRead = () => {
    // For now, we'll clear all notifications as we don't have read/unread status
    if (window.confirm('읽은 알림을 모두 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job':
        return <FiBriefcase className="icon" />;
      case 'marketplace':
        return <FiShoppingBag className="icon" />;
      case 'community':
        return <FiMessageCircle className="icon" />;
      default:
        return <FiBell className="icon" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'job':
        return '採用情報';
      case 'marketplace':
        return '中古取引';
      case 'community':
        return 'コミュニティ';
      default:
        return '一般';
    }
  };

  return (
    <NotificationsContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>通知</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {notifications.length > 0 && (
          <ActionButtons>
            <ActionButton 
              className="clear-read" 
              darkMode={darkMode}
              onClick={handleClearRead}
            >
              <FiTrash2 size={16} />
              읽은 알림 삭제
            </ActionButton>
            <ActionButton 
              className="delete-all" 
              darkMode={darkMode}
              onClick={handleDeleteAll}
            >
              <FiX size={16} />
              전체 삭제
            </ActionButton>
          </ActionButtons>
        )}
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              darkMode={darkMode}
              priority={notification.priority}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <DeleteButton 
                darkMode={darkMode}
                onClick={(e) => handleDeleteNotification(notification.id, e)}
              >
                <FiX size={16} />
              </DeleteButton>
              
              <NotificationHeader darkMode={darkMode} type={notification.type}>
                {getNotificationIcon(notification.type)}
                <span className="type">{getTypeLabel(notification.type)}</span>
                <div className="time">
                  <FiClock size={12} />
                  {notification.time}
                </div>
              </NotificationHeader>
              
              <NotificationContent darkMode={darkMode}>
                <div className="title">{notification.title}</div>
                <div className="message">{notification.message}</div>
                {notification.deadline && (
                  <div className="deadline" urgent={notification.urgent}>
                    <FiCalendar size={12} />
                    {notification.deadline}
                  </div>
                )}
              </NotificationContent>
            </NotificationCard>
          ))
        ) : (
          <EmptyState darkMode={darkMode}>
            <FiBell className="icon" />
            <div className="title">通知はありません</div>
            <div className="subtitle">
              新しい通知があるときはここに表示されます。<br/>
              お気に入り商品や採用情報を登録してみてください。
            </div>
          </EmptyState>
        )}
      </ContentSection>
    </NotificationsContainer>
  );
};

export default NotificationsPage;
