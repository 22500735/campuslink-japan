import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectorButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 12px;
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: space-between;
  
  &:hover {
    border-color: #00A86B;
    background: ${props => props.darkMode ? '#3a3a3a' : '#f8f9fa'};
  }
  
  .icon {
    color: #00A86B;
  }
  
  .chevron {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const DropdownOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 999;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.darkMode ? '#404040' : '#e9ecef'};
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.15'});
  overflow: hidden;
  z-index: 1000;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: none;
  border: none;
  color: ${props => props.darkMode ? 'white' : '#333'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.darkMode ? '#3a3a3a' : '#f8f9fa'};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  }
  
  .language-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  
  .language-name {
    font-weight: 600;
  }
  
  .language-native {
    font-size: 12px;
    color: ${props => props.darkMode ? '#ccc' : '#666'};
  }
  
  .check-icon {
    color: #00A86B;
    opacity: ${props => props.selected ? 1 : 0};
  }
`;

const SectionTitle = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.darkMode ? '#ccc' : '#666'};
  background: ${props => props.darkMode ? '#1a1a1a' : '#f8f9fa'};
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
`;

const CurrencyItem = styled(MenuItem)`
  .currency-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .currency-symbol {
    font-weight: 700;
    color: #00A86B;
  }
`;

const LanguageSelector = ({ darkMode = false, showCurrency = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentLanguage, 
    currentCurrency, 
    changeLanguage, 
    changeCurrency,
    t,
    getAvailableLanguages,
    getAvailableCurrencies
  } = useLanguage();

  const languages = getAvailableLanguages();
  const currencies = getAvailableCurrencies();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode) => {
    console.log('LanguageSelector: Changing language to:', languageCode);
    changeLanguage(languageCode);
    setIsOpen(false);
    
    // Force component update after language change
    setTimeout(() => {
      console.log('LanguageSelector: Language change completed');
    }, 100);
  };

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <SelectorContainer>
      <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333' }}>
        언어 / Language / 言語
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => handleLanguageChange('ja')}
          style={{
            padding: '12px 16px',
            border: currentLanguage === 'ja' ? '2px solid #10b981' : '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: currentLanguage === 'ja' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
            color: currentLanguage === 'ja' ? '#10b981' : (darkMode ? '#fff' : '#333'),
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: currentLanguage === 'ja' ? '600' : '400',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🇯🇵 日本語
          {currentLanguage === 'ja' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
        </button>
        
        <button
          onClick={() => handleLanguageChange('en')}
          style={{
            padding: '12px 16px',
            border: currentLanguage === 'en' ? '2px solid #10b981' : '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: currentLanguage === 'en' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
            color: currentLanguage === 'en' ? '#10b981' : (darkMode ? '#fff' : '#333'),
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: currentLanguage === 'en' ? '600' : '400',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🇺🇸 English
          {currentLanguage === 'en' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
        </button>
        
        <button
          onClick={() => handleLanguageChange('ko')}
          style={{
            padding: '12px 16px',
            border: currentLanguage === 'ko' ? '2px solid #10b981' : '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: currentLanguage === 'ko' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
            color: currentLanguage === 'ko' ? '#10b981' : (darkMode ? '#fff' : '#333'),
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: currentLanguage === 'ko' ? '600' : '400',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🇰🇷 한국어
          {currentLanguage === 'ko' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <DropdownOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <DropdownMenu
              darkMode={darkMode}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <SectionTitle darkMode={darkMode}>
                {t('language')}
              </SectionTitle>
              
              {languages.map((language) => (
                <MenuItem
                  key={language.code}
                  darkMode={darkMode}
                  selected={currentLanguage === language.code}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  <div className="language-info">
                    <div className="language-name">{language.name}</div>
                    <div className="language-native">{language.nativeName}</div>
                  </div>
                  <FiCheck className="check-icon" />
                </MenuItem>
              ))}
            </DropdownMenu>
          </>
        )}
      </AnimatePresence>
      {showCurrency && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: darkMode ? '#fff' : '#333' }}>
            통화 / Currency / 通貨
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleCurrencyChange('JPY')}
              style={{
                padding: '12px 16px',
                border: currentCurrency === 'JPY' ? '2px solid #10b981' : '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: currentCurrency === 'JPY' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
                color: currentCurrency === 'JPY' ? '#10b981' : (darkMode ? '#fff' : '#333'),
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentCurrency === 'JPY' ? '600' : '400',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ¥ 日本円 (JPY)
              {currentCurrency === 'JPY' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
            </button>
            
            <button
              onClick={() => handleCurrencyChange('USD')}
              style={{
                padding: '12px 16px',
                border: currentCurrency === 'USD' ? '2px solid #10b981' : '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: currentCurrency === 'USD' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
                color: currentCurrency === 'USD' ? '#10b981' : (darkMode ? '#fff' : '#333'),
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentCurrency === 'USD' ? '600' : '400',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              $ US Dollar (USD)
              {currentCurrency === 'USD' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
            </button>
            
            <button
              onClick={() => handleCurrencyChange('KRW')}
              style={{
                padding: '12px 16px',
                border: currentCurrency === 'KRW' ? '2px solid #10b981' : '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: currentCurrency === 'KRW' ? (darkMode ? '#065f46' : '#ecfdf5') : (darkMode ? '#374151' : '#fff'),
                color: currentCurrency === 'KRW' ? '#10b981' : (darkMode ? '#fff' : '#333'),
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentCurrency === 'KRW' ? '600' : '400',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ₩ 한국 원 (KRW)
              {currentCurrency === 'KRW' && <span style={{ marginLeft: 'auto', color: '#10b981' }}>✓</span>}
            </button>
          </div>
        </div>
      )}
    </SelectorContainer>
  );
};

export default LanguageSelector;
