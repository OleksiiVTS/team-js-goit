const axios = require("axios/dist/axios.min.js"); // node
import {disableSpinner, enableSpinner} from '../js-vs/spinner-js.js'
//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

export default class Movie {
  constructor({ id, url, query, selector }) {
    this.out = this.getSelect(selector);  // куди виводимо дані
    this.url = URL + url;
    
    this.id = id;
    this.nameMovie = "";
    
    this.movieDetails = {};
    this.trailers = [];

    this.params = {
      api_key: API_KEY,
      page: 1,
      query: query,
    };
  }

  // куди виводимо дані
  getSelect(selector) {
    return document.querySelector(selector);
  }

  // запит для отримання фільму по id
  async getMovie(id = this.id) { 
    try {

      enableSpinner()

      const params = new Object(this.params);

      // --url 'https://api.themoviedb.org/3/movie/603692?language=en-US' \
      const url = this.url + `/${id}`
      const { data } = await axios.get(url, { params });

      //const urlMovie = `${this.url}/${id}?$api_key=${api_key}&guery=${query}&page=${page}`
      //const movie = await axios(urlMovie, {});
      this.movieDetails = await data;
      this.nameMovie = await data.original_title;
      disableSpinner();

      return data;

    } catch (error) {
      this.onError(`Cann't load movie for movies_id=${id}:`, error);
    }
  }

  // запит для отримання списку трейлерів для фільму по його id
  async getTrailers(id = this.id) { 
    try {

      enableSpinner()

      const params = new Object(this.params);

      // --url 'https://api.themoviedb.org/3/movie/603692/videos?language=en-US'
      const url = this.url + `/${id}/videos`;
      const { data } = await axios.get(url, { params });
      this.trailers = await data.results;
      disableSpinner()

      return data.results;
    
    } catch (error) {
      this.onError(`Cann't load trailers for movies_id=${id}:`, error);
    }

  }

  MarkupMovieDetails(data, trailers) { 
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
    const [ offTrailer ] = trailers.filter(e => e.name === "Official Trailer");

    const urlTrailer = `https://www.youtube.com/watch?v=${offTrailer.key}`;
      

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
          <b>Budget: </b>${budget}
        </p>
        <p class="info-item">
          <b>Trailer: </b><a href='${urlTrailer}'>${offTrailer.name}</a>
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

  async onMarkup(id = this.id, selector = this.out, cbMarkup = this.MarkupMovieDetails) { 
    try {
      enableSpinner();

      const data = await this.getMovie(id);
      const trailers = await this.getTrailers(id);
      const markup = cbMarkup(data, trailers);

      this.update(markup, selector);
      
      disableSpinner();
  
      return data;

    } catch (error) {
      this.onError(`Movie with movie_id=${id} not found:`, error);
    }
  }

    // вивід даних на хтмл-сторінку
  update(data, selector = this.out) {
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