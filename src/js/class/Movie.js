const axios = require("axios/dist/axios.min.js"); // node
import {disableSpinner, enableSpinner} from '../js-vs/spinner-js.js'
//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

export default class Movie {
  constructor({ id, name, url, query, selector }) {
    this.out = this.getSelect(selector);  // куди виводимо дані
    this.url = URL + url;
    
    this.id = id;
    this.nameMovie = name;
    
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

  // запит 
  async getMovie(id = this.id) { 
    try {
      enableSpinner()
      const { api_key, page, query } = this.param;
      // --url 'https://api.themoviedb.org/3/movie/603692?language=en-US' \
      const urlMovie = `${this.url}/${id}?$api_key=${api_key}&guery=${query}&page=${page}`
      this.movieDetails = await axios(urlMovie);

      console.log(this.movieDetails);
      disableSpinner();
      return this.movieDetails;

    } catch (error) {
      this.onError(`Cann't load movie for movies_id=${id}:`, error);
    }
  }

  async getTrailers() { 
    try {

      enableSpinner(id = this.id)
      const { api_key, page, query } = this.param;
      // --url 'https://api.themoviedb.org/3/movie/603692/videos?language=en-US' \
      const urlTrailers = `${this.url}/${id}/videos?$api_key=${api_key}&guery=${query}&page=${page}`
      const trailers = await axios(urlTrailers);
      this.trailers = await trailers.results;

      console.log(this.trailers);
      disableSpinner()

      return trailers.results;
    
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

    console.log(data, trailers);
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      
    const urlTrailer = trailers.filter(e => { e.name.includes('Official'); return e.key })
        `https://www.youtube.com/watch?v=${urlTrailer}`;
      

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
          <b>Traler: </b>$${urlTrailer}
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
      console.log(data, trailers);
      const markup = cbMarkup(data, trailers);

      console.log(markup);
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
    selector.innerHTML = '';
    selector.insertAdjacentHTML("beforeend", data);
  }

  // якщо помилка
  onError(error){
    console.log(error);
  } 
}