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
    this.name = name;
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
  async getList() {
    try {
      enableSpinner();
      const params = new Object(this.params);
      const { data } = await axios.get(this.url, { params });
      
      this.exportToLS(data.results);
      this.listMovies = this.importFromLS();

      this.totalPages = data.total_pages;
      this.totalResults = data.total_results;
      disableSpinner();

      return data.results; 

    } catch (error) {
      this.onError(error)
    }
  }

  // отримання даних з додавання сторінки для пагінації
  async getMoviesList() {
    try {
      enableSpinner();
      const data = await this.getList();
      this.incrementPage();
      disableSpinner();
      return data; 

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
    this.totalPage = 0;
    this.totalResult = 0;
  }

  /// trending/movie/day || week
  //
  // cписок фільмів у тренді за день \ неділю
  async createNewCards(cbTemplate) {
    try {
      // day -https://api.themoviedb.org/3/trending/movie/day
      // week - https://api.themoviedb.org/3/trending/movie/week
      // const url = '/trending/movie/day';
      // const query = 'language=en-US'
      enableSpinner();
      const cards = await this.getMoviesList();

      disableSpinner();
      return cards.reduce(
           (acc, data) => acc + cbTemplate(data), "");

    } catch (error) {
      this.onError(error);  
    }
  }

  // View Next card gallery
  //
  async onMarkup(cbTemplate = this.createCardGallery) { 
    try {
      enableSpinner();
      const markup = await this.createNewCards(cbTemplate);
      this.updateGallery(markup);
      disableSpinner();
      return markup;

    } catch (error) {
      this.onError(error);  
    }
  }

  // Шаблон картки для фільму
  //
  createCardGallery( data ) {
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
    if (!data && (!this.out || selector)) { 
      //throw new Error("No value or wrong selector");
      return;
    }

    selector.insertAdjacentHTML("beforeend", data);
  }


  // отримання одного фільму
  async getFilmDetails(filmIndex) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${filmIndex}?api_key=${API_KEY}`;

    try {
      enableSpinner();
      const { data } = await axios(apiUrl);
      disableSpinner();

      return data;

    } catch (error) {
      this.onError('Film id not found:', error);
    }
  }

  MarkupFilmDetails(data) { 
    const {
      filmTrailer,
      backdrop_path,
      original_title,
      budget,
      overview,
      release_date,
      genres,
      vote_average,
    } = data;

    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const urlTrailer = `https://www.youtube.com/watch?v=${filmTrailer}`;

    return `
    <div class="movie-card">
      <img class="image"
        src="${urlImage}" 
        alt="{${original_title}}" 
        loading="lazy"
        title="{${original_title}}"/>

      <div class="info">
        <p class="info-item">
         <b>Title: </b>${original_title}
        </p>
        <p class="info-item">
          <b>Budget: </b>$${budget}
        </p>
        <p class="info-item">
          <b>Text: </b>${overview}
        </p>
        <p class="info-item">
          <b>Release Date: </b>${release_date}
        </p>
        <p class="info-item">
        <b>Genres: </b>${genres.map(e => e.name).join(', ')}
        </p>
        <p class="info-item">
          <b>Vote: </b>${vote_average}
        </p>
      </div>
    </div>`  
  }

  async onMarkupFilmDetails(idFilm, selector = this.out, cbMarkup = this.MarkupFilmDetails) { 
    try {
      enableSpinner();

      const data = await this.getFilmDetails(idFilm);
      const markup = cbMarkup(data);
    //  console.log(markup);
      this.updateFilmDetails(markup, selector);
      
      disableSpinner();
  
      return data;

    } catch (error) {
      this.onError('Film id not found:', error);
    }
  }

    // вивід даних на хтмл-сторінку
  updateFilmDetails(data, selector = this.out) {
    if (!data && (!this.out || !selector)) { 
      //throw new Error("No value or wrong selector");
      return;
    }
    selector.insertAdjacentHTML("beforeend", data);
  }

  // якщо помилка
  onError(error){
    console.log(error);
  } 
}