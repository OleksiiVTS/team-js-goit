// Запит через клас
import Gallery from '../class/Gallery.js';
import moviesTrendsWeek from '../catalog-net/catalog-net.js';

import Pagination from 'tui-pagination';
// import filmsAPIService from '../catalog-net/api-service.js';

const url = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';
let query = '';
// import axios from 'axios';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';

const catalogSearchForm = document.querySelector('.catalog-search-input');
const catalogSearchSubmitBtn = document.querySelector('.button-round-search');
if (catalogSearchSubmitBtn) {
  catalogSearchSubmitBtn.addEventListener('click', onSubmit);
}

function onError(error) {
  console.log(error);
  disableSpinner();
}

const gallery = new Gallery({
  name: 'searchTest',
  selector: '.catalog-gallery', // куди виводимо сформований HTML-код
  url: '/search/movie', // частина шляху для запиту
  query: '', // сам запит, те що стоїть після знаку ?
});

const paginationOptions = {
   totalItems: 500,
        itemsPerPage: gallery.perPage,
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
if (container) {
  let paginationSearch = new Pagination(container, paginationOptions);

  //Pagination first start with response from API and create total_pages
  //Go to Homepage-rendering.js
  //
  const paginationPage = paginationSearch.getCurrentPage();
  paginationSearch.on('afterMove', function (eventData) {
    gallery.page = eventData.page;
    gallery.onMarkup();
  });

  // function creatingTotalResultsPagination(res) {
  //   paginationSearch.reset(res.data.total_results);
  // };
}


function onSubmit(event) {
  try {
    event.preventDefault();

    const value = catalogSearchForm.value.trim();
    if (value === '') return;
    else {
      gallery.params.query = value;
      
      gallery.resetPage();
      paginationSearch.reset();

      // if (gallery.totalResults === 0) throw new Error('No data');
      gallery.onMarkup();

    }
  } catch (error) {
    onError(error);
  }
}