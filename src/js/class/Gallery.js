const axios = require("axios/dist/axios.min.js"); // node
import GenreList from './GenreList.js';
import {disableSpinner, enableSpinner} from '../js-vs/spinner-js.js'
//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
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
    this.perPage = 20;
    this.totalPages = 0;
    this.totalResults = 0;
  }

  // куди виводимо дані
  getSelect(selector) {
    return document.querySelector(selector);
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
    this.perPage = 20;
    this.totalPages = 0;
    this.totalResults = 0;
    localStorage.removeItem(this.name);
  }

  hide() {
    this.out.classList.add(Gallery.classes.hidden);
  }

  show() {
    this.out.classList.remove(Gallery.classes.hidden);
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

      this.hide();
      this.setPerPage(count);
      const markup = await this.createNewCards(cbTemplate, count);
      this.updateGallery(markup);
      this.show();

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
    <div class="movie-card overlay-card">
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
          <p class="catalog_rating">
          Rating: ${(vote_average / 2).toFixed(1)}
        </p>
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

  // якщо помилка
  onError(error){
    console.log(error);
  } 
}