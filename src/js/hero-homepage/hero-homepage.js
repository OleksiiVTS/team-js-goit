const heroRandomFilm = document.getElementById('hero-random-film');
const heroSection = document.getElementById('hero-section');
const apiKey = '9073999c285844087924fd0e24160fae';

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
  const randomFilmIndex = filmIndexes[randomIndex];
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
      overview: overview,
    } = await response.json();
    const filmTrailerUrl = `https://www.youtube.com/watch?v=${filmTrailer}`;
    const filmBackgroundImage = `https://image.tmdb.org/t/p/original${filmBackgroundPath}`;

    return {
      title: filmTitle,
      rating: filmRating,
      trailer: filmTrailerUrl,
      backgroundImage: filmBackgroundImage,
      overview: overview,
    };
  } catch (error) {
    console.log('Помилка при виконанні запиту до API:', error);
  }
}

async function createFilmBox() {
  try {
    const film = await getRandomFilm();
    const words = film.overview.split(' ');
    let truncatedOverview = words.slice(0, 30).join(' ');

    if (words.length > 30) {
      truncatedOverview += '...';
    }

    const markup = `
    <section class="hero-movie" style="background-image: linear-gradient(
      86.77deg,
      #111111 30.38%,
      rgba(17, 17, 17, 0) 65.61%
    ), url(${film.backgroundImage})";>
    <div class="container hero-container">
        <h1 class="hero-title">${film.title}</h1>
        <p>Рейтинг: ${film.rating}</p>
        <p class="hero-text">${truncatedOverview}</p>
        <div class="hero-homepage-buttons">
        <button type="button" class="button-watch-trailer"><a class="hero-href" href="${film.trailer}" target="_blank">Watch trailer</a></button>
        <button type="button" class="button-more-details"><a class="hero-href" id="more-details-button" target="_blank">More Details</a></button>
              </div>
        </div>
      </section>
    `;
    heroRandomFilm.innerHTML = markup;
  } catch (error) {
    console.log('Помилка:', error);
  }
}

createFilmBox();
