(() => {
  const refs = {
    openFooterTeamLink: document.querySelector('[data-team-open]'),
    closeFooterTeamBtn: document.querySelector('[data-team-close]'),
    footerTeam: document.querySelector('[data-team]'),
    body: document.querySelector('body'),
  };

  refs.openFooterTeamLink.addEventListener('click', toggleTeam);
  refs.closeFooterTeamBtn.addEventListener('click', toggleTeam);

  function toggleTeam() {
    refs.footerTeam.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }
})();
