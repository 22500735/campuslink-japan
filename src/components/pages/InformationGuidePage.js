import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHelpCircle, FiChevronDown, FiChevronUp, FiUser, FiShield, FiCalendar, FiMessageSquare, FiBell } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const InformationGuideContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.darkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.darkMode ? '#fff' : '#333'};
  padding-bottom: 100px;
`;

const Header = styled.div`
  background: ${props => props.darkMode ? '#2d2d2d' : 'linear-gradient(135deg, #00A86B 0%, #20B2AA 100%)'};
  padding: 60px 20px 30px;
  color: white;
  position: relative;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.5)' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const CategoryCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.1'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  padding: 20px;
  background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  border-bottom: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon {
    width: 24px;
    height: 24px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
  }
  
  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
`;

const FAQItem = styled.div`
  border-bottom: ${props => props.isLast ? 'none' : `1px solid ${props.darkMode ? '#404040' : '#f0f0f0'}`};
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background: transparent;
  color: ${props => props.darkMode ? '#fff' : '#333'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    background: ${props => props.darkMode ? 'rgba(0, 168, 107, 0.1)' : 'rgba(0, 168, 107, 0.05)'};
  }
  
  .question-text {
    font-size: 16px;
    font-weight: 600;
    flex: 1;
    margin-right: 16px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
    color: ${props => props.darkMode ? '#4ade80' : '#00A86B'};
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 20px 20px;
  color: ${props => props.darkMode ? '#d1d5db' : '#666'};
  line-height: 1.6;
  font-size: 15px;
`;

const AnnouncementCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  padding: 20px;
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
  }
  
  .date {
    font-size: 14px;
    color: ${props => props.darkMode ? '#9ca3af' : '#666'};
  }
`;

const AnnouncementContent = styled.p`
  font-size: 14px;
  color: ${props => props.darkMode ? '#d1d5db' : '#666'};
  line-height: 1.5;
  margin: 0;
`;

const InformationGuidePage = ({ onBack, darkMode }) => {
  const { t } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      id: 'account',
      title: t('myAccount'),
      icon: FiUser,
      faqs: [
        {
          id: 1,
          question: t('faqSchoolChange'),
          answer: '学校・キャンパス変更は学生証明書 제출 후 관리자 승인이 필요합니다. 설정 > 프로필 설정에서 신청할 수 있습니다.'
        },
        {
          id: 2,
          question: 'アカウントを削除したいのですが？',
          answer: 'マイページ > その他 > 会員退会에서 계정 삭제를 신청할 수 있습니다. 삭제된 데이터는 복구할 수 없으니 신중히 결정해주세요.'
        }
      ]
    },
    {
      id: 'verification',
      title: t('schoolVerification'),
      icon: FiShield,
      faqs: [
        {
          id: 3,
          question: '学生認証はどのように行いますか？',
          answer: '학생증 사진 또는 재학증명서를 업로드하여 인증할 수 있습니다. 인증은 보통 1-2일 소요됩니다.'
        },
        {
          id: 4,
          question: '認証が拒否されました。なぜですか？',
          answer: '서류가 불분명하거나 정보가 일치하지 않을 경우 거부될 수 있습니다. 다시 명확한 서류로 신청해주세요.'
        }
      ]
    },
    {
      id: 'timetable',
      title: t('timetable'),
      icon: FiCalendar,
      faqs: [
        {
          id: 5,
          question: '時間割に授業を追加できません',
          answer: '수업 검색에서 정확한 과목명이나 과목코드로 검색해보세요. 그래도 없다면 관리자에게 문의해주세요.'
        },
        {
          id: 6,
          question: '友達の時間割が見えません',
          answer: '친구가 시간표 공개 설정을 해야 볼 수 있습니다. 친구에게 설정 확인을 요청해보세요.'
        }
      ]
    },
    {
      id: 'community',
      title: t('communityUsage'),
      icon: FiMessageSquare,
      faqs: [
        {
          id: 7,
          question: '게시글을 삭제하고 싶습니다',
          answer: '본인이 작성한 게시글은 게시글 상세페이지에서 삭제할 수 있습니다. 다른 사람의 게시글은 신고 기능을 이용해주세요.'
        },
        {
          id: 8,
          question: 'コメントが制限されました',
          answer: '부적절한 내용으로 인해 일시적으로 제한될 수 있습니다. 제한 기간은 마이페이지에서 확인할 수 있습니다.'
        }
      ]
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'アプリ バージョン 8.1.31 업데이트',
      content: '새로운 기능과 버그 수정이 포함된 업데이트가 배포되었습니다.',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: '서버 점검 안내',
      content: '3월 20일 오전 2시-4시 서버 점검이 예정되어 있습니다.',
      date: '2024-03-12'
    },
    {
      id: 3,
      title: '새로운 학교 추가',
      content: '와세다대학교가 새롭게 추가되었습니다.',
      date: '2024-03-10'
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <InformationGuideContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <BackButton darkMode={darkMode} onClick={onBack}>
            <FiArrowLeft size={20} />
          </BackButton>
          <HeaderTitle>{t('contact')}</HeaderTitle>
        </HeaderTop>
      </Header>

      <ContentSection>
        {/* FAQ Section */}
        {faqCategories.map(category => (
          <CategoryCard key={category.id} darkMode={darkMode}>
            <CategoryHeader darkMode={darkMode}>
              <category.icon className="icon" />
              <div className="title">{category.title}</div>
            </CategoryHeader>
            
            {category.faqs.map((faq, index) => (
              <FAQItem key={faq.id} darkMode={darkMode} isLast={index === category.faqs.length - 1}>
                <FAQQuestion
                  darkMode={darkMode}
                  isOpen={openFAQ === faq.id}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="question-text">{faq.question}</div>
                  {openFAQ === faq.id ? <FiChevronUp className="icon" /> : <FiChevronDown className="icon" />}
                </FAQQuestion>
                
                {openFAQ === faq.id && (
                  <FAQAnswer
                    darkMode={darkMode}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </FAQItem>
            ))}
          </CategoryCard>
        ))}

        {/* Announcements Section */}
        <CategoryCard darkMode={darkMode}>
          <CategoryHeader darkMode={darkMode}>
            <FiBell className="icon" />
            <div className="title">{t('announcements')}</div>
          </CategoryHeader>
          
          <div style={{ padding: '20px' }}>
            {announcements.map(announcement => (
              <AnnouncementCard key={announcement.id} darkMode={darkMode}>
                <AnnouncementHeader darkMode={darkMode}>
                  <div className="title">{announcement.title}</div>
                  <div className="date">{announcement.date}</div>
                </AnnouncementHeader>
                <AnnouncementContent darkMode={darkMode}>
                  {announcement.content}
                </AnnouncementContent>
              </AnnouncementCard>
            ))}
          </div>
        </CategoryCard>
      </ContentSection>
    </InformationGuideContainer>
  );
};

export default InformationGuidePage;
