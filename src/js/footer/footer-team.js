(() => {
  const refs = {
    openFooterTeamLink: document.querySelector('[data-team-open]'),
    closeFooterTeamBtn: document.querySelector('[data-team-close]'),
    footerTeam: document.querySelector('[data-team]'),
    body: document.querySelector('body'),
    footer: document.querySelector('.footer-container'),
  };
  if (refs.footer.classList.contains('footer-fixed')) {
    refs.footer.classList.remove('footer-fixed');
  }
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

  setTimeout(() => {
    if (refs.body.clientHeight < window.innerHeight) {
      refs.footer.classList.add('footer-fixed');
    }
    console.log(refs.body.clientHeight, window.innerHeight);
  }, 200);
})();
