import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiSearch, FiPlus, FiCheck } from 'react-icons/fi';

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
  max-width: 900px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

const SearchSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    border: 2px solid ${props => props.darkMode ? '#404040' : '#e0e0e0'};
    border-radius: 8px;
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
    color: ${props => props.darkMode ? '#fff' : '#333'};
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #00A86B;
    }
    
    &::placeholder {
      color: ${props => props.darkMode ? '#aaa' : '#666'};
    }
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.darkMode ? '#aaa' : '#666'};
  }
`;

const CourseTable = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e0e0e0'};
  border-radius: 8px;
  margin: 0 20px 20px 20px;
  
  .table-header {
    display: grid;
    grid-template-columns: 60px 2.5fr 1.2fr 1.2fr 80px 1.2fr 80px;
    gap: 0;
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
    padding: 0;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 2px solid ${props => props.darkMode ? '#555' : '#dee2e6'};
  }
  
  .header-cell {
    background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
    padding: 16px 12px;
    font-size: 13px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#495057'};
    text-align: center;
    border-right: 1px solid ${props => props.darkMode ? '#555' : '#dee2e6'};
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:last-child {
      border-right: none;
    }
  }
`;

const CourseRow = styled.div`
  display: grid;
  grid-template-columns: 60px 2.5fr 1.2fr 1.2fr 80px 1.2fr 80px;
  gap: 0;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#3d3d3d' : '#f8f9fa'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CourseCell = styled.div`
  background: transparent;
  padding: 16px 12px;
  font-size: 14px;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  border-right: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  min-height: 60px;
  
  &:last-child {
    border-right: none;
  }
  
  .course-name {
    font-weight: 600;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  
  .course-code {
    font-size: 12px;
    color: ${props => props.darkMode ? '#aaa' : '#6c757d'};
    line-height: 1.2;
  }
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  width: 32px;
  height: 32px;
  border: 2px solid ${props => props.added ? '#00A86B' : (props.darkMode ? '#555' : '#dee2e6')};
  background: ${props => props.added ? '#00A86B' : 'transparent'};
  color: ${props => props.added ? 'white' : (props.darkMode ? '#aaa' : '#6c757d')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.added ? '#008f5a' : (props.darkMode ? '#404040' : '#f8f9fa')};
    border-color: ${props => props.added ? '#008f5a' : '#00A86B'};
    transform: scale(1.05);
  }
`;

const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedCount = styled.div`
  font-size: 14px;
  color: ${props => props.darkMode ? '#aaa' : '#666'};
`;

const SaveButton = styled.button`
  background: #00A86B;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #008f5a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CourseAddModal = ({ isOpen, onClose, darkMode, onAddCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState(new Set());

  const allCourses = [
    {
      id: 'MKT101',
      name: 'マーケティング原論',
      code: 'MKT101',
      professor: '田中教授',
      credits: 3,
      time: '화 13:00-15:00',
      room: 'B201'
    },
    {
      id: 'ECO201',
      name: 'ミクロ経済学',
      code: 'ECO201',
      professor: '佐藤教授',
      credits: 3,
      time: '月 09:00-12:00',
      room: 'A305'
    },
    {
      id: 'MGT301',
      name: '経営戦略論',
      code: 'MGT301',
      professor: '山田教授',
      credits: 3,
      time: '水 14:00-17:00',
      room: 'C102'
    },
    {
      id: 'FIN202',
      name: '財務管理',
      code: 'FIN202',
      professor: '高橋教授',
      credits: 3,
      time: '木 10:00-13:00',
      room: 'B305'
    },
    {
      id: 'ACC101',
      name: '会計原理',
      code: 'ACC101',
      professor: '鈴木教授',
      credits: 3,
      time: '金 13:00-16:00',
      room: 'A201'
    },
    {
      id: 'STA201',
      name: '統計学',
      code: 'STA201',
      professor: '中村教授',
      credits: 3,
      time: '火 09:00-12:00',
      room: 'D101'
    },
    {
      id: 'LAW101',
      name: '経営法規',
      code: 'LAW101',
      professor: '尹教授',
      credits: 2,
      time: '月 14:00-16:00',
      room: 'E203'
    },
    {
      id: 'HRM301',
      name: '人事管理論',
      code: 'HRM301',
      professor: '西教授',
      credits: 3,
      time: '水 09:00-12:00',
      room: 'F105'
    }
  ];

  const filteredCourses = allCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleCourse = (courseId) => {
    setSelectedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    const coursesToAdd = allCourses.filter(course => selectedCourses.has(course.id));
    onAddCourses(coursesToAdd);
    setSelectedCourses(new Set());
    setSearchTerm('');
    onClose();
  };

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
          <h2>授業追加</h2>
          <CloseButton darkMode={darkMode} onClick={onClose}>
            <FiX size={16} />
          </CloseButton>
        </ModalHeader>

        <SearchSection darkMode={darkMode}>
          <SearchInput darkMode={darkMode}>
            <FiSearch className="search-icon" size={16} />
            <input
              type="text"
              placeholder="授業名、授業コード、教授名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
        </SearchSection>

        <CourseTable darkMode={darkMode}>
          <div className="table-header">
            <div className="header-cell">選択</div>
            <div className="header-cell">授業名</div>
            <div className="header-cell">教授</div>
            <div className="header-cell">時間</div>
            <div className="header-cell">単位</div>
            <div className="header-cell">講義室</div>
            <div className="header-cell">定員</div>
          </div>

          {filteredCourses.map((course) => (
            <CourseRow
              key={course.id}
              darkMode={darkMode}
              onClick={() => handleToggleCourse(course.id)}
            >
              <CourseCell darkMode={darkMode} center>
                <input
                  type="checkbox"
                  checked={selectedCourses.has(course.id)}
                  onChange={() => handleToggleCourse(course.id)}
                />
              </CourseCell>
              <CourseCell darkMode={darkMode}>
                <div>
                  <div className="course-name">{course.name}</div>
                  <div className="course-code">{course.code}</div>
                </div>
              </CourseCell>
              <CourseCell darkMode={darkMode} center>
                {course.professor}
              </CourseCell>
              <CourseCell darkMode={darkMode} center>
                {course.time}
              </CourseCell>
              <CourseCell darkMode={darkMode} center>
                {course.credits}
              </CourseCell>
              <CourseCell darkMode={darkMode} center>
                {course.room}
              </CourseCell>
              <CourseCell darkMode={darkMode} center>
                <AddButton
                  darkMode={darkMode}
                  added={selectedCourses.has(course.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleCourse(course.id);
                  }}
                >
                  {selectedCourses.has(course.id) ? <FiCheck size={12} /> : <FiPlus size={12} />}
                </AddButton>
              </CourseCell>
            </CourseRow>
          ))}
        </CourseTable>

        <ModalFooter darkMode={darkMode}>
          <SelectedCount darkMode={darkMode}>
            {selectedCourses.size}件の授業を選択中
          </SelectedCount>
          <SaveButton
            onClick={handleSave}
            disabled={selectedCourses.size === 0}
          >
            選択した授業を追加
          </SaveButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseAddModal;
