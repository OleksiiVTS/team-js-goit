const axios = require('axios/dist/axios.min.js'); // node
import GenreList from './GenreList.js';
import Movie from './Movie.js';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';
import { styleModal } from '../js-header/header.js';

//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6';
const URL = 'https://api.themoviedb.org/3';

const genres = new GenreList({
  selector: '.select',
  url: '/genre/movie/list',
  query: `''&language=en`,
});
genres.getGenreList();

function convertId_to_Name(aGenre, list = genres.importFromLS()) {
  const result = aGenre.map(item => {
    const obj = list.find(el => el.id === item);
    return obj ? obj.name : null;
  });

  return result.join(', ');
}

function closeModal() {
  const modal = document.getElementById('moreDetails');
  document.body.style.overflow = 'visible';
  modal.classList.add('more-details-is-hidden');
  document.removeEventListener('keydown', onEscape);
}

// закриття модалки по ESC
function onEscape(event) {
  if (event.key === 'Escape') closeModal();
}

export default class Gallery {
  static classes = {
    hidden: 'hidden',
  };

  constructor({ name, url, query, selector }) {
    this.name = name; // назва ключа у ЛС
    this.url = URL + url;
    this.out = this.getSelect(selector); // куди виводимо дані

    this.listMovies = []; //this.importFromLS(); // список фільмів
    this.result = [];     //this.importResultLS();

    this.params = {
      api_key: API_KEY,
      page: this.page,
      query: query,
    };

    this.page = 1;
    this.perPage = 15;
    this.totalPages = 0;
    this.totalResults = 0;
  }

  // куди виводимо дані
  getSelect(selector) {
    return document.querySelector(selector);
  }

  // отримати загальну кількість сторінок
  async getTotalPages() {
    return this.totalPages;
  }

  // отримати список фільмів по запиту
  // @string - query - строка те що буде після ? у гет-запиті за виключенням page та ключа
  // @string - pathUrl - частина url після URL
  // https://api.themoviedb.org/3/trending/movie/day?api_key=999999&page=1&
  //
  // отримання даних з серверу
  async getResponce() {
    try {
      
      this.params.page = this.page;
      const params = new Object(this.params);
      const { data } = await axios.get(this.url, { params }); 
      
      this.result = await data;
      return data

    } catch (error) {
      this.onError(`
        ${this.name}.getResponce() ->\r
        URL: ${this.url}?api_key=${this.params.api_key}&page=${this.page}&query=${this.params.query}\r
        ${error}
      `)
    }
  }

  // заповнення властивостей класу
  async getMoviesList() {
    try {
      const data = await this.getResponce();     

      this.exportToLS(data.results);
      this.exportResultLS(data);

      this.listMovies = await data.results;

      this.totalPages = await data.total_pages;
      this.totalResults = await data.total_results;

      return data.results;

    } catch (error) {
      // this.listMovies = await this.importFromLS();
      this.result = await this.importResultLS();
      this.onError(`
        ${this.name}.getMoviesList() ->\r
        URL: ${this.url}?api_key=${this.params.api_key}&page=${this.page}&query=${this.params.query}\r
        ${error}
      `)
    }
  }

  // запис списку фільмів у LS
  exportToLS(data) {
    if (!this.name.trim()) {
      throw new Error('no field name in create Class');
      return;
    }

    const str = JSON.stringify(data);
    localStorage.setItem(this.name, str);
  }

  // зчитування списку фільмів з LS
  importFromLS() {
    try {
      const str = localStorage.getItem(this.name);
      const arr = JSON.parse(str);
      return arr;
    } catch (error) {
      throw new Error('Wrong read data from LS');
      return null;
    }
  }

  exportResultLS(data) {
    const str = JSON.stringify(data);
    localStorage.setItem('objResult', str);
  }

  importResultLS() {
    try {
      const str = localStorage.getItem('objResult');
      const arr = JSON.parse(str);
      return arr;
    } catch (error) {
      throw new Error('Wrong read data in objResult from LS');
      return null;
    }
  }

  // додавання сторінки
  incrementPage() {
    this.page++;
  }

  setPerPage(count) {
    this.perPage = count;
  }

  //очистити блок сторінок
  resetPage() {
    this.page = 1;
    this.perPage = 15;
    this.totalPages = 0;
    this.totalResults = 0;
    localStorage.removeItem(this.name);
    localStorage.removeItem('objResult');
  }

  hide() {
    if (this.out) {
      this.out.classList.add(Gallery.classes.hidden);
    }
  }

  show() {
    if (this.out) {
      this.out.classList.remove(Gallery.classes.hidden);
    }
  }

  /// trending/movie/day || week
  //
  // cписок фільмів у тренді за день \ неділю
  // cbTemplate - callback function for markup one item,
  // count - скільки карток з масиву cards обробляти
  async createNewCards(cbTemplate, count) {
    try {
      // day -https://api.themoviedb.org/3/trending/movie/day
      // week - https://api.themoviedb.org/3/trending/movie/week
      // const url = '/trending/movie/day';
      // const query = 'language=en-US'
      enableSpinner();

      const cards = await this.getMoviesList();

      if (!count || count > cards.length) {
        count = cards.length;
      }
      

      disableSpinner();
      return cards.slice(0, count).reduce((acc, item, index) => {
          return acc + cbTemplate(item);
//        }
//        return acc;
      }, '');
    } catch (error) {
      this.onError(`
        ${this.name}.createNewCards(cb_func, count) ->\r
        URL: ${this.url}?api_key=${this.params.api_key}&page=${this.page}&query=${this.params.query}\r
        ${error}
      `)
    }
  }

