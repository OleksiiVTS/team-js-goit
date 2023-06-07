
const libraryFilter = document.querySelector('.library-filter');
const boxLibraryCinema = document.querySelector('.library');
const libraryCinema = JSON.parse(localStorage.getItem('libraryFilms'));


libraryFilter.addEventListener('input', () => {
  for (const {genres} of libraryCinema) {

    for (const {id} of genres) {
      console.log(id)
    }
  }
})

let filtrFilmCinema = [];
const filterCinemaniaParse = JSON.parse(localStorage.getItem('filterCinemania'));

libraryFilter.addEventListener('input', () => {
  for (const film of libraryCinema) {
    for (const { id } of film.genres) {
      if (id === Number(libraryFilter.value)) {
        
        filtrFilmCinema.push(film)
        localStorage.setItem('filterCinemania', JSON.stringify(filtrFilmCinema));
      }
    }
  }
});


function loadLibrary1(filterCinemaniaParse) {
  const libr = filterCinemaniaParse
    .map(
      ({
        title,
        backgroundImage,
        overview,
        vote_average,
        vote_count,
        release_date,
        popularity,
        genres,
      }) => {
        return `<a href="" data-id-movie="">
  <div class="movie-card overlay-card">
  <img class="gallery__image" src="${
    'https://image.tmdb.org/t/p/w400' + backgroundImage
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
        Rating: ${(vote_count / 2).toFixed(1)}
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


setTimeout(() => {
  boxLibraryCinema.innerHTML = '';
  boxLibraryCinema.insertAdjacentHTML('beforeend', loadLibrary1(filterCinemaniaParse));
}, 500);












// function clearMarkup() {
//   boxLibrary.innerHTML = ``;
// }

