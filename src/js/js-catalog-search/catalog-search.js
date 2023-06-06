const url = 'https://api.themoviedb.org/3/search/movie?';
const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';
let query = '';
import { disableSpinner, enableSpinner } from '../js-vs/spinner-js.js';

const catalogSearchForm = document.querySelector('.catalog-search-input');
const catalogSearchSubmitBtn = document.querySelector('.button-round-search');
catalogSearchSubmitBtn.addEventListener('click', onSubmit);

import Gallery from '../class/Gallery.js';

const gallery = new Gallery({
  query: '',
  url: '/search/movie?',
  selector: '.catalogSearchForm',
});

function onError(error) {
  console.log(error);
}
console.log(5);

async function onSubmit(event) {
  event.preventDefault();

  const value = catalogSearchForm.value.trim();
  if (value === '') return;
  else {
    gallery.params.query = value;

    try {
      const markup = await getThis();
      console.log(markup);
    } catch (err) {
      onError(err);
    }
    // disableSpinner();

    //     OOPS...
    // We are very sorry!
    // We don’t have any results matching your search.
    // async function getMovie(query) {
    //   const bader = await axios.get(`${URL}?query=${query}&api_key=${API_KEY}`);
    //   console.log(bader);
    //   return bader;
    // }
    // getMovie(query);
  }
}
async function getThis() {
  try {
    const { results } = await gallery.getList();
    if (!results) {
      loadMoreBtn.hide();
      return '';
    }
    return results.reduce((markup, el) => createMarkup(el) + markup, '');
  } catch (err) {
    onError(err);
  }
}
