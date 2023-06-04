import Gallery from '../class/Gallery.js'

// екземпляр класа до відображення трендових фільмів на тиждень
const movies = new Gallery({
  selector: ".gallery",         // куди виводимо сформований HTML-код 
  url: '/trending/movie/week',   // частина шляху для запиту
  query: 'language=en'          // сам запит, те що стоъть після знаку ?
});

movies.onMarkup();
