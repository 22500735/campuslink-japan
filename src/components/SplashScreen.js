import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
`;

const SplashContainer = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: #00A86B;
  margin-bottom: 20px;
  animation: ${fadeIn} 2s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const AppName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  animation: ${fadeIn} 2s ease-out 0.5s both;
`;

const Tagline = styled.p`
  font-size: 16px;
  opacity: 0.9;
  text-align: center;
  animation: ${fadeIn} 2s ease-out 1s both;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;
  animation: ${fadeIn} 2s ease-out 1.5s both;
  
  .dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const SplashScreen = () => {
  return (
    <SplashContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo>CL</Logo>
      <AppName>CampusLink Japan</AppName>
      <Tagline>日本の大学生のための総合プラットフォーム</Tagline>
      <LoadingDots>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </LoadingDots>
    </SplashContainer>
  );
};

export default SplashScreen;
