import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiClock, FiDollarSign, FiNavigation, FiTruck, FiMapPin, FiZap, FiPlay } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
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
  overflow: hidden;
  touch-action: none;
  overscroll-behavior: contain;
  
  /* Prevent body scroll when modal is open */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const ModalContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
  overscroll-behavior: contain;
  touch-action: pan-y;
  position: relative;
  z-index: 1001;
  -webkit-overflow-scrolling: touch;
  
  /* Ensure modal content scrolls independently */
  isolation: isolate;
  contain: layout style paint;
`;

const ModalHeader = styled.div`
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

const ModalTitle = styled.h2`
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

const RouteList = styled.div`
  padding: 20px 24px 120px 24px; /* Added bottom padding to avoid navigation bar */
  overscroll-behavior: contain;
  touch-action: pan-y;
  position: relative;
  z-index: 1;
`;

const RouteCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00A86B;
    transform: translateY(-2px);
  }

  ${props => props.selected && `
    border-color: #00A86B;
    background: ${props.darkMode ? '#2d3748' : 'white'};
    box-shadow: 0 4px 12px rgba(0, 168, 107, 0.15);
  `}
`;

const RouteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const RouteType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .badge {
    background: ${props => props.color || '#00A86B'};
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .name {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? 'white' : '#333'};
  }
`;

const RouteStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const RouteDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const TransportIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.color || '#00A86B'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const RouteStep = styled.div`
  flex: 1;
  
  .transport {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? 'white' : '#333'};
    margin-bottom: 4px;
  }
  
  .detail {
    font-size: 12px;
    color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  }
`;

const RouteArrow = styled.div`
  color: ${props => props.darkMode ? '#4a5568' : '#ccc'};
  font-size: 12px;
`;

const DetailedRouteInfo = styled(motion.div)`
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  border: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  overflow-y: auto;
  max-height: 300px;
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  position: relative;
  z-index: 10;
  
  /* Ensure detailed route info scrolls independently */
  isolation: isolate;
  contain: layout style paint;
  
  /* Prevent event propagation to background */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.darkMode ? '#4a5568' : '#f1f1f1'};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.darkMode ? '#718096' : '#c1c1c1'};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.darkMode ? '#a0aec0' : '#a8a8a8'};
  }
`;

const DetailTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  background: #00A86B;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
  
  .action {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? 'white' : '#333'};
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 12px;
    color: ${props => props.darkMode ? '#a0aec0' : '#666'};
    line-height: 1.4;
  }
`;

