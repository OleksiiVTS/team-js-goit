import startModalWiNoTreiler from "../modal-w-litle/modal-w-litle.js";

// Функция для выполнения запроса к API
async function fetchFilmData() {
  const apiKey = "9073999c285844087924fd0e24160fae";
  const apiUrl = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const filmData = await response.json();
    return filmData;
  } catch (error) {
    console.log("Ошибка при выполнении запроса к API:", error);
  }
}

// Функция для создания HTML разметки карточки фильма
function createFilmCard(film) {
  const cardContainer = document.querySelector(".upcoming_film_card");

  if (!cardContainer) {
    // Если элемент .upcoming_film_card не существует на текущей странице, прекращаем выполнение функции
    return;
  }

  if (film === null) {
    // Если фильмы не найдены, отображаем модальное окно
    startModalWiNoTreiler();
  } else {
    // Если фильмы найдены, создаем карточку фильма
    const cardHTML = `
      <div class="film-card">
        <img src="https://image.tmdb.org/t/p/original/${
          film.backdrop_path
        }" alt="${film.original_title}" />
        <div class="film-info">
          <div class="info-item">
            <h2 class="film-title">${film.original_title}</h2>
          </div>

          <div class="container-features">
            <div class="column-struct">
              <div class="date-vote">
                <div class="info-item">
                  <span class="release">Release Date:</span>
                  <span class="release-value release-date">${
                    film.release_date
                  }</span>
                </div>
                <div class="info-item">
                  <span class="vote">Vote / Votes:</span>
                  <span class="vote-value">
                    <span class="vote-average">${film.vote_average}</span> /
                    <span class="vote-count">${film.vote_count}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="column-struct">
              <div class="popularity-genre">
                <div class="info-item">
                  <span class="popularity">Popularity:</span>
                  <span class="popularity-value">${film.popularity}</span>
                </div>
                <div class="info-item genre-item">
                  <span class="genre">Genre:</span>
                  <span class="genre-value">${film.genres
                    .map((genre) => genre.name)
                    .join(", ")}</span>
                </div>
              </div>
            </div>
            <div class="description-item">
              <span class="description-about">About:</span>
              <span class="about-value">${film.overview}</span>
            </div>
          </div>

          <button class="button-rem-me">Add to My Library</button>
        </div>
      </div>
    `;
  
    cardContainer.innerHTML = cardHTML;

    // Проверяем наличие фильма в Local Storage и обновляем состояние кнопки
    const addButton = document.querySelector(".button-rem-me");
    const filmTitle = document.querySelector(".film-card img").alt;
    const libraryFilms = new Set(JSON.parse(localStorage.getItem("libraryFilms")) || []);

    if (libraryFilms.has(filmTitle)) {
      addButton.textContent = "Remove from My Library";
    }

    // Добавляем обработчик события для кнопки после создания карточки фильма
    addButton.addEventListener("click", toggleLibraryFilm);

    // Изменяем формат даты. При изменении названия классов в разметке, изменить класс ниже
    const releaseDateElement = document.querySelector(
      ".release-value.release-date"
    );
    const releaseDate = film.release_date;
    const formattedDate = formatDate(releaseDate);
    releaseDateElement.textContent = formattedDate;
  }
}

// Функция для преобразования формата даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// Функция для обработки нажатия на кнопку добавления/удаления фильма из My Library
function toggleLibraryFilm() {
  const addButton = document.querySelector(".button-rem-me");
  const filmTitle = document.querySelector(".film-card img").alt;
  const libraryFilms = new Set(
    JSON.parse(localStorage.getItem("libraryFilms")) || []
  );

  if (addButton.textContent === "Add to My Library") {
    addButton.textContent = "Remove from My Library";

    // Добавляем фильм в Set
    libraryFilms.add(filmTitle);
  } else {
    addButton.textContent = "Add to My Library";

    // Удаляем фильм из Set
    libraryFilms.delete(filmTitle);
  }

  // Сохраняем Set в Local Storage
  localStorage.setItem("libraryFilms", JSON.stringify(Array.from(libraryFilms)));
}

// Вызываем функцию для получения данных о фильме и создания карточки
fetchFilmData().then((filmData) => {
  console.log("Получены данные о фильме:", filmData);
  createFilmCard(filmData);
});
src/js/upcoming-this-month/_index-up-th-mon.js