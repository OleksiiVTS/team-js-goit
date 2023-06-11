// import axios from 'axios';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';
import Pagination from 'tui-pagination';
import { stylePagination } from '../js-header/header.js';

// const url = 'https://api.themoviedb.org/3/search/movie';
// const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';

const formEl = document.querySelector('.form-search')
const catalogSearchForm = document.querySelector('.catalog-search-input');
const btnSearch = document.getElementById('btn-search')
btnSearch.addEventListener('click', onSubmit);


const refs = {
  footer: document.querySelector('.footer-container'),
  body: document.querySelector('body'),
};


function onError(error) {
  console.log(error);
  disableSpinner();
}

// Запит через клас
import Gallery from '../class/Gallery.js';

// тренди тиждня
const moviesTrendsWeek = new Gallery({
  name: 'moviesTrendsWeek',
  selector: '.catalog-gallery', // куди виводимо сформований HTML-код
  url: '/trending/movie/week', // частина шляху для запиту
  query: `''&language=en`, // сам запит, те що стоъть після знаку ?
});


  moviesTrendsWeek.onMarkup(moviesTrendsWeek.TemplateMovieCard)
    .then((resp) => {
      initPagination(resp)  
    }).catch(
      // onError('StartWeek no Pagination')
    );
  
// для пошуку
const gallery = new Gallery({
  name: 'searchTest',
  selector: '.catalog-gallery', // куди виводимо сформований HTML-код
  url: '/search/movie', // частина шляху для запиту
  query: `''`, // сам запит, те що стоъть після знаку ?
});

async function onSubmit(event) {
  try {
    event.preventDefault();

    const value = catalogSearchForm.value.trim()
    if (value === '') {

      moviesTrendsWeek.onMarkup(moviesTrendsWeek.TemplateMovieCard)
        .then((resp) => {
          initPagination(resp)  
        }).catch(
          // onError('Week no Pagination')
        );
      
    } else {

      gallery.params.query = value;
      gallery.resetPage();

      gallery.onMarkup(gallery.TemplateMovieCard) 
        .then((resp) => {
          initPagination(resp)  
        }).catch(
          // onError('Search no Pagination')
        );

    }
    
    formEl.reset()

  } catch (error) {
    onError(error);
  }
}

/// Пагінація
export async function initPagination(objGallery) {
  const res = await objGallery
  //console.log('initPagination -> ', objGallery.name, res);

  const container = document.querySelector('.tui-pagination');
  container.innerHTML = ''

  if (!res.totalResults) { 
    if(container) {
      const noFilm = document.querySelector('.m-w-t-value')
      const catalog = document.querySelector('.catalog-gallery')
      catalog.insertAdjacentHTML('beforeend', noFilm.innerHTML);
    }
    
    return false //new Pagination(container)
  }

  const paginationOptions = {
    totalItems: objGallery.totalPages * objGallery.perPage,
    itemsPerPage: objGallery.perPage,
    visiblePages: objGallery.totalPages < 5 ? objGallery.totalPages : 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  
  let pagination;
  if (container) {
    pagination = new Pagination(container, paginationOptions);
    pagination.reset();

    //console.log(pagination);
    //Pagination first start with response from API and create total_pages
    //Go to Homepage-rendering.js
    //
    pagination.movePageTo(objGallery.page);
    pagination.getCurrentPage();
    pagination.on('afterMove', function (eventData) {
      objGallery.page = eventData.page;
      objGallery.onMarkup(objGallery.TemplateMovieCard);
      stylePagination();
    });
  }
  return true
}
