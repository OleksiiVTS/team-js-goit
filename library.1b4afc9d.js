!function(){var e={openFooterTeamLink:document.querySelector("[data-team-open]"),closeFooterTeamBtn:document.querySelector("[data-team-close]"),footerTeam:document.querySelector("[data-team]"),body:document.querySelector("body"),footer:document.querySelector(".footer-container")};function o(){e.footerTeam.classList.toggle("is-hidden"),e.body.classList.remove("no-scroll"),document.removeEventListener("keydown",t),window.removeEventListener("click",n)}function t(e){"Escape"===e.key&&o()}function n(t){t.target===e.footerTeam&&o()}e.openFooterTeamLink.addEventListener("click",(function(){e.footerTeam.classList.toggle("is-hidden"),e.body.classList.add("no-scroll"),document.addEventListener("keydown",t),window.addEventListener("click",n)})),e.closeFooterTeamBtn.addEventListener("click",o),setTimeout((function(){e.body.clientHeight<window.innerHeight&&e.footer.classList.add("footer-fixed"),console.log(e.body.clientHeight,window.innerHeight)}),200)}();
//# sourceMappingURL=library.1b4afc9d.js.map