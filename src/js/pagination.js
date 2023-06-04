import Pagination from 'tui-pagination';
import axios from 'axios';

const paginationContainer = document.getElementById('tui-pagination-container');
const pageContentContainer = document.getElementById('page-content-container');
const totalItems = 100; // Замінити фактичною загальною кількістю елементів
const itemsPerPage = 10; // Замініть бажану кількість елементів на сторінці

const pagination = new Pagination(paginationContainer, {
  totalItems,
  itemsPerPage,
  visiblePages: 5,
  centerAlign: true,
});

pagination.on('afterMove', async (eventData) => {
  const currentPage = eventData.page;

  try {
    // Отримання даних для поточної сторінки за допомогою Axios
    const data = await fetchDataForPage(currentPage);
    // Замініть "fetchDataForPage" своєю власною функцією для отримання даних для поточної сторінки

    // Створення розмітки для елементів на поточній сторінці
    const pageMarkup = createPageMarkup(data);
   // Замініть "createPageMarkup" своєю власною функцією, щоб створити розмітку для поточної сторінки

     // Оновлення вмісту сторінки за допомогою згенерованої розмітки
    updatePageContent(pageMarkup);
    // Замініть "updatePageContent" своєю власною функцією для оновлення вмісту сторінки
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  window.scrollTo(0, 0);
});

async function fetchDataForPage(page) {
  const response = await axios.get('https://example.com/api/items', {
    params: {
      page,
      perPage: itemsPerPage,
    },
  });

  return response.data;
}

function createPageMarkup(data) {
  let markup = '';
  data.forEach((item) => {
    markup += `<div class="item">${item.title}</div>`;
    // Замінити генерацією власної розмітки елемента на основі отриманих даних
  });

  return markup;
}

function updatePageContent(markup) {
  pageContentContainer.innerHTML = markup;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const initialData = await fetchDataForPage(1); // Отримання початкових даних для першої сторінки
    const initialPageMarkup = createPageMarkup(initialData);
    updatePageContent(initialPageMarkup);
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
});
