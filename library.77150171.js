!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},r=t.parcelRequire480d;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in n){var r=n[t];delete n[t];var a={id:t,exports:{}};return e[t]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){n[t]=e},t.parcelRequire480d=r);var a=new(0,r("kicot").default)({selector:".select",url:"/genre/movie/list",query:"language=en"});function i(t){if(list=a.importFromLS(),t)return t.map((function(t){var e=list.find((function(e){return e.id===t}));return e?e.name:null})).join(", ")}a.getGenreList();var o=document.querySelector(".library"),l=JSON.parse(localStorage.getItem("libraryFilms")),s=document.querySelector(".library-filter");function c(t){var e=Number(s.value);try{var n=JSON.parse(localStorage.getItem("libraryFilms"));if(isNaN(e))return void d(n);d(n.filter((function(t){return t.genres?t.genres.some((function(t){return t.id===e})):t.genre_ids.some((function(t){return t===e}))})))}catch(t){}}function d(t){var e=function(t){return t.reduce((function(t,e){return t+function(t){var e=t.poster_path,n=t.original_title,r=t.title,a=t.vote_average,o=t.release_date,l=t.id,s=null;s=t.genres?t.genres.map((function(t){return t.name})).slice(0,2).join(", "):i(t.genre_ids.slice(0,2));return'<a href="" data-id-movie="'.concat(l||0,'">\n  <div class="movie-card overlay-card" data-id-movie="').concat(l||0,'">\n      <img class="gallery__image" src="').concat("https://image.tmdb.org/t/p/w400"+e,'" alt="').concat(r||n,'" loading="lazy"/>\n      <div class="gallery__up_image"></div>\n      <div class="catalog_info">\n        <h2 class="catalog_title">\n        ').concat(r||n,'\n        </h2>\n          <div class="ganres_rating">\n            <p class="catalog_genres">\n            ').concat(s," | ").concat(o.slice(0,4),'\n            </p>\n            <div class="rating">\n            <div class="rating__body">\n              <div class="rating__active" style="width: ').concat(10*a.toFixed(1),'%;"></div>\n              <div class="rating__items">\n                <input type="radio" class="rating__item" name="rating" value="1">\n                <input type="radio" class="rating__item" name="rating" value="2">\n                <input type="radio" class="rating__item" name="rating" value="3">\n                <input type="radio" class="rating__item" name="rating" value="4">\n                <input type="radio" class="rating__item" name="rating" value="5">\n              </div>\n            </div>\n          </div>\n          </div>\n      </div>\n      </div>\n      </a>')}(e)}),"")}(t);!function(t){o&&(o.innerHTML="",o.insertAdjacentHTML("beforeend",t))}(e),function(){if(!o)return;o.querySelectorAll(".movie-card").forEach((function(t){var e=Number(t.dataset.idMovie),n=l;if(0===n.length)throw Error("Список бібліотеки пустий");var r=n.filter((function(t){return t.id===e}));if(0===r.length)throw Error("у об`єктів повинні бути id");t.addEventListener("click",(function(t){t.preventDefault(),document.body.style.overflow="hidden",function(t){var e=t.title,n=t.original_title,r=t.poster_path,a=t.vote_average,o=t.vote_count,l=t.popularity,s=t.overview,d=(t.genre_ids,"Add to My Library"),u=JSON.parse(localStorage.getItem("libraryFilms"))||[],v=!0,m=!1,g=void 0;try{for(var f,y=u[Symbol.iterator]();!(v=(f=y.next()).done);v=!0){var p=f.value;p.title!==e&&p.original_title!==e||(d="Remove from My Library")}}catch(t){m=!0,g=t}finally{try{v||null==y.return||y.return()}finally{if(m)throw g}}var b=null;b=t.genres?t.genres.map((function(t){return t.name})).slice(0,2).join(", "):i(t.genre_ids.slice(0,2));var _=document.getElementById("moreDetails");_.classList.remove("more-details-is-hidden"),_.innerHTML='\n      <div class="more-details-modal">\n        <div class="close-button-box">\n          <button class="more-details-close-button" id="closeDetails" type="button">X</button>\n        </div>\n        <div class="details-wrapper">\n          <div class="more-details-img-box">\n            <img width="380px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/'.concat(r,'" alt="').concat(e,'" />\n          </div>\n          <div class="more-details-info">\n            <h2 class="film-title">').concat(e||n,'</h2>\n            <table>\n              <tr>\n                <td class="table-row table-column-name">Vote / Votes:</td>\n                <td><span class="vote-average">').concat(a,'</span> / <span class="vote-count">').concat(o,'</span></td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Popularity:</td>\n                <td>').concat(l,'</td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Genre:</td>\n                <td>').concat(b,'</td>\n              </tr>\n            </table>\n            <span class="description-about">About:</span>\n            <span class="more-details-about">').concat(s,'</span>\n            <div class="more-details-adml-box">\n              <button id="addToLibraryButton" class="button-rem-me">').concat(d,"</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    "),_.querySelector("#closeDetails").addEventListener("click",(function(){document.body.style.overflow="visible",_.classList.add("more-details-is-hidden"),c()})),_.querySelector("#addToLibraryButton").addEventListener("click",(function(){!function(t){try{var e=document.getElementById("addToLibraryButton"),n=JSON.parse(localStorage.getItem("libraryFilms"))||[],r=t.title||t.original_title;if("Add to My Library"===e.textContent)e.textContent="Remove from My Library",n.push(t),localStorage.setItem("libraryFilms",JSON.stringify(n));else{e.textContent="Add to My Library";var a=n.findIndex((function(t){return t.title===r||t.original_title===r}));-1!==a&&(n.splice(a,1),localStorage.setItem("libraryFilms",JSON.stringify(n)))}}catch(t){console.error(t)}}(t)}))}(r[0])}))}))}()}if(s&&s.addEventListener("input",c),d(l),o){var u=function(){if(0===l.length)return document.querySelector(".library-filter").style.display="none",'<div class="empty-library"> \n      <p class="empty-library-text">OOPS...<br/> We are very sorry! <br/> You don’t have any movies in your library.</p>\n      <button type="button" class="button-watch-trailer">\n        <a class="hero-href"  href="../src/partials/catalog/catalog-catalog.html">Search movie</a>\n      </button>\n    </div>'}();u&&o.insertAdjacentHTML("beforeend",u)}}();
//# sourceMappingURL=library.77150171.js.map
