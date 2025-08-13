import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiUser, FiUserX, FiTag, FiChevronDown } from 'react-icons/fi';

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

const ModalContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
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

const ModalContent = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#e2e8f0' : '#333'};
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const ToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.darkMode ? 'white' : '#333'};
`;

const ToggleSwitch = styled.button`
  position: relative;
  width: 56px;
  height: 28px;
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#4a5568' : '#cbd5e0')};
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '30px' : '2px'};
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }

  &::placeholder {
    color: ${props => props.darkMode ? '#a0aec0' : '#999'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 16px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }

  &::placeholder {
    color: ${props => props.darkMode ? '#a0aec0' : '#999'};
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  background: ${props => props.darkMode ? '#1a202c' : 'white'};
  min-height: 48px;
  align-items: center;

  &:focus-within {
    border-color: #00A86B;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #00A86B;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    font-size: 14px;
    line-height: 1;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const TagInputField = styled.input`
  flex: 1;
  border: none;
  background: none;
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 14px;
  min-width: 100px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.darkMode ? '#a0aec0' : '#999'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.primary ? `
    background: #00A86B;
    color: white;
    
    &:hover {
      background: #008f5a;
      transform: translateY(-1px);
    }
  ` : `
    background: ${props.darkMode ? '#4a5568' : '#f8f9fa'};
    color: ${props.darkMode ? '#e2e8f0' : '#666'};
    
    &:hover {
      background: ${props.darkMode ? '#2d3748' : '#e9ecef'};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const WritePostModal = ({ isOpen, onClose, darkMode = false }) => {
  const [selectedBoard, setSelectedBoard] = useState('자유게시판');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const boards = [
    '자유게시판',
    '질문게시판',
    '정보게시판',
    '취업게시판',
    '강의평가',
    '중고거래',
    '동아리/소모임',
    '학사공지'
  ];

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    
    const postData = {
      board: selectedBoard,
      anonymous: isAnonymous,
      title: title.trim(),
      content: content.trim(),
      tags: tags
    };
    
    console.log('새 게시글:', postData);
    onClose();
    
    // Reset form
    setSelectedBoard('자유게시판');
    setIsAnonymous(true);
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContainer
        darkMode={darkMode}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader darkMode={darkMode}>
          <ModalTitle darkMode={darkMode}>새 글 작성</ModalTitle>
          <CloseButton darkMode={darkMode} onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <FormGroup>
            <Label darkMode={darkMode}>게시판 선택</Label>
            <Select
              darkMode={darkMode}
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
            >
              {boards.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>작성자 설정</Label>
            <ToggleContainer darkMode={darkMode}>
              <ToggleLabel darkMode={darkMode}>
                {isAnonymous ? <FiUserX size={16} /> : <FiUser size={16} />}
                {isAnonymous ? '익명으로 작성' : '실명으로 작성'}
              </ToggleLabel>
              <ToggleSwitch
                active={!isAnonymous}
                darkMode={darkMode}
                onClick={() => setIsAnonymous(!isAnonymous)}
              />
            </ToggleContainer>
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>제목</Label>
            <Input
              darkMode={darkMode}
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>내용</Label>
            <TextArea
              darkMode={darkMode}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>태그</Label>
            <TagInput darkMode={darkMode}>
              {tags.map(tag => (
                <Tag key={tag}>
                  <FiTag size={12} />
                  {tag}
                  <button onClick={() => handleTagRemove(tag)}>×</button>
                </Tag>
              ))}
              <TagInputField
                darkMode={darkMode}
                type="text"
                placeholder="태그 입력 후 Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagAdd}
              />
            </TagInput>
          </FormGroup>
        </ModalContent>

        <ButtonContainer darkMode={darkMode}>
          <Button darkMode={darkMode} onClick={onClose}>
            취소
          </Button>
          <Button 
            primary 
            darkMode={darkMode} 
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            게시글 작성
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WritePostModal;
