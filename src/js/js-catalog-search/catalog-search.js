const url = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';
let query = '';
import axios from 'axios';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';

const catalogSearchForm = document.querySelector('.catalog-search-input');
const catalogSearchSubmitBtn = document.querySelector('.button-round-search');
catalogSearchSubmitBtn.addEventListener('click', onSubmit);

console.log(5);

// Запит локально
// async function onSubmit(event) {
//   try {
//     event.preventDefault();

//     const value = catalogSearchForm.value.trim();
//     if (value === '') return;
//     else {
//       enableSpinner();

//       const { data } = await getMovies(value);

//       if (data.results.length === 0) throw new Error('No data');
//       disableSpinner();
//       console.log(data.results);
//     }
//   } catch (error) {
//     onError(error);
//   }
// }

// // Запит на сервер
// async function getMovies(query) {
//   try {
//     const response = await axios.get(
//       `${url}?query=${query}&api_key=${API_KEY}`
//     );

//     return response;
//   } catch (error) {
//     onError(error);
//   }
// }

function onError(error) {
  console.log(error);
  disableSpinner();
}

// Запит через клас
import Pagination from 'tui-pagination';
import Gallery from '../class/Gallery.js';
import MoviesTrendsWeek from '../catalog-net/catalog-net.js';

import 'tui-pagination/dist/tui-pagination.min.css';

import filmsAPIService from '../catalog-net/api-service.js';

const container = document.querySelector('.tui-pagination');
const paginationOptions = {
  totalItems: 500,
  itemsPerPage: 9,
  visiblePages: 5,
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
    if (value === '') return;
    else {
      gallery.params.query = value;
      gallery.resetPage();
      if (gallery.totalResults === 0) throw new Error('No data');
      gallery.onMarkup(templateTest);

      creatingTotalResultsPagination();
    }
  } catch (error) {
    onError(error);
  }
}

function templateTest(data) {
  const {
    poster_path,
    original_title,
    title,
    vote_average,
    release_date,
    genres,
    id,
  } = data;

  return `<a href="" data-id-movie="${id}">
  <div class="movie-card overlay-card">
  <img class="gallery__image" src="${
    'https://image.tmdb.org/t/p/w400' + poster_path
  }" alt="${original_title}" loading="lazy"/>
  <div class="gallery__up_image"></div>
  <div class="catalog_info">
    <h2 class="catalog_title">
    ${title}
    </h2>
      <div class="ganres_rating">
        <p class="catalog_genres">
        ${gallery.convertId_to_Name(data.genre_ids)} | ${release_date}
        </p>
        <p class="catalog_rating">
        Rating: ${(vote_average / 2).toFixed(1)}
      </p>
      </div>
  </div>
  </div>
  </a>`;
}
function creatingTotalResultsPagination() {
  paginationSearch.reset();
}

if (container) {
  const paginationSearch = new Pagination(container, paginationOptions);

  const paginationPage = paginationSearch.getCurrentPage();
  paginationSearch.on('afterMove', function (eventData) {
    gallery.page = eventData.page;
    gallery.onMarkup(templateTest, paginationSearch._options.itemsPerPage);
  });
}
