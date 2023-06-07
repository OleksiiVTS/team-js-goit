(() => {
  const refs = {
    openFooterTeamLink: document.querySelector('[data-team-open]'),
    closeFooterTeamBtn: document.querySelector('[data-team-close]'),
    footerTeam: document.querySelector('[data-team]'),
    body: document.querySelector('body'),
  };

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

  // const main = document.querySelector('main');
  // console.log(
  //   refs.body.clientHeight,
  //   refs.body.scrollHeight,
  //   refs.body.offsetHeight
  // );
  // console.log(main.clientHeight, main.scrollHeight, main.offsetHeight);
})();
