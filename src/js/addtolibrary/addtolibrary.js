// const API_KEY = 'caed7e2ebd11bebde344d1e5386bdf39';

const selectEl = document.querySelector('.library-filter');
const boxLibrary = document.querySelector('.library');

const library = JSON.parse(localStorage.getItem('libraryFilms'));

// console.log(library);
// loadLibrary(library);
setTimeout(() => {
  boxLibrary.innerHTML = '';
  boxLibrary.insertAdjacentHTML('beforeend', loadLibrary(library));
}, 500);

// filter

selectEl.addEventListener('input', () => {
  for (const film of library) {
    for (const { id } of film.genres) {
      if (id === Number(selectEl.value)) {
        
        

      }
    }
  }
});

// filter

function loadLibrary(library) {
  const libr = library
    .map(
      ({
        title,
        backgroundImage,
        overview,
        vote_average,
        vote_count,
        poster_path,
        release_date,
        popularity,
        genres,
      }) => {
        return `<a href="" data-id-movie="">
  <div class="movie-card overlay-card">
  <img class="gallery__image" src="${
    'https://image.tmdb.org/t/p/w400' + poster_path
  }" alt="${title}" loading="lazy"/>
  <div class="gallery__up_image"></div>
  <div class="catalog_info">
    <h2 class="catalog_title">
    ${title}
    </h2>
      <div class="ganres_rating">
        <p class="catalog_genres">

        </p>
        <p class="catalog_rating">
        Rating: ${vote_average}
      </p>
      </div>
  </div>
  </div>
  </a>`;
      }
    )
    .join('');

  return libr;
}
