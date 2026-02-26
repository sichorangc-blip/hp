const ADMIN_PASSWORD = 'iset2026!';
const $ = (selector) => document.querySelector(selector);

let content = window.loadIIIData();

function populateAdminForm() {
  $('#inputHeroSubtitle').value = content.heroSubtitle;
  $('#inputEssence').value = content.brandEssence;
  $('#inputLogo').value = content.logoUrl;
  $('#inputTrust').value = content.trustPoints.join('\n');
  $('#inputProducts').value = JSON.stringify(content.productCategories, null, 2);
  $('#inputLookbook').value = JSON.stringify(content.lookbook, null, 2);
}

function openAdminPanel() {
  populateAdminForm();
  $('#adminPanel').classList.remove('hidden');
}

function closeLoginModal() {
  $('#loginModal').classList.add('hidden');
}

$('#loginBtn').addEventListener('click', () => {
  if ($('#adminPassword').value === ADMIN_PASSWORD) {
    closeLoginModal();
    openAdminPanel();
  } else {
    $('#loginError').textContent = '비밀번호가 올바르지 않습니다.';
  }
});

$('#saveBtn').addEventListener('click', () => {
  try {
    content.heroSubtitle = $('#inputHeroSubtitle').value.trim();
    content.brandEssence = $('#inputEssence').value.trim();
    content.logoUrl = $('#inputLogo').value.trim() || window.III_DEFAULT_DATA.logoUrl;
    content.trustPoints = $('#inputTrust').value.split('\n').map((v) => v.trim()).filter(Boolean);
    content.productCategories = JSON.parse($('#inputProducts').value);
    content.lookbook = JSON.parse($('#inputLookbook').value);

    window.saveIIIData(content);
    alert('저장되었습니다. 메인 페이지를 새로고침하면 반영됩니다.');
  } catch (error) {
    alert(`저장 실패: JSON 형식을 확인해주세요.\n${error.message}`);
  }
});

$('#resetBtn').addEventListener('click', () => {
  if (!confirm('기본값으로 되돌릴까요?')) return;
  content = structuredClone(window.III_DEFAULT_DATA);
  window.saveIIIData(content);
  populateAdminForm();
});

$('#exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'iii-homepage-data.json';
  a.click();
  URL.revokeObjectURL(url);
});
