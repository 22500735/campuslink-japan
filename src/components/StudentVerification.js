import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiUpload, FiCheck, FiArrowLeft } from 'react-icons/fi';

const VerificationContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 60px 20px 20px;
  color: white;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 60px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
  text-align: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 30px 30px 0 0;
  padding: 40px 20px 20px;
  min-height: 70vh;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 12px;
`;

const Step = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#00A86B' : '#e9ecef'};
  transition: all 0.3s ease;
`;

const StepContainer = styled.div`
  margin-bottom: 30px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
`;

const TermsContainer = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  max-height: 200px;
  overflow-y: auto;
  border: 2px solid #e9ecef;
`;

const TermsText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  
  h4 {
    color: #333;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 12px;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 20px;
  
  input {
    width: 20px;
    height: 20px;
    accent-color: #00A86B;
  }
  
  span {
    font-size: 14px;
    color: #333;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00A86B;
    background: white;
    box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
  }
`;

const UploadArea = styled.div`
  border: 2px dashed #00A86B;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: rgba(0, 168, 107, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 168, 107, 0.1);
  }
  
  input {
    display: none;
  }
`;

const UploadIcon = styled.div`
  color: #00A86B;
  margin-bottom: 12px;
`;

const UploadText = styled.p`
  color: #00A86B;
  font-weight: 600;
  margin-bottom: 4px;
`;

const UploadSubtext = styled.p`
  color: #666;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? '#e9ecef' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  color: ${props => props.disabled ? '#adb5bd' : 'white'};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 168, 107, 0.3);
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  .icon {
    width: 80px;
    height: 80px;
    background: #00A86B;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
`;

const StudentVerification = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    termsAccepted: false,
    email: '',
    document: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document: file
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && formData.termsAccepted) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.email) {
      setCurrentStep(3);
    } else if (currentStep === 3 && formData.document) {
      setCurrentStep(4);
      // Simulate verification process
      setTimeout(() => {
        onComplete({
          email: formData.email,
          name: formData.email.split('@')[0],
          university: 'Aoyama Gakuin University',
          verified: true
        });
      }, 2000);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.termsAccepted;
      case 2: return formData.email && formData.email.endsWith('@ac.jp');
      case 3: return formData.document;
      default: return false;
    }
  };

  return (
    <VerificationContainer
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <Header>
        <BackButton onClick={onBack}>
          <FiArrowLeft size={20} />
        </BackButton>
        <Title>学生認証</Title>
        <Subtitle>大学生であることを確認させていただきます</Subtitle>
      </Header>

      <ContentContainer>
        <StepIndicator>
          <Step active={currentStep >= 1} />
          <Step active={currentStep >= 2} />
          <Step active={currentStep >= 3} />
          <Step active={currentStep >= 4} />
        </StepIndicator>

        {currentStep === 1 && (
          <StepContainer>
            <StepTitle>利用規約への同意</StepTitle>
            <TermsContainer>
              <TermsText>
                <h4>CampusLink Japan 利用規約</h4>
                <p>1. 本サービスは日本の大学生専用のプラットフォームです。</p>
                <p>2. 学生証または在学証明書による本人確認が必要です。</p>
                <p>3. 個人情報は適切に保護され、第三者に提供されることはありません。</p>
                <p>4. 不適切な投稿や行為は禁止されています。</p>
                <p>5. サービスの利用により発生した問題について、当社は責任を負いません。</p>
                <h4>プライバシーポリシー</h4>
                <p>収集する情報：メールアドレス、学生証情報、投稿内容</p>
                <p>利用目的：サービス提供、本人確認、コミュニティ運営</p>
                <p>保存期間：アカウント削除まで</p>
              </TermsText>
            </TermsContainer>
            <CheckboxContainer>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
              />
              <span>利用規約とプライバシーポリシーに同意します</span>
            </CheckboxContainer>
          </StepContainer>
        )}

        {currentStep === 2 && (
          <StepContainer>
            <StepTitle>大学メールアドレス登録</StepTitle>
            <InputGroup>
              <Label>大学メールアドレス</Label>
              <Input
                type="email"
                name="email"
                placeholder="student@ac.jp"
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputGroup>
            <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
              認証メールを送信します。メールボックスをご確認ください。
            </p>
          </StepContainer>
        )}

        {currentStep === 3 && (
          <StepContainer>
            <StepTitle>学生証または証明書のアップロード</StepTitle>
            <UploadArea onClick={() => document.getElementById('fileInput').click()}>
              <input
                id="fileInput"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
              <UploadIcon>
                <FiUpload size={40} />
              </UploadIcon>
              <UploadText>
                {formData.document ? formData.document.name : 'ファイルを選択'}
              </UploadText>
              <UploadSubtext>
                学生証、在学証明書、卒業証明書のいずれかをアップロードしてください
              </UploadSubtext>
            </UploadArea>
          </StepContainer>
        )}

        {currentStep === 4 && (
          <SuccessMessage>
            <div className="icon">
              <FiCheck size={40} />
            </div>
            <h3>認証完了</h3>
            <p>学生認証が完了しました。CampusLink Japanへようこそ！</p>
          </SuccessMessage>
        )}

        {currentStep < 4 && (
          <Button disabled={!canProceed()} onClick={handleNext}>
            {currentStep === 3 ? '認証を完了' : '次へ'}
          </Button>
        )}
      </ContentContainer>
    </VerificationContainer>
  );
};

export default StudentVerification;
