!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequire480d;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequire480d=o);var a,i=o("bpxeT"),c=o("8nrFW"),s=o("2TvXO"),l=document.getElementById("hero-random-film"),d=document.getElementById("hero-container"),u="9073999c285844087924fd0e24160fae";function m(){return p.apply(this,arguments)}function p(){return(p=e(i)(e(s).mark((function t(){var n,r,o,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(u),e.prev=1,e.next=4,fetch(n);case 4:return r=e.sent,e.next=7,r.json();case 7:return o=e.sent.results,a=o.map((function(e){return e.id})),d.classList.add("hero-hide"),e.abrupt("return",a);case 13:e.prev=13,e.t0=e.catch(1),console.log("Помилка при виконанні запиту до API:",e.t0);case 16:case"end":return e.stop()}}),t,null,[[1,13]])})))).apply(this,arguments)}function v(){return y.apply(this,arguments)}function y(){return(y=e(i)(e(s).mark((function t(){var n,r,o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m();case 2:return n=e.sent,r=Math.floor(Math.random()*n.length),a=n[r],e.next=7,f(a);case 7:return o=e.sent,e.abrupt("return",o);case 9:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function f(e){return g.apply(this,arguments)}function g(){return(g=e(i)(e(s).mark((function t(n){var r,o,a,i,c,l,d,m,p,v,y,f,g,b,h;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://api.themoviedb.org/3/movie/".concat(n,"?api_key=").concat(u),e.prev=1,e.next=4,fetch(r);case 4:return o=e.sent,e.next=7,o.json();case 7:return a=e.sent,i=a.title,c=a.trailer_key,l=a.backdrop_path,d=a.overview,m=a.vote_average,p=a.vote_count,v=a.release_date,y=a.popularity,f=a.genres,g=a.poster_path,b="https://www.youtube.com/watch?v=".concat(c),h="https://image.tmdb.org/t/p/original".concat(l),e.abrupt("return",{title:i,trailer:b,backgroundImage:h,overview:d,vote_average:m,vote_count:p,release_date:v,popularity:y,genres:f,poster_path:g});case 23:e.prev=23,e.t0=e.catch(1),console.log("Error occurred while making API request:",e.t0);case 26:case"end":return e.stop()}}),t,null,[[1,23]])})))).apply(this,arguments)}window.addEventListener("DOMContentLoaded",e(i)(e(s).mark((function t(){var n,r,o,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],(r=localStorage.getItem("libraryFilms"))?n=JSON.parse(r):localStorage.setItem("libraryFilms",JSON.stringify(n)),e.next=5,v();case 5:o=e.sent,c=void 0,s=void 0,d=void 0,u=void 0,m=void 0,c=(i=o).title,s=i.popularity,d=i.backgroundImage,u=i.overview.split(" "),m=u.slice(0,30).join(" "),u.length>30&&(m+="..."),a='\n    <section class="hero-section">\n    <div class="container hero-container" style="background-image: linear-gradient(\n      86.77deg,\n      #111111 30.38%,\n      rgba(17, 17, 17, 0) 65.61%\n    ), url('.concat(d,');\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: cover;">\n        <h1 class="hero-title">').concat(c,'</h1>\n        <p class="hero-text">Рейтинг: ').concat(s,'</p>\n        <p class="hero-text">').concat(m,'</p>\n        <div class="hero-homepage-buttons">\n          <button id="watchTrailerButton" class="button-watch-trailer">Watch trailer</button>\n          <button id="moreDetailsButton" class="button-more-details">More Details</button>\n        </div>\n      </div>\n    </section>\n  '),t=a,l.insertAdjacentHTML("afterbegin",t),document.getElementById("watchTrailerButton").addEventListener("click",h),document.getElementById("moreDetailsButton").addEventListener("click",I);case 12:case"end":return e.stop()}var t,i,c,s,d,u,m}),t)}))));var b=document.getElementById("myModal");function h(){b.classList.toggle("m-w-t-is-hidden"),document.addEventListener("keydown",x),window.addEventListener("click",k),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden"}function w(){b.classList.toggle("m-w-t-is-hidden"),document.removeEventListener("keydown",x),window.removeEventListener("click",k),N()}function x(e){"Escape"===e.key&&w()}function k(e){e.target===b&&w()}document.getElementById("closeModal").addEventListener("click",w);var E=document.getElementById("moreDetails");function L(e){var t=e.title,n=e.overview,r=e.vote_average,o=e.vote_count,a=(e.release_date,e.popularity),i=e.genres,c=e.poster_path,s="Add to My Library",l=JSON.parse(localStorage.getItem("libraryFilms")),d=!0,u=!1,m=void 0;try{for(var p,v=l[Symbol.iterator]();!(d=(p=v.next()).done);d=!0){p.value.title===t&&(s="Remove from My Library")}}catch(e){u=!0,m=e}finally{try{d||null==v.return||v.return()}finally{if(u)throw m}}return'\n    <div class="more-details-modal">\n      <div class="close-button-box">\n        <button class="more-details-close-button" id="closeDetails" type="button">X\n       </button>\n      </div>\n      <div class="details-wrapper">\n\n      <div class="more-details-img-box">\n        <img width="380px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/'.concat(c,'" alt="').concat(t,'" />\n      </div>\n\n\n      \n      <div class="more-details-info">\n        <h2 class="film-title">').concat(t,'</h2>\n\n\n\n   \n   \n      \n        <table>\n        <tr>\n          <td class="table-row table-column-name">Vote / Votes:</td>\n          <td ><span class="vote-average">').concat(r,'</span> /\n          <span class="vote-count">').concat(o,'</span>\n       </td>\n        </tr>\n        <tr>\n          <td class="table-row table-column-name">Popularity:</td>\n          <td>').concat(a,'</td>\n        </tr>\n        <tr>\n        <td class="table-row table-column-name">Genre:</td>\n        <td >').concat(i.map((function(e){return e.name})).join(", "),'</td>\n      </tr>\n      </table>\n\n\n\n               <span class="description-about">About:</span>\n        <span class="more-details-about">').concat(n,'</span>\n\n\n        <div class="more-details-adml-box">\n        <button id="addToLibraryButton" class="button-rem-me">').concat(s,"</button>\n      </div>\n      </div>\n\n\n     \n\n      </div>\n     </div>\n    </div>\n  ")}document.getElementById("closeDetails");function S(e){D(),E.insertAdjacentHTML("afterbegin",e)}function I(){return _.apply(this,arguments)}function _(){return(_=e(i)(e(s).mark((function t(){var n,r,o,i,l,d,u;return e(s).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",E.classList.toggle("more-details-is-hidden"),document.addEventListener("keydown",T),window.addEventListener("click",q),t.next=7,f(a);case 7:if(n=t.sent,S(L(n)),"dark"!==localStorage.getItem("ui-theme")){t.next=14;break}t.next=38;break;case 14:for(document.querySelector(".more-details-modal").style.backgroundColor="#FFFFFF",document.querySelector(".more-details-modal").style.boxShadow="1px 1px 14px 4px rgba(0, 0, 0, 0.22)",document.querySelector(".more-details-close-button").style.color="#282828",document.querySelector(".film-title").style.color="#111111",document.querySelector(".more-details-about").style.color="#282828",document.querySelector(".description-about").style.color="#111111",r=e(c)(document.getElementsByTagName("td")),o=!0,i=!1,l=void 0,t.prev=22,d=r[Symbol.iterator]();!(o=(u=d.next()).done);o=!0)u.value.style.color="#111111";t.next=30;break;case 26:t.prev=26,t.t0=t.catch(22),i=!0,l=t.t0;case 30:t.prev=30,t.prev=31,o||null==d.return||d.return();case 33:if(t.prev=33,!i){t.next=36;break}throw l;case 36:return t.finish(33);case 37:return t.finish(30);case 38:document.getElementById("closeDetails").addEventListener("click",O),document.getElementById("addToLibraryButton").addEventListener("click",B);case 40:case"end":return t.stop()}}),t,null,[[22,26,30,38],[31,,33,37]])})))).apply(this,arguments)}function B(){return M.apply(this,arguments)}function M(){return(M=e(i)(e(s).mark((function t(){var n,r,o,i;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.querySelector(".button-rem-me"),e.next=3,f(a);case 3:r=e.sent,o=F(),"Add to My Library"===n.textContent?(n.textContent="Remove from My Library",-1===o.findIndex((function(e){return e.title===r.title}))&&(o.push(r),localStorage.setItem("libraryFilms",JSON.stringify(o)))):(n.textContent="Add to My Library",-1!==(i=o.findIndex((function(e){return e.title===r.title})))&&(o.splice(i,1),localStorage.setItem("libraryFilms",JSON.stringify(o))));case 6:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function F(){var e=[],t=localStorage.getItem("libraryFilms");return t?e=JSON.parse(t):localStorage.setItem("libraryFilms",JSON.stringify(e)),e}function O(){document.body.style.overflow="",document.documentElement.style.overflow="",N(),E.classList.toggle("more-details-is-hidden"),document.removeEventListener("keydown",T),window.removeEventListener("click",q),detailsOpened=!1,D()}function T(e){"Escape"===e.key&&O()}function q(e){e.target===E&&O()}function D(){E.innerHTML=""}function N(){document.body.style.overflow="",document.documentElement.style.overflow=""}}();
//# sourceMappingURL=index.88afa4eb.js.map
