import Gallery from '../class/Gallery.js'

// екземпляр класа до відображення трендових фільмів на тиждень
const movies = new Gallery({
  selector: ".gallery",         // куди виводимо сформований HTML-код 
  url: '/trending/movie/day',   // частина шляху для запиту
  query: 'language=en'          // сам запит, те що стоъть після знаку ?
});

console.log(movies);
movies.onMarkup();

// Запис масиву об'єктів у localStorage
const a = [
  { id: 1, name: 'Оєкт 1' },
  { id: 2, name: 'Обєкт 2' },
  { id: 3, name: 'Обєкт 3' }
];

localStorage.setItem('a', JSON.stringify(a));

// Зчитування масиву об'єктів з localStorage
const r = localStorage.getItem('a');
const ar = JSON.parse(r);

console.log(ar);
