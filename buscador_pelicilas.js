// Variables globales
const apiKey = '93469841'; // Reemplaza esto con tu propia API key de OMDB
const moviesContainer = document.getElementById('movies-container');
const favoritesContainer = document.getElementById('favorites-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const trailerContainer = document.getElementById('trailer-container');

let favoriteMovies = [];

// Función para buscar películas en la API de OMDB
async function searchMovies(query) {
  moviesContainer.innerHTML = ''; // Limpiamos el contenedor de películas antes de cada búsqueda

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();

    if (data.Response === 'True') {
      data.Search.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesContainer.appendChild(movieElement);
      });
    } else {
      moviesContainer.innerHTML = 'No se encontraron resultados.';
    }
  } catch (error) {
    console.log('Error al buscar películas:', error);
    moviesContainer.innerHTML = 'Error al buscar películas.';
  }
}

// Función para crear el elemento HTML de una película
function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');
  movieElement.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Title}</h3>
    <p>Año: ${movie.Year}</p>
    <button class="favorite-button">Agregar a favoritos</button>
    <button class="trailer-button">Ver trailer</button>
  `;

  const favoriteButton = movieElement.querySelector('.favorite-button');
  const trailerButton = movieElement.querySelector('.trailer-button');

  // Evento click para agregar o quitar la película de favoritos
  favoriteButton.addEventListener('click', () => {
    if (favoriteMovies.includes(movie)) {
      favoriteMovies = favoriteMovies.filter(favorite => favorite !== movie);
      favoriteButton.textContent = 'Agregar a favoritos';
    } else {
      favoriteMovies.push(movie);
      favoriteButton.textContent = 'Quitar de favoritos';
    }
    updateFavorites();
  });

  // Evento click para mostrar el trailer de la película
  trailerButton.addEventListener('click', () => {
    showTrailer(movie.imdbID);
  });

  return movieElement;
}

// Función para mostrar las películas favoritas
function updateFavorites() {
  favoritesContainer.innerHTML = '';

  if (favoriteMovies.length === 0) {
    favoritesContainer.innerHTML = 'No hay películas favoritas.';
  } else {
    favoriteMovies.forEach(movie => {
      const movieElement = createMovieElement(movie);
      favoritesContainer.appendChild(movieElement);
    });
  }
}

// Función para mostrar el trailer de una película
async function showTrailer(movieId) {
  trailerContainer.innerHTML = '';

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=short`);
    const data = await response.json();

    if (data.Response === 'True') {
      const trailerLink = data.Trailer;

      if (trailerLink) {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = trailerLink;
        iframeElement.allowFullscreen = true;
        trailerContainer.appendChild(iframeElement);
      } else {
        trailerContainer.innerHTML = 'No se encontró trailer para esta película.';
      }
    } else {
      trailerContainer.innerHTML = 'Error al cargar el trailer.';
    }
  } catch (error) {
    console.log('Error al cargar el trailer:', error);
    trailerContainer.innerHTML = 'Error al cargar el trailer.';
  }
}

// Evento submit del formulario de búsqueda
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== '') {
    searchMovies(searchQuery);
  }
});
