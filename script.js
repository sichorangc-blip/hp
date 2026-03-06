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

function normalizeTags(tags) {
  return (tags || []).map((tag) => String(tag).trim().replace(/^#/, '').toLowerCase()).filter(Boolean);
}

function renderLookbook() {
  const grid = $('#lookbookGrid');
  const requiredTags = normalizeTags(content.lookbookInstagramTags);

  if (content.lookbookMode === 'instagram') {
    grid.innerHTML = requiredTags
      .map((tag) => {
        const normalized = encodeURIComponent(tag);
        const url = `https://www.instagram.com/explore/tags/${normalized}/`;
        return `<article class="card hashtag-card"><h3>#${escapeHtml(tag)}</h3><p>인스타 해시태그 페이지 열기</p><a class="btn btn-light" href="${url}" target="_blank" rel="noreferrer">해시태그 열기</a></article>`;
      })
      .join('');

    if (!requiredTags.length) {
      grid.innerHTML = '<article class="card">해시태그를 설정하면 인스타 해시태그 링크가 표시됩니다.</article>';
    }
    return;
  }

  let items = content.lookbook;
  if (content.lookbookMode === 'tag-match') {
    items = content.lookbook.filter((item) => {
      const tags = normalizeTags(item.tags);
      return requiredTags.every((tag) => tags.includes(tag));
    });
  }

  grid.innerHTML = items
    .map(
      (item) => `
      <figure>
        <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <figcaption>
          <strong>${escapeHtml(item.title)}</strong><br />${escapeHtml(item.description || '')}
          <div class="tag-line">${normalizeTags(item.tags).map((tag) => `#${escapeHtml(tag)}`).join(' ')}</div>
        </figcaption>
      </figure>`
    )
    .join('');

  if (!items.length) {
    grid.innerHTML = '<article class="card">설정한 해시태그를 모두 충족하는 이미지가 아직 없습니다. 관리자에서 룩북 항목의 tags를 확인해 주세요.</article>';
  }
}

function renderProductDetails() {
  const target = $('#productDetailCards');
  if (!target) return;
  target.innerHTML = (content.productDetails || [])
    .map(
      (product) => `
      <article class="card product-detail-card">
        <img src="${product.thumbnail}" alt="${escapeHtml(product.name)}" loading="lazy" />
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.shortDescription || '')}</p>
        <a class="btn btn-light" href="./product.html?id=${encodeURIComponent(product.id)}">상세페이지 보기</a>
      </article>`
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

  renderProductDetails();
  renderLookbook();
  $('#year').textContent = new Date().getFullYear();
}

render();
