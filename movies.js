// Variables globales
const apiKey = '93469841'; // Reemplaza esto con tu propia API key de OMDB
const moviesContainer = document.getElementById('movies-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

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
  `;

  return movieElement;
}

// Evento submit del formulario de búsqueda
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== '') {
    searchMovies(searchQuery);
  }
});