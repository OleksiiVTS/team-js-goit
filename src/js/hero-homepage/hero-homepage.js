const heroRandomFilm = document.getElementById('hero-random-film');
const heroContainer = document.getElementById('hero-container');
const apiKey = '9073999c285844087924fd0e24160fae';
let randomFilmIndex;

async function fetchFilmData() {
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const { results } = await response.json();
    const filmIndexes = results.map(({ id }) => id);
    heroContainer.classList.add('hero-hide');
    return filmIndexes;
  } catch (error) {
    console.log('Помилка при виконанні запиту до API:', error);
  }
}

let filmDetails;
let trailerDetails;   ////!!!! - це зміни

async function getRandomFilm() {
  const filmIndexes = await fetchFilmData();
  const randomIndex = Math.floor(Math.random() * filmIndexes.length);
  randomFilmIndex = filmIndexes[randomIndex];
  const filmDetails = await getFilmDetails(randomFilmIndex);

  ////!!!!
  const trailerDetails = await getTrailerDetails(randomFilmIndex);

  return { filmDetails, trailerDetails };
}

async function getFilmDetails(filmIndex) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${filmIndex}?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const filmDetails = await response.json();
    return filmDetails;
  } catch (error) {
    console.log('Error occurred while making API request:', error);
  }
}


////!!!!
async function getTrailerDetails(filmIndex) { 
  const apiUrl = `https://api.themoviedb.org/3/movie/${filmIndex}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const trailerDetails = await response.json();
    return trailerDetails.results;
  } catch (error) {
    console.log('Error occurred while making API request:', error);
  }
}
////!!!!

function createFilmBox({ title, vote_average, backdrop_path, overview }) {
  const words = overview.split(' ');
  let truncatedOverview = words.slice(0, 30).join(' ');

  if (words.length > 30) {
    truncatedOverview += '...';
  }

  return `
    <section class="hero-section">
    <div class="container hero-container" style="background-image: linear-gradient(
      86.77deg,
      #111111 30.38%,
      rgba(17, 17, 17, 0) 65.61%
    ), url(https://image.tmdb.org/t/p/original/${backdrop_path});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;">
        <h1 class="hero-title">${title}</h1>
        <div class="hero-rating">
          <div class="hero-rating__body">
            <div class="hero-rating__active" style="width: ${
              vote_average.toFixed(1) * 10
            }%;"></div>
            <div class="hero-rating__items">
              <input type="radio" class="hero-rating__item" name="rating" value="1">
              <input type="radio" class="hero-rating__item" name="rating" value="2">
              <input type="radio" class="hero-rating__item" name="rating" value="3">
              <input type="radio" class="hero-rating__item" name="rating" value="4">
              <input type="radio" class="hero-rating__item" name="rating" value="5">
            </div>
          </div>
        </div>
        <p class="hero-text">${truncatedOverview}</p>
        <div class="hero-homepage-buttons">
          <button id="watchTrailerButton" class="button-watch-trailer">Watch trailer</button>
          <button id="moreDetailsButton" class="button-more-details">More Details</button>
        </div>
      </div>
    </section>
  `;
}

function createHTML(markup) {
  heroRandomFilm.insertAdjacentHTML('afterbegin', markup);
}

window.addEventListener('DOMContentLoaded', async () => {
  let libraryFilms = [];
  const libraryFilmsString = localStorage.getItem('libraryFilms');
  if (libraryFilmsString) {
    libraryFilms = JSON.parse(libraryFilmsString);
  } else {
    localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
  }

////!!!!
  const { filmDetails, trailerDetails } = await getRandomFilm();
  const [ offTrailer ] = trailerDetails.filter(e => e.name === "Official Trailer");
  const urlTrailer = `https://www.youtube.com/watch?v=${offTrailer.key}`;
  // const filmDetails = await getRandomFilm();
  // const trailerDetails = await getTrailerDetails();

////!!!!
  
  
  const filmBoxHTML = createFilmBox(filmDetails);
  createHTML(filmBoxHTML);

  const watchTrailerButton = document.getElementById('watchTrailerButton');
  watchTrailerButton.addEventListener('click', openModal);

  const watchDetailsButton = document.getElementById('moreDetailsButton');
  watchDetailsButton.addEventListener('click', openDetails);
});

const modalHero = document.getElementById('myModal');
const closeTrailerButton = document.getElementById('closeModal');
closeTrailerButton.addEventListener('click', closeModal);

function openModal() {
  modalHero.classList.toggle('m-w-t-is-hidden');
  document.addEventListener('keydown', escapeHandler);
  window.addEventListener('click', outsideClickHandler);
  disableScroll();
}

function closeModal() {
  modalHero.classList.toggle('m-w-t-is-hidden');
  document.removeEventListener('keydown', escapeHandler);
  window.removeEventListener('click', outsideClickHandler);
  enableScroll();
}

