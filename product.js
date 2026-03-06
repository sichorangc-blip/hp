const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const content = window.loadIIIData();
const product = (content.productDetails || []).find((item) => item.id === id);

if (!product) {
  document.querySelector('#detailName').textContent = '제품 정보를 찾을 수 없습니다.';
} else {
  document.querySelector('#detailName').textContent = product.name;
  document.querySelector('#detailDescription').textContent = product.detailDescription || product.shortDescription || '';
  document.querySelector('#detailFeatures').innerHTML = (product.features || []).map((item) => `<li>${item}</li>`).join('');
  document.querySelector('#detailImages').innerHTML = (product.detailImages || [product.thumbnail])
    .map((img) => `<img src="${img}" alt="${product.name}" loading="lazy" />`)
    .join('');
}
