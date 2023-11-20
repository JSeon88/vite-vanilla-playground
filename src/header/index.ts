import { menuList } from './menuList';

const headerEl = document.querySelector('#uid_header');

if (headerEl) {
  headerEl.innerHTML = `
  <div>
    ${menuList.map((menu) => `<a href="${menu.url}">${menu.title}</a>`).join(' | ')}
  </div>
  `;
}
