import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Components
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import StudentVerification from './components/StudentVerification';
import MainApp from './components/MainApp';

// Contexts
import { LanguageProvider } from './contexts/LanguageContext';

// Global Styles
const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #00A86B 0%, #20B2AA 100%);
  position: relative;
`;

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('campuslink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen('main');
    } else {
      // Temporary: Skip login for testing BoardPage fix
      const testUser = {
        id: 'test123',
        name: 'テストユーザー',
        email: 'test@ac.jp',
        studentId: '20240001',
        department: '情報テクノロジー学科'
      };
      setUser(testUser);
      localStorage.setItem('campuslink_user', JSON.stringify(testUser));
      setCurrentScreen('main');
      
      // Original login flow (commented out for testing)
      // const timer = setTimeout(() => {
      //   setCurrentScreen('login');
      // }, 3000);
      // return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('campuslink_user', JSON.stringify(userData));
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campuslink_user');
    setCurrentScreen('login');
  };

  const handleVerificationComplete = (userData) => {
    handleLogin(userData);
  };

  return (
    <LanguageProvider>
      <Router>
        <AppContainer>
          <AnimatePresence mode="wait">
            {currentScreen === 'splash' && (
              <SplashScreen key="splash" />
            )}
            {currentScreen === 'login' && (
              <LoginScreen 
                key="login" 
                onLogin={handleLogin}
                onNeedVerification={() => setCurrentScreen('verification')}
              />
            )}
            {currentScreen === 'verification' && (
              <StudentVerification 
                key="verification"
                onComplete={handleVerificationComplete}
                onBack={() => setCurrentScreen('login')}
              />
            )}
            {currentScreen === 'main' && user && (
              <MainApp 
                key="main" 
                user={user} 
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>
        </AppContainer>
      </Router>
    </LanguageProvider>
  );
}

export default App;
