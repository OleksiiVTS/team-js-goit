import Gallery from '../class/Gallery.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import filmsAPIService from './api-service';

// const API_KEY = '45b8ac4dc4bcb28ba01349825b9d5176';
// const URL = 'https://api.themoviedb.org/3/trending/all/week';

// екземпляр класа до відображення трендових фільмів на неділю
const moviesTrendsWeek = new Gallery({
  name: 'moviesTrendsWeek',
  selector: ".catalog-gallery",         // куди виводимо сформований HTML-код 
  url: '/trending/movie/week',   // частина шляху для запиту
  query: 'language=en'          // сам запит, те що стоъть після знаку ?
});

function TemplateTrendsWeek( data ) {
  const { poster_path, original_title, title, vote_average, release_date, genres} = data;

  return `<div class="movie-card overlay-card">
  <img class= "gallery__image" src="${'https://image.tmdb.org/t/p/w400'+poster_path}" alt="${original_title}" loading="lazy" />
  <div class="catalog_info">
    <h2 class="catalog_title">
    ${title}
    </h2>
      <div class="ganres_rating">
        <p class="catalog_genres">
        ${moviesTrendsWeek.convertId_to_Name(data.genre_ids, genres)} | ${release_date}
        </p>
        <p class="catalog_rating">
        Rating: ${(vote_average / 2).toFixed(1)}
      </p>
      </div>
  </div>
  </div>`
}

moviesTrendsWeek.onMarkup(TemplateTrendsWeek);

const paginationOptions = {
   totalItems: 500, //moviesTrendsWeek.totalPages,
        itemsPerPage: 10,
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
let pagination = new Pagination('.tui-pagination', paginationOptions);
  




//Pagination first start with response from API and create total_pages
//Go to Homepage-rendering.js
//
const paginationPage = pagination.getCurrentPage();
pagination.on('afterMove', function(eventData) {
  moviesTrendsWeek.page = eventData.page;
  moviesTrendsWeek.params.page = eventData.page;
  moviesTrendsWeek.onMarkup(TemplateTrendsWeek);
});

function creatingTotalResultsPagination(res) {
    pagination.reset(res.data.total_results);
};

// async function onFetchData() {
//   try {
//     const response = await fetch(`${URL}?api_key=${API_KEY}&backdrop_path&original_title&title=&popularity&language=en-US`)
//   const data = await response.json()
   
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     } else {
//       return data;
//     }
//   }  catch (error) {
//     console.log('Помилка при запиті на сервер', error)
//   }
// }
// onFetchData()
//   .then((data) => {
//     // console.log("Отримання даних про фильми тижня:", data.results);
//     onCreateMarkupCard(data.results)
//   })

//     function onCreateMarkupCard(data) {
//       const catalogGalleryEl = document.querySelector('.catalog-gallery');
//       catalogGalleryEl.insertAdjacentHTML('beforeend', data.reduce((card, { poster_path, original_title, title, vote_average }) => {
//         return (card + `
//   <div class="movie-card">
//   <img class= "gallery__image" src="${'https://image.tmdb.org/t/p/w300'+poster_path}" alt="${original_title}" loading="lazy" />
//   <div class="info overlay">
//     <p class="info-item">
//       <b>Назва:
//       ${title}</b>
//       </p>
//       <p class="info-item">
//       <b>Рейтинг:
//       ${vote_average}</b>
//     </p>
//   </div>
//   </div>
//   `)
//       }, ''
// ));
// };

