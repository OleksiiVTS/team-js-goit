const menuBtnEl = document.querySelector('.header-menu');
const mobileMenuEl = document.querySelector('.mobile-menu-wrap');
const mobileBackdropEl = document.querySelector('.mobile-menu-backdrop');
const bodyEl = document.querySelector('body');
const currentURL = window.location.href;
const navLinks = document.getElementsByClassName('menu-item-txt');
menuBtnEl.addEventListener('click', onMenuBtnClick);

function onMenuBtnClick() {
  mobileMenuEl.classList.remove('hidden');
  mobileBackdropEl.classList.remove('hidden');

  setTimeout(() => {
    document.addEventListener('click', onMenuOpenClick);
    document.addEventListener('keydown', onMenuOpenKeypress);
    bodyEl.classList.add('modal-opened');
  }, 500);
}

function onMenuOpenClick(event) {
  if (event.target !== mobileMenuEl) {
    closeMobileMenu();
  }
}

function onMenuOpenKeypress(event) {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  mobileMenuEl.classList.add('hidden');
  mobileBackdropEl.classList.add('hidden');
  bodyEl.classList.remove('modal-opened');
  document.removeEventListener('click', onMenuOpenClick);
  document.removeEventListener('keydown', onMenuOpenKeypress);
}

// THEME SWITCHING

const themeSwitchEl = document.getElementById('checkbox');
themeSwitchEl.addEventListener('change', onThemeSwitchToggle);
setCurrentTheme();

function onThemeSwitchToggle() {
  localStorage.setItem(
    'ui-theme',
    localStorage.getItem('ui-theme') === 'dark' ? 'light' : 'dark'
  );
  switchThemeColors();
}

function switchThemeColors() {
  const toggleClass = (element, className, addClass) => {
    if (element && addClass) {
      element.classList.add(className);
    } else if (element) {
      element.classList.remove(className);
    }
  };
  const toBlackTxtEls = [
    document.querySelector('.upcoming_title'),
    ...document.getElementsByClassName('film-title'),
    document.querySelector('.release'),
    document.querySelector('.vote'),
    document.querySelector('.popularity'),
    document.querySelector('.genre'),
    document.querySelector('.description-about'),
    document.querySelector('.m-w-t-text'),
    document.querySelector('.weekly-section-name'),
    document.querySelector('.description-about'),
    ...document.getElementsByTagName('table'),
    document.querySelector('.empty-library-text'),
  ];

  const filterEl = document.getElementById('libraryFilterCinemania');
  let filterOptions = [];
  if (filterEl) {
    filterOptions = [...filterEl.getElementsByTagName('option')];
    for (let element of filterOptions) {
      if (element.value === 'genre') {
        element.style.color = '#282828';
        element.style.backgroundColor = '#F8F8F8';
      } else if (!themeSwitchEl.checked) {
        element.style.color = '#282828';
        element.style.backgroundColor = '#F8F8F8';
      } else {
        element.style.color = '#F8F8F8';
        element.style.backgroundColor = '#1C1C1C';
      }
    }
  }

  const toSecBlackTxtEls = [
    document.querySelector('.header-title'),
    document.querySelector('.vote-value'),
    document.querySelector('.genre-value'),
    document.querySelector('.popularity-value'),
    document.querySelector('.about-value'),
    document.querySelector('.more-details-about'),
  ];

  const toSecBlackSvg = [
    document.querySelector('.m-w-t-button-close'),
    document.querySelector('.more-details-close-button'),
  ];

  const toBlackSvg = [document.querySelector('.button-round-search')];

  const toLightBoxShadow = [
    document.querySelector('.m-w-t-window'),
    document.querySelector('.more-details-modal'),
  ];

  const toDarkestTxtEl = [
    ...document.querySelector('.header-title').getElementsByTagName('span'),
  ];

  const toLightdarkTxt = [
    ...document.getElementsByClassName('menu-item-txt'),
    document.querySelector('.header-menu'),
  ];

  let toDarkPlaceholder = [document.querySelector('.catalog-search-input')];

  const footerTxt = [document.querySelector('.footer-text')];
  const toWhiteBackgr = [
    bodyEl,
    document.querySelector('.header-wrap'),
    document.querySelector('.m-w-t-window'),
    document.querySelector('.more-details-modal'),
  ];

  const toSecWhiteBackgr = [document.querySelector('.mobile-menu-wrap')];

  for (let element of toBlackTxtEls) {
    toggleClass(element, 'black-text-color', !themeSwitchEl.checked);
  }

  for (let element of toSecBlackTxtEls) {
    toggleClass(element, 'secondary-black-text-color', !themeSwitchEl.checked);
  }

  for (let element of toLightBoxShadow) {
    toggleClass(element, 'light-theme-box-shadow', !themeSwitchEl.checked);
  }

  for (let element of toLightdarkTxt) {
    toggleClass(element, 'lightdark-text-color', !themeSwitchEl.checked);
  }

  for (let element of toDarkPlaceholder) {
    toggleClass(element, 'dark', !themeSwitchEl.checked);
  }

  for (let element of footerTxt) {
    if (!themeSwitchEl.checked) {
      element.style.color = '#595959';
    } else {
      element.style.color = '#b7b7b7';
    }
  }

  if (!themeSwitchEl.checked && filterEl) {
    filterEl.style.color = '#595959';
  } else if (filterEl && themeSwitchEl.checked) {
    filterEl.style.color = '#b7b7b7';
  }

  for (let element of toDarkestTxtEl) {
    if (element.style.color === 'rgb(0, 0, 0)') {
      element.style.color = 'rgb(255, 255, 255)';
    } else element.style.color = 'rgb(0, 0, 0)';
  }

  for (let element of toWhiteBackgr) {
    toggleClass(element, 'white-background', !themeSwitchEl.checked);
  }

  for (let element of toSecWhiteBackgr) {
    toggleClass(element, 'secondary-white-background', !themeSwitchEl.checked);
  }
  for (let element of toSecBlackSvg) {
    toggleClass(element, 'svg-sec-black-fill', !themeSwitchEl.checked);
  }

  for (let element of toBlackSvg) {
    toggleClass(element, 'svg-black-fill', !themeSwitchEl.checked);
  }

  toggleClass(
    mobileBackdropEl,
    'light-backdrop-background',
    !themeSwitchEl.checked
  );

  stylePagination();
  styleEmptyLibrary();
}
function setCurrentTheme() {
  if (!localStorage.getItem('ui-theme')) {
    localStorage.setItem('ui-theme', 'dark');
    themeSwitchEl.checked = true;
  } else if (localStorage.getItem('ui-theme') === 'dark') {
    themeSwitchEl.checked = true;
  } else if (localStorage.getItem('ui-theme') === 'light') {
    themeSwitchEl.checked = false;
    setTimeout(switchThemeColors, 0);
    setTimeout(styleCurrentPageLink, 0);
  }
}

