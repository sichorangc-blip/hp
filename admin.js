const $ = (selector) => document.querySelector(selector);

let content = window.loadIIIData();

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('파일을 읽지 못했습니다.'));
    reader.readAsDataURL(file);
  });
}

function populateAdminForm() {
  $('#inputHeroSubtitle').value = content.heroSubtitle;
  $('#inputEssence').value = content.brandEssence;
  $('#inputLogo').value = content.logoUrl;
  $('#inputTrust').value = content.trustPoints.join('\n');
  $('#inputProducts').value = JSON.stringify(content.productCategories, null, 2);
  $('#inputLookbook').value = JSON.stringify(content.lookbook, null, 2);
  $('#inputLookbookMode').value = content.lookbookMode || 'manual';
  $('#inputInstagramTags').value = (content.lookbookInstagramTags || []).join(', ');
}

function openAdminPanel() {
  populateAdminForm();
  $('#adminPanel').classList.remove('hidden');
}

function closeLoginModal() {
  $('#loginModal').classList.add('hidden');
}

$('#loginBtn').addEventListener('click', () => {
  const currentPassword = window.loadAdminPassword();
  if ($('#adminPassword').value === currentPassword) {
    closeLoginModal();
    openAdminPanel();
  } else {
    $('#loginError').textContent = '비밀번호가 올바르지 않습니다.';
  }
});

$('#inputLogoFile').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const dataUrl = await fileToDataUrl(file);
    $('#inputLogo').value = dataUrl;
    alert('로고 이미지가 반영되었습니다. 저장 버튼을 눌러 확정하세요.');
  } catch (error) {
    alert(error.message);
  }
});

$('#addCategoryBtn').addEventListener('click', () => {
  const name = $('#quickCategoryName').value.trim();
  const items = $('#quickCategoryItems').value.split('\n').map((v) => v.trim()).filter(Boolean);
  if (!name || items.length === 0) {
    alert('카테고리명과 품목을 입력해 주세요.');
    return;
  }

  const existing = JSON.parse($('#inputProducts').value || '[]');
  existing.push({ name, items });
  $('#inputProducts').value = JSON.stringify(existing, null, 2);
  $('#quickCategoryName').value = '';
  $('#quickCategoryItems').value = '';
});

$('#addLookbookBtn').addEventListener('click', async () => {
  const title = $('#quickLookbookTitle').value.trim();
  const description = $('#quickLookbookDescription').value.trim();
  let image = $('#quickLookbookImage').value.trim();
  const file = $('#quickLookbookImageFile').files?.[0];

  if (!title) {
    alert('룩북 제목을 입력하세요.');
    return;
  }

  if (!image && file) {
    image = await fileToDataUrl(file);
    $('#quickLookbookImage').value = image;
  }

  if (!image) {
    alert('이미지 URL 또는 파일을 입력하세요.');
    return;
  }

  const existing = JSON.parse($('#inputLookbook').value || '[]');
  existing.unshift({ title, image, description });
  $('#inputLookbook').value = JSON.stringify(existing, null, 2);

  $('#quickLookbookTitle').value = '';
  $('#quickLookbookImage').value = '';
  $('#quickLookbookImageFile').value = '';
  $('#quickLookbookDescription').value = '';
});

$('#changePasswordBtn').addEventListener('click', () => {
  const newPassword = $('#newPassword').value;
  const confirmPassword = $('#confirmPassword').value;

  if (newPassword.length < 4) {
    alert('비밀번호는 최소 4자 이상 입력해 주세요.');
    return;
  }
  if (newPassword !== confirmPassword) {
    alert('비밀번호 확인 값이 일치하지 않습니다.');
    return;
  }

  window.saveAdminPassword(newPassword);
  $('#newPassword').value = '';
  $('#confirmPassword').value = '';
  alert('비밀번호가 변경되었습니다. 다음 로그인부터 새 비밀번호를 사용하세요.');
});

$('#saveBtn').addEventListener('click', () => {
  try {
    content.heroSubtitle = $('#inputHeroSubtitle').value.trim();
    content.brandEssence = $('#inputEssence').value.trim();
    content.logoUrl = $('#inputLogo').value.trim() || window.III_DEFAULT_DATA.logoUrl;
    content.trustPoints = $('#inputTrust').value.split('\n').map((v) => v.trim()).filter(Boolean);
    content.productCategories = JSON.parse($('#inputProducts').value);
    content.lookbook = JSON.parse($('#inputLookbook').value);
    content.lookbookMode = $('#inputLookbookMode').value;
    content.lookbookInstagramTags = $('#inputInstagramTags').value
      .split(',')
      .map((v) => v.trim().replace(/^#/, ''))
      .filter(Boolean);

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
