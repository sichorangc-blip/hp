const $ = (selector) => document.querySelector(selector);

const keywordInput = $('#keyword');
const commentTemplateInput = $('#commentTemplate');

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendMessageToActiveTab(message) {
  const tab = await getActiveTab();
  if (!tab?.id) return;
  await chrome.tabs.sendMessage(tab.id, message).catch(() => undefined);
}

async function loadState() {
  const { keyword = '', commentTemplate = '' } = await chrome.storage.local.get([
    'keyword',
    'commentTemplate'
  ]);
  keywordInput.value = keyword;
  commentTemplateInput.value = commentTemplate;
}

async function saveState() {
  await chrome.storage.local.set({
    keyword: keywordInput.value.trim(),
    commentTemplate: commentTemplateInput.value.trim()
  });
}

$('#searchBtn').addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  await saveState();

  if (!keyword) {
    alert('키워드를 입력해 주세요.');
    return;
  }

  const url = `https://search.naver.com/search.naver?where=blog&query=${encodeURIComponent(keyword)}`;
  await chrome.tabs.create({ url });
});

$('#saveTemplateBtn').addEventListener('click', async () => {
  await saveState();
  alert('템플릿을 저장했습니다.');
});

$('#copyTemplateBtn').addEventListener('click', async () => {
  const template = commentTemplateInput.value.trim();
  if (!template) {
    alert('복사할 템플릿이 없습니다.');
    return;
  }
  await navigator.clipboard.writeText(template);
  await saveState();
  alert('템플릿을 클립보드에 복사했습니다.');
});

$('#openNextBtn').addEventListener('click', async () => {
  await saveState();
  await sendMessageToActiveTab({ type: 'OPEN_NEXT_POST' });
});

$('#highlightBtn').addEventListener('click', async () => {
  await saveState();
  await sendMessageToActiveTab({ type: 'HIGHLIGHT_INTERACTION_BUTTONS' });
});

loadState();
