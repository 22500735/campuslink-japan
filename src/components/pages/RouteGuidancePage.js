import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiNavigation, FiClock, FiMapPin, FiTruck, FiZap, FiRotateCcw, FiVolume2 } from 'react-icons/fi';

const GuidanceContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 20px;
  color: white;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
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

const RouteOverview = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  margin-top: 20px;
`;

const RouteInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DestinationInfo = styled.div`
  .destination {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .route-type {
    font-size: 14px;
    opacity: 0.9;
  }
`;

const RouteStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  
  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const CurrentStep = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 2px solid #00A86B;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const StepIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #00A86B;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StepInfo = styled.div`
  flex: 1;
  
  .instruction {
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
  }
  
  .detail {
    font-size: 14px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
`;

const StepDistance = styled.div`
  text-align: right;
  
  .distance {
    font-size: 24px;
    font-weight: 700;
    color: #00A86B;
  }
  
  .label {
    font-size: 12px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
`;

const UpcomingSteps = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? '#fff' : '#333'};
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

const UpcomingStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f8f9fa'};
  border-radius: 12px;
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  background: ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#666'};
`;

const UpcomingStepInfo = styled.div`
  flex: 1;
  
  .action {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 2px;
  }
  
  .description {
    font-size: 12px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
`;

const ControlButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-radius: 12px;
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
    
    &:hover {
      background: ${props.darkMode ? '#505050' : '#e9ecef'};
    }
  `}
`;

const RouteGuidancePage = ({ route, onBack, darkMode = false }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  // Simulate step progression
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < route.detailedSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 10000); // Progress every 10 seconds for demo

    return () => clearInterval(timer);
  }, [route.detailedSteps.length]);

  const currentStep = route.detailedSteps[currentStepIndex];
  const upcomingSteps = route.detailedSteps.slice(currentStepIndex + 1, currentStepIndex + 4);

  const handleRecalculate = () => {
    // Recalculate route logic
    console.log('Recalculating route...');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  if (!route) return null;

  return (
    <GuidanceContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>経路案内</HeaderTitle>
        </HeaderTop>
        
        <RouteOverview>
          <RouteInfo>
            <DestinationInfo>
              <div className="destination">目的地まで</div>
              <div className="route-type">{route.name} • {route.type}</div>
            </DestinationInfo>
            <RouteStats>
              <div className="stat">
                <FiClock size={14} />
                <span>{route.duration}</span>
              </div>
              <div className="stat">
                <FiMapPin size={14} />
                <span>{route.distance}</span>
              </div>
            </RouteStats>
          </RouteInfo>
        </RouteOverview>
      </Header>

      <ContentArea>
        <CurrentStep darkMode={darkMode}>
          <StepHeader>
            <StepIcon>
              <FiNavigation size={24} />
            </StepIcon>
            <StepInfo darkMode={darkMode}>
              <div className="instruction">{currentStep.action}</div>
              <div className="detail">{currentStep.description}</div>
            </StepInfo>
            <StepDistance darkMode={darkMode}>
              <div className="distance">150m</div>
              <div className="label">残り距離</div>
            </StepDistance>
          </StepHeader>
        </CurrentStep>

        {upcomingSteps.length > 0 && (
          <UpcomingSteps darkMode={darkMode}>
            <SectionTitle darkMode={darkMode}>
              <FiMapPin size={18} />
              次の段階
            </SectionTitle>
            <StepList>
              {upcomingSteps.map((step, index) => (
                <UpcomingStep key={index} darkMode={darkMode}>
                  <StepNumber darkMode={darkMode}>
                    {currentStepIndex + index + 2}
                  </StepNumber>
                  <UpcomingStepInfo darkMode={darkMode}>
                    <div className="action">{step.action}</div>
                    <div className="description">{step.description}</div>
                  </UpcomingStepInfo>
                </UpcomingStep>
              ))}
            </StepList>
          </UpcomingSteps>
        )}

        <ControlButtons>
          <ControlButton darkMode={darkMode} onClick={handleRecalculate}>
            <FiRotateCcw size={16} />
            経路再検索
          </ControlButton>
          <ControlButton 
            primary={isVoiceEnabled} 
            darkMode={darkMode} 
            onClick={toggleVoice}
          >
            <FiVolume2 size={16} />
            {isVoiceEnabled ? '音声を切る' : '音声を切る'}
          </ControlButton>
        </ControlButtons>
      </ContentArea>
    </GuidanceContainer>
  );
};

export default RouteGuidancePage;
