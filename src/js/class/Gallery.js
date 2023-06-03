const axios = require("axios/dist/axios.min.js"); // node
import GenreList from './GenreList.js';
import Notiflix from 'notiflix';

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
  constructor({url, query, selector}) {
    this.out = this.getSelect(selector);  // куди виводимо дані
    this.page = 1;

    this.url = URL + url;
    this.params = { 
      api_key: API_KEY,
      page: this.page,
      query: query,
    };

    this.totalPage = 0;
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
  async getMoviesList() {
    try {

      const data = await this.getList();
      this.incrementPage();

      return data; 

    } catch (error) {
      this.onError(error)
    }

  }

  async getList() {
    try {
      const params = new Object(this.params);
      const { data }  = await axios.get(this.url, { params });
      
      this.totalPage = data.total_page;
      this.totalResult = data.total_result;
  
      return data.results; 

    } catch (error) {
      this.onError(error)
    }
  }

  incrementPage() {
    this.page++;
  }

  resetPage() { 
    this.page = 1;
    this.totalPage = 0;
    this.totalResult = 0;
  }

  /// trending/movie/day || week
  //
  // cписок фільмів у тренді за день \ неділю
  async createNewCards() {
    try {
      // day -https://api.themoviedb.org/3/trending/movie/day
      // week - https://api.themoviedb.org/3/trending/movie/week
      // const url = '/trending/movie/day';
      // const query = 'language=en-US'
      const cards = await this.getMoviesList();

      return cards.reduce(
           (acc, data) => acc + this.createCardGallery(data), "");

    } catch (error) {
      this.onError(error);  
    }
  }

  // View Next card gallery
  //
  async onMarkup() { 
    try {

      const markup = await this.createNewCards();
      this.updateGallery(markup);

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

  convertId_to_Name(aGenre, list) {

      const result = aGenre.map(item => {
        const obj = list.find(el => el.id === item);
        return obj ? obj.name : null;
      })

      return result.join(', ');
  }

  updateGallery(data) {
    if (!data || !this.out) { 
      throw new Error("No value or wrong selector");
      return;
    }

    this.out.insertAdjacentHTML("beforeend", data);
  }

  // якщо помилка
  onError(error){
    console.log(error);
  } 
}