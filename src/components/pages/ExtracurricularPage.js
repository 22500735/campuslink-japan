import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBriefcase, FiExternalLink, FiPlus, FiMapPin, FiCalendar, FiUsers, FiDollarSign, FiClock, FiBookOpen, FiAward } from 'react-icons/fi';

const ExtracurricularContainer = styled.div`
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
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.3);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const AddButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const TabSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#00A86B' : (props.darkMode ? '#2d2d2d' : 'white')};
  color: ${props => props.active ? 'white' : (props.darkMode ? '#fff' : '#333')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#008f5a' : (props.darkMode ? '#404040' : '#f5f5f5')};
  }
`;

const ActivityCard = styled(motion.div)`
  background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.darkMode ? '0.3' : '0.08'});
  border: 1px solid ${props => props.darkMode ? '#404040' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.darkMode ? '0.4' : '0.12'});
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  
  .left {
    flex: 1;
  }
  
  .category {
    background: ${props => props.type === 'job' ? '#3742fa' : props.type === 'internship' ? '#2ed573' : props.type === 'volunteer' ? '#ff6b6b' : '#00A86B'};
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
  }
  
  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 4px;
    line-height: 1.3;
  }
  
  .company {
    color: ${props => props.darkMode ? '#00A86B' : '#00A86B'};
    font-weight: 600;
    font-size: 14px;
  }
  
  .actions {
    display: flex;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: ${props => props.variant === 'external' ? '#3742fa' : 'rgba(0, 168, 107, 0.1)'};
  color: ${props => props.variant === 'external' ? 'white' : '#00A86B'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.variant === 'external' ? '#2f37d9' : 'rgba(0, 168, 107, 0.2)'};
  }
`;

const ActivityContent = styled.div`
  margin-bottom: 16px;
  
  .description {
    color: ${props => props.darkMode ? '#ccc' : '#666'};
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  
  .detail {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${props => props.darkMode ? '#aaa' : '#666'};
    
    .icon {
      color: #00A86B;
    }
    
    .label {
      font-weight: 600;
    }
  }
`;

const RecruitmentCard = styled(ActivityCard)`
  border-left: 4px solid #00A86B;
`;

const ApplicationSection = styled.div`
  background: ${props => props.darkMode ? '#404040' : '#f8f9fa'};
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  
  .title {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.darkMode ? '#fff' : '#333'};
    margin-bottom: 12px;
  }
  
  .requirements {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .requirement {
    background: ${props => props.darkMode ? '#2d2d2d' : 'white'};
    color: ${props => props.darkMode ? '#fff' : '#333'};
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    border: 1px solid ${props => props.darkMode ? '#555' : '#ddd'};
  }
  
  .apply-button {
    width: 100%;
    background: #00A86B;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #008f5a;
    }
  }
`;

