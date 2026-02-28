window.III_STORAGE_KEY = 'iii_homepage_content_v1';
window.III_ADMIN_PASSWORD_KEY = 'iii_admin_password_v1';
window.III_DEFAULT_ADMIN_PASSWORD = 'iset2026!';
window.III_ADMIN_UI_VERSION = 'admin-ui-2026-02-27-1';
window.III_DEFAULT_DATA = {
  brandNameKor: '아이셋',
  brandNameEng: 'iii',
  logoUrl: 'https://images.unsplash.com/photo-1581579438747-104c53d6fbc8?auto=format&fit=crop&w=300&q=80',
  heroTitle: 'Set for us, I set',
  heroSubtitle:
    '15년 생활용품 기획자의 노하우로, 우리 가족에게 가장 필요한 일상 솔루션을 설계하는 브랜드 아이셋(iii)입니다.',
  heroCardText:
    '신뢰를 쌓는 브랜드는 디테일에서 시작합니다. 아이셋은 사용자의 생활 맥락을 분석해 오래 쓰기 좋은 제품을 만듭니다.',
  brandEssence:
    '아이셋은 “우리 가족을 위한 최적의 세팅”을 브랜드의 중심 가치로 둡니다. 단순히 제품을 판매하는 것이 아니라, 생활의 불편을 줄이고 건강한 습관을 만드는 솔루션을 기획합니다.',
  trustPoints: [
    '생활용품 기획 15년 경력 기반의 제품 설계',
    '사용 환경을 고려한 사이즈/컬러 세분화',
    '스마트스토어·SNS를 통한 투명한 소통'
  ],
  productCategories: [
    {
      name: '가습마스크',
      items: ['일상용 보습형', '수면/휴식용 보습형']
    },
    {
      name: 'KF-94',
      items: ['대형 (컬러별)', '중형 (컬러별)', '소형 (컬러별)', '초소형 (컬러별)']
    },
    {
      name: 'KF AD',
      items: ['대형 (화이트)', '중형 (화이트)', '소형 (화이트)', '초소형 (화이트)']
    }
  ],
  lookbook: [
    {
      title: 'Daily Setting',
      image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=1000&q=80',
      description: '차분한 톤의 일상 룩에 어울리는 마스크 스타일링'
    },
    {
      title: 'Family Ready',
      image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?auto=format&fit=crop&w=1000&q=80',
      description: '가족 구성원별 사이즈 제안으로 편안한 착용감'
    },
    {
      title: 'Clean White',
      image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1000&q=80',
      description: 'KF AD 화이트 라인의 깔끔한 무드'
    }
  ],
  lookbookInstagramTags: ['iset', '아이셋', 'setforus'],
  lookbookMode: 'manual',
  links: {
    smartstore: 'https://smartstore.naver.com/iii_setting',
    instagram: 'https://www.instagram.com/iset_setforus',
    blog: 'https://blog.naver.com/iset_iii'
  }
};

window.loadIIIData = function loadIIIData() {
  const stored = localStorage.getItem(window.III_STORAGE_KEY);
  if (!stored) return structuredClone(window.III_DEFAULT_DATA);
  try {
    return { ...structuredClone(window.III_DEFAULT_DATA), ...JSON.parse(stored) };
  } catch {
    return structuredClone(window.III_DEFAULT_DATA);
  }
};

window.saveIIIData = function saveIIIData(content) {
  localStorage.setItem(window.III_STORAGE_KEY, JSON.stringify(content));
};

window.loadAdminPassword = function loadAdminPassword() {
  return localStorage.getItem(window.III_ADMIN_PASSWORD_KEY) || window.III_DEFAULT_ADMIN_PASSWORD;
};

window.saveAdminPassword = function saveAdminPassword(password) {
  localStorage.setItem(window.III_ADMIN_PASSWORD_KEY, password);
};
