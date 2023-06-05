import Pagination from 'tui-pagination';
import axios from 'axios';
import 'tui-pagination/dist/tui-pagination.css';
const TUI_VISIBLE_PAGES = 5;

export function createPagination(totalItems, visiblePages) {
  const options = {
    itemsPerPage: 20,
    totalItems: totalItems,
    visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
  };

  const pagination = new Pagination(refs.pagination, options);

  if (visiblePages > 1) {
    refs.pagination.style.display = 'block';
  } else {
    refs.pagination.style.display = 'none';
  }

  return pagination;
}


const MAIN_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7944ae355bdc42ac579681e106149d6b';

export async function getTrending(page = 1) {
  const url = `${MAIN_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getByKeyword(query, page) {
  const url = `${MAIN_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getInfoMovie(movie_id) {
  const url = `${MAIN_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {});
}

export async function getVideos(movie_id) {
  const url = `${MAIN_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  return await axios
    .get(url)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {});
}

export async function getArrayofMovies(array) {
  const arrayOfMovies = array.map(async movie_id => {
    return await axios
      .get(`${MAIN_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const resultData = await Promise.all(arrayOfMovies);
  return resultData;
}