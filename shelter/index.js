import petsData from './petsData.json' assert { type: 'json' };

// Бургер меню

const burgerButton = document.querySelector('.navigation__burger');
const menu = document.querySelector('.navigation__list');
const backdrop = document.querySelector('.navigation__backdrop');

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('navigation__burger_rotated');
  menu.classList.toggle('navigation__list_open');
  backdrop.classList.toggle('navigation__backdrop_visible');
  document.body.classList.toggle('no-scroll');
});

backdrop.addEventListener('click', () => {
  burgerButton.classList.remove('navigation__burger_rotated');
  menu.classList.remove('navigation__list_open');
  backdrop.classList.remove('navigation__backdrop_visible');
  document.body.classList.remove('no-scroll');
});

menu.addEventListener('click', (event) => {
  if (event.target.closest('.navigation__link')) {
    burgerButton.classList.remove('navigation__burger_rotated');
    menu.classList.remove('navigation__list_open');
    backdrop.classList.remove('navigation__backdrop_visible');
    document.body.classList.remove('no-scroll');
  }
});

// Попап

const cardsWrapper =
  document.querySelector('.slider__cards-wrapper') ||
  document.querySelector('.pagination__cards-wrapper');
const closeModalButton = document.querySelector('.ward-modal__button');
const modal = document.querySelector('.ward-modal');
const modalImage = document.querySelector('.ward-modal__image');
const modalHeading = document.querySelector('.ward-modal__heading');
const modalSubheading = document.querySelector('.ward-modal__subheading');
const modalDescription = document.querySelector('.ward-modal__description');
const modalList = document.querySelector('.ward-modal__list');

cardsWrapper.addEventListener('click', (event) => {
  const card = event.target.closest('.ward-card');
  if (card) {
    renderWardModal(card.dataset.cardNumber);
    modal.classList.add('ward-modal_open');
    document.body.classList.add('no-scroll');
  }
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('ward-modal_open');
  document.body.classList.remove('no-scroll');
});

modal.addEventListener('click', (event) => {
  if (!event.target.closest('.ward-modal__card')) {
    modal.classList.remove('ward-modal_open');
    document.body.classList.remove('no-scroll');
  }
});

function renderWardModal(cardNumber) {
  modalImage.src = petsData[cardNumber].img;
  modalImage.alt = petsData[cardNumber].name;
  modalHeading.textContent = petsData[cardNumber].name;
  modalSubheading.textContent = `${petsData[cardNumber].type} - ${petsData[cardNumber].breed}`;
  modalDescription.textContent = petsData[cardNumber].description;

  let listContent = '';
  listContent += `
<li class="ward-modal__list-item">
  <span class="ward-modal__list-heading">Age:</span>
  ${petsData[cardNumber].age}
  </li>`;
  listContent += `
<li class="ward-modal__list-item">
  <span class="ward-modal__list-heading">Inoculations:</span>
  ${petsData[cardNumber].inoculations.join(', ')}
</li>`;
  listContent += `
<li class="ward-modal__list-item">
<span class="ward-modal__list-heading">Diseases:</span>
  ${petsData[cardNumber].diseases.join(', ')}
</li>`;
  listContent += `
<li class="ward-modal__list-item">
<span class="ward-modal__list-heading">Parasites:</span>
${petsData[cardNumber].parasites.join(', ')}
</li>`;

  modalList.innerHTML = listContent;
}

// Самопроверка

// console.log(
//   `Самопроверка: 100 / 100

// 1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14
// 2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14
// 3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14
// 4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6
// 5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6
// 6. Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6
// 7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20
// 8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции: +8
// 9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4
// 10. Верстка обеих страниц валидная: +8`
// );
