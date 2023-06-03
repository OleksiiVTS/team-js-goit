import Gallery from './Gallery.js';
import GenreList from './GenreList.js';

// elements in html
const refs = {
  out: document.querySelector(".gallery"),
}


// екземпляр класа до відображення трендових фільмів на день
const moviesTrendsDay = new Gallery({
  selector: ".gallery",         // куди виводимо сформований HTML-код 
  url: '/trending/movie/day',   // частина шляху для запиту
  query: 'language=en'          // сам запит, те що стоъть після знаку ?
});

moviesTrendsDay.onMarkup();



//=========================
//
const genre = new GenreList({
  selector: ".select",      // куди виводимо сформований HTML-код 
  url: "/genre/movie/list", // частина шляху для запиту
  query: 'language=en'      // сам запит, те що стоъть після знаку ?
});

genre.outMarkupGenreList();



/// ================================
// Використання сторонньої бібліотекі
// 
// // Класс + ключ
// const MovieDB = require('moviedb')('347a4b587b74ee2a22d09434547acda6');

// //'https://api.themoviedb.org/3/search/movie?
// //  query = Alien 
// //  & include_adult=false 
// //  & language=en - US 
// //  & page=1 
// //  & region=France 
// //  & year=2022'
// // Пошук списку фільмів по назві
// MovieDB.searchMovie({ query: 'Zoolander', page: 3 }, (err, res) => {
//   console.log('query: Zoolander');
//   console.log(res);
//   console.log('---------------');
// });

// MovieDB.searchMovie({ query: 'Alien' }, (err, res) => {
//   console.log('query: Alien');
//   console.log(res);
//   console.log('---------------');
// });

// // // Нові очікувані фільми
// MovieDB.miscUpcomingMovies({page: 2}, (err, res) => {
//   console.log('UpcomingMovie');
//   console.log(res);
//   console.log('---------------');
// });

// // // список жанрів
// MovieDB.genreMovieList({}, (err, res) => {
//   console.log('Genre');
//   console.log(res);
//   console.log('---------------');
// })

// // // Фільми по конкретному жанру
// MovieDB.genreMovies({ id: 14, page: 5 }, (err, res) => {
//   console.log(`Movies for Genry.id:14`);  
//   console.log(res);
//   console.log('---------------');
// });


// // //https://api.themoviedb.org/3/configuration/countries
// // Країни
// MovieDB.configurationCountries({ }, (err, res) => {
//   console.log(`Countries`);  
//   console.log(res);
//   console.log('---------------');
// });


// // // інформація по фільму за id
// MovieDB.movieInfo({ id: 840326 }, (err, res) => {
//   console.log(res.title, res.id);
//   console.log(res);
//   console.log('---------------');
// });

// // // Трендові фільми: id = 'day' / 'week'
// MovieDB.trendingMovie({ id: 'day' }, (err, res) => {
//   console.log("trendingMovie");
//   console.log(res);
//   console.log('---------------');
// });
