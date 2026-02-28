const $ = (selector) => document.querySelector(selector);

const content = window.loadIIIData();

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderLookbook() {
  const grid = $('#lookbookGrid');

  if (content.lookbookMode === 'instagram') {
    const tags = (content.lookbookInstagramTags || []).filter(Boolean);
    grid.innerHTML = tags
      .map((tag) => {
        const normalized = encodeURIComponent(tag.replace(/^#/, ''));
        const url = `https://www.instagram.com/explore/tags/${normalized}/`;
        return `<article class="card hashtag-card"><h3>#${escapeHtml(tag)}</h3><p>인스타 해시태그로 최신 룩북 보기</p><a class="btn btn-light" href="${url}" target="_blank" rel="noreferrer">해시태그 열기</a></article>`;
      })
      .join('');

    if (!tags.length) {
      grid.innerHTML = '<article class="card">해시태그를 설정하면 인스타 룩북 링크가 표시됩니다.</article>';
    }
    return;
  }

  grid.innerHTML = content.lookbook
    .map(
      (item) => `
      <figure>
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <figcaption><strong>${escapeHtml(item.title)}</strong><br />${escapeHtml(item.description || '')}</figcaption>
      </figure>`
    )
    .join('');
}

function render() {
  $('#brandNameKor').textContent = content.brandNameKor;
  $('#brandNameEng').textContent = content.brandNameEng;
  $('#heroTitle').textContent = content.heroTitle;
  $('#heroSubtitle').textContent = content.heroSubtitle;
  $('#heroCardText').textContent = content.heroCardText;
  $('#brandEssence').textContent = content.brandEssence;
  $('#brandLogo').src = content.logoUrl;

  $('#smartstoreLink').href = content.links.smartstore;
  $('#smartstoreCard').href = content.links.smartstore;
  $('#instagramCard').href = content.links.instagram;
  $('#blogCard').href = content.links.blog;

  $('#trustPoints').innerHTML = content.trustPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join('');

  $('#productCategories').innerHTML = content.productCategories
    .map(
      (category) => `
      <article class="card">
        <h3>${escapeHtml(category.name)}</h3>
        <ul>
          ${category.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');

  renderLookbook();
  $('#year').textContent = new Date().getFullYear();
}

render();
