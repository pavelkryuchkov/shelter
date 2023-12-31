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
  document.querySelector('.slider__window') ||
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

// Карусель и пагинация

function getRandomCard() {
  return Math.floor(Math.random() * 8);
}

function getRandomCards(n, except = []) {
  const res = [];
  while (res.length < n) {
    const num = getRandomCard();
    if (!res.includes(num) && !except.includes(num)) {
      res.push(num);
    }
  }
  return res;
}

function getPaginationCards() {
  let res = [];
  for (let i = 0; i < 2; i++) {
    res = res.concat(getRandomCards(8));
    res = res.concat(getRandomCards(4, res.slice(-2)));
    res = res.concat(getRandomCards(4, res.slice(-4)));
    res = res.concat(getRandomCards(2, res.slice(-4)));
    res = res.concat(getRandomCards(6, res.slice(-2)));
  }
  return res;
}

function renderCard(card, cardNumber) {
  const cardImage = card.querySelector('img');
  cardImage.src = `./assets/images/pets-${petsData[
    cardNumber
  ].name.toLowerCase()}.jpg`;
  cardImage.alt = petsData[cardNumber].name;
  card.querySelector('.ward-card__title').textContent =
    petsData[cardNumber].name;
  card.setAttribute('data-card-number', cardNumber);
}

if (document.querySelector('.slider')) {
  const sliderButtons = document.querySelectorAll('.slider__button');
  const slidesContainer = document.querySelector('.slider__window-inner');
  const sliderCards = document.querySelectorAll('.slider__card');

  let centralCards = getRandomCards(3);
  let leftCards = getRandomCards(3, centralCards);
  let rightCards = getRandomCards(3, centralCards);

  renderSliderCards();

  function renderSliderCards() {
    // console.log(leftCards, centralCards, rightCards);

    sliderCards.forEach((card, i) => {
      if (Math.floor(i / 3) === 0) {
        renderCard(card, leftCards[i % 3]);
      } else if (Math.floor(i / 3) === 1) {
        renderCard(card, centralCards[i % 3]);
      } else if (Math.floor(i / 3) === 2) {
        renderCard(card, rightCards[i % 3]);
      }
    });
  }

  function disableButtons() {
    sliderButtons.forEach((button) => {
      button.classList.add('nav-button_disabled');
      button.setAttribute('disabled', true);
    });
  }

  function enableButtons() {
    sliderButtons.forEach((button) => {
      button.classList.remove('nav-button_disabled');
      button.removeAttribute('disabled');
    });
  }

  sliderButtons.forEach((button, i) => {
    button.addEventListener('click', () => {
      disableButtons();
      if (i === 0) {
        slidesContainer.classList.add('slider__window-inner_move-left');
        slidesContainer.classList.remove('slider__window-inner_move-right');
        rightCards = centralCards;
        centralCards = leftCards;
        leftCards = getRandomCards(3, centralCards);
      } else if (i === 1) {
        slidesContainer.classList.remove('slider__window-inner_move-left');
        slidesContainer.classList.add('slider__window-inner_move-right');
        leftCards = centralCards;
        centralCards = rightCards;
        rightCards = getRandomCards(3, centralCards);
      }
    });
  });

  slidesContainer.addEventListener('transitionend', (event) => {
    if (event.target === slidesContainer) {
      renderSliderCards();
      slidesContainer.classList.remove('slider__window-inner_move-left');
      slidesContainer.classList.remove('slider__window-inner_move-right');
      enableButtons();
    }
  });
}

if (document.querySelector('.pagination')) {
  const paginationCards = document.querySelectorAll('.pagination__card');
  const firstPageBtn = document.querySelector('.pagination__button_first-page');
  const prevPageBtn = document.querySelector('.pagination__button_prev-page');
  const nextPageBtn = document.querySelector('.pagination__button_next-page');
  const lastPageBtn = document.querySelector('.pagination__button_last-page');
  const pageNumberBtn = document.querySelector(
    '.pagination__button_page-number'
  );

  const desktopOnly = window.matchMedia('(max-width: 1100px)');
  const desktopTablet = window.matchMedia('(max-width: 750px)');

  const cardsNumbers = getPaginationCards();
  // console.log(cardsNumbers);
  let pageNumber = 1;

  renderPaginationCards(pageNumber);

  function getCardsPerPage() {
    if (desktopTablet.matches) {
      return 3;
    } else if (desktopOnly.matches) {
      return 6;
    }
    return 8;
  }

  function getMaxPageNumber() {
    return 48 / getCardsPerPage();
  }

  function renderPaginationCards(pageNumber) {
    const cardsToRender = cardsNumbers.slice(
      (pageNumber - 1) * getCardsPerPage(),
      pageNumber * getCardsPerPage()
    );
    // console.log(cardsToRender);

    cardsToRender.forEach((cardsNumber, i) => {
      renderCard(paginationCards[i], cardsNumber);
    });
  }

  function renderPaginationButtons(pageNumber) {
    firstPageBtn.classList.remove('nav-button_disabled');
    firstPageBtn.removeAttribute('disabled');
    prevPageBtn.classList.remove('nav-button_disabled');
    prevPageBtn.removeAttribute('disabled');
    nextPageBtn.classList.remove('nav-button_disabled');
    nextPageBtn.removeAttribute('disabled');
    lastPageBtn.classList.remove('nav-button_disabled');
    lastPageBtn.removeAttribute('disabled');

    if (pageNumber === 1) {
      firstPageBtn.classList.add('nav-button_disabled');
      firstPageBtn.setAttribute('disabled', true);
      prevPageBtn.classList.add('nav-button_disabled');
      prevPageBtn.setAttribute('disabled', true);
    }
    if (pageNumber === getMaxPageNumber()) {
      nextPageBtn.classList.add('nav-button_disabled');
      nextPageBtn.setAttribute('disabled', true);
      lastPageBtn.classList.add('nav-button_disabled');
      lastPageBtn.setAttribute('disabled', true);
    }

    pageNumberBtn.textContent = pageNumber;
  }

  firstPageBtn.addEventListener('click', () => {
    pageNumber = 1;
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });

  prevPageBtn.addEventListener('click', () => {
    pageNumber = Math.max(1, pageNumber - 1);
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });

  nextPageBtn.addEventListener('click', () => {
    pageNumber = Math.min(getMaxPageNumber(), pageNumber + 1);
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });

  lastPageBtn.addEventListener('click', () => {
    pageNumber = getMaxPageNumber();
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });

  desktopOnly.addEventListener('change', () => {
    pageNumber = 1;
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });

  desktopTablet.addEventListener('change', () => {
    pageNumber = 1;
    renderPaginationCards(pageNumber);
    renderPaginationButtons(pageNumber);
  });
}

// Самопроверка

console.log(
  `Самопроверка: 110 / 110

1. Реализация burger menu на обеих страницах: +26
2. Реализация слайдера-карусели на странице Main: +36
3. Реализация пагинации на странице Pets: +36
4. Реализация попап на обеих страницах: +12`
);
