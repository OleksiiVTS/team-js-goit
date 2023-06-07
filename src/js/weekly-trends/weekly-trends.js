// Імпортуємо клас Gallery
import Gallery from '../class/Gallery.js';



// Створюємо екземпляр класу Gallery
const moviesTrendsWeek = new Gallery({
  name: 'moviesTrendsWeek',
  selector: ".weekly-movie-card-wrapper",
  url: '/trending/movie/week',
  query: 'language=en'
});

// Функція-шаблон для генерації HTML-коду для кожного елементу галереї
function TemplateTrendsWeek(data) {
  const { poster_path, original_title, title, vote_average, release_date, genre_ids, id } = data;

  return `<a href="" data-id-movie="${id}">
    <!-- Карточкa фільмів 1 -->
    <div class="weekly-movie-card">
      <img src="${'https://image.tmdb.org/t/p/w400'+poster_path}" alt="${original_title}" class="weekly-movie-image" loading="lazy"/>
      <div class="weekly-movie-details">
        <h2 class="weekly-movie-title">${title}</h2>
        <div class="weekly-movie-genre-stars">
          <p class="weekly-movie-genre">${moviesTrendsWeek.convertId_to_Name(genre_ids)} | ${release_date}</p>
          <p class="weekly-movie-rating">Rating: ${(vote_average / 2).toFixed(1)}</p>
        </div>
      </div>
    </div>
  </a>`;
}



// Отримуємо дані з сервера
moviesTrendsWeek.getMoviesList().then(data => {
  // Вибираємо перші три фільми з отриманих даних
  const firstThreeMovies = data.slice(0, 3);

  // Генеруємо HTML-код для кожного фільму за допомогою функції trendsWeek і reduce
  const markup = firstThreeMovies.reduce((acc, movie) => acc + TemplateTrendsWeek(movie), "");

  // Оновлюємо галерею фільмів, вставляючи згенерований HTML-код
  moviesTrendsWeek.updateGallery(markup);
}).catch(error => {
  console.log(error);
});







// Функція для перевірки і оновлення кількості видимих фотокарток на мобільних пристроях
function updateVisibleCards() {
  const movieCards = document.querySelectorAll('.weekly-movie-card');

  const isMobile = window.innerWidth < 768;

  movieCards.forEach((card, index) => {
    if (isMobile) {
      card.style.display = index > 0 ? 'none' : 'block';
      card.style.width = index > 0 ? '0' : 'auto';
      card.style.height = index > 0 ? '0' : 'auto';
      card.style.overflow = index > 0 ? 'hidden' : 'visible';
      card.style.visibility = index > 0 ? 'hidden' : 'visible';
    } else {
      card.style.display = 'block';
      card.style.width = 'auto';
      card.style.height = 'auto';
      card.style.overflow = 'visible';
      card.style.visibility = 'visible';
    }
  });
}

// Додаємо слухача подій для перевірки розміру вікна і оновлення кількості фотокарток на мобільних пристроях
window.addEventListener('load', updateVisibleCards);
window.addEventListener('resize', updateVisibleCards);
