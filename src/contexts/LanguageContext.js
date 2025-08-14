import React, { createContext, useContext, useState, useEffect } from 'react';

// Language translations
const translations = {
  ja: {
    // Navigation
    home: 'ホーム',
    schedule: '時間割',
    board: '掲示板',
    map: 'マップ',
    marketplace: '中古取引',
    
    // Common buttons
    back: '戻る',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    delete: '削除',
    edit: '編集',
    add: '追加',
    search: '検索',
    filter: 'フィルター',
    sort: '並び替え',
    more: 'もっと見る',
    close: '閉じる',
    ok: 'OK',
    yes: 'はい',
    no: 'いいえ',
    
    // Common
    back: '戻る',
    close: '閉じる',
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    retry: '再試行',
    success: '成功しました',
    notifications: '通知',
    scrap: 'スクラップ',
    edit: '編集',
    search: '検索',
    filter: 'フィルター',
    settings: '設定',
    notifications: '通知',
    
    // HomePage
    welcomeMessage: 'おかえりなさい',
    todaySchedule: '今日の授業',
    recentNotifications: '最新の通知',
    quickActions: 'クイックアクション',
    noScheduleToday: '今日は授業がありません',
    noNotifications: '通知はありません',
    
    // SchedulePage
    addCourse: '授業追加',
    courseDetail: '授業詳細情報',
    courseReviews: '講義評価',
    shareSchedule: '時間割共有',
    friendsView: '友達表示',
    viewSettings: '表示設定',
    credits: '単位',
    professor: '教授',
    classroom: '講義室',
    capacity: '定員',
    
    // BoardPage
    allBoards: '全ての掲示板',
    freeBoard: '自由掲示板',
    departmentBoard: '学科掲示板',
    jobBoard: '就職掲示板',
    usedItemsBoard: '中古取引掲示板',
    extracurricularBoard: '課外活動掲示板',
    totalPosts: '合計投稿',
    important: '重要',
    announcement: 'お知らせ',
    writeComment: 'コメントを入力してください',
    scrapTitle: 'スクラップした投稿',
    
    // MapPage
    searchLocation: '場所を検索',
    routeSearch: '経路検索',
    startNavigation: '経路案内開始',
    backToMap: '地図に戻る',
    currentLocation: '現在地',
    destination: '目的地',
    
    // MarketplacePage
    sellProduct: '商品出品',
    priceNotification: '価格変動通知',
    searchProducts: '商品を検索',
    allCategories: '全て',
    books: '教科書',
    electronics: '電子機器',
    clothing: '衣類',
    furniture: '家具',
    others: 'その他',
    priceRange: '価格帯',
    condition: '状態',
    contactSeller: '出品者に連絡',
    chatWithSeller: 'チャットする',
    callSeller: '電話する',
    addToWishlist: 'お気に入りに追加',
    sold: '売り切れ',
    available: '販売中',
    
    // Settings
    settings: '設定',
    language: '言語',
    selectLanguage: '言語を選択',
    darkMode: 'ダークモード',
    notifications_settings: '通知設定',
    privacy: 'プライバシー',
    account: 'アカウント',
    profileSettings: 'プロフィール設定',
    profileSettingsDesc: '個人情報と学科情報の管理',
    appSettings: 'アプリ設定',
    darkModeDesc: 'ダークテーマに切り替え',
    notificationsDesc: 'プッシュ通知とメール設定',
    privacyDesc: 'データとプライバシー設定',
    about: 'アプリについて',
    logout: 'ログアウト',
    selectLanguage: '言語を選択',
    
    // Currencies
    currency: '通貨',
    krw: '韓国ウォン (₩)',
    jpy: '日本円 (¥)',
    usd: '米ドル ($)',
    
    // Days of week
    monday: '月',
    tuesday: '火',
    wednesday: '水',
    thursday: '木',
    friday: '金',
    saturday: '土',
    sunday: '日',
    
    // New Features - MyPage
    myPage: 'マイページ',
    profile: 'プロフィール',
    nickname: 'ニックネーム',
    accountSettings: 'アカウント',
    communityRestrictions: 'コミュニティ利用制限',
    informationGuide: '利用案内',
    otherSettings: 'その他',
    
    // Profile Card
    name: '名前',
    school: '学校',
    major: '専攻',
    minor: '副専攻',
    studentId: '学番',
    currentStatus: '現在の状態',
    enrolled: '在学生',
    onLeave: '休学生',
    graduated: '卒業生',
    profileSettings: 'プロフィール設定',
    
    // Profile Settings
    graduateTransition: '卒業生転換',
    departmentSettings: '学科設定',
    departmentSettingsDesc: '多専攻の場合、学科は最大3個まで登録可能です。学科を設定すると120日間変更できません。',
    searchDepartment: '学科名を検索してください',
    profilePhotoChange: 'プロフィール写真変更',
    academicRecords: '学籍処理内歴',
    enrollmentVerificationSuccess: '在学生認証成功',
    
    // Nickname Settings
    nicknameChange: 'ニックネーム変更',
    
    // Account Settings
    userId: 'ユーザーID',
    passwordChange: 'パスワード変更',
    newPassword: '新しいパスワード',
    confirmNewPassword: '新しいパスワード確認',
    currentPassword: '現在のパスワード',
    passwordRequirements: '英文、数字、特殊文字が2種類以上組み合わされた8~20文字',
    emailChange: 'メール変更',
    
    // Community Restrictions
    noRestrictions: '利用制限内容がありません',
    
    // Information Guide
    appVersion: 'アプリバージョン',
    faq: 'よくある質問',
    myAccount: 'マイアカウント',
    schoolVerification: '学校認証',
    timetable: '時間表',
    communityUsage: 'コミュニティ利用',
    announcements: 'お知らせ',
    contact: 'お問い合わせ',
    
    // FAQ Questions
    faqSchoolChange: '学校・キャンパスが変わったのですが変更できませんか？',
    
    // Other Settings
    privacyConsent: '情報同意設定',
    advertisingConsent: '広告性情報受信同意',
    personalInfoConsent: '個人情報収集及び利用同意',
    accountDeletion: '会員退会',
    
    // School/Department Selection
    selectSchool: '学校選択',
    selectDepartment: '学部選択',
    searchSchool: '学校を検索',
    searchDepartmentName: '学部名を検索',
    
    // Clubs & Societies
    clubsAndSocieties: '学会及び動アリ',
    officialClubs: '公式承認学会・動アリ',
    interestedClubs: '関心学会',
    interestedSocieties: '関心動アリ',
    scrapClub: '学会スクラップ',
    clubActivities: '学会活動'
  },
  
  en: {
    // Navigation
    home: 'Home',
    schedule: 'Schedule',
    board: 'Board',
    map: 'Map',
    marketplace: 'Marketplace',
    
    // Common buttons
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    more: 'More',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    
    // Common
    back: 'Back',
    close: 'Close',
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    success: 'Success',
    notifications: 'Notifications',
    scrap: 'Bookmarks',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    settings: 'Settings',
    notifications: 'Notifications',
    
    // HomePage
    welcomeMessage: 'Welcome back',
    todaySchedule: "Today's Classes",
    recentNotifications: 'Recent Notifications',
    quickActions: 'Quick Actions',
    noScheduleToday: 'No classes today',
    noNotifications: 'No notifications',
    
    // SchedulePage
    addCourse: 'Add Course',
    courseDetail: 'Course Details',
    courseReviews: 'Course Reviews',
    shareSchedule: 'Share Schedule',
    friendsView: 'Friends View',
    viewSettings: 'View Settings',
    credits: 'Credits',
    professor: 'Professor',
    classroom: 'Classroom',
    capacity: 'Capacity',
    
    // BoardPage
    allBoards: 'All Boards',
    freeBoard: 'Free Board',
    departmentBoard: 'Department Board',
    jobBoard: 'Job Board',
    usedItemsBoard: 'Used Items Board',
    extracurricularBoard: 'Extracurricular Board',
    totalPosts: 'Total Posts',
    important: 'Important',
    announcement: 'Announcement',
    writeComment: 'Write a comment...',
    scrapTitle: 'Scrapped Posts',
    
    // MapPage
    searchLocation: 'Search location',
    routeSearch: 'Route Search',
    startNavigation: 'Start Navigation',
    backToMap: 'Back to Map',
    currentLocation: 'Current Location',
    destination: 'Destination',
    
    // MarketplacePage
    sellProduct: 'Sell Product',
    priceNotification: 'Price Alerts',
    searchProducts: 'Search products',
    allCategories: 'All',
    books: 'Books',
    electronics: 'Electronics',
    clothing: 'Clothing',
    furniture: 'Furniture',
    others: 'Others',
    priceRange: 'Price Range',
    condition: 'Condition',
    contactSeller: 'Contact Seller',
    chatWithSeller: 'Chat',
    callSeller: 'Call',
    addToWishlist: 'Add to Wishlist',
    sold: 'Sold',
    available: 'Available',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    selectLanguage: 'Select Language',
    darkMode: 'Dark Mode',
    notifications_settings: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    profileSettings: 'Profile Settings',
    profileSettingsDesc: 'Manage personal and academic information',
    appSettings: 'App Settings',
    darkModeDesc: 'Switch to dark theme',
    notificationsDesc: 'Push notifications and email settings',
    privacyDesc: 'Data and privacy settings',
    about: 'About',
    logout: 'Logout',
    selectLanguage: 'Select Language',
    
    // Currencies
    currency: 'Currency',
    krw: 'Korean Won (₩)',
    jpy: 'Japanese Yen (¥)',
    usd: 'US Dollar ($)',
    
    // Days of week
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun'
  },
  
  ko: {
    // Navigation
    home: '홈',
    schedule: '시간표',
    board: '게시판',
    map: '지도',
    marketplace: '중고거래',
    
    // Common buttons
    back: '뒤로',
    cancel: '취소',
    confirm: '확인',
    save: '저장',
    delete: '삭제',
    edit: '편집',
    add: '추가',
    search: '검색',
    filter: '필터',
    sort: '정렬',
    more: '더보기',
    close: '닫기',
    ok: '확인',
    yes: '예',
    no: '아니오',
    
    // Common
    back: '뒤로',
    close: '닫기',
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    success: '성공했습니다',
    
    // HomePage
    welcomeMessage: '안녕하세요',
    todaySchedule: '오늘의 수업',
    recentNotifications: '최근 알림',
    quickActions: '빠른 작업',
    noScheduleToday: '오늘은 수업이 없습니다',
    noNotifications: '알림이 없습니다',
    
    // SchedulePage
    addCourse: '과목 추가',
    courseDetail: '수업 상세정보',
    courseReviews: '강의평가',
    shareSchedule: '시간표 공유',
    friendsView: '친구 보기',
    viewSettings: '보기 설정',
    credits: '학점',
    professor: '교수',
    classroom: '강의실',
    capacity: '정원',
    
    // BoardPage
    allBoards: '전체 게시판',
    freeBoard: '자유게시판',
    departmentBoard: '학과게시판',
    jobBoard: '취업게시판',
    usedItemsBoard: '중고거래게시판',
    extracurricularBoard: '동아리게시판',
    totalPosts: '총 게시글',
    important: '중요',
    announcement: '공지사항',
    writeComment: '댓글을 입력하세요',
    scrapTitle: '스크랩한 글',
    
    // MapPage
    searchLocation: '장소 검색',
    routeSearch: '길찾기',
    startNavigation: '길안내 시작',
    backToMap: '지도로 돌아가기',
    currentLocation: '현재 위치',
    destination: '목적지',
    
    // MarketplacePage
    sellProduct: '상품 판매',
    priceNotification: '가격 알림',
    searchProducts: '상품 검색',
    allCategories: '전체',
    books: '교재',
    electronics: '전자기기',
    clothing: '의류',
    furniture: '가구',
    others: '기타',
    priceRange: '가격대',
    condition: '상태',
    contactSeller: '판매자 연락',
    chatWithSeller: '채팅하기',
    callSeller: '전화하기',
    addToWishlist: '관심상품 추가',
    sold: '판매완료',
    available: '판매중',
    
    // Settings
    settings: '설정',
    language: '언어',
    selectLanguage: '언어 선택',
    darkMode: '다크 모드',
    notifications_settings: '알림 설정',
    privacy: '개인정보',
    account: '계정',
    profileSettings: '프로필 설정',
    profileSettingsDesc: '개인정보 및 학과정보 관리',
    appSettings: '앱 설정',
    darkModeDesc: '다크 테마로 전환',
    notificationsDesc: '푸시 알림 및 이메일 설정',
    privacyDesc: '데이터 및 개인정보 설정',
    about: '앱 정보',
    logout: '로그아웃',
    selectLanguage: '언어 선택',
    
    // Currencies
    currency: '통화',
    krw: '한국 원 (₩)',
    jpy: '일본 엔 (¥)',
    usd: '미국 달러 ($)',
    
    // Days of week
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    sunday: '일'
  }
};

