const axios = require("axios/dist/axios.min.js"); // node
// import {disableSpinner, enableSpinner} from '../js-vs/spinner-js.js'
//import Notiflix from 'notiflix';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6'
const URL = 'https://api.themoviedb.org/3';

// передаємо класс селектору куди будемо вставляти лист жанрів
export default class GenreList {
  constructor({ selector, url, query }) {
    this.name = 'genreList';
    this.out = this.getSelect(selector);
    this.list = this.importFromLS();

    this.url = URL + url;
    this.params = { 
      api_key: API_KEY,
      query: query, ///'language=en',
    };
  }

  getSelect(selector) {
    return document.querySelector(selector);
  }

  // Отримати масив об'єктів cпискe жанрів
  async getGenreList() {
    try {
      // enableSpinner();
      const params = new Object(this.params);

      const {data} = await axios.get(this.url, { params });

      this.exportToLS(data.genres);
      this.list = await data.genres;

      // disableSpinner();

      return data.genres; 
    } catch (error) {
      if (!this.list) {
        this.list = this.importFromLS()
      }

      this.onError(error);
    }
  }

  exportToLS(data) {
    const str = JSON.stringify(data);
    localStorage.setItem(this.name, str);
  }

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


  // створити html-розмітку для всіх строк селекту
  async createGenreList() {
    try {
      // enableSpinner();

      //--url 'https://api.themoviedb.org/3/genre/movie/list?language=en'
      const data = await this.getGenreList();
     
      // disableSpinner();
      return data.reduce(
           (acc, data) => {
            return acc + this.createGenreSelectRow(data)
          }, "");
    
    } catch (error) {
      this.onError(error);  
    }
  }

  // cтворення html-строки для селекту
  createGenreSelectRow(data){
    return `<option value="${data.id}">${data.name}</option>`;
  }

  // сформувати селект
  async outMarkupGenreList() { 
    try {
      // enableSpinner();
      const markup = await this.createGenreList();
      this.update(markup);
      // disableSpinner();

      return markup;
    } catch (error) {
      this.onError(error);  
    }
  }

  // записати дані у селект
  update(data) {
    if (!data || !this.out) { 
      throw new Error("No value or wrong selector");
      return;
    }
    
    if (this.out) {
      this.out.insertAdjacentHTML("beforeend", data);
    }
  }

  // отримати список жанрів
  async getList() {
    try {
      // enableSpinner();
      const list = await this.getGenreList();
      // disableSpinner();

      return list;      
    } catch (error) {
     this.onError(error); 
    }
  }

  // якщо помилка
  onError(error){
    console.log(error);
  } 
      
}
