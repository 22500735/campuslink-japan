import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  position: relative;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 60px 20px 40px;
  text-align: center;
  color: white;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #00A86B;
  margin: 0 auto 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

const FormContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 30px 30px 0 0;
  padding: 40px 20px 20px;
  min-height: 60vh;
`;

const TabContainer = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#00A86B' : '#666'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(0, 168, 107, 0.15)' : 'none'};
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
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
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #6c757d;
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.variant === 'secondary' ? '#f8f9fa' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  color: ${props => props.variant === 'secondary' ? '#00A86B' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #00A86B' : 'none'};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 168, 107, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: center;
  color: #00A86B;
  font-size: 14px;
  text-decoration: none;
  margin-top: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginScreen = ({ onLogin, onNeedVerification }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'login') {
      // Mock login validation
      if (formData.email && formData.password) {
        if (formData.email.endsWith('@ac.jp')) {
          onLogin({
            email: formData.email,
            name: formData.email.split('@')[0],
            university: 'Aoyama Gakuin University',
            verified: true
          });
        } else {
          alert('大学のメールアドレス（@ac.jp）を使用してください');
        }
      } else {
        alert('メールアドレスとパスワードを入力してください');
      }
    } else {
      // Registration
      if (formData.email && formData.password && formData.name && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          alert('パスワードが一致しません');
          return;
        }
        if (!formData.email.endsWith('@ac.jp')) {
          alert('大学のメールアドレス（@ac.jp）を使用してください');
          return;
        }
        onNeedVerification();
      } else {
        alert('すべての項目を入力してください');
      }
    }
  };

  return (
    <LoginContainer
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <Header>
        <Logo>CL</Logo>
        <Title>おかえりなさい</Title>
        <Subtitle>大学生活をもっと便利に</Subtitle>
      </Header>

      <FormContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            ログイン
          </Tab>
          <Tab 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
          >
            新規登録
          </Tab>
        </TabContainer>

        <form onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <InputGroup>
              <Label>お名前</Label>
              <InputContainer>
                <InputIcon><FiUser size={20} /></InputIcon>
                <Input
                  type="text"
                  name="name"
                  placeholder="山田太郎"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </InputContainer>
            </InputGroup>
          )}

          <InputGroup>
            <Label>大学メールアドレス</Label>
            <InputContainer>
              <InputIcon><FiMail size={20} /></InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="student@ac.jp"
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputContainer>
          </InputGroup>

          <InputGroup>
            <Label>パスワード</Label>
            <InputContainer>
              <InputIcon><FiLock size={20} /></InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          {activeTab === 'register' && (
            <InputGroup>
              <Label>パスワード確認</Label>
              <InputContainer>
                <InputIcon><FiLock size={20} /></InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </InputContainer>
            </InputGroup>
          )}

          <Button type="submit">
            {activeTab === 'login' ? 'ログイン' : '学生認証へ進む'}
          </Button>

          {activeTab === 'register' && (
            <Button type="button" variant="secondary" onClick={onNeedVerification}>
              学生認証
            </Button>
          )}
        </form>

        {activeTab === 'login' && (
          <ForgotPassword href="#">
            パスワードを忘れた方はこちら
          </ForgotPassword>
        )}
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginScreen;
