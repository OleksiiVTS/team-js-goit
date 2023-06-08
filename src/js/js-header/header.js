const menuBtnEl = document.querySelector('.header-menu');
const mobileMenuEl = document.querySelector('.mobile-menu-wrap');
const mobileBackdropEl = document.querySelector('.mobile-menu-backdrop');
const bodyEl = document.querySelector('body');
const currentURL = window.location.href;
const navLinks = document.getElementsByClassName('menu-item-txt');
menuBtnEl.addEventListener('click', onMenuBtnClick);

for (let i = 0; i < navLinks.length; i += 1) {
  let linkURL = navLinks[i].getAttribute('href');

  if (currentURL.includes(linkURL)) {
    navLinks[i].classList.add('current-page');
  }
}
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
  ];

  const filterEl = document.getElementById('libraryFilterCinemania');
  let filterOptions = filterEl.getElementsByTagName('option');

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
    document.querySelector('.footer-text'),
  ];

  const toWhiteBackgr = [
    bodyEl,
    document.querySelector('.header-wrap'),
    document.querySelector('.m-w-t-window'),
    document.querySelector('.more-details-modal'),
  ];

  const toSecWhiteBackgr = [document.querySelector('.mobile-menu-wrap')];

  for (element of toBlackTxtEls) {
    toggleClass(element, 'black-text-color', !themeSwitchEl.checked);
  }

  for (element of toSecBlackTxtEls) {
    toggleClass(element, 'secondary-black-text-color', !themeSwitchEl.checked);
  }

  for (element of toLightBoxShadow) {
    toggleClass(element, 'light-theme-box-shadow', !themeSwitchEl.checked);
  }

  for (element of toLightdarkTxt) {
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

  for (element of filterOptions) {
    if (element.value === 'genre') {
      element.style.display = 'none';
    } else if (!themeSwitchEl.checked) {
      element.style.color = '#282828';
      element.style.backgroundColor = '#F8F8F8';
    } else {
      element.style.color = '#F8F8F8';
      element.style.backgroundColor = '#1C1C1C';
    }
  }

  for (element of toWhiteBackgr) {
    toggleClass(element, 'white-background', !themeSwitchEl.checked);
  }

  for (element of toSecWhiteBackgr) {
    toggleClass(element, 'secondary-white-background', !themeSwitchEl.checked);
  }
  for (element of toSecBlackSvg) {
    toggleClass(element, 'svg-sec-black-fill', !themeSwitchEl.checked);
  }

  for (element of toBlackSvg) {
    toggleClass(element, 'svg-black-fill', !themeSwitchEl.checked);
  }

  toggleClass(
    mobileBackdropEl,
    'light-backdrop-background',
    !themeSwitchEl.checked
  );

  for (element of toDarkestTxtEl) {
    if (element.style.color === 'rgb(0, 0, 0)') {
      element.style.color = 'rgb(255, 255, 255)';
    } else element.style.color = 'rgb(0, 0, 0)';
  }
}
function setCurrentTheme() {
  if (!localStorage.getItem('ui-theme')) {
    localStorage.setItem('ui-theme', 'dark');
    themeSwitchEl.checked = true;
  } else if (localStorage.getItem('ui-theme') === 'dark') {
    themeSwitchEl.checked = true;
  } else if (localStorage.getItem('ui-theme') === 'light') {
    themeSwitchEl.checked = false;
    setTimeout(switchThemeColors, 500);
  }
}