function styleCurrentPageLink() {
  for (let i = 0; i < navLinks.length; i += 1) {
    let linkURL = navLinks[i].getAttribute('href');

    if (currentURL.includes(linkURL)) {
      navLinks[i].classList.add('current-page');
    }
  }
}

setTimeout(styleCurrentPageLink, 0);

export function stylePagination() {
  const themeSwitchEl = document.getElementById('checkbox');
  let paginationBtns = [...document.getElementsByClassName('tui-page-btn')];

  if (!themeSwitchEl.checked && paginationBtns.length > 0) {
    for (let element of paginationBtns) {
      element.style.color = '#595959';
      if (element.classList.contains('tui-is-selected')) {
        element.style.color = '#282828';
      }
    }
  } else if (paginationBtns.length > 0 && themeSwitchEl.checked) {
    for (let element of paginationBtns) {
      element.style.color = '#b7b7b7';
      if (element.classList.contains('tui-is-selected')) {
        element.style.color = '#fff';
      }
    }
  }
}

export function styleModal() {
  if (localStorage.getItem('ui-theme') === 'light') {
    document.querySelector('.more-details-modal').style.backgroundColor =
      '#FFFFFF';
    document.querySelector('.more-details-modal').style.boxShadow =
      '1px 1px 14px 4px rgba(0, 0, 0, 0.22)';
    document.querySelector('.more-details-close-button').style.color =
      '#282828';
    document.querySelector('.film-title').style.color = '#111111';
    document.querySelector('.more-details-about').style.color = '#282828';
    document.querySelector('.description-about').style.color = '#111111';
    const aboutTableEl = [...document.getElementsByTagName('td')];
    for (let element of aboutTableEl) {
      element.style.color = '#111111';
    }
  }
}

export function styleEmptyLibrary() {
  {
    const textEl = document.querySelector('.empty-library-text');
    if (localStorage.getItem('ui-theme') === 'light') {
      if (textEl) {
        textEl.style.color = '#111111';
      }
    } else {
      textEl.style.color = '#FFFFFF';
    }
  }
}

export function styleEmptyCatalog() {
  {
    const textEl = document.querySelector('.results-matching');
    if (localStorage.getItem('ui-theme') === 'light') {
      if (textEl) {
        textEl.style.color = '#111111';
      }
    } else {
      textEl.style.color = '#FFFFFF';
    }
  }
}

export function styleUpcomingThisMonth() {
  if (localStorage.getItem('ui-theme') === 'light') {
    const toggleClass = (element, className) => {
      if (element) {
        element.classList.add(className);
      }
    };

    const sectionEl = document.querySelector('.upcoming_film');

    const toBlackTxt = [
      sectionEl.querySelector('.film-title'),
      sectionEl.querySelector('.release'),
      sectionEl.querySelector('.vote'),
      sectionEl.querySelector('.popularity'),
      sectionEl.querySelector('.genre'),
      sectionEl.querySelector('.description-about'),
    ];

    const toSecBlackTxt = [
      sectionEl.querySelector('.popularity-value'),
      sectionEl.querySelector('.genre-value'),
      sectionEl.querySelector('.about-value'),
    ];

    for (let element of toBlackTxt) {
      toggleClass(element, 'black-text-color');
    }

    for (let element of toSecBlackTxt) {
      toggleClass(element, 'secondary-black-text-color');
    }
  }
}