function escapeHandler(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function outsideClickHandler(event) {
  if (event.target === modalHero) {
    closeModal();
  }
}

// modal for More details
const modalDetails = document.getElementById('moreDetails');

function createDetailsBox({
  title,
  overview,
  vote_average,
  vote_count,
  release_date,
  popularity,
  genres,
  poster_path,
}) {
  let btn = 'Add to My Library';
  const library = JSON.parse(localStorage.getItem('libraryFilms'));

  for (const film of library) {
    if (film.title === title) {
      btn = 'Remove from My Library';
    }
  }

  const detailsBoxHTML = `
    <div class="more-details-modal">
      <div class="close-button-box">
        <button class="more-details-close-button" id="closeDetails" type="button">X
       </button>
      </div>
      <div class="details-wrapper">

      <div class="more-details-img-box">
        <img width="248px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" />
      </div>
      
      <div class="more-details-info">
        <h2 class="film-title-modal film-title">${title}</h2>

        <table>
        <tr>
          <td class="table-row table-column-name">Vote / Votes:</td>
          <td ><span class="vote-average">${vote_average.toFixed(1)}</span> /
          <span class="vote-count">${vote_count}</span>
       </td>
        </tr>
        <tr>
          <td class="table-row table-column-name">Popularity:</td>
          <td>${popularity.toFixed(1)}</td>
        </tr>
        <tr>
        <td class="table-row table-column-name">Genre:</td>
        <td >${genres.map(genre => genre.name).join(', ')}</td>
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
    </div>
  `;

  return detailsBoxHTML;
}

const closeDetailsButton = document.getElementById('closeDetails');

function createMoreDetails(markup) {
  clearDetailsBox();
  modalDetails.insertAdjacentHTML('afterbegin', markup);
}

async function openDetails() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  modalDetails.classList.toggle('more-details-is-hidden');
  document.addEventListener('keydown', escapeHandlerDetails);
  window.addEventListener('click', outsideClickHandlerDetails);

  const filmDetails = await getFilmDetails(randomFilmIndex);
  const detailsBoxHTML = createDetailsBox(filmDetails);
  createMoreDetails(detailsBoxHTML);
  if (localStorage.getItem('ui-theme') === 'dark') {
  } else {
    document.querySelector('.more-details-modal').style.backgroundColor =
      '#FFFFFF';
    document.querySelector('.more-details-modal').style.boxShadow =
      '1px 1px 14px 4px rgba(0, 0, 0, 0.22)';
    document.querySelector('.more-details-close-button').style.color =
      '#282828';
    document.querySelector('.film-title').style.color = '#111111';
    document.querySelector('.more-details-about').style.color = '#282828';
    document.querySelector('.description-about').style.color = '#111111';
    const aboutTableEl = [...document.getElementsByTagName('td')];
    for (let element of aboutTableEl) {
      element.style.color = '#111111';
    }
  }

  document
    .getElementById('closeDetails')
    .addEventListener('click', closeDetails);

  document
    .getElementById('addToLibraryButton')
    .addEventListener('click', toggleLibraryFilm);
}

async function toggleLibraryFilm() {
  const addButton = document.querySelector('.button-rem-me');
  const filmDetails = await getFilmDetails(randomFilmIndex);
  const libraryFilms = getLibraryFilms();

  if (addButton.textContent === 'Add to My Library') {
    addButton.textContent = 'Remove from My Library';

    const index = libraryFilms.findIndex(
      film => film.title === filmDetails.title
    );
    if (index === -1) {
      libraryFilms.push(filmDetails);
      localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
    }
  } else {
    addButton.textContent = 'Add to My Library';

    const index = libraryFilms.findIndex(
      film => film.title === filmDetails.title
    );
    if (index !== -1) {
      libraryFilms.splice(index, 1);
      localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
    }
  }
}

function getLibraryFilms() {
  let libraryFilms = [];
  const libraryFilmsString = localStorage.getItem('libraryFilms');
  if (libraryFilmsString) {
    libraryFilms = JSON.parse(libraryFilmsString);
  } else {
    localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
  }
  return libraryFilms;
}

function closeDetails() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';

  enableScroll();
  modalDetails.classList.toggle('more-details-is-hidden');
  document.removeEventListener('keydown', escapeHandlerDetails);
  window.removeEventListener('click', outsideClickHandlerDetails);
  // detailsOpened = false;
  clearDetailsBox();
}

function escapeHandlerDetails(event) {
  if (event.key === 'Escape') {
    closeDetails();
  }
}

function outsideClickHandlerDetails(event) {
  if (event.target === modalDetails) {
    closeDetails();
  }
}

function clearDetailsBox() {
  modalDetails.innerHTML = '';
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}
