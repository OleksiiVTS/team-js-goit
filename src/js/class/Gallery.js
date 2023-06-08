const axios = require("axios/dist/axios.min.js"); // node
import GenreList from './GenreList.js';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js'

//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6';
const URL = 'https://api.themoviedb.org/3';

const genres = new GenreList({
  selector: ".select",
  url: "/genre/movie/list",
  query: 'language=en'
})
genres.getGenreList();

function convertId_to_Name(aGenre, list = genres.importFromLS()) {

  const result = aGenre.map(item => {
    const obj = list.find(el => el.id === item);
    return obj ? obj.name : null;
  })

  return result.join(', ');
}

export default class Gallery {
  static classes = {
    hidden: "hidden",
  }
  

  constructor({ name, url, query, selector }) {
    this.name = name;                     // назва ключа у ЛС
    this.url = URL + url;
    this.out = this.getSelect(selector);  // куди виводимо дані

    this.listMovies = this.importFromLS();  // список фільмів

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
  async getMoviesList() {
    try {
      enableSpinner();
      this.params.page = this.page;
      const params = new Object(this.params);
      const { data } = await axios.get(this.url, { params });
      
      this.exportToLS(data.results);
      this.listMovies = this.importFromLS();

      this.totalPages = await data.total_pages;
      this.totalResults = await data.total_results;

      disableSpinner();

      return data.results; 

    } catch (error) {
      this.onError(error)
    }
  }

  // запис списку фільмів у LS
  exportToLS(data) {
    if (!this.name.trim()) { 
        throw new Error("no field name in create Class");
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
      return arr
    } catch (error) {
        throw new Error("Wrong read data from LS");
        return null;
    }
  }

  // додавання сторінки
  incrementPage() {
    this.page++;
  }

  setPerPage(count){
    this.perPage = count;
  };

  //очистити блок сторінок
  resetPage() { 
    this.page = 1;
    this.perPage = 15;
    this.totalPages = 0;
    this.totalResults = 0;
    localStorage.removeItem(this.name);
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

      if(!count || count > cards.lenght) {
        count = cards.lenght;
      }

      disableSpinner();
      return cards.reduce(
           (acc, item, index) => {
            if (index < count){
              return acc + cbTemplate(item)  
            }
            return acc
          }, "");

    } catch (error) {
      this.onError(error);  
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
      this.managerModal()
      // this.show();

      disableSpinner();
      return markup;

    } catch (error) {
      this.onError(error);  
    }
  }

  // Шаблон картки для фільму
  //
  // // частина посилання на картинку
  // const url = 'https://image.tmdb.org/t/p/w300';
  //
  TemplateMovieCard( data ) {
    const { 
      poster_path, 
      original_title, 
      title, 
      vote_average, 
      release_date, 
      id
    } = data;

    const aGenres = data.genre_ids.slice(0, 2);

    return `<a href="" data-id-movie="${id}">
    <div class="movie-card overlay-card" data-id-movie="${id}">
    <img class="gallery__image" src="${'https://image.tmdb.org/t/p/w400'+poster_path}" alt="${original_title}" loading="lazy"/>
    <div class="gallery__up_image"></div>
    <div class="catalog_info">
      <h2 class="catalog_title">
      ${title}
      </h2>
      <div class="ganres_rating">
          <p class="catalog_genres">
          ${convertId_to_Name(aGenres)} | ${release_date.slice(0, 4)}
          </p>
        <div class="rating">
          <div class="rating__body">
            <div class="rating__active" style="width: ${vote_average.toFixed(1) * 10}%;"></div>
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
    </a>`
  }

  convertId_to_Name(aGenre, list = genres.importFromLS()) {

      const result = aGenre.map(item => {
        const obj = list.find(el => el.id === item);
        return obj ? obj.name : null;
      })

      return result.join(', ');
  }

  updateGallery(data, selector = this.out) {
    if (!data && (!this.out || !selector)) { 
      //throw new Error("No value or wrong selector");
      return;
    }
    if (selector) {
      selector.innerHTML = '';
      selector.insertAdjacentHTML("beforeend", data);
    }
  }

  createModal(data) {
    const { title, poster_path, vote_average, vote_count, popularity, overview } = data;

    const aGenres = data.genre_ids.slice(0, 2);

    const modal = document.getElementById('moreDetails');
    modal.classList.remove('more-details-is-hidden');

    modal.innerHTML = `
    <div class="more-details-modal">
      <div class="close-button-box">
        <button class="more-details-close-button" id="closeDetails" type="button">X</button>
      </div>
      <div class="details-wrapper">
        <div class="more-details-img-box">
          <img width="380px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" />
        </div>
        <div class="more-details-info">
          <h2 class="film-title">${title}</h2>
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
              <td>${convertId_to_Name(aGenres)}</td>
            </tr>
          </table>
          <span class="description-about">About:</span>
          <span class="more-details-about">${overview}</span>
          <div class="more-details-adml-box">
            <button id="addToLibraryButton" class="button-rem-me">Add to Library</button>
          </div>
        </div>
      </div>
    </div>
    `;

    const closeBtn = modal.querySelector('#closeDetails');
    closeBtn.addEventListener('click', () => {
      modal.classList.add('more-details-is-hidden');
    });
  }

  managerModal() {
    
    // якщо області виводу не має, значить не та сторінка
    if (!this.out) { 
      return
    }

    const movieCards = this.out.querySelectorAll('.movie-card');

    movieCards.forEach((card) => {
      const movieId = Number(card.dataset.idMovie);

      const list = this.importFromLS();
      const data = list.filter(item => item.id === movieId)
      
      card.addEventListener('click', (event) => {
        event.preventDefault();
        this.createModal(data[0]);
      });
    });
    

  }


  // якщо помилка
  onError(error){
    console.log(error);
  } 
}