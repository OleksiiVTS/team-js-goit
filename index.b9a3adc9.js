const e=document.getElementById("hero-random-film"),t=document.getElementById("hero-container");let n;async function a(){const e=await async function(){try{const e=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=9073999c285844087924fd0e24160fae"),{results:n}=await e.json(),a=n.map((({id:e})=>e));return t.classList.add("hero-hide"),a}catch(e){console.log("Помилка при виконанні запиту до API:",e)}}(),a=Math.floor(Math.random()*e.length);n=e[a];return await o(n)}async function o(e){const t=`https://api.themoviedb.org/3/movie/${e}?api_key=9073999c285844087924fd0e24160fae`;try{const e=await fetch(t),{title:n,trailer_key:a,backdrop_path:o,overview:i,vote_average:s,vote_count:r,release_date:c,popularity:d,genres:l,poster_path:u}=await e.json(),m=`https://www.youtube.com/watch?v=${a}`;return{title:n,trailer:m,backgroundImage:`https://image.tmdb.org/t/p/original${o}`,overview:i,vote_average:s,vote_count:r,release_date:c,popularity:d,genres:l,poster_path:u}}catch(e){console.log("Error occurred while making API request:",e)}}window.addEventListener("DOMContentLoaded",(async()=>{const t=function({title:e,popularity:t,backgroundImage:n,overview:a}){const o=a.split(" ");let i=o.slice(0,30).join(" ");return o.length>30&&(i+="..."),`\n    <section class="hero-section">\n    <div class="container hero-container" style="background-image: linear-gradient(\n      86.77deg,\n      #111111 30.38%,\n      rgba(17, 17, 17, 0) 65.61%\n    ), url(${n});\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: cover;">\n        <h1 class="hero-title">${e}</h1>\n        <p class="hero-text">Рейтинг: ${t}</p>\n        <p class="hero-text">${i}</p>\n        <div class="hero-homepage-buttons">\n          <button id="watchTrailerButton" class="button-watch-trailer">Watch trailer</button>\n          <button id="moreDetailsButton" class="button-more-details">More Details</button>\n        </div>\n      </div>\n    </section>\n  `}(await a());var n;n=t,e.insertAdjacentHTML("afterbegin",n);document.getElementById("watchTrailerButton").addEventListener("click",s);document.getElementById("moreDetailsButton").addEventListener("click",u)}));const i=document.getElementById("myModal");function s(){i.classList.toggle("m-w-t-is-hidden"),document.addEventListener("keydown",c),window.addEventListener("click",d)}function r(){i.classList.toggle("m-w-t-is-hidden"),document.removeEventListener("keydown",c),window.removeEventListener("click",d)}function c(e){"Escape"===e.key&&r()}function d(e){e.target===i&&r()}document.getElementById("closeModal").addEventListener("click",r);const l=document.getElementById("moreDetails");document.getElementById("closeDetails");async function u(){l.classList.toggle("more-details-is-hidden"),document.addEventListener("keydown",g),window.addEventListener("click",v);const e=function({title:e,backgroundImage:t,overview:n,vote_average:a,vote_count:o,release_date:i,popularity:s,genres:r,poster_path:c}){let d="Add to My Library";const l=JSON.parse(localStorage.getItem("libraryFilms"));for(const t of l)t.title===e&&(d="Remove from My Library");return`\n    <div class="more-details-modal">\n      <div class="close-button-box">\n        <button class="more-details-close-button" id="closeDetails" type="button">\n<svg>\n        <use href="../images/sprite.svg#close"></use>\n</svg>\n       </button>\n      </div>\n      <div class="details-wrapper">\n      <div class="more-details-img-box">\n\n\n        <img height="500px" class="more-detail-img" src="https://image.tmdb.org/t/p/original/${c}" alt="${e}" />\n      </div>\n      <div class="more-details-info">\n        <h2>${e}</h2>\n        <span >Release Date:</span>\n        <span>${i}</span>\n        <span>Vote / Votes:</span>\n        <span>\n          <span>${a}</span> /\n          <span>${o}</span>\n        </span>\n        <span>Popularity:</span>\n        <span>${s}</span>\n        <span>Genre:</span>\n        <span>${r.map((e=>e.name)).join(", ")}</span>\n\n        <span class="description-about">About:</span>\n        <span class="about-value">${n}</span>\n      </div>\n      <div class="more-details-adml-box">\n        <button id="addToLibraryButton" class="button-rem-me">${d}</button>\n\n      </div>\n      </div>\n     </div>\n    </div>\n  `}(await o(n));var t;t=e,y(),l.insertAdjacentHTML("afterbegin",t),document.getElementById("closeDetails").addEventListener("click",p),document.getElementById("addToLibraryButton").addEventListener("click",m)}async function m(){const e=document.querySelector(".button-rem-me"),t=await o(n),a=function(){const e=localStorage.getItem("libraryFilms");return e?JSON.parse(e):[]}();if("Add to My Library"===e.textContent){e.textContent="Remove from My Library";-1===a.findIndex((e=>e.title===t.title))&&(a.push(t),localStorage.setItem("libraryFilms",JSON.stringify(a)))}else{e.textContent="Add to My Library";const n=a.findIndex((e=>e.title===t.title));-1!==n&&(a.splice(n,1),localStorage.setItem("libraryFilms",JSON.stringify(a)))}}function p(){l.classList.toggle("more-details-is-hidden"),document.removeEventListener("keydown",g),window.removeEventListener("click",v),detailsOpened=!1,y()}function g(e){"Escape"===e.key&&p()}function v(e){e.target===l&&p()}function y(){l.innerHTML=""}
//# sourceMappingURL=index.b9a3adc9.js.map