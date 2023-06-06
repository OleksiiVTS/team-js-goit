const heroRandomFilm = document.getElementById('hero-random-film');
const heroSection = document.getElementById('hero-section');
const apiKey = '9073999c285844087924fd0e24160fae';
let randomFilmIndex;

async function fetchFilmData() {
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const { results } = await response.json();
    const filmIndexes = results.map(({ id }) => id);
    heroSection.classList.add('hero-hide');

    return filmIndexes;
  } catch (error) {
    console.log('Помилка при виконанні запиту до API:', error);
  }
}

async function getRandomFilm() {
  const filmIndexes = await fetchFilmData();
  const randomIndex = Math.floor(Math.random() * filmIndexes.length);
  randomFilmIndex = filmIndexes[randomIndex];
  const filmDetails = await getFilmDetails(randomFilmIndex);
  return filmDetails;
}

async function getFilmDetails(filmIndex) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${filmIndex}?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const {
      title: filmTitle,
      vote_average: filmRating,
      trailer_key: filmTrailer,
      backdrop_path: filmBackgroundPath,
      overview,
      vote_average,
      vote_count,
      release_date,
      popularity,
      genres,
    } = await response.json();
    const filmTrailerUrl = `https://www.youtube.com/watch?v=${filmTrailer}`;
    const filmBackgroundImage = `https://image.tmdb.org/t/p/original${filmBackgroundPath}`;

    return {
      title: filmTitle,
      rating: filmRating,
      trailer: filmTrailerUrl,
      backgroundImage: filmBackgroundImage,
      overview,
      vote_average,
      vote_count,
      release_date,
      popularity,
      genres,
    };
  } catch (error) {
    console.log('Error occurred while making API request:', error);
  }
}

function createFilmBox({ title, rating, backgroundImage, overview }) {
  const words = overview.split(' ');
  let truncatedOverview = words.slice(0, 30).join(' ');

  if (words.length > 30) {
    truncatedOverview += '...';
  }

  return `
    <section class="hero-movie" style="background-image: linear-gradient(
      86.77deg,
      #111111 30.38%,
      rgba(17, 17, 17, 0) 65.61%
    ), url(${backgroundImage})";>
      <div class="container hero-container">
        <h1 class="hero-title">${title}</h1>
        <p>Рейтинг: ${rating}</p>
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
  const filmDetails = await getRandomFilm();
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
}

function closeModal() {
  modalHero.classList.toggle('m-w-t-is-hidden');
  document.removeEventListener('keydown', escapeHandler);
  window.removeEventListener('click', outsideClickHandler);
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
const closeDetailsButton = document.getElementById('closeDetails');

closeDetailsButton.addEventListener('click', closeDetails);

function createDetailsBox({
  title,
  backgroundImage,
  overview,
  vote_average,
  vote_count,
  release_date,
  popularity,
  genres,
}) {
  return `
    <div class="film-card">
      <img src="https://image.tmdb.org/t/p/original/${backgroundImage}" alt="${title}" />
      <div class="film-info">
        <div class="info-item">
          <h2 class="film-title">${title}</h2>
        </div>

        <div class="container-features">
          <div class="column-struct">
            <div class="date-vote">
              <div class="info-item">
                <span class="release">Release Date:</span> <span class="release-value release-date">${release_date}</span>
              </div>
              <div class="info-item">
                <span class="vote">Vote / Votes:</span>
                <span class="vote-value">
                  <span class="vote-average">${vote_average}</span> /
                  <span class="vote-count">${vote_count}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="column-struct">
            <div class="popularity-genre">
              <div class="info-item">
                <span class="popularity">Popularity:</span> <span class="popularity-value">${popularity}</span>
              </div>
              <div class="info-item genre-item">
                <span class="genre">Genre:</span> <span class="genre-value">${genres
                  .map(genre => genre.name)
                  .join(', ')}</span>
              </div>
            </div>
          </div>
          <div class="description-item">
            <span class="description-about">About:</span> <span class="about-value">${overview}</span>
          </div>
        </div>
        <button class="button-rem-me">Add to My Library</button>
      </div>
    </div>`;
}

createDetailsBox();

function createMoreDetails(markup) {
  clearDetailsBox();
  modalDetails.insertAdjacentHTML('afterbegin', markup);
}

async function openDetails() {
  modalDetails.classList.toggle('m-w-t-is-hidden');
  document.addEventListener('keydown', escapeHandlerDetails);
  window.addEventListener('click', outsideClickHandlerDetails);

  const filmDetails = await getFilmDetails(randomFilmIndex);

  const detailsBoxHTML = createDetailsBox(filmDetails);
  createMoreDetails(detailsBoxHTML);
}

function closeDetails() {
  modalDetails.classList.toggle('m-w-t-is-hidden');
  document.removeEventListener('keydown', escapeHandlerDetails);
  window.removeEventListener('click', outsideClickHandlerDetails);
  detailsOpened = false;
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
