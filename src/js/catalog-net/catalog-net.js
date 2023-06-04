
const API_KEY = '45b8ac4dc4bcb28ba01349825b9d5176';
const URL = 'https://api.themoviedb.org/3/trending/all/week';
// let page = 0;
// let searchQuery= ''
// onCreateMarkupCard()

async function onFetchData() {
  try {
    const response = await fetch(`${URL}?api_key=${API_KEY}&backdrop_path&original_title&title=&popularity&language=en-US`)
  const data = await response.json()
  //   console.log(response)
   
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
    // onCreateMarkupCard(data.results);
      return data;
    }
  }  catch (error) {
    console.log('Помилка при запиті на сервер', error)
  }
}
onFetchData()
  .then((data) => {
    console.log("Отримання даних про фильми тижня:", data.results);
    onCreateMarkupCard(data.results)
  })

    function onCreateMarkupCard(data) {
      const catalogGalleryEl = document.querySelector('.catalog-gallery');
      catalogGalleryEl.insertAdjacentHTML('beforeend', data.reduce((card, { poster_path, original_title, title, vote_average }) => {
        // const { backdrop_path, original_title, title, popularity } = card;
        return (card + `
  <div class="movie-card">
  <img class= "gallery__image" src="${'https://image.tmdb.org/t/p/w300'+poster_path}" alt="${original_title}" loading="lazy" />
  <div class="info overlay">
    <p class="info-item">
      <b>Назва:
      ${title}</b>
      </p>
      <p class="info-item">
      <b>Рейтинг:
      ${vote_average}</b>
    </p>
  </div>
  </div>
  `)
      }, ''
));
};
// catalogGalleryEl.insertAdjacentHTML('beforeend', onCreateMarkupCard())

// onCreateMarkupCard(dataArr);
  
