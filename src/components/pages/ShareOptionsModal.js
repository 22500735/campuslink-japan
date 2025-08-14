import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiShare2, FiCalendar, FiUsers, FiCopy, FiMessageCircle } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  border-radius: 8px;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#555' : '#e0e0e0'};
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ShareOption = styled(motion.div)`
  background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: ${props => props.darkMode ? '#555' : '#e8f5e8'};
    border-color: #00A86B;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  
  .icon {
    width: 40px;
    height: 40px;
    background: #00A86B;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const OptionDescription = styled.div`
  font-size: 14px;
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  line-height: 1.5;
  margin-left: 52px;
`;

const DaySelector = styled.div`
  margin-top: 16px;
  margin-left: 52px;
  
  .selector-title {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 12px;
  }
  
  .days {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const DayButton = styled.button`
  padding: 6px 12px;
  border: 2px solid ${props => props.selected ? '#00A86B' : (props.darkMode ? '#555' : '#ddd')};
  background: ${props => props.selected ? '#00A86B' : 'transparent'};
  color: ${props => props.selected ? 'white' : (props.darkMode ? '#fff' : '#333')};
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00A86B;
    background: ${props => props.selected ? '#008f5a' : 'rgba(0, 168, 107, 0.1)'};
  }
`;

const ShareButton = styled.button`
  width: 100%;
  background: #00A86B;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
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
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ShareOptionsModal = ({ isOpen, onClose, darkMode, onShare }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDays, setSelectedDays] = useState(new Set());

  const days = [
    { key: 'mon', label: '月' },
    { key: 'tue', label: '火' },
    { key: 'wed', label: '水' },
    { key: 'thu', label: '木' },
    { key: 'fri', label: '金' }
  ];

  const shareOptions = [
    {
      id: 'full',
      title: '時間割全体共有',
      description: '全体の時間割を友達と共有して、一緒にスケジュールを確認し友達を追加できます。',
      icon: FiShare2
    },
    {
      id: 'daily',
      title: '曜日別時間割共有',
      description: '特定の曜日の時間割のみを選択して共有します。希望の曜日を選択してください。',
      icon: FiCalendar
    }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === 'full') {
      setSelectedDays(new Set());
    }
  };

  const handleDayToggle = (dayKey) => {
    setSelectedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayKey)) {
        newSet.delete(dayKey);
      } else {
        newSet.add(dayKey);
      }
      return newSet;
    });
  };

  const handleShare = () => {
    if (selectedOption === 'full') {
      onShare({ type: 'full' });
    } else if (selectedOption === 'daily') {
      onShare({ 
        type: 'daily', 
        days: Array.from(selectedDays) 
      });
    }
    
    // Reset state
    setSelectedOption(null);
    setSelectedDays(new Set());
    onClose();
  };

  const canShare = selectedOption === 'full' || (selectedOption === 'daily' && selectedDays.size > 0);

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        darkMode={darkMode}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader darkMode={darkMode}>
          <h2>時間割共有</h2>
          <CloseButton darkMode={darkMode} onClick={onClose}>
            <FiX size={16} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {shareOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <ShareOption
                key={option.id}
                darkMode={darkMode}
                onClick={() => handleOptionSelect(option.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  borderColor: isSelected ? '#00A86B' : 'transparent'
                }}
              >
                <OptionHeader darkMode={darkMode}>
                  <div className="icon">
                    <IconComponent size={20} />
                  </div>
                  <div className="title">{option.title}</div>
                </OptionHeader>
                <OptionDescription darkMode={darkMode}>
                  {option.description}
                </OptionDescription>
                
                {option.id === 'daily' && isSelected && (
                  <DaySelector darkMode={darkMode}>
                    <div className="selector-title">共有する曜日を選択:</div>
                    <div className="days">
                      {days.map((day) => (
                        <DayButton
                          key={day.key}
                          selected={selectedDays.has(day.key)}
                          darkMode={darkMode}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDayToggle(day.key);
                          }}
                        >
                          {day.label}曜日
                        </DayButton>
                      ))}
                    </div>
                  </DaySelector>
                )}
              </ShareOption>
            );
          })}
          
          <ShareButton
            onClick={handleShare}
            disabled={!canShare}
          >
            <FiShare2 size={16} />
            {selectedOption === 'full' ? '全体時間割を共有' : 
             selectedOption === 'daily' ? `選択した曜日を共有 (${selectedDays.size}日)` : 
             '共有オプションを選択してください'}
          </ShareButton>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShareOptionsModal;
