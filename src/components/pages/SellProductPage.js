import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCamera, FiTag, FiDollarSign, FiBook, FiChevronDown } from 'react-icons/fi';

const SellContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a202c' : '#f5f5f5'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  padding: 60px 20px 20px;
  color: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  position: relative;
`;

const ContentArea = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  background: ${props => props.darkMode ? '#2d3748' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.darkMode ? 'white' : '#333'};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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

const ImageUploadArea = styled.div`
  border: 2px dashed ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};

  &:hover {
    border-color: #00A86B;
    background: ${props => props.darkMode ? '#2d3748' : '#f0f8f5'};
  }

  .icon {
    font-size: 48px;
    color: ${props => props.darkMode ? '#4a5568' : '#ccc'};
    margin-bottom: 12px;
  }

  .text {
    color: ${props => props.darkMode ? '#e2e8f0' : '#666'};
    font-size: 16px;
    font-weight: 500;
  }

  .subtext {
    color: ${props => props.darkMode ? '#a0aec0' : '#999'};
    font-size: 14px;
    margin-top: 4px;
  }
`;

const PriceInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PriceSymbol = styled.div`
  position: absolute;
  left: 16px;
  color: ${props => props.darkMode ? '#a0aec0' : '#666'};
  font-weight: 600;
  z-index: 1;
`;

const PriceInput = styled(Input)`
  padding-left: 40px;
  font-size: 18px;
  font-weight: 600;
`;

const CourseInfoSection = styled(motion.div)`
  margin-top: 16px;
  padding: 16px;
  background: ${props => props.darkMode ? '#1a202c' : '#f8f9fa'};
  border-radius: 12px;
  border: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  position: sticky;
  bottom: 0;
  background: ${props => props.darkMode ? '#1a202c' : '#f5f5f5'};
  border-top: 1px solid ${props => props.darkMode ? '#4a5568' : '#e9ecef'};
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 24px;
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

const SellProductPage = ({ onBack, darkMode = false }) => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: '',
    courseInfo: ''
  });

  const categories = {
    '책': ['전공책', '부교재', '참고서', '문제집'],
    '전자기기': ['계산기', '노트북', '태블릿', '기타'],
    '문구용품': ['필기구', '노트', '바인더', '기타'],
    '생활용품': ['가구', '생활잡화', '의류', '기타'],
    '악기': ['기타', '피아노', '관악기', '현악기'],
    '기타': ['스포츠용품', '취미용품', '기타']
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset subcategory when category changes
      ...(field === 'category' && { subcategory: '' })
    }));
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.title || !formData.description || !formData.price) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const productData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    console.log('새 상품 등록:', productData);
    alert('상품이 성공적으로 등록되었습니다!');
    onBack();
  };

  const showCourseInfo = formData.subcategory === '전공책';

  return (
    <SellContainer darkMode={darkMode}>
      <Header>
        <BackButton onClick={onBack}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>상품 판매</Title>
      </Header>

      <ContentArea>
        <FormSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiCamera size={20} />
            상품 사진
          </SectionTitle>
          <ImageUploadArea darkMode={darkMode}>
            <div className="icon">
              <FiCamera />
            </div>
            <div className="text">사진을 추가해주세요</div>
            <div className="subtext">최대 10장까지 업로드 가능</div>
          </ImageUploadArea>
        </FormSection>

        <FormSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiTag size={20} />
            카테고리
          </SectionTitle>
          
          <FormGroup>
            <Label darkMode={darkMode}>대분류</Label>
            <Select
              darkMode={darkMode}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">카테고리를 선택하세요</option>
              {Object.keys(categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </FormGroup>

          {formData.category && (
            <FormGroup>
              <Label darkMode={darkMode}>소분류</Label>
              <Select
                darkMode={darkMode}
                value={formData.subcategory}
                onChange={(e) => handleInputChange('subcategory', e.target.value)}
              >
                <option value="">세부 카테고리를 선택하세요</option>
                {categories[formData.category]?.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
              </Select>
            </FormGroup>
          )}

          {showCourseInfo && (
            <CourseInfoSection
              darkMode={darkMode}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FormGroup>
                <Label darkMode={darkMode}>
                  <FiBook size={16} style={{ marginRight: '4px' }} />
                  수업 정보
                </Label>
                <Input
                  darkMode={darkMode}
                  type="text"
                  placeholder="예: 마케팅원론, 경영학개론, 미시경제학 등"
                  value={formData.courseInfo}
                  onChange={(e) => handleInputChange('courseInfo', e.target.value)}
                />
              </FormGroup>
            </CourseInfoSection>
          )}
        </FormSection>

        <FormSection darkMode={darkMode}>
          <SectionTitle darkMode={darkMode}>
            <FiTag size={20} />
            상품 정보
          </SectionTitle>
          
          <FormGroup>
            <Label darkMode={darkMode}>제목</Label>
            <Input
              darkMode={darkMode}
              type="text"
              placeholder="상품 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>상품 설명</Label>
            <TextArea
              darkMode={darkMode}
              placeholder="상품에 대한 자세한 설명을 입력하세요&#10;- 상품 상태&#10;- 구매 시기&#10;- 사용 빈도&#10;- 기타 특이사항"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label darkMode={darkMode}>판매 가격</Label>
            <PriceInputContainer>
              <PriceSymbol darkMode={darkMode}>₩</PriceSymbol>
              <PriceInput
                darkMode={darkMode}
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </PriceInputContainer>
          </FormGroup>
        </FormSection>
      </ContentArea>

      <ButtonContainer darkMode={darkMode}>
        <Button darkMode={darkMode} onClick={onBack}>
          취소
        </Button>
        <Button 
          primary 
          darkMode={darkMode} 
          onClick={handleSubmit}
          disabled={!formData.category || !formData.title || !formData.description || !formData.price}
        >
          상품 등록
        </Button>
      </ButtonContainer>
    </SellContainer>
  );
};

export default SellProductPage;
