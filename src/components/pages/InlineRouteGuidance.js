import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiNavigation, FiClock, FiMapPin, FiRotateCcw, FiVolume2, FiX } from 'react-icons/fi';

const GuidanceContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 16px;
  margin: 16px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 2px solid #00A86B;
`;

const GuidanceHeader = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderInfo = styled.div`
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .subtitle {
    font-size: 14px;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CurrentStep = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #00A86B;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StepInfo = styled.div`
  flex: 1;
  
  .instruction {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
  }
  
  .detail {
    font-size: 14px;
    color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  }
`;

const StepDistance = styled.div`
  text-align: right;
  
  .distance {
    font-size: 18px;
    font-weight: 700;
    color: #00A86B;
  }
  
  .label {
    font-size: 12px;
    color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  }
`;

const UpcomingSteps = styled.div`
  padding: 16px 20px;
  max-height: 200px;
  overflow-y: auto;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UpcomingStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#f0f0f0'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const StepNumber = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#fff' : '#666'};
`;

const UpcomingStepInfo = styled.div`
  flex: 1;
  
  .action {
    font-size: 13px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 2px;
  }
  
  .description {
    font-size: 11px;
    color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
`;

const ControlButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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
    background: ${props.darkMode ? '#4a5568' : 'white'};
    color: ${props.darkMode ? '#fff' : '#666'};
    border: 1px solid ${props.darkMode ? '#4a5568' : '#e9ecef'};
    
    &:hover {
      background: ${props.darkMode ? '#5a6578' : '#f0f0f0'};
    }
  `}
`;

const InlineRouteGuidance = ({ route, onClose, darkMode = false }) => {
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
    }, 15000); // Progress every 15 seconds for demo

    return () => clearInterval(timer);
  }, [route.detailedSteps.length]);

  const currentStep = route.detailedSteps[currentStepIndex];
  const upcomingSteps = route.detailedSteps.slice(currentStepIndex + 1, currentStepIndex + 3);

  const handleRecalculate = () => {
    console.log('Recalculating route...');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  if (!route) return null;

  return (
    <GuidanceContainer
      darkMode={darkMode}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <GuidanceHeader>
        <HeaderInfo>
          <div className="title">ルート案内中</div>
          <div className="subtitle">
            <span><FiClock size={12} /> {route.duration}</span>
            <span><FiMapPin size={12} /> {route.distance}</span>
          </div>
        </HeaderInfo>
        <CloseButton onClick={onClose}>
          <FiX size={16} />
        </CloseButton>
      </GuidanceHeader>

      <CurrentStep darkMode={darkMode}>
        <StepHeader>
          <StepIcon>
            <FiNavigation size={20} />
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
        <UpcomingSteps>
          <SectionTitle darkMode={darkMode}>
            <FiMapPin size={14} />
            次のステップ
          </SectionTitle>
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
        </UpcomingSteps>
      )}

      <ControlButtons darkMode={darkMode}>
        <ControlButton darkMode={darkMode} onClick={handleRecalculate}>
          <FiRotateCcw size={14} />
          再検索
        </ControlButton>
        <ControlButton 
          primary={isVoiceEnabled} 
          darkMode={darkMode} 
          onClick={toggleVoice}
        >
          <FiVolume2 size={14} />
          {isVoiceEnabled ? '音声を止める' : '音声を再生する'}
        </ControlButton>
      </ControlButtons>
    </GuidanceContainer>
  );
};

export default InlineRouteGuidance;