// Currency conversion rates (mock data - in real app, fetch from API)
const currencyRates = {
  KRW: { JPY: 0.11, USD: 0.00075 },
  JPY: { KRW: 9.1, USD: 0.0067 },
  USD: { KRW: 1330, JPY: 149 }
};

const currencySymbols = {
  KRW: '₩',
  JPY: '¥',
  USD: '$'
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('campuslink_language');
    console.log('Initial language from localStorage:', savedLanguage);
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'ja';
  });
  
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem('campuslink_currency');
    console.log('Initial currency from localStorage:', savedCurrency);
    return savedCurrency && currencySymbols[savedCurrency] ? savedCurrency : 'JPY';
  });

  // Remove updateTrigger as it causes infinite loops
  // Debug log current state
  useEffect(() => {
    console.log('LanguageContext state changed:', { currentLanguage, currentCurrency });
  }, [currentLanguage, currentCurrency]);

  const changeLanguage = (languageCode) => {
    console.log('LanguageContext: Changing language from', currentLanguage, 'to', languageCode);
    if (translations[languageCode]) {
      // Auto-set currency based on language
      let newCurrency = 'JPY';
      if (languageCode === 'ja') {
        newCurrency = 'JPY';
      } else if (languageCode === 'en') {
        newCurrency = 'USD';
      } else if (languageCode === 'ko') {
        newCurrency = 'KRW';
      }
      
      // Update state immediately
      setCurrentLanguage(languageCode);
      setCurrentCurrency(newCurrency);
      
      // Save to localStorage
      localStorage.setItem('campuslink_language', languageCode);
      localStorage.setItem('campuslink_currency', newCurrency);
      
      console.log('Language changed successfully:', { language: languageCode, currency: newCurrency });
    }
  };

  const changeCurrency = (currencyCode) => {
    console.log('LanguageContext: Changing currency from', currentCurrency, 'to', currencyCode);
    if (currencySymbols[currencyCode]) {
      setCurrentCurrency(currencyCode);
      localStorage.setItem('campuslink_currency', currencyCode);
      console.log('Currency changed successfully:', currencyCode);
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const formatPrice = (price, fromCurrency = 'KRW') => {
    let convertedPrice = price;
    
    if (fromCurrency !== currentCurrency) {
      const rate = currencyRates[fromCurrency]?.[currentCurrency];
      if (rate) {
        convertedPrice = Math.round(price * rate);
      }
    }
    
    const symbol = currencySymbols[currentCurrency];
    
    // Format number with commas
    const formattedNumber = convertedPrice.toLocaleString();
    
    return `${symbol}${formattedNumber}`;
  };

  const getCurrencySymbol = () => {
    return currencySymbols[currentCurrency];
  };

  const getAvailableLanguages = () => {
    return [
      { code: 'ja', name: '日本語', nativeName: '日本語' },
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ko', name: '한국어', nativeName: '한국어' }
    ];
  };

  const getAvailableCurrencies = () => {
    return [
      { code: 'JPY', name: t('jpy'), symbol: '¥' },
      { code: 'USD', name: t('usd'), symbol: '$' },
      { code: 'KRW', name: t('krw'), symbol: '₩' }
    ];
  };

  const value = {
    currentLanguage,
    currentCurrency,
    changeLanguage,
    changeCurrency,
    t,
    formatPrice,
    getCurrencySymbol,
    getAvailableLanguages,
    getAvailableCurrencies
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
