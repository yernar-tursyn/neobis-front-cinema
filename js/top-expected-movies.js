const API_KEY = "59acaf88-ebbc-46c4-a105-fb05630b4971";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  moviesEl.innerHTML = "";

  (data.films || data.items || data.releases || data.expected).forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <div class="movie__cover--darkened">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}" />
          <button class="like-button">
            <svg viewBox="0 0 24 24" class="heart-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`).join(',')}</div>
        ${movie.rating ? `
        <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
        ` : ''}
      </div>
    `;
    moviesEl.appendChild(movieEl);
  });
}

document.querySelector('.movies').addEventListener('click', function(event) {
  if (event.target.closest('.like-button')) {
    const likeButton = event.target.closest('.like-button');
    likeButton.classList.toggle('liked');
  }
});

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
  }
});
