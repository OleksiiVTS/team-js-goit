var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequire480d;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,i.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire480d=i);var r=i("2JeuR"),a=i("2BK0I");const l=new(0,r.default)({selector:".select",url:"/genre/movie/list",query:"language=en"});function o(e){const t=l.importFromLS();if(!e)return;return e.map((e=>{const n=t.find((t=>t.id===e));return n?n.name:null})).join(", ")}l.getGenreList();const s=document.querySelector(".library");let d=JSON.parse(localStorage.getItem("libraryFilms"));const c=document.querySelector(".library-filter");function u(e){const t=Number(c.value);try{if(d=JSON.parse(localStorage.getItem("libraryFilms")),0===d.length)throw new Error("масив пустий");if(isNaN(t))return void m(d);m(d.filter((e=>e.genres?e.genres.some((e=>e.id===t)):e.genre_ids.some((e=>e===t)))))}catch(e){!function(e){console.log(e)}(e)}}function m(e){const t=function(e){return e.reduce(((e,t)=>e+function(e){const{poster_path:t,original_title:n,title:i,vote_average:r,release_date:a,id:l}=e;let s=null;s=e.genres?e.genres.map((e=>e.name)).slice(0,2).join(", "):o(e.genre_ids.slice(0,2));let d=s;s.length>20&&(d=s.split(",")[0]);let c="",u="";null===t?(c="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",u="style=padding-top:150px"):c="https://image.tmdb.org/t/p/w400"+t;return`<a href="" data-id-movie="${l||0}">\n  <div ${u} class="movie-card overlay-card" data-id-movie="${l||0}">\n      <img class="gallery__image" src="${c}" alt="${i||n}" loading="lazy"/>\n      <div class="gallery__up_image"></div>\n      <div class="catalog_info">\n        <h2 class="catalog_title">\n        ${i||n}\n        </h2>\n          <div class="ganres_rating">\n            <p class="catalog_genres">\n            ${d} | ${a.slice(0,4)}\n            </p>\n            <div class="rating">\n            <div class="rating__body">\n              <div class="rating__active" style="width: ${10*r.toFixed(1)}%;"></div>\n              <div class="rating__items">\n                <input type="radio" class="rating__item" name="rating" value="1">\n                <input type="radio" class="rating__item" name="rating" value="2">\n                <input type="radio" class="rating__item" name="rating" value="3">\n                <input type="radio" class="rating__item" name="rating" value="4">\n                <input type="radio" class="rating__item" name="rating" value="5">\n              </div>\n            </div>\n          </div>\n          </div>\n      </div>\n      </div>\n      </a>`}(t)),"")}(e);!function(e){s&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",e))}(t),function(){if(!s)return;s.querySelectorAll(".movie-card").forEach((e=>{const t=Number(e.dataset.idMovie);let n=d;if(0===n.length)throw Error("Список бібліотеки пустий");const i=n.filter((e=>e.id===t));if(0===i.length)throw Error("у об`єктів повинні бути id");e.addEventListener("click",(e=>{e.preventDefault(),document.body.style.overflow="hidden",document.addEventListener("keydown",p),function(e){const{title:t,original_title:n,poster_path:i,vote_average:r,vote_count:a,popularity:l,overview:s,genre_ids:d}=e;let c="Add to My Library";const u=JSON.parse(localStorage.getItem("libraryFilms"))||[];for(const e of u)e.title!==t&&e.original_title!==t||(c="Remove from My Library");let m=null;m=e.genres?e.genres.map((e=>e.name)).slice(0,2).join(", "):o(e.genre_ids.slice(0,2));let g=m;m.length>20&&(g=m.split(",")[0]);const p=document.getElementById("moreDetails");p.classList.remove("more-details-is-hidden"),p.innerHTML=`\n      <div class="more-details-modal">\n        <div class="close-button-box">\n          <button class="more-details-close-button" id="closeDetails" type="button">X</button>\n        </div>\n        <div class="details-wrapper">\n          <div class="more-details-img-box">\n            <img width="380px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/${i}" alt="${t}" />\n          </div>\n          <div class="more-details-info">\n            <h2 class="film-title">${t||n}</h2>\n            <table>\n              <tr>\n                <td class="table-row table-column-name">Vote / Votes:</td>\n                <td><span class="vote-average">${r}</span> / <span class="vote-count">${a}</span></td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Popularity:</td>\n                <td>${l}</td>\n              </tr>\n              <tr>\n                <td class="table-row table-column-name">Genre:</td>\n                <td>${g}</td>\n              </tr>\n            </table>\n            <span class="description-about">About:</span>\n            <span class="more-details-about">${s}</span>\n            <div class="more-details-adml-box">\n              <button id="addToLibraryButton" class="button-rem-me">${c}</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    `;p.querySelector("#closeDetails").addEventListener("click",v);p.querySelector("#addToLibraryButton").addEventListener("click",(()=>{!function(e){try{const t=document.getElementById("addToLibraryButton"),n=JSON.parse(localStorage.getItem("libraryFilms"))||[],i=e.title||e.original_title;if("Add to My Library"===t.textContent)t.textContent="Remove from My Library",n.push(e),localStorage.setItem("libraryFilms",JSON.stringify(n));else{t.textContent="Add to My Library";const e=n.findIndex((e=>e.title===i||e.original_title===i));-1!==e&&(n.splice(e,1),localStorage.setItem("libraryFilms",JSON.stringify(n)))}}catch(e){console.error(e)}}(e)}))}(i[0]),setTimeout(a.styleModal,0)}))}))}(),g()}function g(){if(s){const e=function(){if(0===d.length)return document.querySelector(".library-filter").style.display="none",'<div class="empty-library"> \n      <p class="empty-library-text">OOPS...<br/> We are very sorry! <br/> You don’t have any movies in your library.</p>\n      <button type="button" class="button-watch-trailer">\n        <a class="hero-href"  href="../src/partials/catalog/catalog-catalog.html">Search movie</a>\n      </button>\n    </div>'}();e&&(s.innerHTML="",s.insertAdjacentHTML("beforeend",e))}}function v(){const e=document.getElementById("moreDetails");document.body.style.overflow="visible",e.classList.add("more-details-is-hidden"),document.removeEventListener("keydown",p),u(),g()}function p(e){"Escape"===e.key&&v()}c&&c.addEventListener("input",u),m(d);
//# sourceMappingURL=library.3d63b69b.js.map
