import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.darkMode ? 'white' : 'black'};
  min-height: 100vh;
`;

const BoardPageSimple = ({ darkMode = false }) => {
  const [message, setMessage] = useState('BoardPage가 정상적으로 로드되었습니다!');

  return (
    <Container darkMode={darkMode}>
      <h1>게시판 페이지 테스트</h1>
      <p>{message}</p>
      <button onClick={() => setMessage('버튼이 클릭되었습니다!')}>
        테스트 버튼
      </button>
    </Container>
  );
};

export default BoardPageSimple;
