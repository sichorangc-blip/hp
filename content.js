let currentPostIndex = 0;

function getCandidatePostLinks() {
  const selectors = [
    'a.title_link',
    'a.api_txt_lines.total_tit',
    'a.sh_blog_title',
    'a[href*="blog.naver.com"]'
  ];

  const links = new Set();
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((anchor) => {
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.href || '';
      if (!href) return;
      if (!href.includes('blog.naver.com') && !href.includes('m.blog.naver.com')) return;
      links.add(href);
    });
  });

  return [...links];
}

function isSearchPage() {
  return location.hostname.includes('search.naver.com');
}

function openNextPost() {
  if (!isSearchPage()) {
    alert('이 기능은 네이버 검색 결과 페이지에서 사용해 주세요.');
    return;
  }

  const postLinks = getCandidatePostLinks();
  if (postLinks.length === 0) {
    alert('열 수 있는 블로그 포스팅 링크를 찾지 못했습니다.');
    return;
  }

  const target = postLinks[currentPostIndex % postLinks.length];
  currentPostIndex += 1;
  window.open(target, '_blank', 'noopener,noreferrer');
}

function addHighlightStyle() {
  if (document.getElementById('nbh-highlight-style')) return;
  const style = document.createElement('style');
  style.id = 'nbh-highlight-style';
  style.textContent = `
    .nbh-highlight {
      outline: 3px solid #03c75a !important;
      box-shadow: 0 0 0 3px rgba(3, 199, 90, 0.25) !important;
      border-radius: 8px !important;
      transition: outline-color 0.2s ease;
    }
  `;
  document.head.appendChild(style);
}

function highlightInteractionButtons() {
  addHighlightStyle();
  const selectors = [
    'button[aria-label*="댓글"]',
    'a[aria-label*="댓글"]',
    'button[class*="comment"]',
    'a[class*="comment"]',
    'button[aria-label*="이웃"]',
    'a[aria-label*="이웃"]',
    'button[class*="buddy"]',
    'a[class*="buddy"]'
  ];

  let count = 0;
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('nbh-highlight');
      count += 1;
    });
  });

  if (count === 0) {
    alert('댓글/이웃 관련 버튼을 찾지 못했습니다. 페이지를 스크롤한 뒤 다시 시도해 주세요.');
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (!message?.type) return;

  if (message.type === 'OPEN_NEXT_POST') {
    openNextPost();
  }

  if (message.type === 'HIGHLIGHT_INTERACTION_BUTTONS') {
    highlightInteractionButtons();
  }
});
