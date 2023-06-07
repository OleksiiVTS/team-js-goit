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

// отримуемо потрібний масив даних для розмітки і виводу на сторінку
function onLibreryFilter(event) {
  const genre = Number(event.currentTarget.value);
  if (!genre){
    onMarkup(libraryCinema)
    return
  }

  const filter = libraryCinema.filter(element => {
    return element.genres.some(item => item.id === genre);
  });
    
  console.log(filter);
  
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

  const aGenres = data.genres.slice(0, 2);

  return `<a href="${data}" data-id-movie="${id}">
  <div class="movie-card overlay-card">
  <img class="gallery__image" src="${'https://image.tmdb.org/t/p/w400'+poster_path}" alt="${original_title}" loading="lazy"/>
  <div class="gallery__up_image"></div>
  <div class="catalog_info">
    <h2 class="catalog_title">
    ${title}
    </h2>
      <div class="ganres_rating">
        <p class="catalog_genres">
        $${aGenres.map(e => e.name).join(', ')} | ${release_date.slice(0, 4)}
        </p>
        <div class="rating">
        <div class="rating__body">
          <div class="rating__active" style="width: ${vote_average.toFixed(1) * 10}%;"></div>
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
  </a>`
}

