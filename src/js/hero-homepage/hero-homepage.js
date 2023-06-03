const heroRandomFilm = document.getElementById('hero-random-film');
const heroDefault = document.getElementById('default-hero');

async function fetchFilmData() {
  const apiKey = '9073999c285844087924fd0e24160fae';
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const { results } = await response.json();
    const filmIndexes = results.map(({ id }) => id);
    heroDefault.classList.add('hero-hide');

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
  const apiKey = '9073999c285844087924fd0e24160fae';
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
    const markup = `
      <div>
        <h1 class="hero-title">${film.title}</h1>
        <p>Рейтинг: ${film.rating}</p>
        <p>${film.overview}</p?
        <a href="${film.trailer}" target="_blank">Посилання на трейлер</a>
        <img src="${film.backgroundImage}" alt="${film.title}" />
      </div>
    `;
    heroRandomFilm.innerHTML = markup;
  } catch (error) {
    console.log('Помилка:', error);
  }
}

createFilmBox();
