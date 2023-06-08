import GenreList from '../class/GenreList.js';

const cl_Genres = new GenreList({
  selector: '.select',
  url: '/genre/movie/list',
  query: 'language=en',
});
cl_Genres.getGenreList();

// convert genres
function convertId_to_Name(aGenre) {
  list = cl_Genres.importFromLS();
  if (!aGenre) { 
    return
  }

  const result = aGenre.map(item => {
    const obj = list.find(el => el.id === item);
    return obj ? obj.name : null;
  });

  return result.join(', ');
}

const boxLibraryCinema = document.querySelector('.library');
const libraryCinema = JSON.parse(localStorage.getItem('libraryFilms'));

// слухач події клік на селекторі 
window.addEventListener('click', (event) => {
  if ( event.view.location.pathname === '/library.html' ||
       event.view.location.pathname === '/team-js-goit/library.html') {
    return document
      .querySelector('.library-filter')
      .addEventListener('input', onLibreryFilter);
  }
  return;
});
onMarkup(libraryCinema)

// отримуемо потрібний масив даних для розмітки і виводу на сторінку
function onLibreryFilter(event) {
  const genre = Number(event.currentTarget.value);
  console.log(genre, isNaN(genre));
  if (isNaN(genre)){
    onMarkup(libraryCinema)
    return
  }
  // const filter = libraryCinema.filter(element => {
  //   return element.genres.some(item => item.id === genre);

  const filter = libraryCinema.filter(element => {
    return element.genre_ids.some(item => item === genre);
  });
    
  // console.log(filter);
  
  onMarkup(filter);
}

// створення розмітки
function onMarkup(data){
  const cards = createCard(data)
  update(cards)
}

// вивід даних на сторінку
function update(data) {
  if (boxLibraryCinema) {
    boxLibraryCinema.innerHTML = '';
    boxLibraryCinema.insertAdjacentHTML("beforeend", data);
  }
}

// обгортання елементу масиву хтмл-кодом
function createCard(data){
  return data.reduce(
    (acc, item) => {
     return acc + TemplateMovieCard(item)
   }, "");
}

// шаблон
function TemplateMovieCard( data ) {
  const { 
    poster_path, 
    original_title, 
    title, 
    vote_average, 
    release_date, 
    id
  } = data;

        let aGenres = null;
        if (data.genres) { 
          aGenres = data.genres.map(e => e.name).slice(0, 2).join(', ')
        } else {
          aGenres = convertId_to_Name(data.genres_ids)
        }

  // const aGenres = data.genres.slice(0, 2);

  return `<a href="" data-id-movie="${id}">
  <div class="movie-card overlay-card" data-id-movie="${id}">
      <img class="gallery__image" src="${
        'https://image.tmdb.org/t/p/w400' + poster_path
      }" alt="${title ? title : original_title}" loading="lazy"/>
      <div class="gallery__up_image"></div>
      <div class="catalog_info">
        <h2 class="catalog_title">
        ${title ? title : original_title}
        </h2>
          <div class="ganres_rating">
            <p class="catalog_genres">
            ${aGenres} | ${release_date.slice(0, 4)}
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


function emptyLibraryMarkup() {
  if (libraryCinema.length === 0) {
    document.querySelector('.library-filter').style.display = 'none';

    return `<div class="empty-library"> 
      <p class="empty-library-text">OOPS...<br/> We are very sorry! <br/> You don’t have any movies in your library.</p>
      <button type="button" class="button-watch-trailer">
        <a class="hero-href"  href="../src/partials/catalog/catalog-catalog.html">Search movie</a>
      </button>
    </div>`;
  }
}

if (boxLibraryCinema) {
  boxLibraryCinema.insertAdjacentHTML('beforeend', emptyLibraryMarkup());
}