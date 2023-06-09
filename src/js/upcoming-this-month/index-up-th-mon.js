import {startModalWiNoTreiler} from "../modal-w-litle/modal-w-litle.js";
// import {styleUpcomingThisMonth} from '../js-header/header.js';


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

// setTimeout(styleUpcomingThisMonth, 0);

// Округляем значения до десятков
const popularityValueElement = document.querySelector(".popularity-value");
popularityValueElement.textContent = (Math.round(film.popularity / 10) * 10).toFixed(1);

const voteAverageElement = document.querySelector(".vote-average");
voteAverageElement.textContent = (Math.round(film.vote_average / 10) * 10).toFixed(1);

// Проверяем наличие фильма в Local Storage и обновляем состояние кнопки
const addButton = document.querySelector(".button-rem-me");
const filmData = JSON.parse(localStorage.getItem("filmData")) || {};

if (filmData.hasOwnProperty(film.original_title)) {
addButton.textContent = "Remove from My Library";
}

// Добавляем обработчик события для кнопки после создания карточки фильма
addButton.addEventListener("click", toggleLibraryFilm.bind(null, film));

// Изменяем формат даты. При изменении названия классов в разметке, изменить класс ниже
const releaseDateElement = document.querySelector(".release-value.release-date");
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
function toggleLibraryFilm(film) {
const addButton = document.querySelector(".button-rem-me");
const filmData = JSON.parse(localStorage.getItem("filmData")) || {};

if (addButton.textContent === "Add to My Library") {
addButton.textContent = "Remove from My Library";
// Добавляем фильм в объект filmData в Local Storage
filmData[film.original_title] = film;
} else {
  addButton.textContent = "Add to My Library";

  // Удаляем фильм из объекта filmData в Local Storage
delete filmData[film.original_title];

}

// Сохраняем обновленные данные в Local Storage
localStorage.setItem("filmData", JSON.stringify(filmData));
}

// Вызываем функцию для получения данных о фильме и создания карточки
fetchFilmData().then((filmData) => {
// console.log("Получены данные о фильме:", filmData);
createFilmCard(filmData);
});