  // View Next card gallery
  //
  async onMarkup(cbTemplate = this.TemplateMovieCard, count = this.perPage) {
    try {
      enableSpinner();

      // this.hide();

      const markup = await this.createNewCards(cbTemplate, count);
      // console.log(markup);
      this.updateGallery(markup);
      this.managerModal();
      // this.show();

      disableSpinner();
      return this;
    } catch (error) {
      this.onError(`
      ${this.name}.onMarkup(cb_func, count=this.perPage) ->\r
      URL: ${this.url}?api_key=${this.params.api_key}&page=${this.page}&query=${this.params.query}\r
      ${error}
    `)
    }
  }

  // Шаблон картки для фільму
  //
  // // частина посилання на картинку
  // const url = 'https://image.tmdb.org/t/p/w300';
  //
  TemplateMovieCard(data) {
    const {
      poster_path,
      original_title,
      title,
      vote_average,
      release_date,
      genre_ids,
      id,
    } = data;

    let strGenres = convertId_to_Name(genre_ids.slice(0, 2));
    if (strGenres.length > 20) {
      strGenres = convertId_to_Name(genre_ids.slice(0, 1));
    }

    let pictureCard = '';
    let properties = '';

    // "poster_sizes": ["w92","w154","w185","w342","w500","w780","original"]
    if (poster_path===null) {
      pictureCard = "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
      properties = "style=padding-top:130px";
    } else pictureCard = "https://image.tmdb.org/t/p/w342" + poster_path;

    return `<a href="" data-id-movie="${id}">
    <div ${properties} class="movie-card overlay-card weekly-movie-phone" data-id-movie="${id}">
    <img class="gallery__image weekly-movie-card " src="${pictureCard}" alt="${original_title}" loading="lazy"/>
    <div class="gallery__up_image"></div>
    <div class="catalog_info">
      <h2 class="catalog_title">
      ${title}
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

  convertId_to_Name(aGenre, list = genres.importFromLS()) {
    const result = aGenre.map(item => {
      const obj = list.find(el => el.id === item);
      return obj ? obj.name : null;
    });

    return result.join(', ');
  }

  updateGallery(data, selector = this.out) {
    if (!data && (!this.out || !selector)) {
      //throw new Error("No value or wrong selector");
      return;
    }
    if (selector) {
      selector.innerHTML = '';
      selector.insertAdjacentHTML('beforeend', data);
    }
  }

  createModal(data) {
    const {
      title,
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
      if (film.title === title) {
        btn = 'Remove from My Library';
      }
    }

    let strGenres = convertId_to_Name(genre_ids.slice(0, 2));
    if (strGenres.length > 20) {
      strGenres = convertId_to_Name(genre_ids.slice(0, 1));
    }

    const modal = document.getElementById('moreDetails');
    modal.classList.remove('more-details-is-hidden');
    
    let pictureCard = '';
    let properties = '';

    // "poster_sizes": ["w92","w154","w185","w342","w500","w780","original"]
    if (poster_path===null) {
      pictureCard = "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png";
      properties = "style=padding-top:130px";
    } else pictureCard = "https://image.tmdb.org/t/p/w500" + poster_path;

    modal.innerHTML = `
      <div class="more-details-modal">
        <div class="close-button-box">
          <button class="more-details-close-button" id="closeDetails" type="button">X</button>
        </div>
        <div class="details-wrapper">
          <div ${properties} class="more-details-img-box">
            <img width="380px" class="more-detail-img" src="${pictureCard}" alt="${title}" loading="lazy"/>
          </div>
          <div class="more-details-info">
            <h2 class="film-title">${title}</h2>
            <table>
              <tr>
                <td class="table-row table-column-name">Vote / Votes:</td>
                <td><span class="vote-average">${vote_average.toFixed(1)}</span> / <span class="vote-count">${vote_count}</span></td>
              </tr>
              <tr>
                <td class="table-row table-column-name">Popularity:</td>
                <td>${popularity.toFixed(1)}</td>
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

    // для закриття модалки
    const closeBtn = modal.querySelector('#closeDetails');
    const moreDetails = document.getElementById("moreDetails");
    closeBtn.addEventListener('click', closeModal);
    moreDetails.addEventListener('click', closeModal);
    const addToLibraryButton = modal.querySelector('#addToLibraryButton');
    addToLibraryButton.addEventListener('click', () => {
      this.addToLibrary(data);
    });
  }

  addToLibrary(film) {
    try {
      const addButton = document.getElementById('addToLibraryButton');
      const libraryFilms =
        JSON.parse(localStorage.getItem('libraryFilms')) || [];

      const filmTitle = film.title;

      if (addButton.textContent === 'Add to My Library') {
        addButton.textContent = 'Remove from My Library';

        libraryFilms.push(film);
        localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
      } else {
        addButton.textContent = 'Add to My Library';

        const index = libraryFilms.findIndex(
          filmItem => filmItem.title === filmTitle
        );
        if (index !== -1) {
          libraryFilms.splice(index, 1);
          localStorage.setItem('libraryFilms', JSON.stringify(libraryFilms));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  managerModal() {
    // якщо області виводу не має, значить не та сторінка
    if (!this.out) {
      return;
    }

    const movieCards = this.out.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
      const movieId = Number(card.dataset.idMovie);

      let list = this.listMovies;
      if (list.length === 0) {
        list = this.importFromLS();
      }
      const data = list.filter(item => item.id === movieId);

      // create/open modal in cards
      card.addEventListener('click', event => {
        event.preventDefault();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onEscape);
        this.createModal(data[0]);

        setTimeout(styleModal, 0); // add light tems in cards
      });
    });
  }

  // якщо помилка
  onError(error) {
    console.log(error);
  }
}
