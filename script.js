const $ = (selector) => document.querySelector(selector);

const content = window.loadIIIData();

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

  $('#trustPoints').innerHTML = content.trustPoints.map((point) => `<li>${point}</li>`).join('');

  $('#productCategories').innerHTML = content.productCategories
    .map(
      (category) => `
      <article class="card">
        <h3>${category.name}</h3>
        <ul>
          ${category.items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');

  $('#lookbookGrid').innerHTML = content.lookbook
    .map(
      (item) => `
      <figure>
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <figcaption><strong>${item.title}</strong><br />${item.description}</figcaption>
      </figure>`
    )
    .join('');

  $('#year').textContent = new Date().getFullYear();
}

render();
