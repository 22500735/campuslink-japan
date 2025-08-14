import React from 'react';

const BoardPageTest = ({ darkMode = false }) => {
  return (
    <div style={{ 
      padding: '20px', 
      background: darkMode ? '#1a1a1a' : '#f5f5f5',
      color: darkMode ? 'white' : 'black',
      minHeight: '100vh'
    }}>
      <h1>BoardPage Test</h1>
      <p>이 페이지가 보이면 기본적인 렌더링은 작동하고 있습니다.</p>
    </div>
  );
};

export default BoardPageTest;
