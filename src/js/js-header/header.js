const menuBtnEl = document.querySelector('.header-menu');
const mobileMenuEl = document.querySelector('.mobile-menu-wrap');
const mobileBackdropEl = document.querySelector('.mobile-menu-backdrop');
const bodyEl = document.querySelector('body');
const currentURL = window.location.href;
const navLinks = document.getElementsByClassName('menu-item-txt');
menuBtnEl.addEventListener('click', onMenuBtnClick);

console.log(currentURL);
for (let i = 0; i < navLinks.length; i += 1) {
  let linkURL = navLinks[i].getAttribute('href');
  console.log(linkURL);
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

const dayThemeRefs = {
  headerEl: document.querySelector('.header-container'),
  mobileMenuModalEl: document.querySelector('.mobile-menu-wrap'),
  headerMenuEL: document.querySelector('.header-menu'),
  headerTitleEl: document.querySelector('.header-title'),
  menuItemEls: [...document.getElementsByClassName('menu-item-txt')],
};

const {
  headerEl,
  mobileMenuModalEl,
  headerMenuEL,
  headerTitleEl,
  menuItemEls,
} = dayThemeRefs;

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
    if (addClass) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  };

  toggleClass(bodyEl, 'body-white-background', !themeSwitchEl.checked);
  toggleClass(headerEl, 'header-white-background', !themeSwitchEl.checked);
  toggleClass(
    mobileMenuModalEl,
    'secondary-white-background',
    !themeSwitchEl.checked
  );
  toggleClass(headerMenuEL, 'day-dark-text', !themeSwitchEl.checked);
  toggleClass(headerTitleEl, 'day-secondary-black', !themeSwitchEl.checked);

  menuItemEls.forEach(item => {
    toggleClass(item, 'day-dark-text', !themeSwitchEl.checked);
  });
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
