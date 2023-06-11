import GenreList from '../class/GenreList.js';
import { styleModal } from "../js-header/header.js";
let libraryLengthFactor = 1
const cl_Genres = new GenreList({
  selector: '.select',
  url: '/genre/movie/list',
  query: 'language=en',
});
cl_Genres.getGenreList();

// convert genres
function convertId_to_Name(aGenre) {
  const list = cl_Genres.importFromLS();
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
let libraryCinema = JSON.parse(localStorage.getItem('libraryFilms'));

const select = document.querySelector('.library-filter');
if (select) {
  select.addEventListener('input', onLibreryFilter);
}
// слухач події клік на селекторі 
// window.addEventListener('click', (event) => {
//   if ( event.view.location.pathname === '/library.html' ||
//        event.view.location.pathname === '/team-js-goit/library.html') {
         
//     return document
//     .querySelector('.library-filter')
//     .addEventListener('input', onLibreryFilter);
//   }
//   return;
// });

onMarkup(libraryCinema);

// отримуемо потрібний масив даних для розмітки і виводу на сторінку
function onLibreryFilter(event) {
  const genre = Number(select.value);

  try {
    
    libraryCinema = JSON.parse(localStorage.getItem('libraryFilms'));
    if(libraryCinema.length === 0) {
      throw new Error("масив пустий")
    }


    if (isNaN(genre)) {
      onMarkup(libraryCinema)
      return
    }

    const filter = libraryCinema.filter(element => {
      if (element.genres) {
        return element.genres.some(item => item.id === genre);
      } else {
        return element.genre_ids.some(item => item === genre);
      }
    });
  
    onMarkup(filter);
  } catch (error) {
    onError(error);
  }
}

// створення розмітки
function onMarkup(data){
  const cards = createCard(data)
  visibleButton();
  update(cards)
  managerModal();
  showEmptyLibrary();
}

// вивід даних на сторінку
function update(data) {
  if (boxLibraryCinema) {
    boxLibraryCinema.innerHTML = '';
    boxLibraryCinema.insertAdjacentHTML("beforeend", data);
  }
}

// обгортання елементу масиву хтмл-кодом
function createCard(data, count = 9 * libraryLengthFactor) {
  
  return data.slice(0, count).reduce(
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
    aGenres = convertId_to_Name(data.genre_ids.slice(0, 2))
  }
  let strGenres = aGenres
  if (aGenres.length > 20) {
    strGenres = aGenres.split(',')[0];
  }

  let pictureCard = "";
  let properties = "";

  if (poster_path===null) {
    pictureCard = "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
    properties = "style=padding-top:150px";
  } else pictureCard = 'https://image.tmdb.org/t/p/w400' + poster_path;

  return `<a href="" data-id-movie="${id ? id: 0}">
  <div ${properties} class="movie-card overlay-card" data-id-movie="${id ? id: 0}">
      <img class="gallery__image" src="${pictureCard}" alt="${title ? title : original_title}" loading="lazy"/>
      <div class="gallery__up_image"></div>
      <div class="catalog_info">
        <h2 class="catalog_title">
        ${title ? title : original_title}
        </h2>
          <div class="ganres_rating">
            <p class="catalog_genres">
            ${strGenres} | ${release_date.slice(0, 4)}
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

// кнопка Load more //

// console.log(localStorageLength)

function visibleButton() {
  const loadMoreBtn = document.querySelector('.load-more')
  const localStorageLength = JSON.parse(localStorage.getItem("libraryFilms"))

  if (localStorageLength.length > 9) {
    loadMoreBtn.classList.remove('is-hidden')
    loadMoreBtn.addEventListener('click', onLoadMore)
  } else {
    loadMoreBtn.classList.add('is-hidden')
  } 

  function onLoadMore() {
    libraryLengthFactor += 1;
    onMarkup(libraryCinema);
  }

}






// если пустой список
function emptyLibraryMarkup() {
  if (libraryCinema.length === 0) {
    document.querySelector('.library-filter').style.display = 'none';

    return `<div class="empty-library"> 
      <p class="empty-library-text">OOPS...<br/> We are very sorry! <br/> You don’t have any movies in your library.</p>
      <button type="button" class="button-watch-trailer">
        <a class="hero-href"  href="./catalog.html">Search movie</a>
      </button>
    </div>`;
  }
}

function showEmptyLibrary() {
  if (boxLibraryCinema) {
    const result = emptyLibraryMarkup();
    if (result) {
      boxLibraryCinema.innerHTML = '';
      boxLibraryCinema.insertAdjacentHTML('beforeend', result);
    }
  }
}

function onError(error) {
  console.log(error);
}

//=======
function createModal(data) {
    const {
      title,
      original_title,
      poster_path,
      vote_average,
      vote_count,
      popularity,
      overview,
      genre_ids,
    } = data;

    let btn = 'Add to My Library';
    const libraryFilms = JSON.parse(localStorage.getItem('libraryFilms')) || [];

    for (const film of libraryFilms) {
      if (film.title === title || film.original_title === title) {
        btn = 'Remove from My Library';
      }
    }

    let aGenres = null;
    if (data.genres) { 
      aGenres = data.genres.map(e => e.name).slice(0, 2).join(', ')
    } else {
      aGenres = convertId_to_Name(data.genre_ids.slice(0, 2))
    }
    let strGenres = aGenres
    if (aGenres.length > 20) {
      strGenres = aGenres.split(',')[0];
    }

    const modal = document.getElementById('moreDetails');
    modal.classList.remove('more-details-is-hidden');

    let pictureCard = '';
    let properties = '';

    if (poster_path===null) {
      pictureCard = "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
      properties = "style=padding-top:130px";
    } else pictureCard = "https://image.tmdb.org/t/p/w400" + poster_path;


    modal.innerHTML = `
      <div class="more-details-modal">
        <div class="close-button-box">
          <button class="more-details-close-button" id="closeDetails" type="button">X</button>
        </div>
        <div ${properties} class="details-wrapper">
          <div class="more-details-img-box">
            <img width="380px" class="more-detail-img" src="${pictureCard}" alt="${title}" />
          </div>
          <div class="more-details-info">
            <h2 class="film-title">${title ? title : original_title}</h2>
            <table>
              <tr>
                <td class="table-row table-column-name">Vote / Votes:</td>
                <td><span class="vote-average">${vote_average}</span> / <span class="vote-count">${vote_count}</span></td>
              </tr>
              <tr>
                <td class="table-row table-column-name">Popularity:</td>
                <td>${popularity}</td>
              </tr>
              <tr>
                <td class="table-row table-column-name">Genre:</td>
                <td>${strGenres}</td>
              </tr>
            </table>
            <span class="description-about">About:</span>
            <span class="more-details-about">${overview}</span>
            <div class="more-details-adml-box">
              <button id="addToLibraryButton" class="button-rem-me">${btn}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // close modal window
    const closeBtn = modal.querySelector('#closeDetails');
    closeBtn.addEventListener('click', closeModal);

    const addToLibraryButton = modal.querySelector('#addToLibraryButton');
    addToLibraryButton.addEventListener('click', () => {
      addToLibrary(data);
    });
  }

function closeModal() { 
  const modal = document.getElementById('moreDetails');
  document.body.style.overflow = 'visible';
  modal.classList.add('more-details-is-hidden');
  document.removeEventListener("keydown", onEscape);
  
  onLibreryFilter();
  showEmptyLibrary();
}
  
// закриття модалки по ESC
function onEscape(event) {
  if (event.key === "Escape") closeModal()
}

  function addToLibrary(film) {
    try {
      const addButton = document.getElementById('addToLibraryButton');
      const libraryFilms =
        JSON.parse(localStorage.getItem('libraryFilms')) || [];

      const filmTitle = (film.title || film.original_title);

      if (addButton.textContent === 'Add to My Library') {
        addButton.textContent = 'Remove from My Library';

        libraryFilms.push(film);
        localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
      } else {
        addButton.textContent = 'Add to My Library';

        const index = libraryFilms.findIndex(
          filmItem => filmItem.title === filmTitle || filmItem.original_title === filmTitle
        );
        if (index !== -1) {
          libraryFilms.splice(index, 1);
          localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));

          // libraryCinema = JSON.parse(localStorage.getItem('libraryFilms'))
          // console.log(libraryCinema);
          // onMarkup(libraryCinema)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function managerModal() {
    // якщо області виводу не має, значить не та сторінка
    if (!boxLibraryCinema) {
      return;
    }

    const movieCards = boxLibraryCinema.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
      const movieId = Number(card.dataset.idMovie);

      let list = libraryCinema;
      if (list.length === 0) { 
        throw Error("Список бібліотеки пустий")
        return
      }
      const data = list.filter(item => item.id === movieId);

      // console.log(data);
      if (data.length === 0) {
        throw Error('у об`єктів повинні бути id')
        return
      }
      card.addEventListener('click', event => {
        event.preventDefault();
        document.body.style.overflow = 'hidden';
        document.addEventListener("keydown", onEscape);
        
        createModal(data[0]);
        setTimeout(styleModal, 0) // toogle style dark/light
      });
    });
  }

