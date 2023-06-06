const loadMoreBtn = document.querySelector('.load-more')

// console.log(loadMoreBtn)

// loadMoreBtn.addEventListener('click' onLoadMore)

function enableBtnLoadMore() {
  loadMoreBtn.classList.remove('is-hidden')
}

function disableBtnLoadMore() {
  loadMoreBtn.classList.add('is-hidden')
}

// const filterGenres = localStorage.getItem('moviesTrendsWeek')
// const parseFilterGenres = JSON.parse(filterGenres)
// if(parseFilterGenres.length >= 10) {
//   enableBtnLoadMore()
// }