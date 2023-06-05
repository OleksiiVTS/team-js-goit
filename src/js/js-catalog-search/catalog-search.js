const URL = 'https://api.themoviedb.org/3';
const API_KEY = 'ddf41d08627025b2d6783befee0c5c94';

const catalogSearchForm = document.querySelector('.catalog-search-input');
const catalogSearchSubmitBtn = document.querySelector('.button-round-search');
catalogSearchSubmitBtn.addEventListener('click', onSubmit);

console.log(5);
function onSubmit(event) {
  event.preventDefault();

  const value = catalogSearchForm.value.trim();
  if (value === '') return;
  else {
    gallery.query = value;

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
