import Gallery from '../class/Gallery.js';
import { styleModal } from "../js-header/header.js";


// filter
const select = document.querySelector('.library-filter');
if (select) {
  select.addEventListener('input', onLibreryFilter);
}

const libraryList = new Gallery({
  name: 'libraryFilms',
  selector: ".library",
  url: '',
  query: '',
})
libraryList.onMarkupFromLS('libraryFilms')
libraryList.onFilter('.library-filter')


