const url = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';
let query = '';
// import axios from 'axios';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';
import Pagination from 'tui-pagination';
import { stylePagination } from '../js-header/header.js';

const catalogSearchForm = document.querySelector('.catalog-search-input');

const btnSearch = document.getElementById('btn-search');
if( btnSearch) {
  btnSearch.addEventListener('click', onSubmit);
}
// window.addEventListener('click', function (event) {
//   if ( event.view.location.pathname === '/catalog.html' ||
//        event.view.location.pathname === '/team-js-goit/catalog.html') {
//     return document
//       .getElementById('btn-search')
//       .addEventListener('click', onSubmit);
//   }
//   return;
// });

function onError(error) {
  console.log(error);
  disableSpinner();
}

// Запит через клас
import Gallery from '../class/Gallery.js';

// тренди тиждня
const moviesTrendsWeek = new Gallery({
  name: 'moviesTrendsWeek',
  selector: ".catalog-gallery",         // куди виводимо сформований HTML-код 
  url: '/trending/movie/week',   // частина шляху для запиту
  query: '""&language=en'          // сам запит, те що стоъть після знаку ?
});

moviesTrendsWeek.onMarkup(
  moviesTrendsWeek.TemplateMovieCard,
  moviesTrendsWeek.perPage
);
initPagination(moviesTrendsWeek);

// для пошуку
const gallery = new Gallery({
  name: 'searchTest',
  selector: '.catalog-gallery', // куди виводимо сформований HTML-код
  url: '/search/movie', // частина шляху для запиту
  query: '', // сам запит, те що стоъть після знаку ?
});

function onSubmit(event) {
  try {
    event.preventDefault();

    const value = catalogSearchForm.value.trim();
    if (value === '') {

      moviesTrendsWeek.onMarkup(
        moviesTrendsWeek.TemplateMovieCard,
        moviesTrendsWeek.perPage
      );

      initPagination(moviesTrendsWeek);
      return;
    }
    else {
      gallery.params.query = value;
     
      gallery.resetPage();
      // if (gallery.totalResults === 0) throw new Error('No data');
      
      gallery.onMarkup(
        gallery.TemplateMovieCard,
        gallery.perPage
      );

      initPagination(gallery);

    }
  } catch (error) {
    onError(error);
  }
}

/// Пагінація
export function initPagination(objGallery) {
  
  //console.log('Pagin-objGallery', objGallery);
  
  const paginationOptions = {
    totalItems: objGallery.totalPages > 1 ? objGallery.totalPages : 500,
    itemsPerPage: objGallery.perPage,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
        '</a>'
    }
  };

  const container = document.querySelector('.tui-pagination');
  let pagination
  if (container) {
    pagination = new Pagination(container, paginationOptions);
    pagination.reset();

    //Pagination first start with response from API and create total_pages
    //Go to Homepage-rendering.js
    //
    pagination.movePageTo(objGallery.page)
    const paginationPage = pagination.getCurrentPage();
    pagination.on('afterMove', function (eventData) {
      objGallery.page = eventData.page;
      objGallery.onMarkup(objGallery.TemplateMovieCard, objGallery.perPage);
      stylePagination();
    });

  }
}