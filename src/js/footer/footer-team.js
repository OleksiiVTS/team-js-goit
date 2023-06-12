const refs = {
  openFooterTeamLink: document.querySelector('[data-team-open]'),
  closeFooterTeamBtn: document.querySelector('[data-team-close]'),
  footerTeam: document.querySelector('[data-team]'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'),
};
// if (refs.footer.classList.contains('footer-fixed')) {
//   refs.footer.classList.remove('footer-fixed');
// }

// if (refs.body.clientHeight < window.innerHeight) {
//   refs.footer.classList.add('footer-fixed');
// }

setTimeout(() => {
  if (
    window.innerWidth <= 320 &&
    refs.body.clientHeight < window.innerHeight - 109
  ) {
    refs.footer.innerHTML = `<div class="container footer-container footer-fixed">
      <p class="footer-text">&#169 2023 | All Rights Reserved | Developed with
      <svg class="footer__icon" width="14" height="14">
        <use href="./images/sprite.svg#icon-heart"></use>
      </svg>
      by <a class="footer-link" href="#open" data-team-open>GoIT Students</a></p>
    </div>`;
    console.log(`mob`);
  } else if (
    window.innerWidth > 320 &&
    window.innerWidth <= 800 &&
    refs.body.clientHeight < window.innerHeight - 175
  ) {
    refs.footer.innerHTML = `<div class="container footer-container footer-fixed">
      <p class="footer-text">&#169 2023 | All Rights Reserved | Developed with
      <svg class="footer__icon" width="14" height="14">
        <use href="./images/sprite.svg#icon-heart"></use>
      </svg>
      by <a class="footer-link" href="#open" data-team-open>GoIT Students</a></p>
    </div>`;
    console.log(`tablet`);
  } else if (
    window.innerWidth > 800 &&
    refs.body.clientHeight < window.innerHeight - 197
  ) {
    refs.footer.innerHTML = `<div class="container footer-container footer-fixed">
      <p class="footer-text">&#169 2023 | All Rights Reserved | Developed with
      <svg class="footer__icon" width="14" height="14">
        <use href="./images/sprite.svg#icon-heart"></use>
      </svg>
      by <a class="footer-link" href="#open" data-team-open>GoIT Students</a></p>
    </div>`;
    console.log(`desk`);
  } else {
    refs.footer.innerHTML = `<div class="container footer-container">
      <p class="footer-text">&#169 2023 | All Rights Reserved | Developed with
      <svg class="footer__icon" width="14" height="14">
        <use href="./images/sprite.svg#icon-heart"></use>
      </svg>
      by <a class="footer-link" href="#open" data-team-open>GoIT Students</a></p>
    </div>`;
    console.log(`net`);
  }
  console.log(
    refs.body.clientHeight,
    window.innerHeight,
    'window.innerWidth=',
    window.innerWidth,
    document.documentElement.scrollWidth,
    window.innerHeight - 175
  );
}, 100);
setTimeout(() => {
  console.log(refs.openFooterTeamLink);
  refs.openFooterTeamLink.addEventListener('click', openTeamModal);

  refs.closeFooterTeamBtn.addEventListener('click', closeTeamModal);

  function openTeamModal() {
    refs.footerTeam.classList.toggle('is-hidden');
    refs.body.classList.add('no-scroll');
    document.addEventListener('keydown', handlerEsc);
    window.addEventListener('click', handlerOutside);
  }
  function closeTeamModal() {
    refs.footerTeam.classList.toggle('is-hidden');
    refs.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handlerEsc);
    window.removeEventListener('click', handlerOutside);
  }

  function handlerEsc(event) {
    if (event.key === 'Escape') {
      closeTeamModal();
    }
  }

  function handlerOutside(event) {
    if (event.target === refs.footerTeam) {
      closeTeamModal();
    }
  }
}, 300);
