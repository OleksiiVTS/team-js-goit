// Додаткова залежність для пагінації
import Pagination from 'tui-pagination';

export default class Gallery {
  // ...

  initPagination() {
    const paginationContainer = document.getElementById('pagination');
    const options = {
      totalItems: this.totalResults,
      itemsPerPage: 20, // Кількість елементів на сторінці
      visiblePages: 5, // Кількість видимих сторінок в пагінації
      centerAlign: true,
      usageStatistics: false,
      onPageClick: (event) => {
        const page = event.page;
        this.resetPage();
        this.params.page = page;
        this.onMarkup();
      },
    };
    const pagination = new Pagination(paginationContainer, options);
  }

  async onMarkup(cbTemplate = this.createCardGallery) {
    try {
      enableSpinner();
      const markup = await this.createNewCards(cbTemplate);
      this.updateGallery(markup);
      this.initPagination(); // Ініціалізуємо пагінацію після отримання нових даних
      disableSpinner();
      return markup;
    } catch (error) {
      this.onError(error);
    }
  }
}
