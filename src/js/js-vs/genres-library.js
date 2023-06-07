const libraryFilter = document.querySelector('.library-filter')
// const libraryFilter = document.getElementById('libraryFilterCinemania')
// console.log(libraryFilter)

libraryFilter.addEventListener('input', filterLibrary)

function filterLibrary (evt) {
  const ddd = evt.target.value
 
  const genres = localStorage.getItem("genreList");
  if(genres.includes(ddd)) {
    // console.log('ура')
  }

// console.log(ddd)
// console.log(ddd.length)
}