const RouteGuidanceButton = styled.button`
  width: 100%;
  background: #00A86B;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #008f5a;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const RouteSearchModal = ({ isOpen, onClose, destination, darkMode = false, onStartGuidance }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleStartGuidance = (route) => {
    if (onStartGuidance) {
      onStartGuidance(route);
    }
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const routes = [
    {
      id: 1,
      name: '最短経路',
      type: 'fastest',
      color: '#00A86B',
      duration: '12分',
      distance: '850m',
      cost: '無料',
      steps: [
        { transport: '歩行', detail: '正門から出発', icon: FiNavigation, color: '#00A86B' },
        { transport: 'バス', detail: '3番バス停乗車', icon: FiTruck, color: '#45b7d1' },
        { transport: '歩行', detail: '目的地まで歩行2分', icon: FiNavigation, color: '#00A86B' }
      ],
      detailedSteps: [
        { action: '正門から出発', description: '弘前大学正門 (和田山大通路94)から始まります。' },
        { action: 'バス3番バス停移動', description: '正門から直進100m、右側バス停' },
        { action: 'バス 탑승', description: '弘前大学バス (5分間隔運行)' },
        { action: 'バス下車', description: '3番バス停で下車' },
        { action: '目的地到着', description: 'バス停から目的地まで歩行2分' }
      ]
    },
    {
      id: 2,
      name: '大衆交通経路',
      type: 'public',
      color: '#45b7d1',
      duration: '18分',
      distance: '1.2km',
      cost: '1,370원',
      steps: [
        { transport: '歩行', detail: '홍大入門所まで', icon: FiNavigation, color: '#00A86B' },
        { transport: '地下鉄2号線', detail: '2乗車', icon: FiTruck, color: '#45b7d1' },
        { transport: '歩行', detail: '目的地まで', icon: FiNavigation, color: '#00A86B' }
      ],
      detailedSteps: [
        { action: '正門から出発', description: '弘前大学正門 (和田山大通路94)から始まります。' },
        { action: '地下鉄2号線 탑승', description: '新村方向列車 탑승' },
        { action: '新村駅下車', description: '2乗車後新村駅3番出入口へ移動' },
        { action: '目的地へ移動', description: '新村駅から目的地まで歩行5分' }
      ]
    },
    {
      id: 3,
      name: 'タクシー経路',
      type: 'taxi',
      color: '#feca57',
      duration: '8分',
      distance: '1.1km',
      cost: '4,200원',
      steps: [
        { transport: 'タクシー', detail: '直行経路', icon: FiZap, color: '#feca57' }
      ],
      detailedSteps: [
        { action: 'タクシー呼び出し', description: '카카오택시またはタダアプリを使用することを推奨' },
        { action: '正門から乗車', description: '弘前大学正門前面のタクシー乗り場' },
        { action: '目的地直行', description: '交通状況によって 소요時間は変動する可能性があります' },
        { action: '目的地到着', description: '予想料金: 420円 (夜間料金除く)' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <ModalContainer
        darkMode={darkMode}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        onClick={handleModalClick}
      >
        <ModalHeader darkMode={darkMode}>
          <ModalTitle darkMode={darkMode}>
            {destination}までの経路
          </ModalTitle>
          <CloseButton darkMode={darkMode} onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>

        <RouteList>
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              darkMode={darkMode}
              selected={selectedRoute === route.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
            >
              <RouteHeader>
                <RouteType darkMode={darkMode} color={route.color}>
                  <span className="badge">{route.name}</span>
                  <span className="name">{route.type}</span>
                </RouteType>
                <RouteStats darkMode={darkMode}>
                  <div className="stat">
                    <FiClock size={14} />
                    <span>{route.duration}</span>
                  </div>
                  <div className="stat">
                    <FiMapPin size={14} />
                    <span>{route.distance}</span>
                  </div>
                  <div className="stat">
                    <FiDollarSign size={14} />
                    <span>{route.cost}</span>
                  </div>
                </RouteStats>
              </RouteHeader>

              <RouteDetails>
                {route.steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <TransportIcon color={step.color}>
                      <step.icon size={16} />
                    </TransportIcon>
                    <RouteStep darkMode={darkMode}>
                      <div className="transport">{step.transport}</div>
                      <div className="detail">{step.detail}</div>
                    </RouteStep>
                    {index < route.steps.length - 1 && (
                      <RouteArrow darkMode={darkMode}>→</RouteArrow>
                    )}
                  </React.Fragment>
                ))}
              </RouteDetails>

              {selectedRoute === route.id && (
                <DetailedRouteInfo
                  darkMode={darkMode}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <DetailTitle darkMode={darkMode}>
                    <FiNavigation size={16} />
                    詳細な経路案内
                  </DetailTitle>
                  <StepList>
                    {route.detailedSteps.map((step, index) => (
                      <StepItem key={index} darkMode={darkMode}>
                        <StepNumber>{index + 1}</StepNumber>
                        <StepContent darkMode={darkMode}>
                          <div className="action">{step.action}</div>
                          <div className="description">{step.description}</div>
                        </StepContent>
                      </StepItem>
                    ))}
                  </StepList>
                  
                  <RouteGuidanceButton onClick={() => handleStartGuidance(route)}>
                    <FiPlay size={16} />
                    経路案内開始
                  </RouteGuidanceButton>
                </DetailedRouteInfo>
              )}
            </RouteCard>
          ))}
        </RouteList>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RouteSearchModal;
