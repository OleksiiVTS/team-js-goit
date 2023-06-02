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
  
    if (film === null) {
      // Если фильмы не найдены, отображаем сообщение
      const messageHTML = `
        <div class="no-films-message">
          <img src="ссылка_на_картинку" alt="No films found" />
          <p>No films found.</p>
        </div>
      `;
      cardContainer.innerHTML = messageHTML;
    } else {
      // Если фильмы найдены, создаем карточку фильма
      const cardHTML = `
        <div class="film-card">
          <img src="https://image.tmdb.org/t/p/original/${film.backdrop_path}" alt="${film.original_title}" />
          <div class="film-info">
            <div class="info-item">
              <span class="type">Release Date:</span> <span class="value">${film.release_date}</span>
            </div>
            <div class="info-item">
              <span class="type">Vote / Votes:</span> <span class="value">${film.vote_average} / ${film.vote_count}</span>
            </div>
            <div class="info-item">
              <span class="type">Popularity:</span> <span class="value">${film.popularity}</span>
            </div>
            <div class="info-item">
              <span class="type">Genre:</span> <span class="value">${film.genres.map(genre => genre.name).join(", ")}</span>
            </div>
            <button class="upcoming_film_add">Add to My Library</button>
          </div>
        </div>
      `;
  
      cardContainer.innerHTML = cardHTML;
  
      // Добавляем обработчик события для кнопки после создания разметки
      const addButton = document.querySelector(".upcoming_film_add");
      addButton.addEventListener("click", toggleLibraryFilm);
    }
  }
  
  // Функция для обработки нажатия на кнопку добавления/удаления фильма из My Library
  function toggleLibraryFilm() {
    const addButton = document.querySelector(".upcoming_film_add");
    const filmTitle = document.querySelector(".film-card img").alt;
    const libraryFilms = JSON.parse(localStorage.getItem("libraryFilms")) || [];
  
    if (addButton.textContent === "Add to My Library") {
      addButton.textContent = "Remove from My Library";
      libraryFilms.push(filmTitle);
    } else {
      addButton.textContent = "Add to My Library";
      const filmIndex = libraryFilms.indexOf(filmTitle);
      if (filmIndex > -1) {
        libraryFilms.splice(filmIndex, 1);
      }
    }
  
    localStorage.setItem("libraryFilms", JSON.stringify(libraryFilms));
  }
  
  // Вызываем функцию для получения данных о фильме и создания карточки
  fetchFilmData().then((filmData) => {
    console.log("Получены данные о фильме:", filmData);
    createFilmCard(filmData);
  });
  