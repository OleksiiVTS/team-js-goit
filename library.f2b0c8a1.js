!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},r=t.parcelRequire480d;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in n){var r=n[t];delete n[t];var a={id:t,exports:{}};return e[t]=a,r.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){n[t]=e},t.parcelRequire480d=r);var a=r("kicot"),i=r("kjABN"),o=new(0,a.default)({selector:".select",url:"/genre/movie/list",query:"language=en"});function l(t){if(list=o.importFromLS(),t)return t.map((function(t){var e=list.find((function(e){return e.id===t}));return e?e.name:null})).join(", ")}o.getGenreList();var s=document.querySelector(".library"),c=JSON.parse(localStorage.getItem("libraryFilms")),d=document.querySelector(".library-filter");function u(t){var e=Number(d.value);try{if(0===(c=JSON.parse(localStorage.getItem("libraryFilms"))).length)throw new Error("масив пустий");if(isNaN(e))return void v(c);v(c.filter((function(t){return t.genres?t.genres.some((function(t){return t.id===e})):t.genre_ids.some((function(t){return t===e}))})))}catch(t){!function(t){console.log(t)}(t)}}function v(t){var e=function(t){return t.reduce((function(t,e){return t+function(t){var e=t.poster_path,n=t.original_title,r=t.title,a=t.vote_average,i=t.release_date,o=t.id,s=null;s=t.genres?t.genres.map((function(t){return t.name})).slice(0,2).join(", "):l(t.genre_ids.slice(0,2));var c=s;s.length>20&&(c=s.split(",")[0]);return'<a href="" data-id-movie="'.concat(o||0,'">\n  <div class="movie-card overlay-card" data-id-movie="').concat(o||0,'">\n      <img class="gallery__image" src="').concat("https://image.tmdb.org/t/p/w400"+e,'" alt="').concat(r||n,'" loading="lazy"/>\n      <div class="gallery__up_image"></div>\n      <div class="catalog_info">\n        <h2 class="catalog_title">\n        ').concat(r||n,'\n        </h2>\n          <div class="ganres_rating">\n            <p class="catalog_genres">\n            ').concat(c," | ").concat(i.slice(0,4),'\n            </p>\n            <div class="rating">\n            <div class="rating__body">\n              <div class="rating__active" style="width: ').concat(10*a.toFixed(1),'%;"></div>\n              <div class="rating__items">\n                <input type="radio" class="rating__item" name="rating" value="1">\n                <input type="radio" class="rating__item" name="rating" value="2">\n                <input type="radio" class="rating__item" name="rating" value="3">\n                <input type="radio" class="rating__item" name="rating" value="4">\n                <input type="radio" class="rating__item" name="rating" value="5">\n              </div>\n            </div>\n          </div>\n          </div>\n      </div>\n      </div>\n      </a>')}(e)}),"")}(t);!function(t){s&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",t))}(e),function(){if(!s)return;s.querySelectorAll(".movie-card").forEach((function(t){var e=Number(t.dataset.idMovie),n=c;if(0===n.length)throw Error("Список бібліотеки пустий");var r=n.filter((function(t){return t.id===e}));if(0===r.length)throw Error("у об`єктів повинні бути id");t.addEventListener("click",(function(t){t.preventDefault(),document.body.style.overflow="hidden",function(t){var e=t.title,n=t.original_title,r=t.poster_path,a=t.vote_average,i=t.vote_count,o=t.popularity,s=t.overview,c=(t.genre_ids,"Add to My Library"),d=JSON.parse(localStorage.getItem("libraryFilms"))||[],v=!0,g=!1,f=void 0;try{for(var y,p=d[Symbol.iterator]();!(v=(y=p.next()).done);v=!0){var b=y.value;b.title!==e&&b.original_title!==e||(c="Remove from My Library")}}catch(t){g=!0,f=t}finally{try{v||null==p.return||p.return()}finally{if(g)throw f}}var _=null;_=t.genres?t.genres.map((function(t){return t.name})).slice(0,2).join(", "):l(t.genre_ids.slice(0,2));var h=_;_.length>20&&(h=_.split(",")[0]);var w=document.getElementById("moreDetails");w.classList.remove("more-details-is-hidden"),w.innerHTML='\n      <div class="more-details-modal">\n        <div class="close-button-box">\n          <button class="more-details-close-button" id="closeDetails" type="button">X</button>\n        </div>\n        <div class="details-wrapper">\n          <div class="more-details-img-box">\n            <img width="380px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/'.concat(r,'" alt="').concat(e,'" />\n          </div>\n          <div class="more-details-info">\n            <h2 class="film-title">').concat(e||n,'</h2>\n            <table>\n              <tr>\n                <td class="table-row table-column-name">Vote / Votes:</td>\n                <td><span class="vote-average">').concat(a,'</span> / <span class="vote-count">').concat(i,'</span></td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Popularity:</td>\n                <td>').concat(o,'</td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Genre:</td>\n                <td>').concat(h,'</td>\n              </tr>\n            </table>\n            <span class="description-about">About:</span>\n            <span class="more-details-about">').concat(s,'</span>\n            <div class="more-details-adml-box">\n              <button id="addToLibraryButton" class="button-rem-me">').concat(c,"</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    "),w.querySelector("#closeDetails").addEventListener("click",(function(){document.body.style.overflow="visible",w.classList.add("more-details-is-hidden"),u(),m()})),w.querySelector("#addToLibraryButton").addEventListener("click",(function(){!function(t){try{var e=document.getElementById("addToLibraryButton"),n=JSON.parse(localStorage.getItem("libraryFilms"))||[],r=t.title||t.original_title;if("Add to My Library"===e.textContent)e.textContent="Remove from My Library",n.push(t),localStorage.setItem("libraryFilms",JSON.stringify(n));else{e.textContent="Add to My Library";var a=n.findIndex((function(t){return t.title===r||t.original_title===r}));-1!==a&&(n.splice(a,1),localStorage.setItem("libraryFilms",JSON.stringify(n)))}}catch(t){console.error(t)}}(t)}))}(r[0]),setTimeout(i.styleModal,0)}))}))}(),m()}function m(){if(s){var t=function(){if(0===c.length)return document.querySelector(".library-filter").style.display="none",'<div class="empty-library"> \n      <p class="empty-library-text">OOPS...<br/> We are very sorry! <br/> You don’t have any movies in your library.</p>\n      <button type="button" class="button-watch-trailer">\n        <a class="hero-href"  href="../src/partials/catalog/catalog-catalog.html">Search movie</a>\n      </button>\n    </div>'}();t&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",t))}}d&&d.addEventListener("input",u),v(c)}();
//# sourceMappingURL=library.f2b0c8a1.js.map
