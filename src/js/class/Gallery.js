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

export default class Gallery {
  constructor({ name, url, query, selector }) {
    this.name = name;                     // назва ключа у ЛС
    this.out = this.getSelect(selector);  // куди виводимо дані
    this.page = 1;
    this.listMovies = this.importFromLS();  // список фільмів

    this.url = URL + url;
    this.params = { 
      api_key: API_KEY,
      page: this.page,
      query: query,
    };

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

  //очистити блок сторінок
  resetPage() { 
    this.page = 1;
    this.totalPages = 0;
    this.totalResults = 0;
    localStorage.removeItem(this.name);
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
            if (index > count-1){
              return
            }
            return acc + cbTemplate(item)
          }, "");

    } catch (error) {
      this.onError(error);  
    }
  }

  // View Next card gallery
  //
  async onMarkup(count, cbTemplate = this.createTestCardGallery) { 
    try {
      enableSpinner();
      const markup = await this.createNewCards(cbTemplate, count);
      this.updateGallery(markup);
      disableSpinner();
      return markup;

    } catch (error) {
      this.onError(error);  
    }
  }

  // Шаблон картки для фільму
  //
  createTestCardGallery( data ) {
  // частина посилання на картинку
  const url = 'https://image.tmdb.org/t/p/w300';
  const genreList = genres.importFromLS();

  return `
    <div class="movie-card">
      <img class="image"
        src="${url + data.backdrop_path}" 
        alt="{${data.original_title}}" 
        loading="lazy"
        title="{${data.original_title}}"/>

      <div class="info">
        <p class="info-item">
         <b>Title: </b>${data.original_title}
        </p>
        <p class="info-item">
          <b>Text: </b>${data.overview}
        </p>
        <p class="info-item">
          <b>Release Date: </b>${data.release_date}
        </p>
        <p class="info-item">
        <b>Genres: </b>${this.convertId_to_Name(data.genre_ids, genreList)  }
        </p>
        <p class="info-item">
          <b>Vote: </b>${data.vote_average}
        </p>
      </div>
    </div>`
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