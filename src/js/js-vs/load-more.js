const loadMoreBtn = document.querySelector('.load-more')

// console.log(loadMoreBtn)

// loadMoreBtn.addEventListener('click' onLoadMore)

function enableBtnLoadMore() {
  loadMoreBtn.classList.remove('is-hidden')
}

function disableBtnLoadMore() {
  loadMoreBtn.classList.add('is-hidden')
}

