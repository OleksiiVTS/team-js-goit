!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequire480d;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire480d=a);var o,i=a("bpxeT"),s=a("2TvXO"),c=document.getElementById("hero-random-film"),l=document.getElementById("hero-container"),d="9073999c285844087924fd0e24160fae";function u(){return p.apply(this,arguments)}function p(){return(p=e(i)(e(s).mark((function t(){var n,r,a,o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(d),e.prev=1,e.next=4,fetch(n);case 4:return r=e.sent,e.next=7,r.json();case 7:return a=e.sent.results,o=a.map((function(e){return e.id})),l.classList.add("hero-hide"),e.abrupt("return",o);case 13:e.prev=13,e.t0=e.catch(1),console.log("Помилка при виконанні запиту до API:",e.t0);case 16:case"end":return e.stop()}}),t,null,[[1,13]])})))).apply(this,arguments)}function v(){return m.apply(this,arguments)}function m(){return(m=e(i)(e(s).mark((function t(){var n,r,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u();case 2:return n=e.sent,r=Math.floor(Math.random()*n.length),o=n[r],e.next=7,f(o);case 7:return a=e.sent,e.abrupt("return",a);case 9:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function f(e){return g.apply(this,arguments)}function g(){return(g=e(i)(e(s).mark((function t(n){var r,a,o,i,c,l,u,p,v,m,f,g,h,y,b;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://api.themoviedb.org/3/movie/".concat(n,"?api_key=").concat(d),e.prev=1,e.next=4,fetch(r);case 4:return a=e.sent,e.next=7,a.json();case 7:return o=e.sent,i=o.title,c=o.trailer_key,l=o.backdrop_path,u=o.overview,p=o.vote_average,v=o.vote_count,m=o.release_date,f=o.popularity,g=o.genres,h=o.poster_path,y="https://www.youtube.com/watch?v=".concat(c),b="https://image.tmdb.org/t/p/original".concat(l),e.abrupt("return",{title:i,trailer:y,backgroundImage:b,overview:u,vote_average:p,vote_count:v,release_date:m,popularity:f,genres:g,poster_path:h});case 23:e.prev=23,e.t0=e.catch(1),console.log("Error occurred while making API request:",e.t0);case 26:case"end":return e.stop()}}),t,null,[[1,23]])})))).apply(this,arguments)}window.addEventListener("DOMContentLoaded",e(i)(e(s).mark((function t(){var n,r;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:n=e.sent,o=void 0,i=void 0,s=void 0,l=void 0,d=void 0,o=(a=n).title,i=a.popularity,s=a.backgroundImage,l=a.overview.split(" "),d=l.slice(0,30).join(" "),l.length>30&&(d+="..."),r='\n    <section class="hero-section">\n    <div class="container hero-container" style="background-image: linear-gradient(\n      86.77deg,\n      #111111 30.38%,\n      rgba(17, 17, 17, 0) 65.61%\n    ), url('.concat(s,');\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: cover;">\n        <h1 class="hero-title">').concat(o,'</h1>\n        <p class="hero-text">Рейтинг: ').concat(i,'</p>\n        <p class="hero-text">').concat(d,'</p>\n        <div class="hero-homepage-buttons">\n          <button id="watchTrailerButton" class="button-watch-trailer">Watch trailer</button>\n          <button id="moreDetailsButton" class="button-more-details">More Details</button>\n        </div>\n      </div>\n    </section>\n  '),t=r,c.insertAdjacentHTML("afterbegin",t),document.getElementById("watchTrailerButton").addEventListener("click",y),document.getElementById("moreDetailsButton").addEventListener("click",I);case 9:case"end":return e.stop()}var t,a,o,i,s,l,d}),t)}))));var h=document.getElementById("myModal");function y(){h.classList.toggle("m-w-t-is-hidden"),document.addEventListener("keydown",w),window.addEventListener("click",k)}function b(){h.classList.toggle("m-w-t-is-hidden"),document.removeEventListener("keydown",w),window.removeEventListener("click",k)}function w(e){"Escape"===e.key&&b()}function k(e){e.target===h&&b()}document.getElementById("closeModal").addEventListener("click",b);var x=document.getElementById("moreDetails");function L(e){var t=e.title,n=(e.backgroundImage,e.overview),r=e.vote_average,a=e.vote_count,o=e.release_date,i=e.popularity,s=e.genres,c=e.poster_path,l="Add to My Library",d=JSON.parse(localStorage.getItem("libraryFilms")),u=!0,p=!1,v=void 0;try{for(var m,f=d[Symbol.iterator]();!(u=(m=f.next()).done);u=!0){m.value.title===t&&(l="Remove from My Library")}}catch(e){p=!0,v=e}finally{try{u||null==f.return||f.return()}finally{if(p)throw v}}return'\n    <div class="more-details-modal">\n      <div class="close-button-box">\n        <button class="more-details-close-button" id="closeDetails" type="button">\n<svg>\n        <use href="../images/sprite.svg#close"></use>\n</svg>\n       </button>\n      </div>\n      <div class="details-wrapper">\n      <div class="more-details-img-box">\n\n\n        <img height="500px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/'.concat(c,'" alt="').concat(t,'" />\n      </div>\n      <div class="more-details-info">\n        <h2>').concat(t,"</h2>\n        <span >Release Date:</span>\n        <span>").concat(o,"</span>\n        <span>Vote / Votes:</span>\n        <span>\n          <span>").concat(r,"</span> /\n          <span>").concat(a,"</span>\n        </span>\n        <span>Popularity:</span>\n        <span>").concat(i,"</span>\n        <span>Genre:</span>\n        <span>").concat(s.map((function(e){return e.name})).join(", "),'</span>\n\n        <span class="description-about">About:</span>\n        <span class="about-value">').concat(n,'</span>\n      </div>\n      <div class="more-details-adml-box">\n        <button id="addToLibraryButton" class="button-rem-me">').concat(l,"</button>\n\n      </div>\n      </div>\n     </div>\n    </div>\n  ")}document.getElementById("closeDetails");function E(e){A(),x.insertAdjacentHTML("afterbegin",e)}function I(){return _.apply(this,arguments)}function _(){return(_=e(i)(e(s).mark((function t(){var n;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x.classList.toggle("more-details-is-hidden"),document.addEventListener("keydown",O),window.addEventListener("click",S),e.next=5,f(o);case 5:n=e.sent,E(L(n)),document.getElementById("closeDetails").addEventListener("click",D),document.getElementById("addToLibraryButton").addEventListener("click",B);case 10:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function B(){return M.apply(this,arguments)}function M(){return(M=e(i)(e(s).mark((function t(){var n,r,a,i;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.querySelector(".button-rem-me"),e.next=3,f(o);case 3:r=e.sent,a=T(),"Add to My Library"===n.textContent?(n.textContent="Remove from My Library",-1===a.findIndex((function(e){return e.title===r.title}))&&(a.push(r),localStorage.setItem("libraryFilms",JSON.stringify(a)))):(n.textContent="Add to My Library",-1!==(i=a.findIndex((function(e){return e.title===r.title})))&&(a.splice(i,1),localStorage.setItem("libraryFilms",JSON.stringify(a))));case 6:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function T(){var e=localStorage.getItem("libraryFilms");return e?JSON.parse(e):[]}function D(){x.classList.toggle("more-details-is-hidden"),document.removeEventListener("keydown",O),window.removeEventListener("click",S),detailsOpened=!1,A()}function O(e){"Escape"===e.key&&D()}function S(e){e.target===x&&D()}function A(){x.innerHTML=""}}();
//# sourceMappingURL=index.18972009.js.map