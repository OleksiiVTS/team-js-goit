!function(){var n=document.querySelector(".library"),a=JSON.parse(localStorage.getItem("libraryFilms"));function t(n){var t=Number(n.currentTarget.value);if(t){var i=a.filter((function(n){return n.genres.some((function(n){return n.id===t}))}));console.log(i),e(i)}else e(a)}function e(a){var t=function(n){return n.reduce((function(n,a){return n+function(n){var a=n.poster_path,t=n.original_title,e=n.title,i=n.vote_average,r=n.release_date,c=n.id,l=n.genres.slice(0,2);return'<a href="'.concat(n,'" data-id-movie="').concat(c,'">\n  <div class="movie-card overlay-card">\n  <img class="gallery__image" src="').concat("https://image.tmdb.org/t/p/w400"+a,'" alt="').concat(t,'" loading="lazy"/>\n  <div class="gallery__up_image"></div>\n  <div class="catalog_info">\n    <h2 class="catalog_title">\n    ').concat(e,'\n    </h2>\n      <div class="ganres_rating">\n        <p class="catalog_genres">\n        $').concat(l.map((function(n){return n.name})).join(", ")," | ").concat(r.slice(0,4),'\n        </p>\n        <div class="rating">\n        <div class="rating__body">\n          <div class="rating__active" style="width: ').concat(10*i.toFixed(1),'%;"></div>\n          <div class="rating__items">\n            <input type="radio" class="rating__item" name="rating" value="1">\n            <input type="radio" class="rating__item" name="rating" value="2">\n            <input type="radio" class="rating__item" name="rating" value="3">\n            <input type="radio" class="rating__item" name="rating" value="4">\n            <input type="radio" class="rating__item" name="rating" value="5">\n          </div>\n        </div>\n      </div>\n      </div>\n  </div>\n  </div>\n  </a>')}(a)}),"")}(a);!function(a){n&&(n.innerHTML="",n.insertAdjacentHTML("beforeend",a))}(t)}window.addEventListener("click",(function(n){if("/library.html"===n.view.location.pathname||"/team-js-goit/library.html"===n.view.location.pathname)return document.querySelector(".library-filter").addEventListener("input",t)}))}();
//# sourceMappingURL=library.b6049296.js.map