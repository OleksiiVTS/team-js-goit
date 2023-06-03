const spinnerCinema = document.querySelector('.loader-cinemania')

function disableSpinner() {
  spinnerCinema.classList.add('is-hidden')
}

function enableSpinner() {
  spinnerCinema.classList.remove('is-hidden')
}

export {disableSpinner, enableSpinner}