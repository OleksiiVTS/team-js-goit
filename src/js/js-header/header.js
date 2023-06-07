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
  console.log('menu');
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

// 11111

const secBlackTxtEls = {
  voteValueEl: document.querySelector('.vote-value'),
  popularityValueEl: document.querySelector('.popularity-value'),
  genreValueEl: document.querySelector('.genre-value'),
  aboutValueEl: document.querySelector('.about-value'),
};

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
    document.querySelector('.film-title'),
    document.querySelector('.release'),
    document.querySelector('.vote'),
    document.querySelector('.popularity'),
    document.querySelector('.genre'),
    document.querySelector('.description-about'),
  ];

  const toSecBlackTxtEls = [
    document.querySelector('.header-title'),
    document.querySelector('.vote-value'),
    document.querySelector('.genre-value'),
    document.querySelector('.popularity-value'),
    document.querySelector('.about-value'),
  ];

  const toDarkestTxtEl = [
    ...document.querySelector('.header-title').getElementsByTagName('span'),
  ];
  console.log(toDarkestTxtEl);

  const toWhiteBackgr = [bodyEl, document.querySelector('.header-wrap')];
  const toSecWhiteBackgr = [document.querySelector('.mobile-menu-wrap')];

  const headerRefs = {
    headerMenuEL: document.querySelector('.header-menu'),
    menuItemEls: [...document.getElementsByClassName('menu-item-txt')],
  };

  // const {
  //
  //   mobileMenuModalEl,
  //   headerMenuEL,
  //   headerTitleEl,
  //   menuItemEls,
  // } = headerRefs;

  // toggleClass(
  //   mobileMenuModalEl,
  //   'secondary-white-background',
  // !themeSwitchEl.checked
  // );
  // toggleClass(headerMenuEL, 'day-dark-text', !themeSwitchEl.checked);

  // menuItemEls.forEach(item => {
  //   toggleClass(item, 'day-dark-text', !themeSwitchEl.checked);
  // });

  // if (!themeSwitchEl.checked) {
  //   headerSpans.forEach(item => {
  //     item.style.color = '#000000';
  //   });
  // }

  for (element of toBlackTxtEls) {
    toggleClass(element, 'black-text-color', !themeSwitchEl.checked);
  }

  for (element of toSecBlackTxtEls) {
    toggleClass(element, 'secondary-black-text-color', !themeSwitchEl.checked);
  }

  for (element of toWhiteBackgr) {
    toggleClass(element, 'white-background', !themeSwitchEl.checked);
  }

  for (element of toSecWhiteBackgr) {
    toggleClass(element, 'secondary-white-background', !themeSwitchEl.checked);
  }

  for (element of toDarkestTxtEl) {
    element.style.color === '#000000' ? '#fff' : '#000000';
  }
}
function setCurrentTheme() {
  if (!localStorage.getItem('ui-theme')) {
    localStorage.setItem('ui-theme', 'dark');
  } else if (localStorage.getItem('ui-theme') === 'dark') {
    themeSwitchEl.checked = true;
  } else {
    localStorage.setItem('ui-theme', 'light');
    themeSwitchEl.checked = false;
    switchThemeColors();
  }
}
