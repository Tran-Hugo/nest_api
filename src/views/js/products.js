import { modifiedFetch } from './interceptor.js';

function getHeader() {
  fetch('./header.html')
    .then((response) => response.text())
    .then((html) => {
      document.querySelector('header').innerHTML = html;
      fetch('./js/header.js')
        .then((response) => response.text())
        .then((js) => {
          let script = document.createElement('script');
          script.innerHTML = js;
          document.querySelector('header').appendChild(script);
          modifiedFetch('http://localhost:3000/categories')
            .then((response) => response.json())
            .then((data) => {
              const dropdownMenu = document.querySelector('.dropdown-menu');
              data.forEach((category) => {
                const categoryLink = document.createElement('div');
                categoryLink.innerHTML = `
                  <a class="dropdown-item" href="#">${category.name}</a>`;
                categoryLink.addEventListener('click', () => {
                  changeProducts(category);
                });
                dropdownMenu.appendChild(categoryLink);
              });
            });
        });
    });
}

async function changeProducts(category) {
  let response = await fetch(
    'http://localhost:3000/products/category/' + category.id,
  );
  let datas = await response.json();
  let productContainer = document.querySelector('.products_container');
  productContainer.innerHTML = '';
  let title = document.getElementById('products_title');
  title.innerText = category.name + ' :';
  datas.forEach((product) => {
    let card = document.createElement('div');
    card.classList.add('card', 'shadow-lg', 'bg-white');
    card.innerHTML = `
        <img class="card_img" src="${product.image}"/>
        <div class="card_content">
          <div class="card_text_container" style="height:8rem;">
            <h3 class="card_title font-bold">${product.name.slice(0, 30)}</h3>
            <p class="card_desc">${product.description.slice(0, 20)}  ${
      product.description.length > 60 ? '...' : ''
    }</p>
          </div>
            <p class="card_price w-full text-end text-sky-600">${
              product.price
            }€</p>
        </div>
      `;

    productContainer.appendChild(card);
  });
}

async function getProducts() {
  try {
    let response = await modifiedFetch('http://localhost:3000/products');
    let datas = await response.json();
    return datas;
  } catch (error) {
    console.log(error);
  }
}
async function main() {
  let title = document.getElementById('products_title');
  title.innerText = 'All Figures :';
  let datas = await getProducts();
  let container = document.querySelector('.products_container');
  container.innerHTML = '';
  datas.forEach((product) => {
    let card = document.createElement('div');
    card.classList.add('card', 'shadow-lg', 'bg-white');
    card.innerHTML = `
        <img class="card_img" src="${product.image}"/>
        <div class="card_content">
          <div class="card_text_container" style="height:8rem;">
            <h3 class="card_title font-bold">${product.name.slice(0, 30)}</h3>
            <p class="card_desc">${product.description.slice(0, 20)}  ${
      product.description.length > 60 ? '...' : ''
    }</p>
          </div>
            <p class="card_price w-full text-end text-sky-600">${
              product.price
            }€</p>
        </div>
      `;

    container.appendChild(card);
  });
  const homeBtn = document.getElementById('home_btn');

  homeBtn.addEventListener('click', () => {
    main();
  });
}

export { getHeader, main };
