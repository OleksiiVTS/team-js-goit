// const API_KEY = 'caed7e2ebd11bebde344d1e5386bdf39';

const selectEl = document.querySelector('.library-filter');
const boxLibrary = document.querySelector('.library');

const library = JSON.parse(localStorage.getItem('libraryFilms'));


loadLibrary(library);
  boxLibrary.innerHTML = '';
  boxLibrary.insertAdjacentHTML('beforeend', loadLibrary(library));



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
        if (library.length <= 9) {
          1
        }

        let nameOfGanre = [];
        // const aGenres = data.genre_ids.slice(0, 2);
        for (const { name } of genres) {
          nameOfGanre.push(name);
        }

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
            ${nameOfGanre.slice(0, 2).join(', ')} | ${release_date.slice(0, 4)}
            </p>
            <div class="rating">
            <div class="rating__body">
              <div class="rating__active" style="width: ${
                vote_average.toFixed(1) * 10
              }%;"></div>
              <div class="rating__items">
                <input type="radio" class="rating__item" name="rating" value="1">
                <input type="radio" class="rating__item" name="rating" value="2">
                <input type="radio" class="rating__item" name="rating" value="3">
                <input type="radio" class="rating__item" name="rating" value="4">
                <input type="radio" class="rating__item" name="rating" value="5">
              </div>
            </div>
          </div>
          </div>
      </div>
      </div>
      </a>`;
      }
    )
    .join('');

  return libr;
}