const ExtracurricularPage = ({ onBack, darkMode }) => {
  const [activeTab, setActiveTab] = useState('external');

  const externalActivities = [
    {
      id: 1,
      type: 'job',
      category: '新入社員採用',
      title: '2025年4月ネイバー新入社員採用',
      company: 'ネイバー',
      description: 'さまざまな分野の新入社員を募集します。革新的な技術で世界を変える人材を探しています。',
      location: '판교',
      deadline: '2025年3月31日',
      salary: '新入社員年俸5000万円~',
      experience: '新入社員/経験無',
      externalUrl: 'https://recruit.navercorp.com'
    },
    {
      id: 2,
      type: 'internship',
      category: 'インターンシップ',
      title: '카카오 2025下学期インターンシップ',
      company: '카카오',
      description: '実務経験を通じて成長することができる機会を提供します。さまざまなプロジェクトに参加して、実際のサービス開発経験を積むことができます。',
      location: '판교',
      deadline: '2025年4月15日',
      duration: '2ヶ月',
      experience: '재학생',
      externalUrl: 'https://careers.kakao.com'
    },
    {
      id: 3,
      type: 'volunteer',
      category: 'ボランティア',
      title: '地元の子供たちの学習を助けるために、大学生のボランティアを募集中です。教育に興味のある皆さん、ぜひ参加してください。',
      company: '清潭구 自然ボランティアセンター',
      description: '地元の子供たちの学習を助けるために、大学生のボランティアを募集中です。教育に興味のある皆さん、ぜひ参加してください。',
      location: '清潭구',
      deadline: '常時募集中',
      time: '週2回、2時間',
      experience: '大学生',
      externalUrl: 'https://volunteer.go.kr'
    }
  ];

  const internalRecruitments = [
    {
      id: 1,
      type: 'study',
      category: 'スタディ',
      title: 'コーディングテスト対策アルゴリズムスタディ',
      organizer: 'コンピュータ工学部3年生',
      description: '就職を 위한コーディングテスト対策スタディです。毎週問題を解いて互いにレビューして、スキルを向上させます。',
      requirements: ['プログラミング基礎', '誠実な参加', '週1回の集まり可能'],
      participants: '4/8名',
      schedule: '毎週土曜日午後2時',
      location: '中央図書館スタディルーム',
      contact: 'study2025@university.ac.kr'
    },
    {
      id: 2,
      type: 'project',
      category: 'プロジェクト',
      title: '創業アイデア開発チームメンバー募集中',
      organizer: '経営学部4年生',
      description: '革新的なアプリサービスの開発を目的としたチームメンバーを募集中です。企画、開発、デザイン分野の熱意のあるチームメンバーを探しています。',
      requirements: ['関連専攻または経験', '創業への興味', '6ヶ月以上の参加可能'],
      participants: '3/6名',
      schedule: '週2回ミーティング',
      location: '創業支援センター',
      contact: 'startup2025@university.ac.kr'
    }
  ];

  const handleExternalLink = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const tabs = [
    { key: 'external', label: '外部採用情報' },
    { key: 'internal', label: '校内募集' }
  ];

  return (
    <ExtracurricularContainer darkMode={darkMode}>
      <Header darkMode={darkMode}>
        <HeaderTop>
          <HeaderLeft>
            <BackButton onClick={onBack}>
              <FiArrowLeft size={20} />
            </BackButton>
            <HeaderTitle>過외活動・採用情報</HeaderTitle>
          </HeaderLeft>
          {activeTab === 'internal' && (
            <AddButton>
              <FiPlus size={16} />
              招募文章を書く
            </AddButton>
          )}
        </HeaderTop>
      </Header>

      <ContentSection>
        <TabSection>
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              active={activeTab === tab.key}
              darkMode={darkMode}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabSection>

        {activeTab === 'external' && (
          <>
            {externalActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                darkMode={darkMode}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ActivityHeader darkMode={darkMode} type={activity.type}>
                  <div className="left">
                    <span className="category">{activity.category}</span>
                    <div className="title">{activity.title}</div>
                    <div className="company">{activity.company}</div>
                  </div>
                  <div className="actions">
                    <ActionButton 
                      variant="external"
                      onClick={(e) => handleExternalLink(activity.externalUrl, e)}
                      title="外部リンクへ移動"
                    >
                      <FiExternalLink size={16} />
                    </ActionButton>
                  </div>
                </ActivityHeader>
                
                <ActivityContent darkMode={darkMode}>
                  <div className="description">{activity.description}</div>
                  
                  <div className="details">
                    <div className="detail">
                      <FiMapPin className="icon" size={14} />
                      <span className="label">場所:</span>
                      <span>{activity.location}</span>
                    </div>
                    <div className="detail">
                      <FiCalendar className="icon" size={14} />
                      <span className="label">締切日:</span>
                      <span>{activity.deadline}</span>
                    </div>
                    {activity.salary && (
                      <div className="detail">
                        <FiDollarSign className="icon" size={14} />
                        <span className="label">給与:</span>
                        <span>{activity.salary}</span>
                      </div>
                    )}
                    {activity.duration && (
                      <div className="detail">
                        <FiClock className="icon" size={14} />
                        <span className="label">期間:</span>
                        <span>{activity.duration}</span>
                      </div>
                    )}
                    {activity.time && (
                      <div className="detail">
                        <FiClock className="icon" size={14} />
                        <span className="label">時間:</span>
                        <span>{activity.time}</span>
                      </div>
                    )}
                    <div className="detail">
                      <FiAward className="icon" size={14} />
                      <span className="label">資格:</span>
                      <span>{activity.experience}</span>
                    </div>
                  </div>
                </ActivityContent>
              </ActivityCard>
            ))}
          </>
        )}

        {activeTab === 'internal' && (
          <>
            {internalRecruitments.map((recruitment) => (
              <RecruitmentCard
                key={recruitment.id}
                darkMode={darkMode}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ActivityHeader darkMode={darkMode} type={recruitment.type}>
                  <div className="left">
                    <span className="category">{recruitment.category}</span>
                    <div className="title">{recruitment.title}</div>
                    <div className="company">{recruitment.organizer}</div>
                  </div>
                </ActivityHeader>
                
                <ActivityContent darkMode={darkMode}>
                  <div className="description">{recruitment.description}</div>
                  
                  <div className="details">
                    <div className="detail">
                      <FiUsers className="icon" size={14} />
                      <span className="label">募集人数:</span>
                      <span>{recruitment.participants}</span>
                    </div>
                    <div className="detail">
                      <FiCalendar className="icon" size={14} />
                      <span className="label">日程:</span>
                      <span>{recruitment.schedule}</span>
                    </div>
                    <div className="detail">
                      <FiMapPin className="icon" size={14} />
                      <span className="label">場所:</span>
                      <span>{recruitment.location}</span>
                    </div>
                  </div>
                </ActivityContent>

                <ApplicationSection darkMode={darkMode}>
                  <div className="title">応募要件</div>
                  <div className="requirements">
                    {recruitment.requirements.map((req, index) => (
                      <span key={index} className="requirement">{req}</span>
                    ))}
                  </div>
                  <button className="apply-button">
                    応募する ({recruitment.contact})
                  </button>
                </ApplicationSection>
              </RecruitmentCard>
            ))}
          </>
        )}
      </ContentSection>
    </ExtracurricularContainer>
  );
};

export default ExtracurricularPage;
